const importDir = require('directory-import');
const path = require('path');
const isObject = require('loadash/isObject');

const schemas = importDir('./schemas', 'sync');

const routesDir = './routes';
importDir(routesDir, 'sync', (routeName, routePath, routeMethod) => {
    const isModule = path.extname(routePath) == '.js';
    if (!isModule) {
        return console.warn(`file ${routePath} is not a route`);
    }
});