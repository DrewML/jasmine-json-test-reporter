var fs = require('fs');

var defaultOpts = {
  file: 'jasmine-test-results.json',
  beautify: true,
  indentationLevel: 4, // used if beautify === true
};

function reporter(opts) {
  this.options = shallowMerge(defaultOpts, typeof opts === 'object' ? opts : {});
  let specResults = [];
  let masterResults = {};
  let summary = {success: true, pass:0, fail:0};

  this.suiteDone = function(suite) {
    suite.specs = specResults;
	specResults.forEach(r => console.log(r));
    masterResults[suite.id] = suite;
    specResults = [];
  };

  this.specDone = function(spec) {
    specResults.push(spec);
    if (spec.passed) {
    	summary.pass++;
	} else {
		summary.fail++;
		summary.success = false;
	}
  };

  this.jasmineDone = function() {
  	masterResults.summary = summary;
    let resultsOutput = this.options.beautify ?
			JSON.stringify(masterResults, null, this.options.indentationLevel) :
			JSON.stringify(masterResults);

    fs.writeFileSync(this.options.file, resultsOutput + '\n\n');
  };
};

function shallowMerge(defaults, overrides) {
  let merged = {};

  Object.keys(defaults).forEach(function(key) {
    merged[key] = (key in overrides) ? overrides[key] : defaults[key];
  });

  return merged;
};

module.exports = reporter;
