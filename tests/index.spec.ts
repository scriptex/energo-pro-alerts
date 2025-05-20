import { existsSync, promises } from 'node:fs';
import { resolve } from 'node:path';

import { minify } from 'html-minifier';
import { test } from '@playwright/test';

import { html } from '../lib/html';
import { email } from '../lib/email';

const { writeFile, unlink } = promises;

const filename = resolve(__dirname, '..', 'public', 'index.html');

test('find alerts', async ({ page }) => {
	const credentials = JSON.parse(process.env.CREDENTIALS || '[]');

	if (!credentials || !Array.isArray(credentials)) {
		return;
	}

	const results: string[] = [];

	if (existsSync(filename)) {
		await unlink(filename);
	}

	for (const credential of credentials) {
		if (!Array.isArray(credential) || credential.length !== 2) {
			continue;
		}

		const [username, password] = credential;

		await page.goto('https://tok.erpsever.bg/');

		await page.locator('[data-customer-type="personal"]').click();
		await page.locator('[name="username"]').fill(username.toString());
		await page.locator('[name="pin"]').fill(password.toString());
		await page.locator('[type="submit"]').click();

		const table = page.locator('.table-responsive');

		results.push(await table.innerHTML());

		await page.locator('[href="/logout"]').click();
	}

	const messages = results.filter(item => !item.includes('Няма прекъсвания за обекти на клиента'));

	if (messages.length > 0) {
		await email(messages.join('<br><br>'));
	}

	await writeFile(
		filename,
		minify(html(results.join('<br><br>')), {
			collapseWhitespace: true
		}),
		'utf-8'
	);
});
