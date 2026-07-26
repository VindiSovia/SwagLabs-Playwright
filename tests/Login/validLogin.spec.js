import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage.js';

test.describe('Login - kredensial valid', () => {
  test('user standard dapat login dan diarahkan ke halaman Products', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
