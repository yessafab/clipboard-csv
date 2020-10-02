# Clipboard CSV Evaluation Task

## Instructions

### Clone the project to your local environment

```bash
git clone https://github.com/yessafab/clipboard-csv.git
```

### Enter project directory

```bash
cd clipboard-csv
```

### Run application

```bash
node src/index.js
```

This project was tested using NodeJs following versions:

```bash
v8.11.0
v10.15.3
v12.16.1
v14.9.0
```

### .tsv file support
Input file path is hardcoded in https://github.com/yessafab/clipboard-csv/blob/main/src/index.js#L4 . By default is set to be the provided input.csv file, however the application can handle .tsv files. Just need to change the input file name to a .tsv to test this functionality (there is already an input.tsv file included in the project folder).
