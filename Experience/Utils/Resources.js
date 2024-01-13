import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {

    constructor(sources) {

        super()

        //Options
        this.sources = sources

        //Setup
        this.items = {}
        this.toLoadCounter = this.sources.length
        this.loadedCounter = 0

        this.setLoaders()
        this.startLoading()


    }

    setLoaders() {

        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader()
        }
    }

    startLoading() {
        //Loading each source

        for (const source of this.sources) {

            if (source.type == 'gltfModel') {
                this.getLoaderAndLoad('gltfLoader', source)
            }
            else if (source.type == 'texture') {
                this.getLoaderAndLoad('textureLoader', source)
            }
        }
    }

    getLoaderAndLoad(loaderName, source) {

        this.loaders[loaderName].load(
            source.path,
            (loadedAsset) => {
                this.sourceLoaded(source, loadedAsset)
            }
        )
    }

    sourceLoaded(source, loadedAsset) {
        this.items[source.name] = loadedAsset
        this.loadedCounter++

        if (this.loadedCounter == this.toLoadCounter) {
            this.trigger('resources_ready')
        }
    }
}