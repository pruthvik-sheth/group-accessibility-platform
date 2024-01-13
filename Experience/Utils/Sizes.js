import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter {

    constructor() {
        super()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 3)


        window.addEventListener(
            'resize',
            () => {
                this.width = window.innerWidth
                this.height = window.innerHeight
                this.pixelRatio = Math.min(window.devicePixelRatio, 3)

                this.trigger('resize_occured')
            }
        )
    }
}