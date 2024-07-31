import { test, expect } from '@playwright/test'

test.describe('AppBar buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should should have auth buttons', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible()
  })

  test('shoud navigate to auth pages', async ({ page }) => {
    await page.click('text=Sign in')
    await expect(page).toHaveURL(/\/sign-in/)
    await page.click('text=Create account')
    await expect(page).toHaveURL(/\/sign-up/)
  })

  test('shoud be replaced by profile button after sign in', async ({ page }) => {
    await page.getByRole('button', { name: 'sign in' }).click()
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
    await expect(page.getByLabel('Your profile')).toBeVisible()
  })

  test('shoud navigate to profile page', async ({ page }) => {
    await page.getByRole('button', { name: 'sign in' }).click()
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Sign in', exact: true }).click()
    await page.click('text=Your profile')
    await expect(page).toHaveURL(/\/profile/)
  })

  test('shoud navigate to home page', async ({ page }) => {
    await page.getByRole('button', { name: 'sign in' }).click()
    await page.getByTestId('LogoBaner').click()
    await expect(page).toHaveURL(/\/main/)
  })
})
