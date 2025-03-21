import puppeteer from "puppeteer";
import {JSDOM} from "jsdom";
import {Readability} from "@mozilla/readability";

async function getTweetText(url) {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    const html = await page.content();
    await browser.close();

    const dom = new JSDOM(html, {url});
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    const text = article.textContent;
    const finalText = text.replace(/\s+/g, " ").trim();
    console.log(finalText);

  } catch(e) {
    console.log(e);
  }
}

getTweetText("https://www.notion.so/week-15-Second-brain-app-typescript-1a4fee81f64680c4be9ae46eb2aeaaf9#1bcfee81f64680d3a751ffb05034dff2");
