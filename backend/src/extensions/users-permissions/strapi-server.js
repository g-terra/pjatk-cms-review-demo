module.exports = (plugin) => {

    const oldRegister = plugin.routes['content-api'].routes.filter(route => route.path === '/auth/local/register').pop();
    oldRegister.config.middlewares.push('global::verifyCaptcha')

    plugin.routes['content-api'].routes = plugin.routes['content-api'].routes.filter(route => route.path !== '/auth/local/register');

    plugin.routes['content-api'].routes.push(
        oldRegister
    );

    return plugin;
};