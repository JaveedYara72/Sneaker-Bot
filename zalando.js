
module.exports = {


zalando:function(user_data){


// Taking packages here 

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const prompt = require('prompt-sync')();

console.log(`
Hi, Please select one of these countries to proceed with.
1. Germany
2. France
3. Luxembourg
4. Austria
5. Italy
6. Norway
7. Switzerland 
8. Spain
9. Sweden
10. England
11. Netherlands 
12. Denmark
13. Poland
14. Belgium
15. Finland
16. Czech Republic
17. Ireland
18. Slovakia
19. Slovenia
20. Lithuania

Please type the number associated to your Country: 
`)

const choice = prompt()

let URL1 = ''


switch (choice) {
case '1':
    URL1 = 'https://en.zalando.de/login/?view=register'
    break
case '2':
    URL1 = 'https://www.zalando.fr/login/?view=register'
    break
case '3':
    URL1 = 'https://fr.zalando.be/login/?view=register'
    break
case '4':
    URL1 = 'https://www.zalando.at/login/?view=register'
    break
case '5':
    URL1 = 'https://www.zalando.it/login/?view=register'
    break
case '6':
    URL1 = 'https://www.zalando.no/login/?view=register'
    break
case '7':
    URL1 = 'https://www.zalando.ch/login/?view=register'
    break
case '8':
    URL1 = 'https://www.zalando.es/login/?view=register'
    break
case '9':
    URL1 = 'https://www.zalando.se/login/?view=register'
    break
case '10':
    URL1 - 'https://www.zalando.co.uk/login/?view=register'
    break
case '11':
    URL1 = 'https://www.zalando.nl/login/?view=register'
    break
case '12':
    URL1 = 'https://www.zalando.dk/login/?view=register'
    break
case '13':
    URL1 = 'https://www.zalando.pl/login/?view=register'
    break
case '14':
    URL1 = 'https://fr.zalando.be/login/?view=register'
    break
case '15':
    URL1 = 'https://www.zalando.fi/login/?view=register'
    break
case '16':
    URL1 = 'https://www.zalando.cz/login/?view=register'
    break
case '17':
    URL1 = 'https://www.zalando.ie/login/?view=register'
    break
case '18':
    URL1 = 'https://www.zalando.sk/login/?view=register'
    break
case '19':
    URL1 = 'https://www.zalando.si/login/?view=register'
    break
case '20':
    URL1 = 'https://www.zalando.lt/login/?view=register'
    break
default:
    console.log('Option is Invalid')
}

if (URL1 === ''){
    return;
}


var fNameVal = user_data.fNameVal1; 
var sNameVal = user_data.sNameVal1;
var emailVal = user_data.emailVal1; 
var passwordVal = user_data.passwordVal1;

// ALl the selectors requires are stored here.
const fName = 'input[name="register.firstname"]';
const sName = 'input[name="register.lastname"]';
const email = 'input[name="register.email"]';
const password = 'input[name="register.password"]';
const submit = '#section-register > div > form > div:nth-child(7) > button';
//Seeting options for puppeteer 

const chromeOptions = {
  headless: false,
  slowMo:10,
  defaultViewport: null 
}

//All the main interactions
  puppeteer.launch(chromeOptions).then(async (browser) => {

    const page = await browser.newPage();
    //await page.setViewport({ width: 1200, height: 800 });

    await page.goto(URL1, {waitUntil: 'load', timeout: 0});

    await page.type(fName, fNameVal);
    await page.type(sName, sNameVal);
    await page.waitFor(1000);
    await page.type(email, emailVal);
    await page.type(password, passwordVal);
    //await page.waitForTimeout(1000);
    //await page.click('#Capa_1');
    await page.waitFor(1000);
    await page.click('#section-register > div > form > div:nth-child(5) > div > div:nth-child(4) > div > div:nth-child(2) > div > label');  
    await page.waitForSelector(submit);               
    //await page.click(submit);
    await page.focus(submit);
    await page.keyboard.type('\n');
    console.log("submitted");
    await page.screenshot({ path: 'example.png' });
    
   // await browser.close();
  }).catch(err => console.error(err));
  

}}

