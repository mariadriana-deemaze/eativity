/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? "debug" : undefined,
  },
  testRunner: {
    $0: "jest",
    args: {
      config: "e2e/jest.config.js",
      _: ["e2e"],
    },
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? "failing" : undefined,
      screenshot: "failing",
    },
  },
  apps: {
    "ios.release": {
      type: "ios.app",
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/eativity-app.app",
      build:
        "xcodebuild -workspace ios/eativity-app.xcworkspace -scheme eativity-app -configuration Release -sdk iphonesimulator -derivedDataPath ios/build",
    },
    "android.release": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 15",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "Pixel_2_API_30",
      },
    },
  },
  configurations: {
    "ios.release": {
      device: "simulator",
      app: "ios.release",
    },
    "android.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
