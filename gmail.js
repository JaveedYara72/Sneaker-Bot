const { nodescript } = require('./MobileModule/noldeScript');
const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

module.exports = {
    gmail: function(user_data){
        fs.readFile('./userPhone.txt', "utf8", (err, data) => {
            const puppeteer = require('puppeteer-extra');
            const StealthPlugin = require('puppeteer-extra-plugin-stealth');
            puppeteer.use(StealthPlugin());
            

            var fNameVal = user_data.fNameVal1; 
            var sNameVal = user_data.sNameVal1;
            var passwordVal = user_data.passwordVal1;
            var confpasswordVal = user_data.passwordVal1;
            var emailVal = user_data.emailVal1.slice(0,-10) + '691253'; 


            // // Getting the number
            // nodescript()

            // // Reading the file
            // if(err){console.log(err);}else{
            //     data = data.split("\n"); // split the document into lines
            //     data.length = 1;    // set the total number of lines to 2
            //     console.log("This is the Number we are gonna use")

                // var phonedata = data[0]
                // var phoneinp = phonedata.slice(1,11)
            //     console.log(data[0]); //Array containing the 2 lines

            //     // // Post Logic to delete the top Number
            //     fs.readFile('./userPhone.txt', function(err, data) { // read file to memory
            //         if (!err) {
            //             data = data.toString(); // stringify buffer
            //             var position = data.toString().indexOf('\n'); // find position of new line element
            //             if (position != -1) { // if new line element found
            //                 data = data.substr(position + 1); // subtract string based on first line length
                
            //                 fs.writeFile('./userPhone.txt', data, function(err) { // write file
            //                     if (err) { // if error, report
            //                         console.log (err);
            //                     }
            //                 });
            //             } else {
            //                 console.log('no lines found');
            //             }
            //         } else {
            //             console.log(err);
            //         }
            //     })
            // }

        // Getting Number Logic From Online Sms
        axios.post('https://onlinesim.ru/api/getState.php?apikey=86369120f8b9a9b37aa94da987f993e8&service=VKcom', {
            "async": true,
            "crossDomain": true,
            "method": "POST",
            "headers": {"accept": "application/json"},
        })
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res.data[0]['number'])

            var phonedata = res.data[0]['number']
            var phoneinp = phonedata.slice(1,11)


        })
        .catch(error => {
            console.error(error)
        })
        
        const register = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.daaWTb > div > div > div:nth-child(1) > div > button > span';
        const fName = 'input[name="firstName"]';
        const sName = 'input[name="lastName"]';
        const username = 'input[type="email"]';
        const password = 'input[name="Passwd"]';
        const confpassword = 'input[name="ConfirmPasswd"]';
        const submit = 'button[class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc qIypjc TrZEUc lw1w4b"]'
        const phonenumber = 'input[type="tel"]';
        const phonenext = '#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > div.VfPpkd-RLmnJb';

        puppeteer.launch( {headless: false, slowMo:40}).then(async (browser) => {
            const page = await browser.newPage();
            await page.setViewport({ width: 1200, height: 800 });
            await page.goto('https://accounts.google.com/signup/v2/webcreateaccount', {waitUntil: 'load', timeout: 0});
            await page.click(register);
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.daaWTb > div > div > div:nth-child(2) > div > ul > li:nth-child(2)');
            await page.waitForNavigation();
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
                await page.type(username, emailVal);
            }catch(err){
                console.log("Something went wrong while entering the username")
            }

            try{
                await page.type(password, passwordVal);
            }catch(err){
                console.log("Something went wrong while entering the password")
            }

            try{
                await page.type(confpassword, confpasswordVal);
            }catch(err){
                console.log("Something went wrong while entering the password")
            }



            await page.waitForTimeout(500);
            await page.waitForTimeout(500);

            try{
                await page.click(submit);
            }catch(err){
                console.log("Something went wrong while clicking the submit button")
            }
            await page.waitForNavigation();
            console.log("submitted");


            const countrypreselector = '#countryList > div:nth-child(1) > div.ry3kXd.YuHtjc > div.MocG8c.aCjZuc.LMgvRb.KKjvXb'
            await page.waitForSelector(countrypreselector)
            await page.click(countrypreselector)

            const russia = '#countryList > div.OA0qNb.ncFHed > div:nth-child(175)'
            await page.waitForSelector(russia)
            await page.click(russia)
            
            await page.waitForSelector(phonenumber);
            try{
                await page.type(phonenumber,phoneinp)
                console.log(phoneinp)
            }catch(err){
                console.log('error at entering number')
            }

            console.log('Waiting for OTP')

            try{
                await page.click(phonenext)
            }catch(err){
                console.log("Error at clicking next")
            }
            // await browser.close();
        }).catch(err => console.error(err));
        });
    }
    
}