/**
 * Returns text in Title Case
 * @param {String} inputString
 * @returns String
 */

const titleCase = (inputString) => {
  inputString = inputString.toLowerCase().split(" ");
  for (var i = 0; i < inputString.length; i++) {
    inputString[i] =
      inputString[i].charAt(0).toUpperCase() + inputString[i].slice(1);
  }
  return inputString.join(" ");
};

export default titleCase;
