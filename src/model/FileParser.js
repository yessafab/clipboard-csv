const fs = require('fs');

const INPUT_VAR_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const OUTPUT_FILE_NAME = 'output.csv';
const CSV_FILE_TYPE = 'csv';
const CSV_FILE_SEPARATOR = ',';
const TSV_FILE_TYPE = 'tsv';
const TSV_FILE_SEPARATOR = '\t';

module.exports = class FileParser {
  constructor(inputFileName) {
    this.inputFileName = inputFileName;
    this.outputFileName = OUTPUT_FILE_NAME;
    this.data = this.parseFileToArray();
  }

  getDataFromFile() {
    console.log(`Reading file: ${this.inputFileName} \n`);
    console.log(`Input: \n ${this.data} \n`);
    const inputValues = this.getInputValueObject();
    const algebraicExpressions = this.getAlgebraicExpressions();

    return { inputValues, algebraicExpressions };
  }

  saveResultsToCsvFile(results) {
    const inputValues = this.getInputValues();
    const csvFormattedData = this.parseArrayToCsv([inputValues, ...results]);
    fs.writeFileSync(this.outputFileName, csvFormattedData, 'utf8');

    console.log(`Successfully saved file: ${OUTPUT_FILE_NAME} \n`);
    console.log(`Output: \n ${csvFormattedData} \n`);
  }

  parseArrayToCsv(array) {
    return array.join("\r\n");
  }

  parseFileToArray() {
    const fileContent = this.getFileContent();
    const dataArray = fileContent.split(/\r?\n/);
    const contentSeparator = this.getFileContentSeparator();

    return dataArray.map(line => line.split(contentSeparator));
  }

  getFileType() {
    const fileNameArray = this.inputFileName.split('.');
    const fileType = fileNameArray.pop();

    return fileType;
  }

  getFileContentSeparator() {
    const filetype = this.getFileType();

    if (filetype === CSV_FILE_TYPE) {
      return CSV_FILE_SEPARATOR;
    }

    if (filetype === TSV_FILE_TYPE) {
      return TSV_FILE_SEPARATOR;
    }

    throw Error('Input file type not recognized. File types allowed: .csv and .tsv');
  }

  getFileContent() {
    const data = fs.readFileSync(this.inputFileName, 'utf8');
    this.validateData(data);

    return data;
  }

  validateData(data) {
    const rx = /^[-+*/(),A-K0-9\s]+$/
    const isValidData = rx.test(data);

    if (isValidData) {
      return;
    }

    const message = `File ${inputFileName} contains invalid characters. Only integers, characters A to K and the following special characters - + * / ( ), are allowed`
    throw Error(message);
  }

  getAlgebraicExpressions() {
    return this.data.slice(1);
  }

  getInputValues() {
    return this.data[0].map(inputValue => parseInt(inputValue));
  }

  getInputValueObject() {
    const values = this.getInputValues()
    // creates an object like: { A: 7, B: 10, ... , K: 22 } - makes it easier to deconstruct
    const valueObject = values.reduce((object, value, index) => {
      object[INPUT_VAR_NAMES[index]] = value;
      return object;
    }, {})

    return valueObject;
  }
}
