import puppeteer from "puppeteer";

export default async function getTweetText(url: string) {
	const browser = await puppeteer.launch({ headless: "new" as any });
	const page = await browser.newPage();

	try {
		await page.goto(url, {
			waitUntil: "networkidle2",
		});
		const tweetText = await page.$eval(
			"article div[lang]",
			(el) => el.innerText
		);
		console.log(tweetText);
		return tweetText;
	} catch (e) {
		console.log(e);
	} finally {
		await browser.close();
	}
}
