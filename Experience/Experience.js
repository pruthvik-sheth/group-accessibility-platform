import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

let instance = null

export default class Experience {

    constructor(canvas) {

        if (instance) {
            return instance
        }

        instance = this

        // Global Access
        // window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Listeners
        this.sizes.on('resize_occured', () => { this.resize() })
        this.time.on('tick', () => { this.update() })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize_occured')
        this.time.off('tick')

        // Traversing the entire scene
        this.scene.traverse(
            (child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()

                    for (const key in child.material) {
                        const value = child.material[key]

                        if (value && typeof value.dispose == 'function') {
                            value.dispose()
                        }
                    }
                }
            }
        )

        this.camera.controls.dispose()
        this.renderer.rendererInstance.dispose()
        instance = null
    }
}