# FFMpeg integration with NodeJS

This repository includes proof of concept for a nodejs library that integrates ffmpeg as part of this [research](https://www.notion.so/rootstrap/Evaluate-FFmpeg-for-Video-Processing-with-Node-js-14959347eba6804bb9e9dc055be6e0e6).

## Installation

Use the [npm](https://www.npmjs.com/) package manager to install the needed dependencies for the POCs.

```bash
npm install
```

Note: instead of using ffmpeg-static, FFMpeg can be installed locally but to avoid extra config in the environment variables, it's recommended to use this module if you don't want to work with a specific version. ffmpeg-static also works with specific versions but the Env variable has to be configured with the proper CDN link

## POC: node-ffmpeg

### Prerequisites
Add the .avi video file that you want to be processed at the root of the project and rename it to **input.avi**. When running this script with

```javascript
npm run fluent-ffmpeg
```
The code will pick up that **.avi** file and process it to: 
* Convert it to MP4 format.
* Extract a frame (screenshot) at a given timeframe (in seconds).
* Compress the video file while mantaining quality.

It will log out how much time it takes for each function to execute and the size of the resulting video files.

## POC: node-ffmpeg