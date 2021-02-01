
const csv = require('csv-parser');
const fs = require('fs');
const { isValidNumber, isValidAlphaNumeric } = require('./helperFunctions')
const { basename } = require('path');
const getData = async (listingsFilePath, contactsFilePath, validate = false) => {
    if (validate) {
        let contactsValidation = await validateCSV(contactsFilePath, {
            'listing_id': isValidNumber,
            'contact_date': isValidNumber,
        }
        );
        let listingValidation = await validateCSV(listingsFilePath, {
            'id': isValidNumber,
            'price': isValidNumber,
            'mileage': isValidNumber,
            'make': isValidAlphaNumeric,
            'seller_type': isValidAlphaNumeric
        }
        );
        if (!contactsValidation.valid || !listingValidation.valid) {
            return { valid: false, messages: [...contactsValidation.messages, ...listingValidation.messages] }
        }
    }
    const listingsData = await readDataFromCSV(listingsFilePath);
    const contactsData = await readDataFromCSV(contactsFilePath);
    return { listingsData, contactsData, valid: true };
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
const validateCSV = async (filePath, validators) => {

    try {

        const readStream = fs.createReadStream(filePath)
            .pipe(csv())
        let i = 1;
        let messages = [];
        let valid = true;
        for await (const chunk of readStream) {
            for (const key in validators) {
                if (!chunk[key]) {
                    valid = false;
                    messages.push(`File {${basename(filePath)}}.\nRecord #{${i}}.\nField {${key}} not exist`)
                }
                else if (!validators[key](chunk[key])) {
                    valid = false;
                    messages.push(`File {${basename(filePath)}}.\nRecord #{${i}}.\nField {${key}} validation Failed`)
                }
            }
            i++;
        }
        return { valid: valid, messages: messages };

    } catch (error) {
        return { valid: false, messages: ['Wrong Files'] }
    }
}

module.exports = { getData };