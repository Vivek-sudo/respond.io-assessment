const Redis = require('ioredis');
const { promisify } = require('util');

// Create a new Redis client
const redisClient = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

// Handle Redis connection 
redisClient.on('ready', () => {
    console.error('Connected to Redis:');
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

// Promisify the Redis get and set methods
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

module.exports = {
    redisClient,
    redisGetAsync,
    redisSetAsync,
};
