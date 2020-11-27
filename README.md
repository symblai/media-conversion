# Symbl Media Utility

A simple set of media utilities.

## Prerequistes
In order to use this utility you would need [ffmpeg](http://www.ffmpeg.org/) installed on your system.
The simplest way to install ffmpeg on Mac OS X is [Homebrew](https://brew.sh/)

```bash
brew install ffmpeg
```

## Install
This utility can be used as a library in your NodeJS code. You can simply install it in your local project.

```bash
npm install symbl-media --save
```

If you don't want to use it in your code, you can install this utility as a CLI command.
```bash
npm install -g symbl-media
```
To verify that it's installed properly, check with version command.
```bash
media version
```

## Usage
Currently this utility only supports one feature:
* Transcode Audio file

If using in CLI mode, to print the detailed usage of this utility you can run this command.
```bash
media --help
```

### Transcode Audio File

You can simply [transcode](https://en.wikipedia.org/wiki/Transcoding) (convert) an audio file on your file system using this utility.

#### Command line
Use the `transcode` command to transcode the file.

```bash
media transcode -i ./my-input-file.wav -o ./my-output-file.mp3 -f mp3
```
##### Options
<pre>
  `-i`, `--inFile`    <u>file</u>       Path to the Input File to be transcoded.                   
  `-o`, `--outFile`   <u>file</u>       Path to where the Output File should be saved.             
  `-f`, `--outFormat` <u>format</u>     Format of the output file. For example: mp3, wav, aac etc. 
</pre>

#### Using Code
You can quickly transcode any audio/video file using `transcodeMediaFile` method.

```javascript
const {transcodeMediaFile} = require('symbl-media');
(async () => {
    try {
        const result = await transcodeMediaFile('./my-input-file.wav', 'my-output-file.mp3', 'mp3');
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();
```
Also checkout the [Examples](examples) folder for more examples
