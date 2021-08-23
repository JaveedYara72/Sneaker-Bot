module.exports = {
    outlook:function(user_data){
        const puppeteer = require('puppeteer-extra');
        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());

        puppeteer.launch({
            headless: false,
            slowMo: 100
        }).then(async (browser) => {
    
        const page = await browser.newPage();
        await page.setViewport({
            width: 1100,
            height: 810
        });
    
        await page.goto('https://signup.live.com/?lic=1', {
            waitUntil: 'load',
            timeout: 0
        });
        try {
            await page.type('#MemberName', user_data.emailVal1 + '6912432', {delay:0});
            console.log("entered email");
            await page.click('#iSignupAction');
            await page.waitForTimeout(1000);
            console.log('Password page')
        }
        catch(err) {
            console.log('error in email-id')
        }
            
            try {
            await page.type('#PasswordInput', user_data.passwordVal1,{delay:0});
            await page.waitForTimeout(200);
            console.log('Password entered')
            await page.click('#iSignupAction');
            await page.waitForTimeout(1000);
            console.log('Username page')
            }
            catch(err) {
            console.log('error in password')
            }
            
            try {
            await page.type('#FirstName', user_data.fNameVal1, {delay:0});
            await page.type('#LastName', user_data.sNameVal1, {delay:0});
            console.log('Username Entered')
            await page.click('#iSignupAction');
            await page.waitForTimeout(1000);
            }
            catch(err) {
            console.log('error in name');
            }
            
            try {
            await page.type('#Country', user_data.country,{delay:0});
            await page.type('#BirthMonth', user_data.monthSpell,{delay:0});
            await page.type('#BirthDay', user_data.dateVal1,{delay:0});
            await page.type('#BirthYear', user_data.yearVal1,{delay:0});
            await page.click('#iSignupAction');
            await page.waitForTimeout(1000);
            
            }
            catch(err) {
            console.log('some error in ')
            }
            
            //await browser.close();
        }).catch(err => console.error(err));
    }
}