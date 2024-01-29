import { ValidationPipe } from "@nestjs/common";

import { HttpAdapterHost, NestFactory } from "@nestjs/core";

import { SpelunkerModule } from "nestjs-spelunker";

import { AppModule } from "./app.module";

import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  // 1. Generate the tree as text
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges
    .filter(
      ({ from, to }) =>
        !(
          from.module.name === "ConfigModule" ||
          to.module.name === "ConfigModule" ||
          from.module.name === "ConfigHostModule" ||
          to.module.name === "ConfigHostModule" ||
          from.module.name === "LoggerModule" ||
          to.module.name === "LoggerModule" ||
          from.module.name === "DevtoolsModule" ||
          to.module.name === "DevtoolsModule" ||
          from.module.name === "DiscoveryModule" ||
          to.module.name === "DiscoveryModule"
        )
    )
    .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);
  console.log(`graph TD\n\t${mermaidEdges.join("\n\t")}`);
  // Inspect resulting diagram here: https://mermaid.live/edit

  app.enableCors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}

bootstrap();
