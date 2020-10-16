const puppeteer = require('puppeteer');

const signinBtn = '#header > gs-header > div > div > a.signin';
const loginField = '#dialogContent_0 > md-dialog-content > form > div:nth-child(1) > input';
const passwordField = '#dialogContent_0 > md-dialog-content > form > div:nth-child(2) > input';
const submitBtn = '#dialogContent_0 > md-dialog-content > form > button'
const credentials = require('./MyLoginInfo.js');

async function main() {
   const browser = await puppeteer.launch({
      headless: false,
      dumpio: false,
      devtools: false
   });

   //Open site
   const page = await browser.newPage();
   await page.setViewport({ width: 1200, height: 720 })
   await page.goto('https://gurushots.com/', { waitUntil: 'networkidle2' });
   //Login
   await page.click(signinBtn);
   await page.click(loginField);
   await page.waitForTimeout (Math.random()*1000);
   await page.keyboard.type(credentials.email);
   await page.waitForTimeout(Math.random()*1000);
   await page.click(passwordField);
   await page.keyboard.type(credentials.password);
   await page.click(submitBtn);
   await page.waitForNavigation;
   await page.waitForTimeout(4000);
   await page.evaluate(async () => {
      const voteBtns = document.getElementsByClassName('icon-vote-negative');
      const boostBtns = document.getElementsByClassName('boost-state-available');

    
      // try to boost
      if (boostBtns.length >= 1) {
         for (var btn of boostBtns) {

            $(btn).click();
            await new Promise(resolve => setTimeout(resolve, 4000));
            const picForVote = document.querySelector('div.c-modal-boost__photos > div:nth-child(1)');
            $(picForVote).click();
            await new Promise(resolve => setTimeout(resolve, 4000));

         }
      }



   });




   //await browser.close();
}


main();
