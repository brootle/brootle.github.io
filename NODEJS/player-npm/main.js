import {qPlayer} from './playerModule';

let params = {
    licenseKey: 'f2234b90-8d26-6b9e-637c-eb62a5e79edb',
    videoSources: { src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" }
}

qPlayer("player", params);