import{test, expect} from '@playwright/test';

test('Should show error when no players selected', async ({ page }) => {

  await page.goto('/');
  const generateBtn = page.locator('#generateBtn');
  await generateBtn.click();
  const errorContainer = page.locator('#errorsContainer');
  await expect(errorContainer).toContainText('Please select number of players');

});