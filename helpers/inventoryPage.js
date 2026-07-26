export class InventoryPage {
   constructor(page) {
      this.page = page;
      this.pageTitle = page.locator('.title');
      this.cartIcon = page.locator('.shopping_cart_link');
      this.cartBadge = page.locator('.shopping_cart_badge');
   }

   addToCartButton(productSlug) {
      return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
   }

   removeFromCartButton(productSlug) {
      return this.page.locator(`[data-test="remove-${productSlug}"]`);
   }

   async addToCart(productSlug) {
      await this.addToCartButton(productSlug).click();
   }

   async openCart() {
      await this.cartIcon.click();
   }
}
