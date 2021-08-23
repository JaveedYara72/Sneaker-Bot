module.exports = {
    hibbett: function(user_data){
        const puppeteer = require('puppeteer');
        const request = require('request-promise-native');
        const poll = require('promise-poller').default;

        const siteDetails = {
            sitekey: '6Ldbp6saAAAAAAwuhsFeAysZKjR319pRcKUitPUO',
            pageurl: 'https://www.hibbett.com/register'
        }
        var fNameVal = user_data.fNameVal1;
        var sNameVal = user_data.sNameVal1;
        var emailVal = user_data.emailVal1; //Change the email as the site will ask for verification
        var passwordVal = user_data.passwordVal1; // set a diff password (with special char)
        var telephoneVal = user_data.telephoneVal1;
        // All selectors
        const fName = 'input[id="dwfrm_profile_customer_firstname"]';
        const sName = 'input[id ="dwfrm_profile_customer_lastname"]';
        const email = 'input[id="dwfrm_profile_customer_email"]';
        const conf_email = 'input[id="dwfrm_profile_customer_emailconfirm"]';
        const password = 'input[id ="dwfrm_profile_login_password"]';
        const conf_password = 'input[id ="dwfrm_profile_login_passwordconfirm"]';
        const telephone = 'input[id="dwfrm_profile_customer_phone"]';
        const check_age = 'input[id="dwfrm_profile_customer_agreetoage"]';
        const btn_expand = 'button[id="registrationExpand"]'
        const check_policy = 'input[id="dwfrm_profile_customer_agreetoterm"]';
        const submit = 'button[id="relate-add-or-update"]'

        var apikey = "383ccac524047ad6b21b7f990f663daf";
        const chromeOptions = {
            headless: false,
            slowMo: 10,
            defaultViewport: null
        };

        (async function main() {
            const browser = await puppeteer.launch({
                headless: false,
                slowMo: 100
            });

            const page = await browser.newPage();

            await page.goto('https://www.hibbett.com/register');
            await page.click(btn_expand);
            await page.type(fName, fNameVal);
            await page.type(sName, sNameVal);
            await page.type(email, emailVal);
            await page.type(conf_email, emailVal);
            await page.type(password, passwordVal);
            await page.type(conf_password, passwordVal);
            await page.type(telephone, telephoneVal);
            await page.click(check_age);
            await page.click(check_policy);
            await page.waitForTimeout(2000);

            console.log("email: " + emailVal);
            console.log("entered email");
            await page.click(submit);
            await page.waitForNavigation();
            await page.click('button[id="recaptcha-anchor"]')
            await page.waitForTimeout(500);
            // const requestId = await initiateCaptchaRequest(apiKey);
            // const password = getPassword();
            // const response = await pollForRequestResults(apiKey, requestId);
            // await page.evaluate(`document.getElementByName("g-recaptcha-response").innerHTML="${response}";`);
            // page.click('#recaptcha-submit');
        })()

        async function initiateCaptchaRequest(apiKey) {
            const formData = {
                method: 'userrecaptcha',
                googlekey: siteDetails.sitekey,
                key: apiKey,
                pageurl: siteDetails.pageurl,
                json: 1
            };
            const response = await request.post('http://2captcha.com/in.php', {
                form: formData
            });
            return JSON.parse(response).request;
        }

        async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
            await timeout(delay);
            return poll({
                taskFn: requestCaptchaResults(key, id),
                interval,
                retries
            });
        }

        function requestCaptchaResults(apiKey, requestId) {
            const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
            return async function () {
                return new Promise(async function (resolve, reject) {
                    const rawResponse = await request.get(url);
                    const resp = JSON.parse(rawResponse);
                    if (resp.status === 0) return reject(resp.request);
                    resolve(resp.request);
                });
            }
        }

        const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))
    }
}