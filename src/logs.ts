import { Page } from 'puppeteer';

// eslint-disable-next-line max-len
export const expectConsoleLogs = (logs: (string | RegExp)[], page: Page, timeoutMs: number, ignore?: Set<string>): Promise<void> => new Promise((resolve, reject) => {
  let currentIndex = 0;
  const timeout = setTimeout(() => {
    page.off('console', compare);
    reject(new Error('Timeout waiting for console logs'));
  }, timeoutMs);
  function compare(evt: any) {
    if (ignore && ignore.has(evt.text())) return;
    const expected = logs[currentIndex];
    let passes = false;
    if (typeof expected === 'string' && evt.text() === expected) passes = true;
    else if (typeof expected !== 'string' && expected.test(evt.text())) passes = true;

    if (!passes) {
      page.off('console', compare);
      clearTimeout(timeout);
      reject(new Error(`Non-matching console log "${evt.text()}" !== "${logs[currentIndex]}"`));
    } else {
      currentIndex += 1;
      if (currentIndex >= logs.length) {
        clearTimeout(timeout);
        page.off('console', compare);
        resolve();
      }
    }
  }
  page.on('console', compare);
});

export const waitForConsoleLog = async (log: string, page: Page, timeoutMs: number): Promise<void> => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    page.off('console', compare);
    reject(new Error('Timeout waiting for console logs'));
  }, timeoutMs);
  function compare(evt: any) {
    if (evt.text() === log) {
      page.off('console', compare);
      clearTimeout(timeout);
      resolve();
    }
  }
  page.on('console', compare);
});
