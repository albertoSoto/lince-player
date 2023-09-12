import {Ref, forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import {UrlType} from "../interfaces/UrlType.ts";
import {KeyboardShortcuts} from "../interfaces/KeyboardShortcuts.ts";

const initialOptions = {
    playbackRates: [0.1, 0.5, 1, 1.5, 2, 4],
    controls: true,
    responsive: true,
    fluid: true,
    controlBar: {
        skipButtons: {
            forward: 5,
            backward: 5
        },
        volumePanel: {
            inline: false
        }
    },
    userActions: {
        hotkeys: function (event: { which: KeyboardShortcuts; }) {
            // `this` is the player in this context
            if (event.which === KeyboardShortcuts.PAUSE) {
                // @ts-ignore
                this.pause();
            }
            if (event.which === KeyboardShortcuts.PLAY) {
                // @ts-ignore
                this.play();
            }
        }
    }
};


function LinceVideoPlayer(props: { key: string, url: string, type?: UrlType }, ref: Ref<unknown> | undefined) {
    const {type, url, key} = props;
    // const [videoJSPlayer, setVideoJSPlayer] = useState();
    // const videoNode = useRef(null);
    const player = useRef(null);
    // const initialized = useRef(false);
    const container = useRef(null)

    const getFileExtension = (link: string) => {
        if (link) {
            return link.split('.').pop();
        }
        return "video/mp4";
    }
    const videoJsOptions = {
        sources: [
            {
                type: type == UrlType.YoutubeUrl ? "video/youtube" : `video/${getFileExtension(url)}`, //"video/mp4"
                // src: "https://www.youtube.com/watch?v=F5GO6JwzfkY"
                src: url
            }
        ]
    };

    useImperativeHandle(ref, () => ({
        //https://docs.videojs.com/docs/api/player.html#MethodscurrentTime
        stop: () => {
            // @ts-ignore
            player.current.pause();
            // @ts-ignore
            player.current.currentTime(0);
        },
        play: () => {
            // @ts-ignore
            player.current.play();
        },
        pause: () => {
            // @ts-ignore
            player.current.pause();
        },
        toggleMute: () => {
            // @ts-ignore
            player.current.volume() == 0 ? player.current.volume(1) : player.current.volume(0);
        },
        playbackRate: (value: number) => {
            // @ts-ignore
            player.current.playbackRate(value);
        },
        getCurrentTime: () => {
            // @ts-ignore
            return player.current.currentTime();
        },
        addTime: (seconds: number) => {
            // @ts-ignore
            player.current.currentTime(player.current.currentTime() + seconds);
        },
        setTime: (seconds: number) => {
            // @ts-ignore
            player.current.currentTime(seconds);
        },
        getFullPlayer: () => {
            // @ts-ignore
            return player.current;
        }

    }), []);
    useEffect(() => {
        // @ts-ignore
        player.current = videojs(container.current, {
            ...initialOptions,
            ...videoJsOptions
        })
        return () => {
            // @ts-ignore
            player.current.dispose()
        }
    }, [key])

    return (
        <div data-vjs-player key={key}>
            <video ref={container} className="video-js" key={`videoJs${key}`}/>
        </div>
    )
    // useEffect(() => {
    //     if (videoNode.current && !initialized.current) {
    //         initialized.current = true; //prevent duplicate initialization
    //         // @ts-ignore
    //         player.current = videojs(videoNode.current, {
    //             ...initialOptions,
    //             ...videoJsOptions
    //         }).ready(function () {
    //             console.log("Player Ready");
    //         });
    //         // @ts-ignore
    //         console.log('playerId:' + videoNode.current.id)
    //         // @ts-ignore
    //         setVideoJSPlayer(videojs(videoNode.current.id))
    //     }
    //     //clear up player on dismount
    //     return () => {
    //         if (player.current) {
    //             // @ts-ignore
    //             player.current.dispose();
    //         }
    //     };
    // }, [videoJSPlayer]);
    // return <video ref={videoNode} className="video-js"/>;
}

// export default LinceVideoPlayer;
export default forwardRef(LinceVideoPlayer);
