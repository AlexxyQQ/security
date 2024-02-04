const fs = require("fs");

// HTTPS configuration
const httpsConfig = {
  https: {
    key: fs.readFileSync("path/to/key.pem"),
    cert: fs.readFileSync("path/to/cert.pem"),
  },
};

module.exports = {
  // Other configurations...
  devServer: {
    ...httpsConfig,
    // other devServer options...
  },
};
