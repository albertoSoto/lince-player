import React from 'react'
import HelloWorldTS from "./lib/components/HelloWorldTS";
import LinceVideoPlayer from "./lib/components/LinceVideoPlayer";

const App = () => {
    return (
        <>
            <HelloWorldTS title={"what a cool ts component"} ></HelloWorldTS>
            <LinceVideoPlayer url={"/climbing.mp4"}  />
        </>
    )
}

export default App
