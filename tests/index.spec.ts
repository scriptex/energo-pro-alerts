import { existsSync, promises } from 'node:fs';
import { resolve } from 'node:path';

import * as cheerio from 'cheerio';
import { minify } from 'html-minifier';
import { test } from '@playwright/test';

import { html } from '../lib/html';
import { email } from '../lib/email';
import { EmailError } from '../lib/types';

const { writeFile, unlink } = promises;

const filename = resolve(__dirname, '..', 'public', 'index.html');

// prettier-ignore
const write = async (filename: string, text: string) => await writeFile(filename, minify(html(text), { collapseWhitespace: true }), 'utf-8');

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

		await page.goto('https://tok.erpsever.bg/outages?cpnum=&type=all');

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

		if (!html.includes('За обекта няма прекъсване на електрозахранването')) {
			results.push($.html());
		}

		await page.locator('[href="/logout"]').click();
	}

	if (results.length === 0) {
		await write(filename, '<p>Няма данни за прекъсване на електрозахранването.</p>');

		return;
	}

	const text = results.join('<br><br>');

	try {
		await email(text);
	} catch (e: unknown) {
		const error = e as EmailError;

		console.error('Email send failed:', error.message, error.response?.data || error.stack);
	}

	await writeFile(filename, text);
});
