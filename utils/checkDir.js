import fs from "fs";

/**
 * Check if a directory exists. If not, create one.
 * @param {String} dir - Path to directory as String.
 *
 */
const checkDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export default checkDir;
