import { INestApplication, ValidationPipe } from "@nestjs/common";

import { Test } from "@nestjs/testing";

import { AppModule } from "../src/app.module";

import { WeightService } from "../src/weight/weight.service";

import * as pactum from "pactum";

import { PrismaService } from "../src/prisma/prisma.service";

import { AuthDto } from "../src/auth/dto";

import { EditUserDto } from "../src/user/dto";

import { FoodService } from "../src/food/food.service";

import { FoodDto } from "src/food/dto";

import { RecipeDto } from "src/recipe/dto";

async function makeApp(): Promise<INestApplication> {
  let app: INestApplication;

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [PrismaService, WeightService, FoodService],
  }).compile();

  // eslint-disable-next-line prefer-const
  app = moduleRef.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  await app.init();

  await app.listen(3333);

  return app;
}

describe("App e2e", () => {
  let prisma: PrismaService;
  let app;

  beforeAll(async () => {
    app = await makeApp();

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
    describe("Get User", () => {
      it("should get current user", () => {
        return pactum
          .spec()
          .get("/users/me")
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200);
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

    describe("Edit User", () => {
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

    /* describe("Delete user", () => {
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
    }); */
  });

  describe("Food", () => {
    describe("Get Food", () => {
      it("should successfully search by name and get a result back", async () => {
        const response = await pactum
          .spec()
          .get(`/food/search?name=Broccoli`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .expectJsonLike({
            pagination: {
              count: 1,
            },
          });

        return response;
      });

      it("should be able to search for a non-existant item and get empty results back", () => {
        return pactum
          .spec()
          .get(`/food/search?name=Bicicle`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .expectJsonLike({
            data: [],
            pagination: {
              count: 0,
            },
          });
      });

      it("should be able to query a food by id and get a matching result", () => {
        return pactum
          .spec()
          .get(`/food/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectJsonLike({
            id: 1,
          });
      });

      it("should be able to query a food by id but get nothing back", () => {
        return pactum
          .spec()
          .get(`/food/100`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(404);
      });
    });

    describe("Post Food", () => {
      it("should be able to create a food", () => {
        const dto: FoodDto = {
          name: "Some name",
          description: "Must be a good one",
          barcode: "123",
          calories: 1,
          carbohydrates: 10,
          proteins: 100,
          fats: 20,
          servingSize: 100,
          image: "some_image_url_here",
        };

        return pactum
          .spec()
          .post(`/food`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(201)
          .expectJsonLike(dto);
      });

      it("should retrieve error when attempting to create a food with a bad payload", () => {
        const badFoodDtoPayload: Omit<FoodDto, "proteins"> & {
          proteins: string;
        } = {
          name: "Some other name",
          description: "Must better than the other",
          barcode: "123",
          calories: 1,
          carbohydrates: 10,
          proteins: "100",
          fats: 20,
          servingSize: 100,
          image: "some_image__url_here",
        };

        return pactum
          .spec()
          .post(`/food`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(badFoodDtoPayload)
          .expectStatus(400)
          .expectJsonLike({
            message: [
              "proteins must be a number conforming to the specified constraints",
            ],
          });
      });
    });

    describe("Patch Food", () => {
      it("should be able to successfully edit a food", () => {
        const dto: FoodDto = {
          name: "Some name 2",
          description: "Must be a good one",
          barcode: "456",
          calories: 1,
          carbohydrates: 10,
          proteins: 100,
          fats: 20,
          servingSize: 100,
          image: "some_image_url_here",
        };

        return pactum
          .spec()
          .patch(`/food/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(200)
          .expectJsonLike(dto);
      });

      it("should retrieve error when attempting to edit a food with a bad payload", () => {
        const badFoodDtoPayload: Omit<FoodDto, "proteins"> & {
          proteins: string;
        } = {
          name: "Some other name",
          description: "Must better than the other",
          barcode: "123",
          calories: 1,
          carbohydrates: 10,
          proteins: "100",
          fats: 20,
          servingSize: 100,
          image: "some_image__url_here",
        };

        return pactum
          .spec()
          .patch(`/food/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(badFoodDtoPayload)
          .expectStatus(400)
          .expectJsonLike({
            message: [
              "proteins must be a number conforming to the specified constraints",
            ],
          });
      });
    });
  });

  describe("Recipe", () => {
    describe("Get Recipe", () => {
      it("should successfully search by name and get a result back", async () => {
        const response = await pactum
          .spec()
          .get(`/recipe/search?name=Broccoli`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .expectJsonLike({
            pagination: {
              count: 1,
            },
          });

        return response;
      });

      it("should be able to search for a non-existant item and get empty results back", () => {
        return pactum
          .spec()
          .get(`/recipe/search?name=Bicicle`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(200)
          .expectJsonLike({
            data: [],
            pagination: {
              count: 0,
            },
          });
      });

      it("should be able to query a recipe by id and get a matching result", () => {
        return pactum
          .spec()
          .get(`/recipe/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectJsonLike({
            id: 1,
          });
      });

      it("should be able to query a recipe by id but get nothing back", () => {
        return pactum
          .spec()
          .get(`/recipe/100`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .expectStatus(404);
      });
    });

    describe("Post Recipe", () => {
      it("should be able to create a recipe", () => {
        const dto: RecipeDto = {
          name: "Some recipe name",
          description: "Must be a good one",
          calories: 1,
          carbohydrates: 10,
          proteins: 100,
          fats: 20,
          image: "some_image_url_here",
        };

        return pactum
          .spec()
          .post(`/recipe`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(201)
          .expectJsonLike(dto);
      });

      it("should retrieve error when attempting to create a recipe with a bad payload", () => {
        const badRecipeDtoPayload: Omit<RecipeDto, "proteins"> & {
          proteins: string;
        } = {
          name: "Some other recipe name",
          description: "Must better than the other",
          calories: 1,
          carbohydrates: 10,
          proteins: "100",
          fats: 20,
          image: "some_image__url_here",
        };

        return pactum
          .spec()
          .post(`/food`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(badRecipeDtoPayload)
          .expectStatus(400)
          .expectJsonLike({
            message: [
              "proteins must be a number conforming to the specified constraints",
            ],
          });
      });
    });

    describe("Patch Recipe", () => {
      it("should be able to successfully edit a recipe", () => {
        const dto: RecipeDto = {
          name: "Some other cool recipe name",
          description: "Must be a good one",
          calories: 1,
          carbohydrates: 10,
          proteins: 100,
          fats: 20,
          image: "some_image_url_here",
        };

        return pactum
          .spec()
          .patch(`/recipe/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(dto)
          .expectStatus(200)
          .expectJsonLike(dto);
      });

      it("should retrieve error when attempting to edit a recipe with a bad payload", () => {
        const badRecipeDtoPayload: Omit<RecipeDto, "proteins"> & {
          proteins: string;
        } = {
          name: "Some other uncool recipe name",
          description: "Must be a good one",
          calories: 1,
          carbohydrates: 10,
          proteins: "100",
          fats: 20,
          image: "some_image_url_here",
        };

        return pactum
          .spec()
          .patch(`/recipe/1`)
          .withHeaders({
            Authorization: "Bearer $S{userAt}",
          })
          .withBody(badRecipeDtoPayload)
          .expectStatus(400)
          .expectJsonLike({
            message: [
              "proteins must be a number conforming to the specified constraints",
            ],
          });
      });
    });
  });
});
