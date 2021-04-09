# Test Utils
![Build](https://github.com/zappar-xr/test-utils/workflows/Build/badge.svg)


This library contains some handy functions which aid jest-puppeteer tests.


You can find some examples in action over at https://github.com/zappar-xr/test-utils/tree/master/tests

## Table Of Contents
<details>
<summary>Click to expand table of contents</summary>

<!--ts-->
   * [Test Utils](#test-utils)
      * [Table Of Contents](#table-of-contents)
      * [Starting Development](#starting-development)
         * [NPM](#npm)
      * [Usage](#usage)
         * [Expecting Console Logs](#expecting-console-logs)
         * [Waiting for console logs](#waiting-for-console-logs)
         * [Compare Screenshots](#compare-screenshots)

<!-- Added by: zapparadmin, at: Fri Apr  9 15:25:27 BST 2021 -->

<!--te-->
</details>

## Starting Development

You can use this library by installing from NPM for use in a jest-puppeteer project.

### NPM

Run the following NPM command inside your project directory:
```bash
$ npm install --save-dev @zappar/test-utils
```

Then import the library into your tests:
```ts
import * as util from '@zappar/test-utils';
```

## Usage

### Expecting Console Logs

`util.expectConsoleLogs` resolves once provided logs are detected before the timeout.


```ts
it('expectConsoleLogs', async () => {
  const page = await browser.newPage();
  page.goto(url);
  await util.expectConsoleLogs(
    [ // expected logs
      'log 1',
      'log 2',
      'log 3',
    ],
    page,
    30000, //timeout
    new Set([ // logs to ignore
      '[HMR] Waiting for update signal from WDS...',
      '[WDS] Hot Module Replacement enabled.',
      '[WDS] Live Reloading enabled.',
    ]),
  );
});
```
### Waiting for console logs

`util.waitForConsoleLog` takes a log to wait for, the page and a timeout.

```ts
 it('waitForConsoleLog', async () => {
    const page = await browser.newPage();
    page.goto(url);
    await util.waitForConsoleLog('log 5', page, 10000);
  });
```
### Compare Screenshots

`util.compareScreenshots` returns a promise containing the difference between two images.

```ts
const buffer = await page.screenshot();
await fs.writeFile('tests/screenshots/page.png', (buffer as unknown) as Buffer);
const diff = await util.compareScreenshots(await fs.readFile('tests/screenshots_expected/correct-page.png'), (buffer as unknown) as Buffer);
await expect(diff).toBeLessThan(50);
```


