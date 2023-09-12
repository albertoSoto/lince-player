import {useRef, useState} from 'react';
import LinceVideoPlayer from "./lib/components/LinceVideoPlayer";
import {UrlType} from "./lib/interfaces/UrlType.ts";
import {KeyboardShortcuts} from "./lib/interfaces/KeyboardShortcuts";
import CallbackComponent from "./lib/components/base/CallbackComponent.tsx";
import ChildForwardedComponent from "./lib/components/base/ChildForwardedComponent.tsx";
import InOutComponent from "./lib/components/base/In&OutComponent.tsx";

const App = () => {
    const [parentValue, setParentValue] = useState('Initial value');
    const youtubeVideo = useRef(null);
    const staticVideo = useRef(null);
    const childComp = useRef(null);
    const inOutComp = useRef(null);
    const executeVideoAction = (event: KeyboardShortcuts) => {
        console.log(event.valueOf())
    }
    const executeComponentAction = (event: string) => {
        setParentValue(event)
    }
    const executeChildAction = () => {
        // @ts-ignore
        childComp.current.sayHi("toma");
        // @ts-ignore
        inOutComp.current.modifyValue("Another toma")
    }

    const onClickAction = (value: string) =>{
        alert(value);
    }
    // const getPlaytime = () => {
    //     return `Youtube time: ${youtubeVideo.current.getCurrentTime()}| Static time: ${staticVideo.current.getCurrentTime()}`;
    // }
    // const playTime = getPlaytime();
    const playTime = "yuhu";
    return (
        <div>
            <div className={"row"}>
                <div className={"column"}>
                    <div>what a cool ts component ({parentValue}): {playTime} </div>
                    <CallbackComponent name={"Callback click"} onExportMethod={executeComponentAction}/>
                    <button onClick={executeChildAction}>Click to change Forwarded component</button>
                </div>
                <div className={"column"}>
                    <ChildForwardedComponent ref={childComp} name={"Forwarded component"}/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"column"}>
                    <InOutComponent ref={inOutComp} name={"Mixed approach"} onButtonDown={onClickAction}/>
                </div>
                <div className={"column"}>
                    <button onClick={executeChildAction}>Click to change Forwarded component</button>
                </div>
            </div>
            <div className={"row"}>
                <div className={"column"}>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.PLAY)
                    }}>Play
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.PAUSE)
                    }}>Pause
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.JUMP_BACK)
                    }}>Mute
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.JUMP_FORWARD)
                    }}>Mute
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.SPEED_NORMAL)
                    }}>Mute
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.SPEED_SLOW)
                    }}>0.5 Speed
                    </button>
                </div>
            </div>
            <div className={"row"}>
                <div className={"column"}>
                    <LinceVideoPlayer ref={youtubeVideo} url={"https://www.youtube.com/watch?v=F5GO6JwzfkY"}
                                      type={UrlType.YoutubeUrl}/>
                </div>
                <div className={"column"}>
                    <LinceVideoPlayer ref={staticVideo} url={"/climbing.mp4"}/>
                </div>
            </div>
        </div>
    )
}

export default App
