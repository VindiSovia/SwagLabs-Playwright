const { test, expect } = require('@playwright/test');
const { loginAsStandardUser } = require('../../helpers/LoginHelper');

test('Validate valid login', async ({ page }) => {

    await loginAsStandardUser(page);

    await expect(page.getByTitle('Products'));

});