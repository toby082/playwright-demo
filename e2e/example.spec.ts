import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    testInfo.setTimeout(testInfo.timeout + 30000);
    await page.goto('http://localhost:3000/')
});

test.afterEach(async ({ page }, testInfo) => {
    console.log('test finished');
});

test('Has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Car Hub/);
});

test('Get started link', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const button = page.getByText('Explore Cars');
    await expect(button).toBeVisible();

    if (button) {
        await button.click();
        console.log('Button clicked successfully');
    } else {
        console.log('Button not found');
    }
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
    await page.getByRole('button', { name: 'magnifying glass' }).first().click();
    await expect.poll(async () => page.getByTestId('searchResult').count()).toBe(6);
})

test('Car detail view more', async ({ page }) => {
    await page.goto('http://localhost:3000/?limit=30&model=q5&manufacturer=audi');
    await page.locator('.search-manufacturer__input').fill('Audi');
    await page.locator('.searchbar__input').fill('Q5');
    await page.getByRole('button', { name: 'magnifying glass' }).first().click();
    const locator = page.getByTestId('searchResult').first();
    await locator.hover();
    await page.getByText('View More').first().click();
    await expect(page.getByText('2022')).toBeVisible();
})
