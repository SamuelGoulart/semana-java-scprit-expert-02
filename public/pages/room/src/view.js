class View {
    constructor(){}

    createVideoElement({ muted = true, src, srcObject }) {
        const video = document.createElement('video')
        video.muted = muted
        video.src = src
        video.srcObject = srcObject

        // src = A url de gravação de video chamada 
        if(src) {
            video.controls = true
            video.loop = true
            // Esperar 200 mile segundos para reproduzir o video
            Util.sleep(200).then(_ => video.play())
        }

        // srcObject = stream de dados da câmera
        if(srcObject) {
             // Quando ele conseguir ler os metadados da stream pode dar play
            video.addEventListener("loadedmetadata", _ => video.play())
        }

        return video
    }

    // renderizar vídeo
    renderVideo({ userId, stream = null, url = null, isCurrentId = false, muted = true }) {
        const video = this.createVideoElement({
            muted, 
            src: url, 
            srcObject: stream 
        })

        this.appendToHTMLTree(userId, video, isCurrentId)
    }

    // anexar à árvore HTML
    appendToHTMLTree(userId, video, isCurrentId) {
        const div = document.createElement('div')
        div.id = userId
        div.classList.add('wrapper')
        div.append(video)

        const div2 = document.createElement('div')
        div2.innerText = isCurrentId ? '' : userId
        div.append(div2)

        const videoGrid = document.getElementById('video-grid')
        videoGrid.append(div)
    }
} 