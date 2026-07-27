import { test, expect } from '@playwright/test';
import { LoginPage } from '../../helpers/LoginPage.js';
import { InventoryPage } from '../../helpers/InventoryPage.js';
import { CartPage } from '../../helpers/CardPage.js';

test.describe('Add to cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME, process.env.STANDARD_PASSWORD);
  });

  test('menambahkan 1 barang ke cart menampilkan badge sesuai jumlah', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeFromCartButton('sauce-labs-backpack')).toBeVisible();

    // buka icon Cart untuk validasi barang beneran masuk ke keranjang
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemByName('Sauce Labs Backpack')).toBeVisible();
  });

  test('menambahkan 2 barang berbeda, badge menunjukkan angka 2', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');

    await expect(inventoryPage.cartBadge).toHaveText('2');
    await expect(inventoryPage.removeFromCartButton('sauce-labs-backpack')).toBeVisible();
    await expect(inventoryPage.removeFromCartButton('sauce-labs-bike-light')).toBeVisible();

    // buka icon Cart untuk validasi kedua barang beneran masuk ke keranjang
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.cartItemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.cartItemByName('Sauce Labs Bike Light')).toBeVisible();
  });
});
