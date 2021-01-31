
const { convertToMoney } = require('./helperFunctions');

//For each of these types, it should be provided an average selling price.
//The average price should be formatted as € #,-
const averageListingSellingPrice = async (listingsData) => {
    //create map/dictionary (Key,value)=>{key = seller_type,value = {total = total selling price,count: count of this seller type}}
    //iterate over listingsData to fill the above map
    //iterate over each seller_type in the above and calculate average for each seller_type
    //average = Total_Selling_price/count_of_seller_type
    let temp = {};

    for await (const listing of listingsData) {
        if (!temp[listing['seller_type']])
            temp[listing['seller_type']] = { count: 0, total: 0 }
        temp[listing['seller_type']].total += Number(listing['price']);
        temp[listing['seller_type']].count++;
    }
    let ret = [];
    for (const seller in temp) {
        avg = Number(temp[seller].total / temp[seller].count);
        avg = avg.toFixed(3);
        ret.push({
            'Seller Type': seller,
            'Average in Euro': convertToMoney(avg)
        })
    }
    return { report: ret, headers: ['Seller Type', 'Average in Euro'] };
}
//For each make, it should be reported the percentual amount of listings.
//The report should be sorted by distribution, where makes with biggest numbers stays on top
const percentualDistributionByMake = async (listingsData) => {
    //create map/dictionary (Key,value)=>{key = make,value = count of this make}
    //iterate over listingsData to fill the above map
    //iterate over each make in the above and calculate it's precent
    //sort them by precent (desc)
    //precent = Count_Of_Make/Total_Count_OF_Makes *100.0
    let temp = {};

    for await (const listing of listingsData) {
        if (!temp[listing['make']])
            temp[listing['make']] = 0
        temp[listing['make']]++;
    }

    let ret = [];
    for (const make in temp) {
        precent = Number(temp[make] / listingsData.length) * 100.0;
        precent = precent.toFixed(3);
        ret.push({
            'make': make,
            'precent': precent
        })
    }
    //sort the values then map the objects to required format
    ret = ret.sort((a, b) => { return b.precent - a.precent }).map(make => { return { 'Make': make.make, 'Distribution': make.precent + '%' } });

    return { report: ret, headers: ['Make', 'Distribution'] };

}
//Using the "Contacts CSV list"
//report the average price(format: € #,-) of the 30% most contacted listings.

const averagePriceOfTheMostContactedListings = async (listingsData, contactsData) => {
    //create map/dictionary (Key,value)=>{key = listing_id,value = {count: count of this contacts for this listing,selling_price: total selling price}}
    //iterate over contactsData, foreach contact increase the it's listing record in the above map    
    //create array contains all the prices
    //sort the array and get top 30%
    //get the average of top 30%
    let temp = {};

    for await (const listing of listingsData) {
        temp[listing['id']] = { price: Number(listing['price']), selling_count: 0 };
    }
    for await (const contact of contactsData) {
        temp[contact['listing_id']].selling_count++;
    }
    let topArray = [];
    for (const listingID in temp) {
        topArray.push(
            {
                selling_price: temp[listingID].price,
                selling_count: temp[listingID].selling_count
            }
        )
    }
    //sort descending then take the top 30%
    topArray = topArray.sort((a, b) => { return b.selling_count - a.selling_count }).slice(0, listingsData.length * 0.3);
    let total = 0;
    let count = topArray.length;
    for await (const row of topArray) {
        total += row.selling_price;
    }
    let avg = (Number(total / count)).toFixed(3);
    return { report: { 'Average price': convertToMoney(avg) }, headers: ['Average price'] };
}

const topMostContactedListingsPerMonth = async (listingsData, contactsData) => {
    //create map/dictionary for dates (Key,value)=>{key = month.year, value = { listingIdInThisDate:{count} }
    //iterate over each contacts and fill the above map
    //iterate over each date in the dates, convert it's value to array [{count,listing_id}], sort the array (desc)
    // get the top 5 for each date and pring it's data using it's listing_id
    // return dates

    let dates = {};

    for await (const contact of contactsData) {
        let date = new Date(Number(contact['contact_date']));
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

        date = date.getFullYear().toString() + '.' + month;
        if (!dates[date])
            dates[date] = { listingIDs: {} }
        if (!dates[date].listingIDs[contact['listing_id']])
            dates[date].listingIDs[contact['listing_id']] = 0;
        dates[date].listingIDs[contact['listing_id']]++;
    }
    let monthsArray = []
    for (const date in dates) {
        let temp = [];
        for (const listingID in dates[date].listingIDs) {
            temp.push({
                listingID: listingID,
                count: dates[date].listingIDs[listingID]
            })
        }
        temp = temp.sort((a, b) => { return b.count - a.count }).slice(0, 5);
        monthsArray.push(
            {
                date: date,
                listings: temp
            }
        )
    }

    monthsArray = monthsArray.sort((a, b) => { return a.date - b.date })
    //get the data in format
    //convert listing to map key = id value = listing
    let modifiedListingDate = {}
    for await (const listing of listingsData)
        modifiedListingDate[listing['id']] = listing;
    const headers = ['Ranking', 'Listing Id', 'Make', 'Selling Price', 'Mileage', 'Total Amount of contacts']
    monthsArray = monthsArray.map((month) => {
        let temp = [];
        let rank = 1;
        for (const listing of month.listings) {
            temp.push({
                'Ranking': rank++,
                'Listing Id': listing.listingID,
                'Make': modifiedListingDate[listing.listingID].make,
                'Selling Price': convertToMoney(modifiedListingDate[listing.listingID].price),
                'Mileage': Number(modifiedListingDate[listing.listingID].mileage).toFixed(3) + ' KM',
                'Total Amount of contacts': listing.count
            })
        }
        return {
            date: month.date,
            report: { report: temp, headers: headers }
        }
    })
    return { report: monthsArray };
}
module.exports = {
    averageListingSellingPrice,
    percentualDistributionByMake,
    averagePriceOfTheMostContactedListings,
    topMostContactedListingsPerMonth
};