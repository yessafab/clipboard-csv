const FileParser = require('./model/FileParser.js');
const ResultsCalculator = require('./model/ResultsCalculator.js');

const INPUT_FILE_NAME= 'input.csv';

const parser = new FileParser(INPUT_FILE_NAME)
const data = parser.getDataFromFile();

const calculator = new ResultsCalculator(data);
const results = calculator.calculateResults()

parser.saveResultsToCsvFile(results);
