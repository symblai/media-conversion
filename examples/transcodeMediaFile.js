const {transcodeMediaFile} = require('../index');

(async () => {
    try {
        const result = await transcodeMediaFile('./my-input-file.wav', 'my-output-file.mp3');
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();

// using the options object to pass custom inputs for transcoding

(async () => {
    try {
        const result = await transcodeMediaFile('./example-audio.ts', 'my-output-file.wav', 'wav', {inputs: ['-vn']});
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();
