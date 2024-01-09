import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { MailerModule } from "@nestjs-modules/mailer";

import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: "localhost",
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true, // preview e-mail in browser
      // TODO: React e-mail <-> https://react.email/docs/integrations/nodemailer
      /*  template: {
        dir: __dirname + '/templates',
        //adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      }, */
    }),
    UserModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
