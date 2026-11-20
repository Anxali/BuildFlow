import {test, expect} from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import fs from 'node:fs';

const secrets = JSON.parse(fs.readFileSync('./tests/secrets.json','utf-8'));

test('Login using valid creds', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('');
    await loginPage.enterEmail(secrets.validUser.email);
    await loginPage.enterPassword(secrets.validUser.password);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/workspaces/)
});

test('Login using invalid email', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('');
    await loginPage.enterEmail(secrets.invalidUser.email);
    await loginPage.enterPassword(secrets.invalidUser.password);
    await loginPage.clickLogin();

    await expect(dialog.type()).toContain("alert");
    await expect(dialog.message()).toContain("Invalid credentials");

});

test('Login using incorrect password', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('');
    await loginPage.enterEmail(secrets.validUser.email);
    await loginPage.enterPassword(secrets.invalidUser.password);
    await loginPage.clickLogin();

    await expect(dialog.type()).toContain("alert");
    await expect(dialog.message()).toContain("Invalid credentials");

});