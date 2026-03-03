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

    list() {
        return this.#videos.values()
    }
    
    delete(id) {
        this.#videos.delete(id)
    }
}