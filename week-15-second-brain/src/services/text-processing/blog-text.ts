import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export default async function getBlogText(url: string) {
	const browser = await puppeteer.launch({ headless: "new" as any });
	const page = await browser.newPage();

	try {
		await page.goto(url, {
			waitUntil: "networkidle2",
		});
		const html = await page.content();
		await browser.close();

		const dom = new JSDOM(html, { url });
		const reader = new Readability(dom.window.document);
		const article = reader.parse();
		if (!article || !article.textContent) {
			throw new Error("failed to read");
		}
		const text = article.textContent;
		const finalText = text.replace(/\s+/g, " ").trim();
		console.log(finalText);
	} catch (e) {
		console.log(e);
	}
}
