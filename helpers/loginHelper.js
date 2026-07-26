const { expect } = require('@playwright/test');
const LoginPage = require('../helpers/LoginPage');

async function loginAsStandardUser(page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.STANDARD_USERNAME,
        process.env.STANDARD_PASSWORD
    );

    await expect(page).toHaveURL(/inventory.html/);
}

module.exports = {
    loginAsStandardUser
};