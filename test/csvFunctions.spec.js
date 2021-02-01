const { getData } = require('../app/csvFunctions')
describe("Testing CSV functions", () => {
    test("Test reading data from default files", async () => {
        expect(await getData(__dirname + '/../app/default/listings.csv', __dirname + '/../app/default/contacts.csv', false))
            .toEqual(
                expect.objectContaining(
                    {
                        listingsData: expect.arrayContaining([expect.objectContaining({
                            id: expect.any(String),
                            make: expect.any(String),
                            price: expect.any(String),
                            mileage: expect.any(String),
                            seller_type: expect.any(String)
                        })]),
                        contactsData: expect.arrayContaining([expect.objectContaining({
                            listing_id: expect.any(String),
                            contact_date: expect.any(String)
                        })]),
                        valid: true
                    }
                ))
    })
    test("Test reading data from default files with validating the files", async () => {
        expect(await getData(__dirname + '/../app/default/listings.csv', __dirname + '/../app/default/contacts.csv', true))
            .toEqual(
                expect.objectContaining(
                    {
                        listingsData: expect.arrayContaining([expect.objectContaining({
                            id: expect.any(String),
                            make: expect.any(String),
                            price: expect.any(String),
                            mileage: expect.any(String),
                            seller_type: expect.any(String)
                        })]),
                        contactsData: expect.arrayContaining([expect.objectContaining({
                            listing_id: expect.any(String),
                            contact_date: expect.any(String)
                        })]),
                        valid: true
                    }
                ))
    })
    test("Test reading data from specific files with validating the files", async () => {
        expect(await getData(__dirname + '/../uploads/listings.csv', __dirname + '/../uploads/contacts.csv', true))
            .toEqual(
                expect.objectContaining(
                    {
                        listingsData: expect.arrayContaining([expect.objectContaining({
                            id: expect.any(String),
                            make: expect.any(String),
                            price: expect.any(String),
                            mileage: expect.any(String),
                            seller_type: expect.any(String)
                        })]),
                        contactsData: expect.arrayContaining([expect.objectContaining({
                            listing_id: expect.any(String),
                            contact_date: expect.any(String)
                        })]),
                        valid: true
                    }
                ))
    })
    test("Test reading data from invalid file path", async () => {
        expect(await getData(__dirname + '/../app/defaults/listings.csv', __dirname + '/../app/defaults/contacts.csv', false))
            .toEqual(
                expect.objectContaining(
                    {
                        valid: false,
                        messages: expect.arrayContaining([expect.any(String)])
                    }
                ))
    })
    test("Test reading data from invalid file format", async () => {
        expect(await getData(__dirname + './csvInvalidFormat/listings.csv', __dirname + './csvInvalidFormat/contacts.csv', false))
            .toEqual(
                expect.objectContaining(
                    {
                        valid: false,
                        messages: expect.arrayContaining([expect.any(String)])
                    }
                ))
    })
})
