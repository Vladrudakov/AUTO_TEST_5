# Running the Android tests

1. Install Android Studio and the Android SDK, including **Android SDK Platform-Tools**.
2. By default, the tests look for the SDK at `%LOCALAPPDATA%\Android\Sdk`.
   If it is installed elsewhere, set `ANDROID_HOME` in `.env` to the SDK directory
   (the directory containing `platform-tools`), for example:
   `ANDROID_HOME=C:\Users\your-name\AppData\Local\Android\Sdk`
3. Start an Android emulator with API 34 and install the API Demos app.
4. Run `npm test`.

The WDIO configuration loads `.env`, sets both `ANDROID_HOME` and
`ANDROID_SDK_ROOT` for the Appium service, and adds the SDK's `platform-tools`
directory to `PATH`.
