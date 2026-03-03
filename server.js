import { createServer } from 'node:http'

// // instanciar o servidor
// // request -> autenticação (login, senha)
// //         -> inserção vídeo
// //         -> update, delete, read 
// // response -> resposta que o 'cliente' espera

// const server = createServer((request, response) => {
//     response.write('Hello asdasdasd!')
//     console.log('Hello World!')
//     // finalizar a requisição
//     return  response.end()   
// } )

// // definir uma porta
// server.listen(3000)

// Modo NATIVO do NodeJS -> criar servidor de aplicação

// Framework       -> configurado 
// micro-framework -> mais livres para implementar da nossa maneira 

// Endpoints do nosso CRUD
// POST -> inserir vídeos
// PUT  -> update 
// GET  -> listar 
// DELETE -> remover

// npm install fastify | fastAPI | Lumen 
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

// instanciar o nosso servidor
const server = fastify()

const database = new DatabaseMemory()


// endpoint padrão (default)
server.get('/', () => {
    return 'Hello Fastify'
})
// listar
server.get('/videos', () => {
    return 'Hello Fastify'
})


// inserir

// request  -> dados enviados
//          -> videos
//          -> credenciais     

server.post('/videos', (request, response) => {

    const {title, description, duration} = request.body
    // console.log(body)

    database.create({
        title: title,
        description: description,
        duration: duration

    })

        database.create({
        title,
        description,
        duration

    })

    // mostrar os dados inseridos
    console.log(database.list())

    return response.status(201).send('Video criado com sucesso!')
})

// atualizar
server.put('/videos/:id', () => {
    return 'Hello UCDB'
})

// remover
server.delete('/videos/:id', () => {
    return 'Hello Segundou'
})

// definir a porta
server.listen({
    port: 3000
})