import { INestApplication, ValidationPipe } from "@nestjs/common";

import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

import { WeightService } from "../src/weight/weight.service";

import * as pactum from "pactum";

import { PrismaService } from "../src/prisma/prisma.service";

import { AuthDto } from "../src/auth/dto";

import { EditUserDto } from "src/user/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, WeightService],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );

    await app.init();

    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl("http://localhost:3333");
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      name: "Adriana",
      email: "hello@maria-adriana.com",
      password: "123",
    };

    describe("Sign-up", () => {
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/sign-up")
          .withBody({
            password_hash: dto.password,
          })
          .expectStatus(400);
      });

      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/sign-up")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it("should throw if no body provided", () => {
        return pactum.spec().post("/auth/sign-up").expectStatus(400);
      });

      it("should sign-up", () => {
        return pactum
          .spec()
          .post("/auth/sign-up")
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe("Sign-in", () => {
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/sign-in")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/sign-in")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it("should throw if no body provided", () => {
        return pactum.spec().post("/auth/sign-in").expectStatus(400);
      });
      it("should sign-in", () => {
        return pactum
          .spec()
          .post("/auth/sign-in")
          .withBody(dto)
          .expectStatus(200)
          .stores("userAt", "access_token");
      });
    });
  });

  describe("User", () => {
    describe("Get user", () => {
      it("should get current user", () => {
        return pactum
          .spec()
          .get("/users/me")
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .inspect();
      });

      it("should get current user with the latest weight", async () => {
        const MOCKED_LATEST_WEIGHT_RECORD = 66;

        jest
          .spyOn(app.get(WeightService), "getLatestWeight")
          .mockResolvedValue({
            id: 1,
            userId: 0,
            weight: MOCKED_LATEST_WEIGHT_RECORD,
            createdAt: new Date(),
          });

        return pactum
          .spec()
          .get("/users/me")
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .inspect()
          .expectJsonLike({
            weight: 66,
          });
      });
    });

    const dto: EditUserDto = {
      name: "Adriana",
      email: "hello@maria-adriana.com",
      height: 170,
      weight: 66,
      gender: "FEMALE",
      birthdate: new Date("1994-05-05"),
      measurementUnit: "METRIC",
      plan: {
        goal: "LOSS",
        goal_diff: "QUARTER",
        weekly_training_amount: 3,
        average_minutes_per_training_session: 30,
      },
    };

    describe("Edit user", () => {
      it("should edit current user", () => {
        return pactum
          .spec()
          .patch(`/users/me`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.birthdate)
          .expectBodyContains(dto.height)
          .expectBodyContains(dto.weight)
          .expectBodyContains(dto.plan.goal)
          .expectBodyContains(dto.plan.goal_diff)
          .expectBodyContains(dto.plan.average_minutes_per_training_session)
          .expectBodyContains(dto.plan.weekly_training_amount);
      });
    });

    describe("Delete user", () => {
      it("should delete current user", () => {
        return pactum
          .spec()
          .delete(`/users/me`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
});
