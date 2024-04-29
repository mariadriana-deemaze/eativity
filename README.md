# Eativity

This is a now sunsetted exploratory full-stack TypeScript mobile application, using React Native and wrapped within the Expo SDK. For the app's user interface, I am utilizing the NativeBase library, while on the backend, I am leveraging ORM Prisma services through a NestJS application.

## Tech Stack

- React Native
- Expo
- Typescript
- NativeBase
- NestJS
- Prisma

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository.
2. Install dependencies by running `yarn i` on each `/app` and `/backend` folders.
3. To start the app with a quick dev start, run the commands: 
- `yarn dev:be` 
- `yarn dev:app`

## Features

- User authentication;
- User onboarding;
- Get and edit user profile;
- Get and edit user recipes;
- Get and edit user foods;
- Daily consumption log;
- Mailing;
(... some are a bit half-baked and not battle tested, as this was only an exploratory hobby project.)

## Dependencies

- `react-native`
- `expo`
- `typescript`
- `nestJS`
- `prisma`

## Running the app UI

To run the app, use the following command:

```shell
yarn dev:app
```

This will start the Expo development server and open the app in your default browser. You can then use the Expo client app to run the app on your mobile device.

## Running the app backend

To run the app backend services, use the following command:

```shell
yarn dev:be
```

## License

This project is licensed under the MIT license. See the `LICENSE` file for more information.
