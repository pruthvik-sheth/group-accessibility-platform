import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Particles {

    constructor() {
        //Setup
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.generateParticles()
    }

    generateParticles() {

        this.count = 5000
        this.particleGeometry = new THREE.BufferGeometry()

        this.positions = new Float32Array(this.count * 3)

        for (let i = 0; i < this.count * 3; i++) {

            this.positions[i] = (Math.random() - 0.5) * 50
        }

        this.particleGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positions, 3)
        )

        this.particleMaterial = new THREE.PointsMaterial({
            size: 0.3,
            map: this.resources.items.starColorTexture,
            color: '#4c4292',
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial)

        this.scene.add(this.particles)

    }

    update() {

        this.particles.rotation.y = this.time.elapsed * 0.000015
    }
}