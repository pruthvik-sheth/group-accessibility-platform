import * as THREE from 'three'
import { gsap } from 'gsap'
import Experience from '../Experience'

export default class Earth {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.satelliteResource = this.experience.resources.items.satelliteModel
        // Mesh
        this.testMesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 64, 64),
            new THREE.MeshPhongMaterial({
                wireframe: true,
                emissive: '#ffffff',
                emissiveMap: this.resources.items.earthColorTexture,
                emissiveIntensity: 1.6
            })
        )
        this.testMesh.position.z = 5
        gsap.to(this.testMesh.position, {
            duration: 2,
            delay: 1.5,
            z: 0
        })

        this.scene.add(this.testMesh)

        this.pivotPoint = new THREE.Object3D()
        this.testMesh.add(this.pivotPoint)

        this.satelliteModel = this.satelliteResource.scene
        this.satelliteModel.scale.set(0.04, 0.04, 0.04)
        this.satelliteModel.position.set(1.5, 0, 0)

        this.satelliteModel.traverse(
            (child) => {
                if (child.isMesh) {
                    child.material.wireframe = true
                    child.material.emissive.set('cyan')
                }
            }
        )
        this.pivotPoint.add(this.satelliteModel)

        // this.smallMesh = new THREE.Mesh(
        //     new THREE.SphereBufferGeometry(0.1, 12, 12),
        //     new THREE.MeshStandardMaterial({
        //         wireframe: true,
        //         emissive: '#ffffff',
        //         emissiveIntensity: 2
        //     })
        // )
        // this.smallMesh.position.set(1.5, 0, 0)
        // this.pivotPoint.add(this.smallMesh)


        // this.scene.add(this.testMesh)

    }

    update() {
        this.testMesh.rotation.y = this.time.elapsed * 0.00005
        this.testMesh.rotation.x = this.time.elapsed * 0.00005
        this.testMesh.rotation.z = this.time.elapsed * 0.00005
        this.pivotPoint.rotation.y = this.time.elapsed * 0.0005
    }
}