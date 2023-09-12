import {useRef, useState} from 'react';
import LinceVideoPlayer from "./lib/components/LinceVideoPlayer";
import {UrlType} from "./lib/interfaces/UrlType";
import {KeyboardShortcuts} from "./lib/interfaces/KeyboardShortcuts";
const logger = (info:string) => {
    console.log(info)
}

const App = () => {
    const [time, setTime] = useState();
    const youtubeVideo = useRef(null);
    const staticVideo = useRef(null);

    const executeVideoAction = (event: KeyboardShortcuts) => {
        const videos = [staticVideo, youtubeVideo];
        const functionalVideoAction = (func: any) => {
            return videos.map(v => {
                func(v.current);
            })
        }
        switch (event) {
            case KeyboardShortcuts.STOP: //ok
                logger("Stop")
                functionalVideoAction((player: any) => player.stop())
                break;
            case KeyboardShortcuts.MUTE: //ok
                logger("Mute")
                functionalVideoAction((player: any) => player.toggleMute())
                break;
            case KeyboardShortcuts.PLAY: //ok
                functionalVideoAction((player: any) => player.play())
                break;
            case KeyboardShortcuts.PAUSE: //ok
                functionalVideoAction((player: any) => player.pause())
                break;
            case KeyboardShortcuts.SPEED_NORMAL: //ok
                functionalVideoAction((player: any) => player.playbackRate(1.0))
                break;
            case KeyboardShortcuts.SPEED_SLOW: //ok
                functionalVideoAction((player: any) => player.playbackRate(0.5))
                break;
            case KeyboardShortcuts.JUMP_FORWARD: //ok
                functionalVideoAction((player: any) => player.addTime(5))
                break;
            case KeyboardShortcuts.JUMP_BACK: //ok
                functionalVideoAction((player: any) => player.addTime(-5))
                break;
            case KeyboardShortcuts.SYNC: //KO
                // @ts-ignore
                const currentFirstVideoTime = videos[0].current.getCurrentTime();
                functionalVideoAction((player: any) => player.setTime(currentFirstVideoTime))
                break;
            default:
                console.log("not implemented")
        }

    }

    return (
        <div>
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
                    }}>+5s
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
                    <button onClick={() => {
                        executeVideoAction(KeyboardShortcuts.SYNC)
                    }}>Sync
                    </button>
                    <button onClick={() => {
                       // @ts-ignore
                        setTime(youtubeVideo.current.getCurrentTime());
                    }}>Get time
                    </button>
                    <span>Current selected time: {time}</span>
                </div>
            </div>
            <div className={"row"}>
                <div className={"column"}>
                    <LinceVideoPlayer key={"video1"} ref={youtubeVideo} url={"https://www.youtube.com/watch?v=F5GO6JwzfkY"}
                                      type={UrlType.YoutubeUrl}/>
                </div>
                <div className={"column"}>
                    <LinceVideoPlayer key={"video2"} ref={staticVideo} url={"/climbing.mp4"}/>
                </div>
            </div>
        </div>
    )
}

export default App
