const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./routes/user.js'))

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})