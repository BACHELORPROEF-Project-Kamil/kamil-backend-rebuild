const fs = require("fs");

function analyzeWeights() {
  const modelJson = JSON.parse(fs.readFileSync("../kamil-extension-rebuild/model/model.json", "utf8"));
  console.log("Model format:", modelJson.format);
}
analyzeWeights();
