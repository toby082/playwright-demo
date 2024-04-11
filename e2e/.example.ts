import { test, expect } from '@playwright/test';

test('Has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Car Hub/);
});

test('Get started link', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click the get started link.
    // await page.getByRole('link', { name: 'Get started' }).click();
    // await page.locator('button:text("Explore Cars")').click();
    // await page.getByRole('button').and(page.getByTitle('Explore Cars')).click();
    // Expects page to have a heading with the name of Installation.
    // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    // const el = await page.getByRole('heading', { name: 'kia carnival' });
    // console.log(el)

    // await expect(page.getByTitle('Explore Cars')).toHaveText('Explore Cars');
    const button = page.getByText('Explore Cars');
    await expect(button).toBeVisible();

    if (button) {
        await button.click();
        console.log('Button clicked successfully');
    } else {
        console.log('Button not found');
    }
    // await expect(page.locator('h2')).toContainText('honda')

});

test('Honda text shown', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByText('honda')).toBeVisible();
})

test('Show more button clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('show more').click();
    await expect(page).toHaveURL('http://localhost:3000/?limit=20')
    await page.getByText('show more').click();
    await expect(page).toHaveURL('http://localhost:3000/?limit=30')
})


test('Manufacturer & Model Search', async ({ page }) => {
    await page.goto('http://localhost:3000/?limit=30&model=q5&manufacturer=audi');
    await page.locator('.search-manufacturer__input').fill('Audi');
    await page.locator('.searchbar__input').fill('Q5');
    // await page.locator('.object-contain').click();
    // await page.getByAltText('magnifying glass').click();
    // await page.getByTestId('searchbutton').first().click();
    await page.getByRole('button', { name: 'magnifying glass' }).first().click();
    // await page.locator('.car-card group').toHaveCount(5) ;
    // const count = await page.locator('.car-card group').count()
    // await page.getByTestId('searchResult').count();
    await expect.poll(async () => page.getByTestId('searchResult').count()).toBe(6);
    // await expect.poll(async () => page.locator('.car-card group').count()).toBe(5);
})

test('Car detail view more', async ({ page }) => {
    await page.goto('http://localhost:3000/?limit=30&model=q5&manufacturer=audi');
    await page.locator('.search-manufacturer__input').fill('Audi');
    await page.locator('.searchbar__input').fill('Q5');
    await page.getByRole('button', { name: 'magnifying glass' }).first().click();
    const locator = page.getByTestId('searchResult').first();
    await locator.hover();
    // await locator.click();
    // await page.hover('[alt="q5 s line quattro"]')
    // await page.waitForSelector('[data-testid="q5 s line quattro"]')
    // await page.locator('[data-testid="q5 s line quattro"]').first().click();
    await page.getByText('View More').first().click();
    await expect(page.getByText('2022')).toBeVisible();
})
