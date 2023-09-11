import {useEffect, useRef} from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

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
        hotkeys: function (event: { which: number; }) {
            // `this` is the player in this context

            // `x` key = pause
            if (event.which === 88) {
                // @ts-ignore
                this.pause();
            }
            // `y` key = play
            if (event.which === 89) {
                // @ts-ignore
                this.play();
            }
        }
    }
};

const videoJsOptions = {
    sources: [
        {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=F5GO6JwzfkY"
        }
    ]
};

export enum UrlType {
    YoutubeUrl,
    VideoUrl
}

export default function LinceVideoPlayer(props: { url: string, type?: UrlType }) {
    const videoNode = useRef(null);
    const player = useRef(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (videoNode.current && !initialized.current) {
            initialized.current = true; //prevent duplicate initialization
            // @ts-ignore
            player.current = videojs(videoNode.current, {
                ...initialOptions,
                ...videoJsOptions
            }).ready(function () {
                console.log("Player Ready");
            });
        }
        //clear up player on dismount
        return () => {
            if (player.current) {
                // @ts-ignore
                player.current.dispose();
            }
        };
    }, []);

    return <video ref={videoNode} className="video-js"/>;
}
