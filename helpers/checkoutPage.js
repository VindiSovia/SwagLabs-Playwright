export class CheckoutPage {
   constructor(page) {
      this.page = page;
      this.pageTitle = page.locator('.title');

      // Step One: Checkout - Your Information
      this.firstNameInput = page.locator('#first-name');
      this.lastNameInput = page.locator('#last-name');
      this.postalCodeInput = page.locator('#postal-code');
      this.continueButton = page.locator('#continue');
      this.cancelButton = page.locator('#cancel');
      this.errorMessage = page.locator('[data-test="error"]');

      // Step Two: Checkout - Overview
      this.overviewCartItems = page.locator('.cart_item');
      this.summarySubtotalLabel = page.locator('.summary_subtotal_label');
      this.summaryTotalLabel = page.locator('.summary_total_label');
      this.finishButton = page.locator('#finish');

      // Step Three: Checkout - Complete
      this.completeHeader = page.locator('.complete-header');
      this.completeText = page.locator('.complete-text');
      this.backHomeButton = page.locator('#back-to-products');
   }

   async fillInformation({ firstName, lastName, postalCode }) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
   }

   async continueToOverview() {
      await this.continueButton.click();
   }

   async finish() {
      await this.finishButton.click();
   }

   async backToProducts() {
      await this.backHomeButton.click();
   }
}