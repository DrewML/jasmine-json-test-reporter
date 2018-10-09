var fs = require('fs')

var defaultOpts = {
	file: 'jasmine-test-results.json',
	beautify: true,
	indentationLevel: 4 // used if beautify === true
};

function reporter(opts) {
	this.options = shallowMerge(defaultOpts, typeof opts === 'object' ? opts : {});
	var specResults = [];
	var masterResults = Object.create(null);

	this.suiteDone = function(suite) {
		suite.specs = specResults;
		masterResults[suite.id] = suite;
		specResults = [];
	};

	this.specDone = function(spec) {
		specResults.push(spec);
	};

	this.jasmineDone = function() {
		var resultsOutput = this.options.beautify ?
			JSON.stringify(masterResults, null, this.options.indentationLevel) :
			JSON.stringify(masterResults);

		fs.writeFileSync(this.options.file, resultsOutput + "\n\n");
	};
};

function shallowMerge(defaults, overrides) {
	var merged = {};

	Object.keys(defaults).forEach(function(key) {
		merged[key] = (key in overrides) ? overrides[key] : defaults[key]
	});

	return merged;
};

module.exports = reporter;
