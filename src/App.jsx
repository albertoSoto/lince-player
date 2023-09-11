import React from 'react'
import LinceVideoPlayer from "./lib/components/LinceVideoPlayer";
import {UrlType} from "./lib";

const App = () => {
    return (
        <>
            <div>what a cool ts component</div>
            <LinceVideoPlayer url={"https://www.youtube.com/watch?v=F5GO6JwzfkY"} type={UrlType.YoutubeUrl} />
            <LinceVideoPlayer url={"/climbing.mp4"}  />
        </>
    )
}

export default App
