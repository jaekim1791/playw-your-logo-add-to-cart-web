const { test, expect } = require("@playwright/test");

test.describe("ADD PRODUCT TO CART", () => {
  test("Load website, add product, and delete", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await page.goto("http://automationpractice.com/");
    await page.hover("//*[@id='block_top_menu']/ul/li[2]/a");
    await page.locator("li[class='sfHover'] a[title='Summer Dresses']").click();
    await page.hover("div[class='left-block'] >> nth=0");
    await page.locator("a[class='quick-view'] >> nth=0").click();

    // Id for iFrame will not work, use class.
    // Unable to continue in Firefox, iFrame hidden.
    const fancybox = page.frameLocator(".fancybox-iframe");
    await fancybox.locator("[type='submit']").click();

    const checkout = page.locator("//a[@title='Proceed to checkout']");
    await checkout.waitFor();
    // Without short delay there's an infinite wait for 'Proceed to checkout' button to appear.
    await delay(500);
    await page.locator("a[title='Proceed to checkout']").click();

    await page.locator("a[class='button btn btn-default standard-checkout button-medium']").click();
    await page.goBack();
    await page.locator("a[class='cart_quantity_delete']").click();
    await expect(page.locator("p[class='alert alert-warning']")).toHaveText("Your shopping cart is empty.");
  });
});
