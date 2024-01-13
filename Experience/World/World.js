import Experience from "../Experience";
import Earth from './Earth';
import Environment from './Environment';
import Particles from "./Particles";


export default class World {
    constructor() {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on(
            'resources_ready',
            () => {
                //Setting things up
                this.particles = new Particles()
                this.earth = new Earth()
                this.environment = new Environment()

            }
        )
    }

    update() {

        if (this.earth) {
            this.earth.update()
        }

        if (this.particles) {
            this.particles.update()
        }

    }
}