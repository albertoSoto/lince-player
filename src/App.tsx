import {useRef, useState} from 'react';
import LinceVideoPlayer from "./lib/components/LinceVideoPlayer";
import {UrlType} from "./lib/interfaces/UrlType.ts";
import {KeyboardShortcuts} from "./lib/interfaces/KeyboardShortcuts";
const logger = (info:string) => {
    console.log(info)
}
// import CallbackComponent from "./lib/components/base/CallbackComponent.tsx";
// import ChildForwardedComponent from "./lib/components/base/ChildForwardedComponent.tsx";
// import InOutComponent from "./lib/components/base/In&OutComponent.tsx";

const App = () => {
    // const [parentValue, setParentValue] = useState('Initial value');
    const youtubeVideo = useRef(null);
    const staticVideo = useRef(null);
    // const childComp = useRef(null);
    // const inOutComp = useRef(null);

    const executeVideoAction = (event: KeyboardShortcuts) => {
        const videos = [staticVideo, youtubeVideo];
        const functionalVideoAction = (func: any) => {
            return videos.map(v => {
                func(v.current);
            })
        }
        switch (event) {
            case KeyboardShortcuts.STOP:
                logger("Stop")
                functionalVideoAction((player: any) => player.stop())
                break;
            case KeyboardShortcuts.MUTE:
                break;
            case KeyboardShortcuts.PLAY:
                logger("Play")
                functionalVideoAction((player: any) => player.play())
                break;
            case KeyboardShortcuts.PAUSE:
                logger("Pause")
                functionalVideoAction((player: any) => player.pause())
                break;
            case KeyboardShortcuts.SPEED_NORMAL:
                logger("1x")
                functionalVideoAction((player: any) => player.stop())
                break;
            case KeyboardShortcuts.SPEED_SLOW:
                logger("0.5")
                functionalVideoAction((player: any) => player.stop())
                break;
            case KeyboardShortcuts.JUMP_FORWARD:
                logger("+5")
                functionalVideoAction((player: any) => player.stop())
                break;
            case KeyboardShortcuts.JUMP_BACK:
                logger("-5")
                functionalVideoAction((player: any) => player.stop())
                break;
            default:
                console.log("not implemented")
        }

    }
    // const executeComponentAction = (event: string) => {
    //     setParentValue(event)
    // }
    // const executeChildAction = () => {
    //     // @ts-ignore
    //     childComp.current.sayHi("toma");
    //     // @ts-ignore
    //     inOutComp.current.modifyValue("Another toma")
    // }
    //
    // const onClickAction = (value: string) => {
    //     alert(value);
    // }
    // const getPlaytime = () => {
    //     return `Youtube time: ${youtubeVideo.current.getCurrentTime()}| Static time: ${staticVideo.current.getCurrentTime()}`;
    // }
    // const playTime = getPlaytime();
    // const playTime = "yuhu";
    return (
        <div>
            {/*<div className={"row"}>*/}
            {/*    <div className={"column"}>*/}
            {/*        <div>what a cool ts component ({parentValue}): {playTime} </div>*/}
            {/*        <CallbackComponent name={"Callback click"} onExportMethod={executeComponentAction}/>*/}
            {/*        <button onClick={executeChildAction}>Click to change Forwarded component</button>*/}
            {/*    </div>*/}
            {/*    <div className={"column"}>*/}
            {/*        <ChildForwardedComponent ref={childComp} name={"Forwarded component"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={"row"}>*/}
            {/*    <div className={"column"}>*/}
            {/*        <InOutComponent ref={inOutComp} name={"Mixed approach"} onButtonDown={onClickAction}/>*/}
            {/*    </div>*/}
            {/*    <div className={"column"}>*/}
            {/*        <button onClick={executeChildAction}>Click to change Forwarded component</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"row"}>
                <div className={"column"}>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.STOP)
                    }}>Stop
                    </button>
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
                    }}>-5s
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.JUMP_FORWARD)
                    }}>=5s
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.SPEED_NORMAL)
                    }}>1x
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.SPEED_SLOW)
                    }}>0.5x
                    </button>
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.MUTE)
                    }}>Mute
                    </button>
                </div>
            </div>
            <div className={"row"}>
                <div className={"column"}>
                    <LinceVideoPlayer key={"video1"} ref={youtubeVideo} url={"https://www.youtube.com/watch?v=F5GO6JwzfkY"}
                                      type={UrlType.YoutubeUrl}/>
                </div>
                <div className={"column"}>
                    <LinceVideoPlayer key={"video1"} ref={staticVideo} url={"/climbing.mp4"}/>
                </div>
            </div>
        </div>
    )
}

export default App
