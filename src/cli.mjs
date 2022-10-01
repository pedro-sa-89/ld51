import process from 'process';

import story from './mainStory.mjs'

import readline  from 'readline';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query = "--> ") => new Promise((resolve) => rl.question(query, resolve));

const output = {
    commandError: (output) => new Promise(resolve => {
        console.log(`error > ${output}`);
        resolve();
    }),
    addEntry: (output) => new Promise(resolve => {
        console.log(`> ${output}`);
        resolve();
    })
}

// story(prompt, output)
//     .catch(err => console.error(err))
//     .then(() => {
//         console.log("finished");
//         process.exit();
//     });

const mainStory = new story(prompt, output);
mainStory.tell()
    .catch(err => console.error(err))
    .then(() => {
        console.log("finished");
        process.exit();
    });
