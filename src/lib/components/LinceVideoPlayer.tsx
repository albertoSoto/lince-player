import {useEffect, useRef} from "react";
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



export default function LinceVideoPlayer(props: { url: string, type?: UrlType }) {
    const {type,url} = props;
    const videoNode = useRef(null);
    const player = useRef(null);
    const initialized = useRef(false);
    const getFileExtension = (link: string) =>{
        if (link){
           return link.split('.').pop();
        }
        return "video/mp4";
    }
    const videoJsOptions = {
        sources: [
            {
                type: type == UrlType.YoutubeUrl? "video/youtube":`video/${getFileExtension(url)}`, //"video/mp4"
                // src: "https://www.youtube.com/watch?v=F5GO6JwzfkY"
                src: url
            }
        ]
    };
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
