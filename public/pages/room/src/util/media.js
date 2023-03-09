class Media {
    async getCamera(audio = false, video = true) {
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                `Browser API navigator.mediaDevices.getUserMedia not available`
            )
        }

        const videoConfig = {
            audio,
            video: {
                video,
                with: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 60
                }
            }
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(videoConfig)

        return stream;
    }
}