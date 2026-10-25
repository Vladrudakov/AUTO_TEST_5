const assert = require('node:assert/strict');

const mainMenuSelector = 'android=new UiSelector().text("Views")';

async function openMainMenu() {
  await driver.terminateApp('io.appium.android.apis');
  await driver.activateApp('io.appium.android.apis');

  const viewsMenu = await $(mainMenuSelector);
  await viewsMenu.waitForDisplayed({ timeout: 15000 });
}

describe('API Demos — mobile automation', () => {
  beforeEach(async () => {
    await openMainMenu();
  });

  it('should open Views > Auto Complete > Screen Top and validate the entered country name', async () => {
    const viewsMenu = await $(mainMenuSelector);
    await viewsMenu.click();

    const autoComplete = await $('android=new UiSelector().textContains("Auto Complete")');
    await autoComplete.waitForDisplayed({ timeout: 10000 });
    await autoComplete.click();

    const screenTop = await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' +
      'new UiSelector().textContains("Screen Top"))'
    );
    await screenTop.waitForDisplayed({ timeout: 10000 });
    await screenTop.click();

    const countryInputById = await $('id=io.appium.android.apis:id/edit');
    const countryInputByUiSelector = await $(
      'android=new UiSelector().resourceId("io.appium.android.apis:id/edit")'
    );
    await countryInputById.waitForDisplayed({ timeout: 10000 });
    await countryInputByUiSelector.waitForDisplayed({ timeout: 10000 });

    assert.equal(
      await countryInputByUiSelector.getAttribute('resource-id'),
      await countryInputById.getAttribute('resource-id'),
      'The ID and UiSelector strategies should identify the same text field'
    );

    const countryInput = countryInputById;
    await countryInput.clearValue();
    await countryInput.setValue('Ukraine');

    const enteredText = await countryInput.getText();
    assert.equal(enteredText, 'Ukraine', `Expected input to contain 'Ukraine', got '${enteredText}'`);
  });

  it('should open the App and Media main menu sections', async () => {
    const appMenu = await $('android=new UiSelector().text("App")');
    await appMenu.waitForDisplayed({ timeout: 10000 });
    await appMenu.click();
    const actionBarItem = await $('android=new UiSelector().text("Action Bar")');
    await actionBarItem.waitForDisplayed({ timeout: 10000 });
    assert.equal(await actionBarItem.isDisplayed(), true);

    await driver.back();
    const viewsMenu = await $(mainMenuSelector);
    await viewsMenu.waitForDisplayed({ timeout: 10000 });

    const mediaMenu = await $('android=new UiSelector().text("Media")');
    await mediaMenu.waitForDisplayed({ timeout: 10000 });
    await mediaMenu.click();
    const audioFxItem = await $('android=new UiSelector().text("AudioFx")');
    await audioFxItem.waitForDisplayed({ timeout: 10000 });
    assert.equal(await audioFxItem.isDisplayed(), true);
  });
});
