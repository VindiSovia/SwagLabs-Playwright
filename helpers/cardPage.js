export class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  cartItemByName(name) {
    return this.page.locator('.cart_item', { hasText: name });
  }

  removeButtonFor(productSlug) {
    return this.page.locator(`[data-test="remove-${productSlug}"]`);
  }

  async removeItem(productSlug) {
    await this.removeButtonFor(productSlug).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
