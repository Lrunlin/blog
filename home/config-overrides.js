const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const {
    override,
    addWebpackAlias
} = require('customize-cra')
const path = require('path');

module.exports = (config, env) => {
    if (env === 'production') {
        config.plugins = config.plugins.concat([
            new PrerenderSPAPlugin({
                routes: ['/'],
                staticDir: path.join(__dirname, 'build'),
            }),
        ]);
    }

    return config;
};
module.exports = override(addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
}))