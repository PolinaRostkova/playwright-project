import { test, expect } from '@playwright/test'
import { LoginPage } from '../../../pages/login.page'
import { HomePage } from '../../../pages/home.page'

test.describe('Login', () => {
  test.describe.configure({ mode: 'serial' })
  test.setTimeout(0)
  let loginPage: LoginPage

  test.beforeEach('Navigate to the page and login', async ({ page }) => {
    loginPage = await LoginPage.goto(page)
    await loginPage.login(process.env.EMPLOYEE_EMAIL || '', process.env.SHARED_PASSWORD || '')
  })


  test('navigate to Clients after login', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo('Clients')
    await expect(page).toHaveURL(/\/clients/)
    //await page.pause()
  })

  test('log out after login', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.openUserMenu()
    //await page.pause()
    await homePage.logOut()
    await expect(page).toHaveURL(/\/login/)
  })
})
