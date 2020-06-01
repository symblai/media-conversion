#!/usr/bin/env node

const {transcode} = require('./commands/transcode');
const {printUsage, printHelp} = require('./commands/help');
const {printVersion} = require('./commands/version');

const commandLineArgs = require('command-line-args');

const supportedCommands = ['transcode', 'help', 'version'];

// TODO: Add Update Notifier

const mainDefinitions = [
    {name: 'command', defaultOption: true}
];

try {
    const mainOptions = commandLineArgs(mainDefinitions, {stopAtFirstUnknown: true});
    const argv = mainOptions._unknown || [];

    const {command} = mainOptions;

    if (!command) {
        const globalOptions = [
            {name: 'help', alias: 'h', type: Boolean}
        ];

        const _globalOptions = commandLineArgs(globalOptions, {argv});

        const {help} = _globalOptions;

        if (help) {
            printUsage();
        } else {
            printUsage();
        }
    }

    if (command && !supportedCommands.includes(command)) {
        printUsage([
            {
                message: `Command '${command}' is not supported.`
            }
        ]);
    }

    if (command) {
        (async () => {
            try {
                switch (command) {
                    case 'transcode':
                        // TODO: Put a generic logic for command handling
                        await transcode(argv);
                        break;

                    case 'version':
                        printVersion();
                        break;
                    case 'help':
                        printHelp(argv, supportedCommands);
                        break;
                    default:
                        printUsage();
                }
            } catch (e) {
                console.error('\nCLI Runtime Error: ', e);
                if (e.stack) {
                    console.error(e.stack);
                }
                printHelp([command], supportedCommands, [{
                    message: e && e.message || e
                }]);
                process.exit(1);
            }
        })();
    }
} catch (e) {
    if (e.name !== 'UNKNOWN_OPTION' && e.name !== 'UNKNOWN_VALUE') {
        console.error('\nCLI Error: ', e);
        if (e.stack) {
            console.error(e.stack);
        }
    }
    printUsage([
        {
            message: e && e.message || e
        }
    ]);
    process.exit(1);
}