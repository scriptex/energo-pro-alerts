import { existsSync, promises } from 'node:fs';
import { resolve } from 'node:path';

import { minify } from 'html-minifier';
import { test } from '@playwright/test';

import { html } from '../lib/html';
import { email } from '../lib/email';

const { writeFile, unlink } = promises;

const filename = resolve(__dirname, '..', 'public', 'index.html');

test('find alerts', async ({ page }) => {
	if (existsSync(filename)) {
		await unlink(filename);
	}

	await page.goto('https://tok.erpsever.bg/');

	await page.locator('[data-customer-type="personal"]').click();
	await page.locator('[name="username"]').fill(process.env.USERNAME || '');
	await page.locator('[name="pin"]').fill(process.env.PASSWORD || '');
	await page.locator('[type="submit"]').click();

	const table = page.locator('.table-responsive');
	const results = await table.innerHTML();

	if (!results.includes('Няма прекъсвания за обекти на клиента')) {
		await email(results);
	}

	await writeFile(
		filename,
		minify(html(results), {
			collapseWhitespace: true
		}),
		'utf-8'
	);
});
