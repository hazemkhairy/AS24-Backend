const { getData } = require('./csvFunctions');


const generateReports = async (req, res) => {
    const body = req.body;
    let result = {};
    if (body.useUploadedFiles) {
        result = await getRequirments();
    }
    else {
        // pass the uploaded files path
        result = await getRequirments();
    }

    res.status(200).json({ ...result })
}
const getRequirments = async (listingsFilePath = './app/default/listings.csv',
    contactsFilePath = './app/default/contacts.csv',
    validate = false) => {
    let listingsData, contactsData;

    let data = await getData(listingsFilePath, contactsFilePath, validate);
    listingsData = data.listingsData;
    contactsData = data.contactsData;
    return { listingsData, contactsData };

}

module.exports = { generateReports };