class PeerBuilder {
    constructor({ peerConfig }) {
        this.peerConfig = peerConfig

        const defaultFunctionValue = () => {}
        this.onError = defaultFunctionValue
        this.onCallReceived = defaultFunctionValue
        this.onConnectionOpened = defaultFunctionValue
        this.onPeerStreamReceived = defaultFunctionValue
        this.onCallError = defaultFunctionValue
        this.onCallClose = defaultFunctionValue
    }

    setOnCallError(fn) {
        this.onCallError = fn
        return this
    }

    setOnCallClose(fn) {
        this.onCallClose = fn
        return this
    }

    setOnError(fn) {
        this.onError = fn
        return this
    }

    setOnCallReceived(fn) {
        this.onCallReceived = fn
        return this
    }

    setOnConnectionOpened(fn) {
        this.onConnectionOpened = fn
        return this
    }

    setOnPeerStreamReceived(fn) {
        this.onPeerStreamReceived = fn
        return this
    }

    _prepareCallEvent(call) {
        console.log('call', call)
        call.on('stream', stream => this.onPeerStreamReceived(call, stream))
        call.on('error', error => this.onCallError(call, error))
        call.on('close', _ => this.onCallClose(call))

        this.onCallReceived(call)
    }

    // Adicionar o comportamento dos eventos de call também para quem ligar!
    _preparePeerInstanceFunction(peerModule) {
         class PeerCustomModule extends peerModule {}

         const peerCall = PeerC
    }

    build() {
        const PeerCustomInstance = this._preparePeerInstanceFunction(Peer)
        const peer = new Peer(...this.peerConfig)

        peer.on('error', this.onError)
        peer.on('call', this._prepareCallEvent.bind(this))

        return new Promise(resolve => peer.on('open', id => {
            this.onConnectionOpened(peer)
            return resolve(peer)
        }))
    }
}