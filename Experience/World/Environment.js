import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
    constructor() {

        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene

        // this.setSunLight()

    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(512, 512)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, -1.25)
        this.scene.add(this.sunLight)
    }
}