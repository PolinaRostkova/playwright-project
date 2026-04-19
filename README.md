# Playwright TypeScript Automation Framework

A clean, ready-to-use framework for UI, API, and Database test automation with Playwright and TypeScript.

---

## Project Structure

```
pw-framework/
│
├── playwright.config.ts        ← Main config (browsers, timeouts, reporters)
├── package.json                ← All dependencies
├── tsconfig.json               ← TypeScript config
│
├── config/
│   ├── .env.example            ← Template — copy this to get started
│   ├── .env.local              ← Your local settings (not in Git)
│   └── .env.staging            ← Staging settings (not in Git)
│
├── tests/
│   ├── e2e/                    ← Full UI tests
│   ├── api/                    ← API-only tests (no browser)
│   └── integration/            ← UI + Database tests
│
├── pages/                      ← Page Object classes
│   ├── base.page.ts            ← Shared base class for all pages
│   ├── login.page.ts           ← Login page (add your locators here)
│   └── dashboard.page.ts       ← Dashboard page (add your locators here)
│
├── fixtures/
│   ├── index.ts                ← Custom fixtures — always import test from here
│   └── auth.setup.ts           ← Login once, reuse session for all tests
│
├── helpers/
│   ├── db.client.ts            ← Database helper (activate when DB is ready)
│   └── api.client.ts           ← API helper for direct API calls
│
├── data/
│   ├── users.ts                ← Test user data
│   ├── factories/              ← Test data factories (add your own)
│   └── schemas/                ← JSON schemas for API response validation
│
└── utils/
    ├── wait.utils.ts           ← Retry and wait helpers
    └── string.utils.ts         ← String helpers
```

---

## Setup — Step by Step

### Step 1 — Install dependencies

```bash
yarn install
```

### Step 2 — Install browsers

```bash
yarn playwright install
```

### Step 3 — Create your environment file

```bash
cp config/.env.example config/.env.local
```

Open `config/.env.local` and fill in:
- `BASE_URL` — the URL of the app you are testing
- `USER_EMAIL` and `USER_PASSWORD` — login credentials
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` — admin credentials

### Step 4 — Add your locators

Open `pages/login.page.ts` and `pages/dashboard.page.ts`.
Follow the TODO comments to add locators for your app.

---

## Running Tests

```bash
# Run all tests
yarn test

# Run only smoke tests
yarn test:smoke

# Run only regression tests
yarn test:regression

# See the browser while tests run
yarn test:headed

# Interactive UI mode — great for writing new tests
yarn test:ui

# Debug one test step by step
yarn test:debug

# Open the HTML report after tests finish
yarn test:report

# Run only on Chrome
yarn test:chromium

# Run only on Firefox
yarn test:firefox

# Run against staging environment
yarn test:staging
```

---

## Important Rules

| Rule | Why |
|------|-----|
| Always import `test` and `expect` from `fixtures/index.ts` | So your custom fixtures are available |
| Never write SQL inside test files | Use methods from `helpers/db.client.ts` |
| Never hardcode URLs or passwords | Always use `process.env.YOUR_VARIABLE` |
| Never commit `.env.local` or `.env.staging` | They contain passwords — already in `.gitignore` |
| Use `getByRole` and `getByLabel` first | More stable than CSS or XPath selectors |

---

## Activating Optional Features

### Login session reuse (faster tests)
1. Fill in the locators in `fixtures/auth.setup.ts`
2. In `playwright.config.ts` — uncomment the `setup:auth` project
3. In `playwright.config.ts` — uncomment `storageState` in the chromium project

### Database testing
1. Fill in DB credentials in `config/.env.local`
2. Uncomment the pool code in `helpers/db.client.ts`
3. Uncomment the `dbClient` fixture in `fixtures/index.ts`

### Allure reports
1. In `playwright.config.ts` — uncomment the allure reporter line
2. After running tests: `npx allure generate allure-results --clean -o allure-report`
3. Open report: `npx allure open allure-report`

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Test runner and browser automation |
| `typescript` | TypeScript language support |
| `@types/node` | Node.js type definitions (fixes process.env errors) |
| `dotenv` | Loads `.env` files into `process.env` |
| `pg` | PostgreSQL database client |
| `@types/pg` | TypeScript types for pg |
| `allure-playwright` | Allure report integration |
| `allure-commandline` | Generate Allure HTML reports |
