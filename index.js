const fs = require('fs');
const axios = require('axios');
const ejs = require('ejs');

const PAGE_COUNT = 10;
const API_URL = 'https://www.boredapi.com/api/activity';
const TEMPLATE_FILE = 'template.ejs';


// Generate pages 
async function generatePages() {
  try {
    for (let i = 1; i <= PAGE_COUNT; i++) {  

        // Get data from API
      const response = await axios.get(API_URL);

        // Render page
      const data = response.data;
      const pageContent = await ejs.renderFile(TEMPLATE_FILE, { data });

        // Write page to file
      const fileName = `page${i}.html`;
      fs.writeFileSync(fileName, pageContent);



      console.log(`Generated page: ${fileName}`);
    }
  } catch (error) {
    console.error('Error generating pages:', error.message);
  }
}

generatePages();
