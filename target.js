module.exports = {
    target:  function(user_data){
        const {Builder, By, Key, until, WebDriver, Capabilities, setChromeBinaryPath} = require('selenium-webdriver');
            const chrome = require('selenium-webdriver/chrome');
            const { uniqueNamesGenerator, adjectives, colors, starWars, NumberDictionary } = require('unique-names-generator');

            useProxies = false;
            // password = "$FR0z3N4CC0uN7S!"
            password = user_data.passwordVal1
            catchall = "gmail.com"
            let driver = '';
            function sleep(ms) {  // similar to inbuilt function - time.sleep()- in python
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            (async function createAccount() {
                if (useProxies) {
                    proxy0 = "ip:port:user:pass";
                    proxy = proxy0.split(":");

                    PROXY_HOST = proxy[0]; // rotating proxy
                    PROXY_PORT = parseInt(proxy[1]);
                    PROXY_USER = proxy[2];
                    PROXY_PASS = proxy[3];

                    manifest_json = `
                        {
                            "version": "1.0.0",
                            "manifest_version": 2,
                            "name": "Chrome Proxy",
                            "permissions": [
                                "proxy",
                                "tabs",
                                "unlimitedStorage",
                                "storage",
                                "<all_urls>",
                                "webRequest",
                                "webRequestBlocking"
                            ],
                            "background": {
                                "scripts": ["background.js"]
                            },
                            "minimum_chrome_version":"22.0.0"
                        }`;

                    background_js = `
                        var config = {
                                mode: "fixed_servers",
                                rules: {
                                singleProxy: {
                                    scheme: "http",
                                    host: "${PROXY_HOST}",
                                    port: parseInt(${PROXY_PORT})
                                },
                                bypassList: ["localhost"]
                                }
                            };
                    
                        chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});
                    
                        function callbackFn(details) {
                            return {
                                authCredentials: {
                                    username: "${PROXY_USER}",
                                    password: "${PROXY_PASS}"
                                }
                            };
                        }
                    
                        chrome.webRequest.onAuthRequired.addListener(
                                    callbackFn,
                                    {urls: ["<all_urls>"]},
                                    ['blocking']
                        );`;

                const get_chromeDriver = (use_proxy, user_agent) => {
                // path -- not completed

                    let chrome_options = new chrome.Options();
                    chrome_options.addArguments("start-maximized");

                    if (use_proxy) {
                        pluginFile = "proxy_auth_plugin.zip";
                        var zip = new JSZip();

                        //write to zip
                    }
                    if (user_agent) chrome_options.addArguments(`--user-agent=${user_agent}`);

                    let driverr = new Builder()
                        .forBrowser("chrome")
                        .setChromeOptions(chrome_options)
                        .build();

                    return driverr;
                };

                driver = get_chromeDriver();
            } else {
                //path

                chrome_options = new chrome.Options();

                //chrome_options.setExperimentalOption("excludeSwitches", ["enable-automation"]);
                //chrome_options.setExperimentalOption("useAutomationExtension", false);
                chrome_options.addArguments("--disable-blink-features");
                chrome_options.addArguments(
                    "--disable-blink-features=AutomationControlled"
                );
                chrome_options.addArguments("start-maximised");

                driver = new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(chrome_options)
                    .build();
            } // if - else ends here

                const typeKeys = (element, text) => {
                text.split("").map((c) => {
                    element.sendKeys(c);
                    sleep(Math.random() * (250 - 80) + 75);
                });
                };

            // stealth

                try {
                await driver.get("https://www.target.com");

                let account = await driver.findElement(By.id("account"));
                account.click();
                await sleep(Math.random() * 5500);

                let createAccount = await driver.findElement(By.id("accountNav-createAccount"));
                createAccount.click();

                await sleep(Math.random() * 12000);

                let emailBox = await driver.findElement(By.id("username"));
                await emailBox.click();

                let fullName = uniqueNamesGenerator({ dictionaries: [adjectives, colors] });
                let nameSplit = fullName.split("_");
                // let fname = nameSplit[0];
                // let lname = nameSplit[1];

                let fname =  user_data.fNameVal1;
                let lname =  user_data.sNameVal1;
                let randomDigits = uniqueNamesGenerator({
                    dictionaries: [NumberDictionary],
                });

                // let email = `${fname}${lname}${randomDigits}@${catchall}`;
                let email = user_data.emailVal1

                typeKeys(emailBox, email);

                let fNameBox = await driver.findElement(By.id("firstname"));
                fNameBox.click();
                typeKeys(fNameBox, fname);

                let lNameBox = await driver.findElement(By.id("lastname"));
                lNameBox.click();
                typeKeys(lNameBox, lname);

                let passBox = await driver.findElement(By.id("password"));
                passBox.click();
                typeKeys(passBox, password);

                let createAccount1 = await driver.findElement(By.id("createAccount"));
                await createAccount1.click();

                await sleep(3000); // milliseconds

                try {
                    // let accept = await driver.findElement(By.id("circle-join-free"));
                    // accept.click();
                    // console.log(`Success! ${email}:${password}`);

                    // await page.waitForNavigation();
                    // console.log("submitted");
                    // await page.waitForTimeout(1000);
                    sleep(20000)
                    // https://www.receivesms.co/us-phone-number/3458/


                    driver.quit();
                } catch (error) {
                    console.error(error);
                    driver.quit();
                }
                } catch (error) {
                console.error(error);
                }
            })();
    }
}