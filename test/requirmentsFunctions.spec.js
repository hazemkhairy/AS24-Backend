const { averageListingSellingPrice, percentualDistributionByMake, averagePriceOfTheMostContactedListings, topMostContactedListingsPerMonth } = require('../app/requirmentsFunctions')
const { getData } = require('../app/csvFunctions')
describe("Testing Average Listing Selling Price per Seller Type", () => {
    test("Input = empty Data", async () => {
        expect(await averageListingSellingPrice([])).toEqual(
            expect.objectContaining({
                report: expect.arrayContaining([]),
                headers: expect.arrayContaining(['Seller Type', 'Average in Euro'])
            })
        )
    })
    test("Input = Real Data", async () => {
        const { listingsData } = await getData(
            __dirname + '/../app/default/listings.csv',
            __dirname + '/../app/default/contacts.csv');
        expect(
            await averageListingSellingPrice(listingsData)
        )
            .toEqual(
                expect.objectContaining({
                    report: expect.arrayContaining([
                        expect.objectContaining({
                            'Seller Type': expect.any(String),
                            'Average in Euro': expect.any(String)
                        })
                    ]),
                    headers: expect.arrayContaining(['Seller Type', 'Average in Euro'])
                })
            )
    })
})
describe("Testing Percentual Distribution of available cars by Make", () => {
    test("Input = empty Data", async () => {
        expect(await percentualDistributionByMake([])).toEqual(
            expect.objectContaining({
                report: expect.arrayContaining([]),
                headers: expect.arrayContaining(['Make', 'Distribution'])
            })
        )
    })
    test("Input = Real Data", async () => {
        const { listingsData } = await getData(
            __dirname + '/../app/default/listings.csv',
            __dirname + '/../app/default/contacts.csv');
        expect(
            await percentualDistributionByMake(listingsData)
        )
            .toEqual(
                expect.objectContaining({
                    report: expect.arrayContaining([
                        expect.objectContaining({
                            'Make': expect.any(String),
                            'Distribution': expect.any(String)
                        })
                    ]),
                    headers: expect.arrayContaining(['Make', 'Distribution'])
                })
            )
    })
})

describe("Average price of the 30% most contacted listings", () => {
    test("Input = empty Data", async () => {
        expect(await averagePriceOfTheMostContactedListings([], [])).toEqual(
            expect.objectContaining({
                report: expect.arrayContaining([]),
                headers: expect.arrayContaining(['Average price'])
            })
        )
    })
    test("Input = Real Data", async () => {
        const { listingsData, contactsData } = await getData(
            __dirname + '/../app/default/listings.csv',
            __dirname + '/../app/default/contacts.csv');
        expect(
            await averagePriceOfTheMostContactedListings(listingsData, contactsData)
        )
            .toEqual(
                expect.objectContaining({
                    report: expect.arrayContaining([
                        expect.objectContaining({
                            'Average price': expect.any(String)
                        })
                    ]),
                    headers: expect.arrayContaining(['Average price'])
                })
            )
    })
})

describe("The Top 5 most contacted listings per Month", () => {
    test("Input = empty Data", async () => {
        expect(await topMostContactedListingsPerMonth([], [])).toEqual(
            expect.objectContaining(
                {
                    reports: expect.arrayContaining([])
                })
        )
    })
    test("Input = Real Data", async () => {
        const { listingsData, contactsData } = await getData(
            __dirname + '/../app/default/listings.csv',
            __dirname + '/../app/default/contacts.csv');
        expect(
            await topMostContactedListingsPerMonth(listingsData, contactsData)
        )
            .toEqual(
                expect.objectContaining(
                    {

                        reports: expect.arrayContaining([
                            expect.objectContaining({
                                date: expect.any(String),

                                report: expect.objectContaining({

                                    report: expect.arrayContaining([
                                        expect.objectContaining({
                                            Ranking: expect.any(Number),
                                            'Listing Id': expect.any(String),
                                            Make: expect.any(String),
                                            'Selling Price': expect.any(String),
                                            Mileage: expect.any(String),
                                            'Total Amount of contacts': expect.any(Number)
                                        })
                                    ]),
                                    headers: expect.arrayContaining(['Ranking', 'Listing Id', 'Selling Price', 'Make', 'Mileage', 'Total Amount of contacts'])
                                })
                            })
                        ])
                    }
                )
            )
    })
})