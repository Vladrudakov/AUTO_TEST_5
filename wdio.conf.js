const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const androidSdkPath = (
  process.env.ANDROID_HOME ||
  process.env.ANDROID_SDK_ROOT ||
  path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk')
).trim();
const adbPath = path.join(androidSdkPath, 'platform-tools', 'adb.exe');

if (!androidSdkPath || !fs.existsSync(adbPath)) {
  throw new Error(
    'Android SDK was not found. Install Android SDK (Android Studio), then set ' +
    'ANDROID_HOME in .env to its path, for example: C:\\Users\\<user>\\AppData\\Local\\Android\\Sdk'
  );
}

process.env.ANDROID_HOME = androidSdkPath;
process.env.ANDROID_SDK_ROOT = androidSdkPath;

const platformToolsPath = path.dirname(adbPath);
const pathEntries = (process.env.PATH || '').split(path.delimiter);
if (!pathEntries.some((entry) => entry.toLowerCase() === platformToolsPath.toLowerCase())) {
  process.env.PATH = [platformToolsPath, ...pathEntries].join(path.delimiter);
}

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  reporters: ['spec'],
  services: [['appium', { args: { port: 4723 } }]],
  port: 4723,
  hostname: '127.0.0.1',
  path: '/',
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Pixel_5_API_34',
    'appium:platformVersion': '14',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': 'io.appium.android.apis.ApiDemos',
    'appium:noReset': true,
    'appium:newCommandTimeout': 600,
    'appium:ensureWebviewsHavePages': true,
  }],
};
