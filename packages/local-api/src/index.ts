import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';
//serve
export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  //using router
  app.use(createCellsRouter(filename, dir));
  if (useProxy) {
    //adding a proxy
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    //finding index.html path
    const packagePath = require.resolve(
      '@web-code-cli/local-client/build/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }
  //wrapping express into a promise
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
