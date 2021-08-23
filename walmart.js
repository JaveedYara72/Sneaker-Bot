module.exports = {
    walmart:function(user_data){
        // Password is randomly generated
        const {Builder, By, Key, until, WebDriver, Capabilities, setChromeBinaryPath} = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');
        const { uniqueNamesGenerator, adjectives, colors, starWars, NumberDictionary } = require('unique-names-generator');

        useProxies = false;
        password = "$FR0z3N4CC0uN7S!"
        catchall = "gmail.com"

        let driver = '';

        function sleep(ms) {  // similar to inbuilt function - time.sleep()- in python
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function createAccount(){
            if(useProxies){

                proxy0 = "ip:port:user:pass"
                proxy = proxy0.split(":")
                
                PROXY_HOST = proxy[0]  // rotating proxy
                PROXY_PORT = parseInt(proxy[1])
                PROXY_USER = proxy[2]
                PROXY_PASS = proxy[3]
                
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
                }`
                
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
                );`
            
            
            
                const get_chromeDriver = async (use_proxy, user_agent) =>{
                // path - not completed
                    let chrome_options = new chrome.Options();
                    chrome_options.addArguments('start-maximized');
                    
            ;
                    if(use_proxy){
                        pluginFile = 'proxy_auth_plugin.zip';
                        var zip = new JSZip();
                        //write to zip -- not completed
                    }
                    if(user_agent)
                        chrome_options.addArguments(`--user-agent=${user_agent}`);
            
                    //chrome_options.setChromeBinaryPath('C:\chromedriver.exe');
                
                    let driverr =  await new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(chrome_options)
                    .build();
            
                    return driverr;
                }
            
                driver = get_chromeDriver();
            }
            
            else{
                    /*path
            
            
                    */
                    chrome_options = new chrome.Options();
                
                //chrome_options.setExperimentalOption("excludeSwitches", ["enable-automation"]);
                //chrome_options.setExperimentalOption("useAutomationExtension", false);
                    chrome_options.addArguments("--disable-blink-features");   
                    chrome_options.addArguments("--disable-blink-features=AutomationControlled");
                    chrome_options.addArguments("start-maximised")

                // chrome_options.setChromeBinaryPath('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe');

                    driver = new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(chrome_options)
                    .build();
            
                //stealth -- not available in selenium for javascript-- but puppeteer has it
                }       
            
            
            try {
                await driver.get('https://www.walmart.com');
                await sleep(Math.random() * 4000);
            
                /*   if(driver.getCurrentUrl().includes('blocked')){
                    
                    console.log('Received Captcha');
                    let blocked = true;
                    
                    while(blocked){
                        if(driver.getCurrentUrl().includes('blocked')){
                            sleep(5000);
                            blocked = false;
                        }
                    }
                }
            */  
                const typeKeys = (element, text)=>{
                    text.split('').map(c =>{
                        element.sendKeys(c);
                        sleep( Math.random() * 4000);
                    })   
                }
                
                
            // let account = await driver.findElement(By.id("account")) 
                //account.click();
            
                //sleep( Math.random() * (250-80) + 75);
            
                let account1 = await driver.findElement(By.id("hf-account-flyout"));
                account1.click();
            
                await sleep(Math.random() * 4000);
                
                let signIn = await driver.findElement(By.xpath("//*[@title='Sign In']")); 
                signIn.click();
                
                await sleep(Math.random() * 4000);

                let createAccount = await  driver.findElement(By.xpath("//*[@data-automation-id='signin-sign-up-btn']")); 
                createAccount.click();
                
                await sleep(Math.random() * 4000);
                
                let fnBox = await driver.findElement(By.id("first-name-su"));
                fnBox.click();
                
                await sleep(Math.random() * 4000);
            
                let fullName = uniqueNamesGenerator({ dictionaries: [adjectives, colors] });
                let nameSplit = fullName.split('_');
                // let fname = nameSplit[0];
                // let lname = nameSplit[1];

                let fname = user_data.fNameVal1
                let lname = user_data.sNameVal1
                let randomDigits = uniqueNamesGenerator({dictionaries : [NumberDictionary]});
            
                // let email = `${fname}${lname}${randomDigits}@${catchall}`;
                let email = user_data.fNameVal1 + user_data.sNameVal1 + '6912' + "@gmail.com";
            
                typeKeys(fnBox, fname);
            
                fnBox = await driver.findElement(By.id("first-name-su"));
                fnBox.click();
            
                typeKeys(fnBox, fname);
            
                lnBox = await driver.findElement(By.id("last-name-su"));
                lnBox.click();
            
                typeKeys(lnBox, lname);
            
                emailBox = await driver.findElement(By.id("email-su"));
                emailBox.click()
            
                typeKeys(emailBox, email)
            
                passBox = await driver.findElement(By.id("password-su"));
                passBox.click()
            
                typeKeys(passBox, password)
            
                rememberMe = await driver.findElement(By.xpath("//*[@for='remember-me-su']"));
                rememberMe.click();
            
                emailCheckbox = await driver.findElement(By.xpath("//*[@for='su-newsletter']"));
                emailCheckbox.click();
            
                createAccount1 = await driver.findElement(By.xpath("//*[@data-automation-id='signup-submit-btn']"));
                await createAccount1.click();
            
                sleep(7000);

                // Click and hold
                // await WebDriverWait(driver,15).until(EC.presence_of_element_located((By.xpath,"//*[@id='WVICwtPkcfoEvLv']")))
                // clckhold = await driver.findElement(By.xpath("//*[@id='WVICwtPkcfoEvLv']"))
                // click_and_hold(on_element = clckhold)

                await page.waitForNavigation();
                console.log("submitted");
                await page.waitForTimeout(1000);

                driver.quit();
                console.log(email+" : "+password);
                
            } catch (error) {
                console.error(error);
            }
            
        };

        createAccount();

    }
}