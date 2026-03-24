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
server.get('/videos', (request, response) => {

    // request.body                         -> dados enviados
    // request.params                       -> parâmetros via URL
    //http://............?token=1234        -> request.query.token
    const search = request.query.search

    console.log('Search: ', search)
    
    const videos = database.list(search);

    return videos;
})


// inserir

// request  -> dados enviados
//          -> videos
//          -> credenciais     

server.post('/videos', (request, response) => {
    // const {title, description, duration} = request.body
    // console.log(body)

    const {title, description, duration, Mensagem_Verdadeira} = request.body

    database.create({
        title: title,
        description: description,
        duration: duration,
    })

    
    // mostrar os dados inseridos
    console.log(database.list())

    return response.status(201).send('Video criado com sucesso!')
})

// atualizar
server.put('/videos/:id', (request, response) => {

    const videoID = request.params.id   // via URL -> /videos/1234

    const {title, description, duration} = request.body  // via body -> JSON

    const video = database.update(videoID, {
        title: title,
        description: description,
        duration: duration,
    })

    return response.status(204).send('Video atualizado com sucesso!')

})

// remover
server.delete('/videos/:id', (request, response) => {
    const videoID = request.params.id

    database.delete(videoID)

    return response.status(204).send('Video removido com sucesso!')
})

// definir a porta
server.listen({
    port: 3000
})