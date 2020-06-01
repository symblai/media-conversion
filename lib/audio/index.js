const ffmpeg = require('fluent-ffmpeg');

const replaceExtension = (fileName, extension) => {
    return `${fileName.substring(0, fileName.lastIndexOf("\."))}.${extension}`;
};

/**
 *
 * @param files
 * @param outputFormat
 * @return {Promise<[]>} Promise of list of unsuccessful files
 */
const transcodeAudioFiles = async (files = [], outputFormat) => {
    const unsuccessfulFiles = [];
    let _outputFormat = outputFormat;
    for (const file of files) {
        const {inputFile, outputFile, outputFormat} = file;
        _outputFormat = outputFormat || _outputFormat;
        let _outputFile = outputFile;
        if (!_outputFile) {
            _outputFile = replaceExtension(inputFile, outputFormat);
        }
        try {
            await transcodeAudioFile(inputFile, _outputFile, _outputFormat);
        } catch (e) {
            console.error(e);
            unsuccessfulFiles.push({
                inputFile,
                outputFile: _outputFile,
                outputFormat, _outputFormat
            });
        }
    }
    return unsuccessfulFiles;
};

/**
 * Transcodes input file to specified output format if supported by ffmpeg.
 *
 *  Sample Usage: transcodeFile('/my/path/file.mp4', 'my/path/file.mp3', 'mp3');
 *
 * @param inputFile File path to input file
 * @param outputFile File path to output file
 * @param outputFormat format string
 * @param options additional options
 * @return {Promise<unknown>}
 */
const transcodeAudioFile = (inputFile, outputFile, outputFormat, options = {}) => {
    if (!inputFile) {
        throw `First argument 'inputFile' must be provided.`
    }

    if (!outputFile) {
        throw `Second argument 'outputFile' must be provided.`
    }

    if (!outputFormat) {
        throw `Third argument 'outputFormat' must be provided.`
    }

    const {audioChannels} = options;
    let _audioChannels = audioChannels || 1;
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .format(outputFormat)
            .audioChannels(_audioChannels)
            .on('end', () => {
                resolve({
                    outPath: outputFile
                });
            })
            .on('error', (err) => {
                reject(err);
            })
            .save(outputFile);
    });
};

module.exports = {
    transcodeAudioFile,
    transcodeAudioFiles
};