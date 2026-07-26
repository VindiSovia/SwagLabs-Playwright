import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage.js';
import { InventoryPage } from '../../helpers/InventoryPage.js';
import { CartPage } from '../../helpers/CardPage.js';
import { CheckoutPage } from '../../helpers/CheckoutPage.js';

test.describe('End to  End Testing dengan 1 Produk)', () => {
  test('happy path: login sampai order berhasil dan kembali ke Products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('a. Login ke homepage', async () => {
      await loginPage.goto();
      await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
      await expect(page).toHaveURL(/.*inventory\.html/);
    });

    await test.step('b. Klik "Add to cart" pada suatu barang', async () => {
      await inventoryPage.addToCart('sauce-labs-backpack');
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('c. Klik icon "Cart" untuk redirect ke page Cart', async () => {
      await inventoryPage.openCart();
      await expect(page).toHaveURL(/.*cart\.html/);
    });

    await test.step('d. Klik button "Checkout"', async () => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
    });

    await test.step('e. Isi First Name, Last Name, Zip lalu klik Continue', async () => {
      await checkoutPage.fillInformation({
        firstName: 'Vindi',
        lastName: 'Sovia',
        postalCode: '12345',
      });
      await checkoutPage.continueToOverview();

      await expect(page).toHaveURL(/.*checkout-step-two\.html/);
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    });

    await test.step('f. Verifikasi barang tampil di Overview, lalu klik Finish', async () => {
      await expect(checkoutPage.overviewCartItems).toHaveCount(1);
      await checkoutPage.finish();

      await expect(page).toHaveURL(/.*checkout-complete\.html/);
    });

    await test.step('g. Verifikasi halaman Checkout: Complete!', async () => {
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    await test.step('h. Klik Back Home untuk kembali ke Products', async () => {
      await checkoutPage.backToProducts();

      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(inventoryPage.pageTitle).toHaveText('Products');
    });
  });
});

test.describe('End to End Testing jika membeli lebih dari 1 produk)', () => {
  test('happy path: login, order 3 product hingga berhasil dan kembali ke Products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('a. Login ke homepage', async () => {
      await loginPage.goto();
      await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
    });

    await test.step('b. Klik "Add to cart" pada 2 barang', async () => {
      await inventoryPage.addToCart('sauce-labs-backpack');
      await inventoryPage.addToCart('sauce-labs-bike-light');
      await inventoryPage.addToCart('sauce-labs-onesie');
      await expect(inventoryPage.cartBadge).toHaveText('3');
    });

    await test.step('c. Klik icon "Cart" untuk redirect ke page Cart', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.cartItems).toHaveCount(3);
    });

    await test.step('d. Klik button "Checkout" dan isi informasi', async () => {
      await cartPage.checkout();
      await checkoutPage.fillInformation({
        firstName: 'Vindi',
        lastName: 'Sovia',
        postalCode: '54321',
      });
      await checkoutPage.continueToOverview();

      await expect(checkoutPage.overviewCartItems).toHaveCount(3);
    });

    await test.step('e. finish dan verifikasi order selesai', async () => {
      await checkoutPage.finish();

      await expect(page).toHaveURL(/.*checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  });
});
