const {transcodeMediaFile} = require('../index');
(async () => {
    try {
        const result = await transcodeMediaFile('./my-input-file.wav', 'my-output-file.mp3');
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();
