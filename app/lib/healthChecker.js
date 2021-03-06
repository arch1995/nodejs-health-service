const healthCheckFactory = require('../factory/healthCheckerFactory');
const helper = require('../helper/healthChecker');

function SimpleHealthCheck() {
    return { status: 'ok' };
}

async function DetailedHealthCheck(cfg) {
    const config = cfg || helper.loadConfig();
    const integrations = await Promise.all(
        (config.integrations || []).map(async (item) => {
            const ob = healthCheckFactory.create(item.type, item);
            await ob.check();
            return ob.getResponse();
        }),
    );

    return {
        name   : config.name || '',
        status : !integrations.some(({ status }) => status === false),
        integrations,
    };
}

module.exports = {
    SimpleHealthCheck,
    DetailedHealthCheck,
};
