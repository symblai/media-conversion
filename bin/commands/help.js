const commandLineUsage = require('command-line-usage');
const transcodeCommand = require('./transcode');
const versionCommand = require('./version');
const {baseCommand} = require('./config');

const printUsage = (errors = []) => {
    const errorSection = {
        header: 'Errors detected',
        content: []
    };

    errors.forEach(err => {
        if (err && err.message) {
            errorSection.content.push(err.message);
        }
    });

    const sections = [
        {
            header: 'Symbl Media Utility',
            content: 'A simple utility to quickly perform various media operations. Currently only supports transcoding of audio files.'
        },
        {
            header: 'Synopsis',
            content: [
                `$ ${baseCommand} <command> [options ...]`,
            ],
        },
        {
            header: 'Available Commands',
            content: [
                { name: 'help', summary: 'Display help about the command.' },
                { name: 'transcode', summary: 'Transcode file from one format to another' },
                { name: 'version', summary: 'Print the version.' }
            ]
        },
        {
            header: 'Global Options',
            optionList: [
                {
                    name: 'help',
                    alias: 'h',
                    type: Boolean,
                    description: 'Print this usage guide.'
                }
            ]
        },
        {
            content: 'Project home: {underline https://github.com/symblai/symbl-media}'
        }
    ];

    let _sections = sections;

    if (errorSection.content.length > 0) {
        _sections = [errorSection, ...sections];
    }
    console.log(commandLineUsage(_sections));
};

const printHelp = (argv = [], supportedCommands = [], errors = []) => {

    if (argv.length <= 0) {
        throw `'help' command should have command name as parameter. Try: ${baseCommand} help transcode`
    }

    const command = argv[0];

    if (!supportedCommands.includes(command)) {
        throw `Command '${command}' is not supported.`;
    }

    let commandOptions = [];
    let commandDescription = '';
    let commandExamples = [];

    switch (command) {
        case 'transcode':
            commandOptions = transcodeCommand.options();
            commandDescription = transcodeCommand.description();
            commandExamples = transcodeCommand.examples();

            break;
        case 'version':
            commandOptions = versionCommand.options();
            commandDescription = versionCommand.description();
            break;
        default:
    }

    let usageLine = `$ ${baseCommand} ${command}`;

    if (commandOptions.length > 0) {
        usageLine = usageLine + ' [options ...]';
    }

    const sections = [
        {
            header: 'Description',
            content: commandDescription
        },
        {
            header: 'Usage',
            content: [
                usageLine
            ],
        }
    ];

    if (commandOptions.length > 0) {
        sections.push({
            header: 'Options',
            optionList: commandOptions
        });
    }

    if (commandExamples.length > 0) {
        sections.push({
            header: 'Examples',
            content: commandExamples
        });
    }


    const errorSection = {
        header: 'Errors detected',
        content: []
    };

    errors.forEach(err => {
        if (err && err.message) {
            errorSection.content.push(err.message);
        }
    });

    let _sections = sections;

    if (errorSection.content.length > 0) {
        _sections = [errorSection, ...sections];
    }
    console.log(commandLineUsage(_sections));

};

module.exports = {
    printUsage,
    printHelp
};
