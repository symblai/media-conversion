const {transcodeAudioFile} = require('./lib/audio');

module.exports = {
    transcodeAudioFile,
    transcodeVideoFile: transcodeAudioFile,
};
