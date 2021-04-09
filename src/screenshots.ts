import { PNG } from 'pngjs';

const pixelmatch = require('pixelmatch');

const compareScreenshots = async (expected: Buffer, found: Buffer): Promise<number> => {
  const adecoded = PNG.sync.read(expected);
  const bdecoded = PNG.sync.read(found);
  if (adecoded.width !== bdecoded.width || adecoded.height !== bdecoded.height) throw new Error('Screenshot dimensions mismatch');
  const res = pixelmatch(adecoded.data, bdecoded.data, null, adecoded.width, adecoded.height);
  return res;
};

export default compareScreenshots;
