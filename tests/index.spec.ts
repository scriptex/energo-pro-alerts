import { existsSync, promises } from 'node:fs';
import { resolve } from 'node:path';

import * as cheerio from 'cheerio';
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
		await page.selectOption('[name="type"]', 'all');

		const searchIcon = page.locator('.dripicons-search');

		await page.getByRole('button').filter({ has: searchIcon }).click();

		const table = await page.locator('.table-responsive');
		const html = await table.evaluate(el => el.innerHTML);
		const $ = cheerio.load(html);

		$('td:nth-child(3)').text(
			$('td:nth-child(3)')
				.text()
				.replace(/(ВАРНА).*/u, '$1')
		);

		$('th:nth-child(2)').remove();
		$('td:nth-child(2)').remove();

		results.push($.html());

		await page.locator('[href="/logout"]').click();
	}

	try {
		await email(results.join('<br><br>'));
	} catch (e) {
		const error = e as any;

		console.error('Email send failed:', error.message, error.response?.data || error.stack);
	}

	await writeFile(
		filename,
		minify(html(results.join('<br><br>')), {
			collapseWhitespace: true
		}),
		'utf-8'
	);
});
