"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
const express = require("express");
const path_1 = require("path");
const express_engine_1 = require("@nguniversal/express-engine");
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main`);
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const core_1 = require("@angular/core");
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path_1.join(process.cwd(), 'dist');
core_1.enableProdMode();
app.engine('html', (_, options, callback) => {
    const engine = express_engine_1.ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP),
            { provide: 'request', useFactory: () => options.req, deps: [] }]
    });
    engine(_, options, callback);
});
app.set('view engine', 'html');
app.set('views', path_1.join(DIST_FOLDER, 'browser'));
const beforeRender = (req, _res, next) => {
    req.asiNgtools = {
        language: req.headers['accept-language']
    };
    next();
};
app.use('/views', express.static(path_1.join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));
app.get('/views/*', beforeRender, (req, res) => {
    console.log('Start render ' + new Date());
    res.render(path_1.join(DIST_FOLDER, 'browser', 'index.html'), { req, res }, (_err, html) => {
        console.log('End render ' + new Date());
        res.send(html);
    });
});
app.use(function (err, _req, _res, _next) {
    console.log('Error while rendering ' + err);
});
app.get('*', function (_req, res) {
    res.redirect('/views');
});
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
