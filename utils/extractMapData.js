require('dotenv').config();
const axios = require('axios');
//const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Function to make the initial request
async function makeInitialRequest() {
  const apiEndpoint =
    process.env.MAPS_API_ENDPOINT +
    process.env.MAPS_API_KEY + process.env.MAPS_API_SEARCH_PARAMS;
  console.log("1st apiEndpoint", apiEndpoint);
  const data = await axios.get(apiEndpoint).then((response) => response.data);
  console.log("initial pages got: ", data.results.length);
  //const data = await response.json();
  //console.log("data", data);
  // Check if there is a next page token

  await delay(2000); // Introducing delay before making the next request
  if (data.next_page_token) {
    // Store the next_page_token for subsequent requests
    const nextPageToken = data.next_page_token;
    //console.log("nextPageToken", nextPageToken);
    // Call a function to make subsequent requests
    const allResults = await fetchNextPage(nextPageToken, data.results);
    
    console.log("how many we get in the json:", allResults.length);

    // Save all results to a single JSON file
    fs.writeFileSync("all_results.json", JSON.stringify(allResults, null, 2));

    // Download images
    //downloadImages(allResults);
  }
}

// Function to make subsequent requests using the next_page_token
async function fetchNextPage(nextPageToken, allResults) {
  const apiEndpoint = `${process.env.MAPS_API_ENDPOINT}${process.env.MAPS_API_KEY}${process.env.MAPS_API_SEARCH_PARAMS}&pagetoken=${nextPageToken}`;

  console.log("apiEndpoint", apiEndpoint);
  const data = await axios.get(apiEndpoint).then((response) => response.data);
  console.log("length of page", data.results.length);

  await delay(2000); // Introducing delay before making the next request
  //const data = await response.json();
  // Concatenate results from the current page to the array
  allResults.push(...data.results);

  // Check if there is a next page token
  if (data.next_page_token) {
    // Store the next_page_token for further requests
    const nextNextPageToken = data.next_page_token;

    // Call the function recursively to fetch the next page
    await fetchNextPage(nextNextPageToken, allResults);
  }

  // Return the concatenated results
  return allResults.flat();
}

// Function to download a single image using photo_reference
async function downloadImage(photoReference) {
  const apiKey = process.env.MAPS_API_KEY;
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

  const response = await axios.get(imageUrl).then((response) => response.data);
  console.log(response);
  //const imageBuffer = await response.buffer();

  // Save the image to a folder
  const folderPath = path.join(__dirname, 'images');
  fs.mkdirSync(folderPath, { recursive: true });

  const imagePath = path.join(folderPath, `${photoReference}.jpg`);
  fs.writeFileSync(imagePath, response);

  console.log(`Image saved: ${imagePath}`);
}


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Start the process
makeInitialRequest();
