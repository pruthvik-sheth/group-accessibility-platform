import React, { useEffect } from "react"
import Experience from '../../Experience/Experience.js'

const Backgroud3d = () => {

    useEffect(() => {
        const experience = new Experience(document.querySelector('.webgl'))

        return () => {
            experience.destroy()
        }
    })

    return (
        <canvas className="webgl"></canvas>
    )
}

export default Backgroud3d;