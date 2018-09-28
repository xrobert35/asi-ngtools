// GitHub source: server.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import { join } from 'path';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';


// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main`);
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

import { enableProdMode } from '@angular/core';

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', (_: any, options: any, callback: any) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP),
    { provide: 'request', useFactory: () => options.req, deps: [] }]
  });
  engine(_, options, callback);
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

const beforeRender = (req: any, _res: any, next: any) => {
  req.asiNgtools = {
    language: req.headers['accept-language']
  };
  next();
};

// Server static files from /browser
app.use('/views', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

app.get('/views/*', beforeRender, (req: any, res: any) => {
  console.log('Start render ' + new Date());
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res }, (_err: any, html: any) => {
    console.log('End render ' + new Date());
    res.send(html);
  });
});

// error middleware
app.use(function (err: any, _req: any, _res: any, _next: any) {
  console.log('Error while rendering ' + err);
});

app.get('*', function (_req: any, res: any) {
  res.redirect('/views');
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

