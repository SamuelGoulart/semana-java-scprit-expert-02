class View {
    constructor() {
        this.recorderBtn = document.getElementById("record")
        this.leaveBtn = document.getElementById("leave")
    }

    createVideoElement({ muted = true, src, srcObject }) {
        const video = document.createElement('video')
        video.muted = muted
        video.src = src
        video.srcObject = srcObject

        // src = A url de gravação de video chamada 
        if (src) {
            video.controls = true
            video.loop = true
            // Esperar 200 mile segundos para reproduzir o video
            Util.sleep(200).then(_ => video.play())
        }

        // srcObject = stream de dados da câmera
        if (srcObject) {
            // Quando ele conseguir ler os metadados da stream pode dar play
            video.addEventListener("loadedmetadata", _ => video.play())
        }

        return video
    }

    // renderizar vídeo
    renderVideo({ userId, stream = null, url = null, isCurrentId = false }) {
        const video = this.createVideoElement({
            muted: isCurrentId,
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

    setParticipants(count) {
        const myself = 1
        const participants = document.getElementById('participants')
        participants.innerHTML = (count + myself)
    }

    removeVideoElement(id) {
        const element = document.getElementById(id)
        element.remove()
    }

    toggleRecordingButtonColor(isActive = true) {
        this.recorderBtn.style.color = isActive ? 'red' : 'white'
    }

    onRecordClick (command) {
        this.recordingEnabled = false
        return () => {
            const isActive = this.recordingEnabled = !this.recordingEnabled

            command(this.recordingEnabled)
            this.toggleRecordingButtonColor(isActive)
        }
    }

    onLeaveClick(command) {
        
        return async () => {
            command()

            await Util.sleep(1000)
            window.location = '/pages/home'
        }
    }
  
    configureRecordButton(command) {
        this.recorderBtn.addEventListener('click', this.onRecordClick(command))
    }

    configureLeaveButton(command) {
        this.leaveBtn.addEventListener('click', this.onLeaveClick(command))
    }
} 