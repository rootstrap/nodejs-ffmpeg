const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs')

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

function getFileSize(filePath) {
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return (stats.size / (1024 * 1024)).toFixed(2); //Convert bytes to MB
    } else {
        return 'File not found';
    }
}

// Function to convert AVI to MP4
function convertAviToMp4(inputPath, outputPath) {
    console.time('convertAviToMp4')
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', () => {
                console.log(`Conversion to MP4 completed. Original file size: ${getFileSize(inputPath)} MB. Converted file size: ${getFileSize(outputPath)} MB`);
                console.timeEnd(`convertAviToMp4`)
                resolve();
            })
            .on('error', (err) => {
                console.error('Error during conversion:', err);
                reject(err);
            })
            .run();
    });
}

// Function to extract a frame at a specific time
function extractFrame(inputPath, outputImagePath, timeInSeconds) {
    console.time('extractFrame')
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .screenshots({
                timestamps: [timeInSeconds],
                filename: path.basename(outputImagePath),
                folder: path.dirname(outputImagePath),
            })
            .on('end', () => {
                console.log('Frame extraction completed.');
                console.timeEnd('extractFrame')
                resolve();
            })
            .on('error', (err) => {
                console.error('Error during frame extraction:', err);
                reject(err);
            });
    });
}

// Function to compress a video
function compressVideo(inputPath, outputPath) {
    console.time('compressVideo')
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-vcodec libx264',
                '-crf 28', // Constant Rate Factor for quality control
            ])
            .output(outputPath)
            .on('end', () => {
                console.log(`Video compression completed. Original file size: ${getFileSize(inputPath)} MB. Converted file size: ${getFileSize(outputPath)} MB.`);
                console.timeEnd('compressVideo')
                resolve();
            })
            .on('error', (err) => {
                console.error('Error during compression:', err);
                reject(err);
            })
            .run();
    });
}

// Example usage
(async () => {
    const inputVideo = 'input.avi';
    const convertedVideo = 'output.mp4';
    const frameImage = 'frame_at_5s.png';
    const compressedVideo = 'compressed_output.mp4';

    try {
        await convertAviToMp4(inputVideo, convertedVideo);
        await extractFrame(convertedVideo, frameImage, 5); // Extract frame at 5 seconds
        await compressVideo(convertedVideo, compressedVideo);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();