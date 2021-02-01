const { getData } = require('./csvFunctions');
const { averageListingSellingPrice, percentualDistributionByMake, averagePriceOfTheMostContactedListings, topMostContactedListingsPerMonth } = require('./requirmentsFunctions.js');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const generateReports = async (req, res) => {
    const body = req.body;
    let result = {};
    if (body.useDefault) {
        result = await getRequirments();
        res.status(200).json({ ...result })
    }
    else {
        // pass the uploaded files path
        let upload = multer({ storage: storage }).array('files', 2);

        upload(req, res, async (err) => {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            if (!req.files) {
                return res.status(401).send({ messages: ['Please select an Files to upload'] });
            }
            else if (err instanceof multer.MulterError) {
                return res.status(404).send({ messages: ['multer error'], errorInfo: [err] });
            }
            else if (err) {
                return res.status(404).send({ messages: ['unkown error'], errorInfo: [err] });
            }
            result = await getRequirments(req.files[0].path, req.files[1].path, true)
            if (result.valid)
                res.status(200).json({ ...result })
            else
                res.status(404).json({ ...result });
            // res.send({ code: 200, result: response });
            // Display uploaded image for user validation
        });
    }

}
const getRequirments = async (listingsFilePath = './app/default/listings.csv',
    contactsFilePath = './app/default/contacts.csv',
    validate = false) => {
    let listingsData, contactsData;

    let data = await getData(listingsFilePath, contactsFilePath, validate);
    if (!data.valid)
        return { valid: false, messages: data.messages };
    listingsData = data.listingsData;
    contactsData = data.contactsData;

    let requirements = {};
    requirements.averageListingSellingPrice = await averageListingSellingPrice(listingsData);
    requirements.percentualDistributionByMake = await percentualDistributionByMake(listingsData);
    requirements.averagePriceOfTheMostContactedListings = await averagePriceOfTheMostContactedListings(listingsData, contactsData);
    requirements.topMostContactedListingsPerMonth = await topMostContactedListingsPerMonth(listingsData, contactsData);
    return {...requirements,valid:true};

}

module.exports = { generateReports };