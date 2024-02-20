// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.write('hello world teste')
//     return res.end()
// })

// server.listen(3333)


import { fastify } from 'fastify'

const server = fastify()

server.get('/', () => {
    return 'Hello World'
})

server.get('/hello', () => {
    return 'Hello'
})

server.get('/node', () => {
    return 'Hello node'
})

server.listen({
    port: 3333
})