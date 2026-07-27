import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage.js';
import { InventoryPage } from '../../helpers/InventoryPage.js';
import { CartPage } from '../../helpers/CardPage.js';

test.describe('Cart - Remove item dari halaman Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
  });

  test('remove 1 barang dari cart yang cuma berisi 1 barang, cart jadi kosong', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeItem('sauce-labs-backpack');

    await expect(cartPage.cartItems).toHaveCount(0);
    // badge di saucedemo hilang total dari DOM saat cart kosong (bukan menampilkan "0")
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  test('remove 1 dari 2 barang, sisa 1 barang dan badge ter-update jadi 1', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeItem('sauce-labs-bike-light');

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.cartBadge).toHaveText('1');
  });

  test('remove semua barang satu per satu sampai cart benar-benar kosong', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(3);

    await cartPage.removeItem('sauce-labs-backpack');
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeItem('sauce-labs-bike-light');
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeItem('sauce-labs-bolt-t-shirt');
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  test('setelah remove barang, klik Continue Shopping kembali ke halaman Products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.removeItem('sauce-labs-backpack');

    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
