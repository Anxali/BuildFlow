import {test, expect} from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import fs from 'node:fs';
import path from 'node:path';

const secrets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../secrets.json'), 'utf-8'));

test('Login using valid creds', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('http://localhost:5173/login');
    await loginPage.enterEmail(secrets.validUser.email);
    await loginPage.enterPassword(secrets.validUser.password);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/workspaces/)
});

test('Login using invalid email', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('http://localhost:5173/login');
    await loginPage.enterEmail(secrets.invalidUser.email);
    await loginPage.enterPassword(secrets.invalidUser.password);
    await loginPage.clickLogin();

    page.on('dialog', async dialog=>{
        console.log(dialog.type());
        console.log(dialog.message());

        expect(dialog.message()).toBe('Invalid credentials');
        await dialog.accept();
    })

});

test('Login using incorrect password', async({page})=>{
    const loginPage = new LoginPage(page);

    await page.goto('http://localhost:5173/login');
    await loginPage.enterEmail(secrets.validUser.email);
    await loginPage.enterPassword(secrets.invalidUser.password);
    await loginPage.clickLogin();

    page.on('dialog', async dialog=>{
        console.log(dialog.type());
        console.log(dialog.message());

        expect(dialog.message()).toBe('Invalid credentials');
        await dialog.accept();
    })

});