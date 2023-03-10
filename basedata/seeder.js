import fs from "fs";

const response = await (
  await fetch(`https://apps.shopify.com/sitemap.xml`)
).text();

fs.writeFile("./basedata/sitemap.xml", response, (err) => {
  err && console.log(err);
});

let replacer = response
  .replace(/<\?.*\?>/g, "")
  .replace(/<urlset.*>/g, "")
  .replace(/<\/urlset.*>/g, "")
  .replace(/<lastmod.*<\/lastmod>/g, "")
  .replace(/<changefreq.*<\/changefreq>/g, "")
  .replace(/<priority.*<\/priority>/g, "")
  .replace(/<\/url>/g, "")
  .replace(/<url>/g, "")
  .replace(/<\/loc>/g, '",')
  .replace(/<loc>/g, "")
  .replace(/https/g, '"https');

//Write it as a JS file so the `payload` can be used as a data input in `./functions`
let finalArray =
  "let payload = [" + replacer + "]; \n\n export default payload;";

fs.writeFile("./basedata/sitemap.js", finalArray, async (err) => {
  if (err) {
    console.log(err);
  }

  const payload = (await import("./sitemap.js")).default;

  /*
  https://apps.shopify.com/app-url
  https://apps.shopify.com/app-url/reviews
  https://apps.shopify.com/partners/partner-url
  https://apps.shopify.com/collections/collection-url
  https://apps.shopify.com/categories/categories-url
*/

  let partnerCount = 0;
  let appCount = 0;
  let collectionCount = 0;
  let categoryCount = 0;

  for (let looper in payload) {
    const currentLoop = payload[looper];

    switch (true) {
      // Do nothing since `/reviews` is a repeat of app-url but points to reviews.
      // and break from this first so things don't get counted twice
      case currentLoop.includes("/reviews"):
        break;

      case currentLoop.includes("/partners/"):
        partnerCount = partnerCount + 1;
        break;
      case currentLoop.includes("/collections/"):
        collectionCount = collectionCount + 1;
        break;
      case currentLoop.includes("/categories/"):
        categoryCount = categoryCount + 1;
        break;

      default:
        appCount = appCount + 1;
    }
  }

  console.log({ partnerCount, appCount, collectionCount, categoryCount });
});
