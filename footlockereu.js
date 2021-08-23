module.exports = {
    footlockereu: function(user_data){
        const puppeteer = require('puppeteer-extra');
        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());
        const prompt = require('prompt-sync')();

        // var fNameVal = 'Some';
        // var sNameVal = 'Genius';
        // var monthVal = '10';
        // var dateVal = '18';
        // var yearVal = '19'+(Math.floor((Math.random() * (99-55)) + 55)).toString();
        // var zipcodeVal = '98001';
        // var emailVal = 'RandomNoob124353' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@gmail.com';
        // var passwordVal = 'JOlaMola24@';
        // var telephoneVal = '2078967678';

        var fNameVal = user_data.fNameVal1; 
        var sNameVal = user_data.sNameVal1;
        var gender = String(user_data.gender);
        var monthVal = user_data.monthVal1;
        var dateVal = user_data.dateVal1;
        var yearVal = user_data.yearVal1;
        var zipcodeVal = user_data.zipcodeVal1;
        var emailVal = user_data.emailVal1; 
        var passwordVal = user_data.passwordVal1;
        var telephoneVal = user_data.telephoneVal1;

        const fName = 'input[name="firstName"]';
        const sName = 'input[name="lastName"]';
        const genderSelect = 'select[name="gender"]';
        const month = 'input[name="dateofbirthmonth"]';
        const date = 'input[name="dateofbirthday"]';
        const year = 'input[name="dateofbirthyear"]';
        const zipcode = 'input[name="postalCode"]';
        const email = 'input[type="email"]';
        const password = 'input[type="password"]';
        const telephone = 'input[name="phoneNumber"]';
        const submit = 'button[class="Button"]'


        // 1.Sweden -> https://www.footlocker.se/en/account/create
        // 2.United Kingdom -> https://www.footlocker.co.uk/en/account/create
        // 3.Norway -> https://www.footlocker.no/en/account/create
        // 4.Czech -> https://www.footlocker.cz/en/account/create
        // 5.Greece -> https://www.footlocker.gr/en/account/create
        // 6.Hungary -> https://www.footlocker.hu/en/account/create
        // 7.Ireland -> https://www.footlocker.ie/en/account/create
        // 8.Poland -> https://www.footlocker.pl/en/account/create
        // 9.Denmark -> https://www.footlocker.dk/en/account/create
        // 10.Portugal -> https://www.footlocker.pt/en/account/create
        // 11.Germany -> https://www.footlocker.de/en/account/create (Preferred Language)
        // 12.Spain -> https://www.footlocker.es/en/account/create (Preferred Language)
        // 13.France -> https://www.footlocker.fr/en/account/create (Preferred Language)
        // 14.Belgium -> https://www.footlocker.be/en/account/create (Preferred Language)
        // 15.Italy -> https://www.footlocker.it/en/account/create (Preferred Language)
        // 16.Netherlands -> https://www.footlocker.nl/en/account/create (Preferred Language)
        // 17.Austria -> https://www.footlocker.at/en/account/create (Preferred Language)
        // 18.luxembourg -> https://www.footlocker.lu/en/account/create (Preferred Language)


        console.log(`
        Hi, Please select one of these European countries to proceed with.

        1. Sweden
        2. United Kingdom
        3. Norway
        4. Czech Republic
        5. Greece
        6. Hungary
        7. Ireland
        8. Poland
        9. Denmark
        10. Portugal
        11. Germany
        12. Spain
        13. France
        14. Belgium
        15. Italy
        16. Netherlands
        17. Austria
        18. Luxembourg

        Please type the number associated to your Country: 
        `)

        const choice = prompt()

        let URL1 = ''


        switch (choice) {
        case '1':
            URL1 = 'https://www.footlocker.se/en/account/create'
            break
        case '2':
            URL1 = 'https://www.footlocker.co.uk/en/account/create'
            break
        case '3':
            URL1 = 'https://www.footlocker.no/en/account/create'
            break
        case '4':
            URL1 = 'https://www.footlocker.cz/en/account/create'
            break
        case '5':
            URL1 = 'https://www.footlocker.gr/en/account/create'
            break
        case '6':
            URL1 = 'https://www.footlocker.hu/en/account/create'
            break
        case '7':
            URL1 = 'https://www.footlocker.ie/en/account/create'
            break
        case '8':
            URL1 = 'https://www.footlocker.pl/en/account/create'
            break
        case '9':
            URL1 = 'https://www.footlocker.dk/en/account/create'
            break
        case '10':
            URL1 = 'https://www.footlocker.pt/en/account/create'
            break
        case '11':
            URL1 = 'https://www.footlocker.de/en/account/create'
            break
        case '12':
            URL1 = 'https://www.footlocker.es/en/account/create'
            break
        case '13':
            URL1 = 'https://www.footlocker.fr/en/account/create'
            break
        case '14':
            URL1 = 'https://www.footlocker.be/en/account/create'
            break
        case '15':
            URL1 = 'https://www.footlocker.it/en/account/create'
            break
        case '16':
            URL1 = 'https://www.footlocker.nl/en/account/create'
            break
        case '17':
            URL1 = 'https://www.footlocker.at/en/account/create'
            break
        case '18':
            URL1 = 'https://www.footlocker.lu/en/account/create'
            break
        default:
            console.log('Option is Invalid')
        }

        if (URL1 === ''){
            return;
        }

        puppeteer.launch( {headless: false}).then(async (browser) => {

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });



        await page.goto(URL1, {waitUntil: 'load', timeout: 0});
            
            try{
                await page.type(fName, fNameVal);
            }catch(err){
                console.log("Something went wrong while entering the Firstname")
            }
            console.log("Entered First Name")

            try{
                await page.type(sName, sNameVal);
            }catch(err){
                console.log("Something went wrong while entering the LastName")
            }
            console.log("Entered Second Name")

            try{
                await page.select(genderSelect,gender);
                console.log(gender)
            }catch(err){
                console.log('Something went wrong while entering the Gender')
            }
            console.log("Entered Gender")

            try{
                await page.type(month, monthVal);
            }catch(err){
                console.log("Something went wrong while entering the Birth Month")
            }
            console.log("Entered Month of Birth")

            try{
                await page.type(date, dateVal);
            }catch(err){
                console.log("Something went wrong while entering the Birthdate")
            }
            console.log('Entered Date of Birth')

            try{
                await page.type(year, yearVal);
            }catch(err){
                console.log("Something went wrong while entering the BirthYear")
            }
            console.log('Entered Year of Birth')

            try{
                await page.type(zipcode, zipcodeVal);
            }catch(err){
                console.log("Something went wrong while entering the Zip Code")
            }
            console.log('Entered Zip Code')
            

            await page.waitForTimeout(50);
            await page.waitForTimeout(50);
            console.log("email: " + emailVal);

            try{
                await page.type(email, emailVal);
            }catch(err){
                console.log("Something went wrong while entering the Email")
            }
            console.log("Entered Email: " + emailVal)

            try{
                await page.type(password, passwordVal);
            }catch(err){
                console.log("Something went wrong while entering the Password")
            }
            console.log("Entered Password")

            try{
                await page.type(telephone, telephoneVal);
            }catch(err){
                console.log("Something went wrong while entering the Telephone Number")
            }
            console.log('Entered Telephone Number')

        
            await page.waitForTimeout(500);

            // Agreeing to the terms and conditions
            try{
                var checkBox = await page.waitForXPath("(//SPAN[@class='c-form-field__indicator'])[1]") 
                await checkBox.click({clickCount:3})
            }catch(err){
                console.log('Something went wrong while checking the Terms of Use Checkbox ')
            }

            try{
                var checkbox2 = await page.waitForXPath("//*[@id='AccountCreate']/div[7]/div[1]/label/span[1]")
                await checkbox2.click({clickCount:3})
            }catch(err){
                console.log('Something went wrong while checking the Terms of Use checkbox')
            }
            console.log("Agreed To Terms and Conditions")
            

            // English CheckBox
            try{
                var langcheck  = await page.waitForXPath("//*[@id='AccountCreate']/div[7]/fieldset/ul/li[1]/div/label/span[1]")
                await langcheck.click({clickCount:3})
            }catch(err){
                console.log('Something went wrong while checking the Language checkbox(v1)')
            }

            // English CheckkBox version 2
            try{
                var langcheck2 = await page.waitForXPath("//*[@id='AccountCreate']/fieldset[2]/ul/li[1]/div/label/span[1]")
                await langcheck2.click({clickCount:3})
            }catch(err){
                console.log("Something went wrong while checking the Language checkbox(v2)")
            }
            
            try{
                await page.click(submit);
            }catch(err){
                console.log("Something went wrong while clicking the submit button")
            }
            console.log('Clicked on Submit Button')

            await page.waitForNavigation();

            await page.waitForTimeout(100);
            console.log("submitted");
            await page.screenshot({ path: 'example.png' });
            
            await browser.close();
        }).catch(err => console.error(err));
    }
}