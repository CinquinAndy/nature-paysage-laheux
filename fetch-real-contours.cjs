const fs = require('fs');
const https = require('https');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function simplifyContour(coordinates, step = 7) {
  const simplified = [];
  for (let i = 0; i < coordinates.length; i += step) {
    simplified.push(coordinates[i]);
  }
  // Ensure the polygon is closed
  if (simplified[0] !== simplified[simplified.length - 1]) {
    simplified.push(coordinates[coordinates.length - 1]);
  }
  return simplified;
}

function formatCoordinates(coords) {
  return coords.map(c => `\t\t\t\t\t\t[${c[0]}, ${c[1]}],`).join('\n');
}

async function main() {
  console.log('Fetching real contours from API...\n');
  
  // Gétigné (44063)
  const getige = await fetchData('https://geo.api.gouv.fr/communes/44063?fields=contour&format=geojson&geometry=contour');
  const getigneSimplified = simplifyContour(getige.geometry.coordinates[0], 7);
  console.log(`// Gétigné (44063) - ${getigneSimplified.length} points (simplified from ${getige.geometry.coordinates[0].length})`);
  console.log('coordinates: [');
  console.log('\t\t\t\t\t[');
  console.log(formatCoordinates(getigneSimplified));
  console.log('\t\t\t\t\t],');
  console.log('\t\t\t\t],\n\n');
  
  // Cugand (85076)
  const cugand = await fetchData('https://geo.api.gouv.fr/communes/85076?fields=contour&format=geojson&geometry=contour');
  const cugandSimplified = simplifyContour(cugand.geometry.coordinates[0], 10);
  console.log(`// Cugand (85076) - ${cugandSimplified.length} points (simplified from ${cugand.geometry.coordinates[0].length})`);
  console.log('coordinates: [');
  console.log('\t\t\t\t\t[');
  console.log(formatCoordinates(cugandSimplified));
  console.log('\t\t\t\t\t],');
  console.log('\t\t\t\t],\n\n');
  
  // Boussay (44022)
  const boussay = await fetchData('https://geo.api.gouv.fr/communes/44022?fields=contour&format=geojson&geometry=contour');
  const boussaySimplified = simplifyContour(boussay.geometry.coordinates[0], 8);
  console.log(`// Boussay (44022) - ${boussaySimplified.length} points (simplified from ${boussay.geometry.coordinates[0].length})`);
  console.log('coordinates: [');
  console.log('\t\t\t\t\t[');
  console.log(formatCoordinates(boussaySimplified));
  console.log('\t\t\t\t\t],');
  console.log('\t\t\t\t],');
}

main().catch(console.error);

