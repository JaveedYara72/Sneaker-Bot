module.exports = {
    discord: function(user_data){
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

        await page.goto('https://discord.com/register', {
        waitUntil: 'load',
        timeout: 0
        });
        try {
            await page.focus('[type="email"]');
            await page.keyboard.type(user_data.emailVal1, { delay: 100 });

            await page.focus('[type="text"]');
            await page.keyboard.type(user_data.fNameVal1  + '6912', { delay: 100 });

            await page.focus('[type="password"]');
            await page.keyboard.type(user_data.passwordVal1, { delay: 100 });

            await page.type('#react-select-2-input', user_data.monthSpell,{delay:0});

            
            await page.type('#react-select-3-input', user_data.dateVal1,{delay:0});

            
            await page.type('#react-select-4-input', user_data.yearVal1,{delay:0});

            await page.click("button[type=submit]");
        }
        catch(err) {
            console.log('error in email-id')
        }
        //await browser.close();
        }).catch(err => console.error(err));
    }
}