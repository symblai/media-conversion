const fs = require('fs');
const {transcodeMediaFileStream} = require('../index');

(async () => {
    try {
        const readStream = fs.createReadStream('/my/path/my-input-file.mp4');
        const writeStream = fs.createWriteStream('/my/path/my-output-file.mp3');
        const result = await transcodeMediaFileStream(readStream, writeStream,  'mp3');
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();
