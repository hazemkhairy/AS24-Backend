
const csv = require('csv-parser');
const fs = require('fs');

const getData = async (listingsFilePath, contactsFilePath, validate = false) => {
    const listingsData = await readDataFromCSV(listingsFilePath);
    const contactsData = await readDataFromCSV(contactsFilePath);
    return { listingsData, contactsData };
}

const readDataFromCSV = async (filePath) => {
    const data = [];
    const readStream = fs.createReadStream(filePath)
        .pipe(csv())
    for await (const chunk of readStream) {
        data.push(chunk);
    }
    return data;
}


module.exports = { getData };