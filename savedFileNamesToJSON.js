const readline = require('readline');
const moment = require('moment');

// Initialize readline interface for stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Initialize an empty array to store the decoded data
const decodedData = [];

// Read each line from stdin
rl.on('line', function(line) {
  // Extract parts using regex
  const match = line.match(/rendered_html_([^_]+)_(.+)__([^.]+)\.html/);
  if (match) {
    const [_, timestampStr, title, encodedUrl] = match;

    // Convert timestamp to Unix timestamp using moment.js
    const timestamp = moment(timestampStr, "YYYY-MM-DDTHH-mm-ss-SSSZ").unix();

    // Decode Base64 URL
    const url = Buffer.from(encodedUrl, 'base64').toString('ascii');

    // Push the data to the array
    decodedData.push({
      timestamp,
      title,
      url
    });
  }
});

// Output the array to stdout when stdin is closed
rl.on('close', function() {
  console.log(JSON.stringify(decodedData, null, 2));
});
