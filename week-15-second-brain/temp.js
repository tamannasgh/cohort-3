import puppeteer from "puppeteer";

async function getTweetText(url) {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    const tweetText = await page.$eval("article div[lang]", el => el.innerText);
    console.log(tweetText);
  } catch(e) {
    console.log(e);
  } finally {
    await browser.close();
  }
}

getTweetText("https://x.com/tamannastwt/status/1902735108878295496");
