const packageJson = require('../../package.json');
const printVersion = () => {
    if (packageJson && packageJson.version) {
        console.log(`Current Version: ${packageJson.version}`);
        return;
    }
    throw 'Could not detect version.';
};


const description = () => {
    return 'Print the version.';
};

const options = () => {
    return [];
};

const examples = () => {
    return [];
};

module.exports = {
    printVersion,
    options,
    description,
    examples
};
