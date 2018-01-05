const config = {
  // front end entry point (eg app.js || index.js)
  entry: `${__dirname}/client/public/src/app.js`,
  output: {
    // describe the file that I want webpack to build for me
    filename: 'bundle.js',
    path: `${__dirname}/client/public`
  },
  // creates bundle.js.map to help debugging
  // look for error in the terminal, in bundle
  devtool:'source-map'
};

module.exports = config;
