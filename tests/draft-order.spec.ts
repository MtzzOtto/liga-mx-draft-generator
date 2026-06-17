import{test, expect} from '@playwright/test';



test('Generate draft with one player',async({page})=>{

    await page.goto('/');
    const playerSelect = page.locator('#playerSelect');
    await playerSelect.selectOption('1');
    const playerInput = page.getByPlaceholder("Player 1 Name");
    await expect(playerInput).toBeVisible();
    await playerInput.fill('Oto');
    await expect(playerInput).toHaveValue('Oto');
    const generateBtn = page.locator('#generateBtn');
    await generateBtn.click();
    await expect(generateBtn).toBeDisabled();
    await expect(playerInput).toBeDisabled();
    await expect(playerSelect).toBeDisabled();
    const draftOrder = page.locator('#draftOrderList');
    await expect(draftOrder).toContainText('Pick #1');
    await expect(draftOrder).toContainText('Oto');
    const cardsContainer = page.locator('#cardsContainer');
    const playerCard = page.locator('.player-card');
    await expect(playerCard).toHaveCount(1);
    await expect(cardsContainer).toContainText('Main Team');
    await expect(cardsContainer).toContainText('Steal Teams');
    const teamLogo = page.locator('.teamLogo');
    await expect(teamLogo).toBeVisible();
    const stealTeams = page.locator('.player-card ul li');
    await expect(stealTeams).toHaveCount(2);
    

});