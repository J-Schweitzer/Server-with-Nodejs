import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #videos = new Map()

    create(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    list(search) {

        return Array.from(this.#videos.entries()).map((videoArray) => {

            console.log('Video Array [0]: ', videoArray[0])
            console.log('Video Array [1]: ', videoArray[1])

            const id = videoArray[0]        // Pegar o ID do vídeo
            const data = videoArray[1]      // Pegar os dados do vídeo

            return  {
                id: id,
                title: "#" + data.title,
                description: data.description,
                duration: data.duration
            }
        }).filter((video) => {              // Filtrar os vídeos com base na busca (search)
            if (search) {                   // Se houver um termo de busca (search), filtrar os vídeos
                return video.title.includes(search)
            }

            return video
        })
    }
    
    delete(id) {
        this.#videos.delete(id)
    }
}