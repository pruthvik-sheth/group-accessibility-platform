import React from 'react'

const VideoConf = () => {
    const startVCListener = () => {
        alert('Coming Soon...')
    }

    return (
        <div className='video'>
            <div className='section-sub-title boldy'>Video Conference</div>
            <button className='button-general' onClick={startVCListener}>Instant Meeting</button>
        </div>
    )
}

export default VideoConf