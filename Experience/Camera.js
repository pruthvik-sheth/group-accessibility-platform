import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience.js"


export default class Camera {

    constructor() {

        //Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setCameraInstance()
        this.setOrbitalControls()
    }

    setCameraInstance() {

        this.cameraInstance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.cameraInstance.position.set(0, 0, 5)
        this.scene.add(this.cameraInstance)
    }

    setOrbitalControls() {
        this.controls = new OrbitControls(this.cameraInstance, this.canvas)
        this.controls.enableZoom = false
        this.controls.enableDamping = true
    }

    resize() {
        this.cameraInstance.aspect = this.sizes.width / this.sizes.height
        this.cameraInstance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}