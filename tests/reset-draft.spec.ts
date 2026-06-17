import{test, expect} from '@playwright/test';

test('Should reset generated draft', async({page})=>{

    await page.goto('/');
    const playerSelect = page.locator('#playerSelect');
    await playerSelect.selectOption('1');
    const playerInput = page.getByPlaceholder("Player 1 Name");
    await playerInput.fill('Oto');
    const generateBtn = page.locator('#generateBtn');
    await generateBtn.click();
    const resetBtn = page.locator('#resetBtn');
    await resetBtn.click();
    await expect(resetBtn).toBeDisabled();
    await expect(generateBtn).toBeEnabled();
    await expect(playerSelect).toBeEnabled();
    const draftOrder = page.locator('#draftOrderList');
    await expect(draftOrder).toBeEmpty();
  
});