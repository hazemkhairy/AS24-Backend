# AS24-Backend
### How to run the project
- Download the project.
- Open CMD.
- Navigate to the project directory using the CMD commands.
- Run the following Command on the CMD: 
  - "npm install".
  - "node index" or "nodemon index".
### How to run tests of the project
- Download the project.
- Open CMD.
- Navigate to the project directory using the CMD commands.
- Run the following Command on the CMD:
  - "npm install".
  - "npm test".
### Documentation:
- The backend consists of the following endpoint:
  - /generateReport:
    - Method type: POST
    - Input: 
      - {useDefault:true} to generate report from the default csv.
      - FormData with contains two files :
        - listing.csv.
        - contacts.csv.
    - Output: 
      - If invalid format or there is any error the Response will contain object with the following:
        - valid:false
        - messages[String]=> the error message
      - If valid Request, Response will contain the following:
        - valid:true
        - averageListingSellingPrice
        - percentualDistributionByMake
        - averagePriceOfTheMostContactedListings
        - topMostContactedListingsPerMonth

### Todo
- [X] Init the project.
- [X] Create Endpoint to generate Requirment from the default CSV.
- [X] Provide Requirments in json Format.
- [X] Create Endpoint to generate Requirment from the Uploaded CSV.
- [X] Validate the uploaded CSV.
