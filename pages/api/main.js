const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://bbvkyfiioynfhu:d8cecdbf914e2c83243079911d844f1a1a5b1a44ec7ccab801c4b9e1ecc589c8@ec2-54-247-118-139.eu-west-1.compute.amazonaws.com:5432/d2lfrklo6dv0rm',
    ssl: {
        rejectUnauthorized: false
    }
});
//console.log(process.env.DATABASE_URL);
client.connect();

const fastify = require('fastify')({logger: true});
fastify.route({
    method: 'GET',
    url: '/api',
    schema: {
        // request needs to have a querystring with a `name` parameter
        querystring: {
            name: { type: 'string' }
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    },
    preHandler: async (request, reply) => {
        fastify.log.info('prehendler message');
    },
    handler: async (request, reply) => {
        return { hello: 'world' }
    }

});

fastify.get('/', async (request, reply) => {
    return { route: 'basic' }
})

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, function (err) {
            if (err) throw err
            console.log(`server listening on ${fastify.server.address().port}`)
        })
        fastify.log.info(`server listening on main.js`);
    } catch (e) {
        fastify.log.error(e)
        process.exit(1)
    }
}
start();