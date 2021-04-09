/* eslint-disable max-len */
/* eslint-disable no-undef */
import { promises as fs } from 'fs';
import * as util from '../src/index';

jest.setTimeout(30000);

const url = 'http://127.0.0.1:8085/index.html';
describe('tests', () => {
  it('expectConsoleLogs', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.expectConsoleLogs(
      [
        'log 1',
        'log 2',
        'log 3',
      ],
      page as any,
      30000,
      new Set([
        '[HMR] Waiting for update signal from WDS...',
        '[WDS] Hot Module Replacement enabled.',
        '[WDS] Live Reloading enabled.',
      ]),
    );
  });

  it('waitForConsoleLog', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog('log 5', page as any, 10000);
  });

  it('screenshot', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog('log 5', page as any, 10000);
    const buffer = await page.screenshot();
    await fs.writeFile('tests/screenshots/default-page.png', (buffer as unknown) as Buffer);
    const diff = await util.compareScreenshots(await fs.readFile('tests/screenshots_expected/correct-page.png'), (buffer as unknown) as Buffer);
    await expect(diff).toBeLessThan(50);
  });

  it('screenshot diff', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog('log 5', page as any, 10000);
    const buffer = await page.screenshot();
    await fs.writeFile('tests/screenshots/default-page.png', (buffer as unknown) as Buffer);
    const diff = await util.compareScreenshots(await fs.readFile('tests/screenshots_expected/incorrect-page.png'), (buffer as unknown) as Buffer);
    await expect(diff).toBe(15383);
  });
});
