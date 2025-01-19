const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'input_countries.csv';

const deleteFileIfExist = (filename) => {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    console.log(`${filename} deleted.`);
  }
};

const filterAndWriteData = () => {
  const canadaData = [];
  const usaData = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === 'canada') {
        canadaData.push(row);
      }
      if (row.country.toLowerCase() === 'united states') {
        usaData.push(row);
      }
    })
    .on('end', () => {

      fs.writeFileSync('canada.txt', 'country,year,population\n');
      canadaData.forEach((data) => {
        fs.appendFileSync('canada.txt', `${data.country},${data.year},${data.population}\n`);
      });

      fs.writeFileSync('usa.txt', 'country,year,population\n');
      usaData.forEach((data) => {
        fs.appendFileSync('usa.txt', `${data.country},${data.year},${data.population}\n`);
      });

      console.log('Data filtering and writing completed.');
    });
};

deleteFileIfExist('canada.txt');
deleteFileIfExist('usa.txt');
filterAndWriteData();
