module.exports = {
    footlocker: function(user_data){
        const puppeteer = require('puppeteer-extra');
        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());

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
        var monthVal = user_data.monthVal1;
        var dateVal = user_data.dateVal1;
        var yearVal = user_data.yearVal1;
        var zipcodeVal = user_data.zipcodeVal1;
        var emailVal = user_data.emailVal1; 
        var passwordVal = user_data.passwordVal1;
        var telephoneVal = user_data.telephoneVal1;

        const config = {
            sitekey: '6LfW5QQTAAAAAA3dNAQxY-moKXlb6Ok8hhxkEhNz',
            pageurl: 'https://www.footlocker.com/account/create', 
            apiKey: '9aa4a69ef85871e6aeec20b62d28103e',
            apiSubmitUrl: 'http://2captcha.com/in.php',
            apiRetrieveUrl: 'http://2captcha.com/res.php' 
        }

        
        const fName = 'input[name="firstName"]';
        const sName = 'input[name="lastName"]';
        const month = 'input[name="dateofbirthmonth"]';
        const date = 'input[name="dateofbirthday"]';
        const year = 'input[name="dateofbirthyear"]';
        const zipcode = 'input[name="postalCode"]';
        const email = 'input[type="email"]';
        const password = 'input[type="password"]';
        const telephone = 'input[name="phoneNumber"]';
        const submit = 'button[class="Button"]'

        puppeteer.launch( {headless: false}).then(async (browser) => {

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });

        await page.goto('https://www.footlocker.com/account/create', {waitUntil: 'load', timeout: 0});

        // Captcha
        const requesttId = await initiateCaptchaRequest(config.apiKey, config.sitekey, config.pageurl, config.apiSubmitUrl);
        const requestId = requesttId.substring(3);
        console.log(requestId);
            
            try{
                await page.type(fName, fNameVal);
            }catch(err){
                console.log("Something went wrong while entering the Firstname")
            }

            try{
                await page.type(sName, sNameVal);
            }catch(err){
                console.log("Something went wrong while entering the LastName")
            }

            try{
                await page.type(month, monthVal);
            }catch(err){
                console.log("Something went wrong while entering the Birth Month")
            }

            try{
                await page.type(date, dateVal);
            }catch(err){
                console.log("Something went wrong while entering the Birthdate")
            }

            try{
                await page.type(year, yearVal);
            }catch(err){
                console.log("Something went wrong while entering the BirthYear")
            }

            try{
                await page.type(zipcode, zipcodeVal);
            }catch(err){
                console.log("Something went wrong while entering the Zip Code")
            }
            

            await page.waitForTimeout(500);
            await page.waitForTimeout(500);
            console.log("email: " + emailVal);

            try{
                await page.type(email, emailVal);
            }catch(err){
                console.log("Something went wrong while entering the Email")
            }

            
            console.log("entered email");

            try{
                await page.type(password, passwordVal);
            }catch(err){
                console.log("Something went wrong while entering the Password")
            }

            try{
                await page.type(telephone, telephoneVal);
            }catch(err){
                console.log("Something went wrong while entering the Telephone Number")
            }


            await page.waitForTimeout(500);
            
            try{
                await page.click(submit);
            }catch(err){
                console.log("Something went wrong while clicking the submit button")
            }

            await page.waitForNavigation();
            console.log("submitted");
            await page.waitForTimeout(1000);
            await page.screenshot({ path: 'example.png' });
            
            await browser.close();

            // try{
            //     if()

            // }catch(err){
            //     console.log("The Captcha Didn't Pop Up")
            // }
        }).catch(err => console.error(err));

    }
}
