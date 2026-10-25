const assert = require('node:assert/strict');

describe('API Demos — mobile automation', () => {
  it('should open Views > Auto Complete > Screen Top and validate the entered country name', async () => {
    const viewsMenu = await $('~Views');
    await viewsMenu.waitForDisplayed({ timeout: 15000 });
    await viewsMenu.click();

    const autoComplete = await driver.$('android=new UiSelector().text("Auto Complete")');
    await autoComplete.waitForDisplayed({ timeout: 10000 });
    await autoComplete.click();

    const screenTop = await $('//android.widget.TextView[@text="Screen Top"]');
    await screenTop.waitForDisplayed({ timeout: 10000 });
    await screenTop.click();

    const countryInput = await $('android=new UiSelector().className("android.widget.EditText")');
    await countryInput.waitForDisplayed({ timeout: 10000 });
    await countryInput.clearValue();
    await countryInput.setValue('Ukraine');

    const enteredText = await countryInput.getText();
    assert.match(enteredText, /Ukraine/i, `Expected input to contain 'Ukraine', got '${enteredText}'`);
  });

  it('should open two additional main menu sections', async () => {
    const additionalMenus = ['App', 'Media'];

    for (const menuName of additionalMenus) {
      const menuItem = await $(`~${menuName}`);
      await menuItem.waitForDisplayed({ timeout: 10000 });
      await menuItem.click();
      await browser.pause(800);
      await driver.back();
      await browser.pause(500);
    }

    const homeScreenVisible = await $('~Views').isDisplayed();
    assert.equal(homeScreenVisible, true);
  });
});
