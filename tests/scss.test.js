const glob = require("glob");
const path = require("path");
const sassTrue = require("sass-true");

console.log(describe);
// Find all of the SCSS files that end in `*.spec.scss` in any directory in this project.
// Use path.resolve because True requires absolute paths to compile test files.
const sassTestFiles = glob.sync(path.resolve(__dirname, "../**/*.test.scss"));

// Run True on every file found with the describe and it methods provided.
sassTestFiles.forEach(file => sassTrue.runSass({ file }, { describe, it }));
