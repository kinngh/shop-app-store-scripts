/**
 *
 * Add a search string after running `npm run start` to the `searchString`
 * variable to search in the sitemap for apps that contain that keyword.
 *
 * This generates a markdown table that contains the app name, App Store URL and SASI URL
 *
 * Quick tip:
 *  - Open the markdown in preview mode by hitting Command/Control + Shift + V to show a beautiful table
 * instead of baseline markdown
 */

import fs from "fs";
import payload from "../basedata/sitemap.js";
import checkDir from "../utils/checkDir.js";
import titleCase from "../utils/titleCase.js";

let holder = [];
let searchString = "SearchString";
searchString = searchString.toLowerCase();

payload.forEach((element) => {
  if (
    element.includes(searchString) &&
    !element.includes("/reviews") &&
    !element.includes("/partners") &&
    !element.includes("/collections") &&
    !element.includes("/categories")
  ) {
    holder.push(element);
  }
});

// Table head
let fileString = `# Results for ${searchString}`;
fileString = fileString + "\n|Name|App Store|SASI|";
fileString = fileString + "\n|---|---|---|\n";

//Table Content
holder.forEach((element) => {
  fileString =
    fileString +
    `|${titleCase(
      element.replace(/-/g, " ").replace("https://apps.shopify.com/", "")
    )}|${element}|${element.replace(
      "https://apps.shopify.com/",
      "https://sasi.unionworks.co.uk/app/"
    )}|\n`;
});

checkDir("./data_sets");

fs.writeFile(`./data_sets/${searchString}.md`, fileString, (e) => {
  if (e) {
    console.log("An error occoured while writing to file", e);
  } else {
    console.log(`\n\n----> Written to ./data_sets/${searchString}.md\n\n`);
  }
});
