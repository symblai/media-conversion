const {transcodeMediaFile} = require('../../index');
const commandLineArgs = require('command-line-args');

const transcode = async (argv = []) => {
    const transcodeOptions = [
        {name: 'inFile', alias: 'i', type: String, multiple: false, defaultOption: true},
        {name: 'outFile', alias: 'o', type: String, multiple: false},
        {name: 'outFormat', alias: 'f', type: String, multiple: false, defaultValue: 'mp3'}
    ];

    const opts = commandLineArgs(transcodeOptions, {argv});

    const {inFile, outFile, outFormat} = opts;

    try {
        await transcodeMediaFile(inFile, outFile, outFormat);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const description = () => {
    return 'Transcode files from one encoding to another.';
};

const options = () => {
    return [
        {
            name: 'inFile',
            alias: 'i',
            type: String,
            typeLabel: '{underline file}',
            description: 'Path to the Input File to be transcoded.'
        },
        {
            name: 'outFile',
            alias: 'o',
            type: String,
            typeLabel: '{underline file}',
            description: 'Path to where the Output File should be saved.'
        },
        {
            name: 'outFormat',
            alias: 'f',
            type: String,
            typeLabel: '{underline format}',
            description: 'Format of the output file. For example: mp3, wav, aac etc.'
        }
    ]
};

const examples = () => {
    return [
        'transcode --inFile ./my-input-file.wav --outFile ./my-output-file.mp3 --outFormat mp3',
        'transcode -i ./my-input-file.mp3 -o ./my-output-file.wav -f wav',
        'transcode -i ./my-input-file.mp4 -o ./my-output-file.mp3 -f mp3',
    ];
};

module.exports = {
    transcode,
    options,
    description,
    examples
};
