const { HealthCheckerTypes } = require('../constants');
const RedisHealthCheck = require('../adaptor/healthChecker/redis');
const MongoDbHealthCheck = require('../adaptor/healthChecker/mongodb');
const RabbitMqHealthCheck = require('../adaptor/healthChecker/rabbitMq');

const factory = {};

const adaptorMap = {
    [HealthCheckerTypes.Redis]    : RedisHealthCheck,
    [HealthCheckerTypes.MongoDb]  : MongoDbHealthCheck,
    [HealthCheckerTypes.RabbitMq] : RabbitMqHealthCheck,
};

factory.create = (name, options) => {
    const Model = adaptorMap[name];
    if (!Model) throw new Error(`Invalid model name ${name}`);
    const ob = new Model(options);
    return ob;
};

module.exports = factory;
