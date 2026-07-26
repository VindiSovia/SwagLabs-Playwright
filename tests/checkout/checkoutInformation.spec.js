import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage.js';
import { InventoryPage } from '../../helpers/InventoryPage.js';
import { CartPage } from '../../helpers/CardPage.js';
import { CheckoutPage } from '../../helpers/CheckoutPage.js';

test.describe('Checkout - Your Information', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('mengisi First Name, Last Name, Zip lalu Continue menuju halaman Overview', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation({
      firstName: 'Vindi',
      lastName: 'Sovia',
      postalCode: '12345',
    });
    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
  });

  
  const requiredFieldCases = [
    {
      description: 'First Name kosong',
      data: { firstName: '', lastName: 'Sovia', postalCode: '12345' },
      expectedError: 'First Name is required',
    },
    {
      description: 'Last Name kosong',
      data: { firstName: 'Vindi', lastName: '', postalCode: '12345' },
      expectedError: 'Last Name is required',
    },
    {
      description: 'Postal Code kosong',
      data: { firstName: 'Vindi', lastName: 'Sovia', postalCode: '' },
      expectedError: 'Postal Code is required',
    },
    {
      description: 'semua field kosong (First Name divalidasi lebih dulu)',
      data: { firstName: '', lastName: '', postalCode: '' },
      expectedError: 'First Name is required',
    },
    {
      description: 'First Name & Last Name kosong, Postal Code diisi',
      data: { firstName: '', lastName: '', postalCode: '12345' },
      expectedError: 'First Name is required',
    },
  ];

  for (const { description, data, expectedError } of requiredFieldCases) {
    test(`continue dengan ${description} menampilkan pesan error`, async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);

      await checkoutPage.fillInformation(data);
      await checkoutPage.continueToOverview();

      await expect(checkoutPage.errorMessage).toContainText(expectedError);
    });
  }
});
