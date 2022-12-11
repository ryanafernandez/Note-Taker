const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Returns nothing.
 */
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

/**
 *  Function to read data from a given file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @return {void} Returns nothing.
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.err(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

/**
 *  Function to delete data from a given file
 *  @param {string} id The note you want to delete from the file.
 *  @param {string} file The path to the file you want to delete from.
 *  @return {void} Returns nothing.
 */
const deleteAndUpdate = (id, file) => {
    readFromFile('./db/db.json').then((data) => {
        const existingNotes = JSON.parse(data);
        const filteredNotes = existingNotes.filter(note => note.id != id);
        writeToFile(file, filteredNotes);
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteAndUpdate }