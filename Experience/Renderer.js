import * as THREE from 'three'
import Experience from "./Experience";

export default class Renderer {

    constructor() {

        //Setup 
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setRendererInstance()

    }

    setRendererInstance() {
        this.rendererInstance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
        this.rendererInstance.setPixelRatio(this.sizes.pixelRatio)
        this.rendererInstance.physicallyCorrectLights = true
        this.rendererInstance.outputEncoding = THREE.sRGBEncoding
        this.rendererInstance.toneMapping = THREE.ACESFilmicToneMapping
        this.rendererInstance.toneMappingExposure = 1.75
        this.rendererInstance.shadowMap.enabled = true
        this.rendererInstance.shadowMap.type = THREE.PCFSoftShadowMap
        this.rendererInstance.setClearColor('#1D2025')
    }

    resize() {
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
        this.rendererInstance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {

        // this.camera.cameraInstance.position.z = 4
        this.rendererInstance.render(this.scene, this.camera.cameraInstance)
    }
}