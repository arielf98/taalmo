import { expect, test } from '@playwright/test';

test('learn, break, fix, quiz, and retain progress', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Start learning', exact: true }).first().click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('link', { name: 'Explore path' }).click();
  await page.getByRole('link', { name: /Duplicate Payment Callback/ }).click();
  await page.getByRole('button', { name: 'A unique key checked inside the same transaction' }).click();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Checkpoint complete')).toBeVisible();
  await page.getByRole('link', { name: 'Launch sandbox' }).first().click();
  await page.getByRole('button', { name: 'Run simulation', exact: true }).click();
  await expect(page.getByText('Duplicate payment detected')).toBeVisible();
  await expect(page.getByTestId('ledger-count')).toHaveText('2');
  await page.getByRole('button', { name: 'Idempotent', exact: true }).click();
  await page.getByRole('button', { name: 'Run simulation', exact: true }).click();
  await expect(page.getByText('One payment. One effect.')).toBeVisible();
  await expect(page.getByTestId('ledger-count')).toHaveText('1');
  await expect(page.getByTestId('outbox-count')).toHaveText('1');
  await page.getByRole('button', { name: 'The unique key and both writes commit together' }).click();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Lab complete')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Lab complete')).toBeVisible();
  await page.goto('/dashboard');
  await expect(page.getByText('Payment lab completed')).toBeVisible();
});

test('step, inspect history, reset, replay and recover from failure', async ({ page }) => {
  await page.goto('/sandbox/duplicate-payment');
  await page.getByRole('button', { name: 'Step forward' }).click();
  await expect(page.getByText('1 / 10 events')).toBeVisible();
  await page.getByRole('button', { name: 'Reset experiment' }).click();
  await expect(page.getByText('0 / 10 events')).toBeVisible();
  await page.getByRole('button', { name: 'Idempotent', exact: true }).click();
  await page.getByLabel('Fail callback A before commit').check();
  await page.getByRole('button', { name: 'Run simulation', exact: true }).click();
  await expect(page.getByText('One payment. One effect.')).toBeVisible();
  await page.getByRole('button', { name: 'Replay execution' }).click();
  await expect(page.getByText('One payment. One effect.')).toBeVisible();
});

test('mobile navigation, theme, and introductory lesson state', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button', {name:'Toggle theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.getByRole('link', {name:'Learn',exact:true}).click();
  await page.getByRole('link', {name:'Explore path'}).click();
  await page.getByRole('link', {name:/Lost Update/}).click();
  await expect(page.getByText('Interactive lab coming next')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
