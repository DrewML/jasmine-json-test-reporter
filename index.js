var fs = require('fs')

var defaultOpts = {
	file: 'jasmine-test-results.json',
	beautify: true,
	indentationLevel: 4 // used if beautify === true
};

function reporter(opts) {
	var options = shallowMerge(defaultOpts, typeof opts === 'object' ? opts : {});
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
		var resultsOutput = options.beautify ?
			JSON.stringify(masterResults, null, options.indentationLevel) :
			JSON.stringify(masterResults);

		fs.writeFileSync(options.file, resultsOutput);
	};
};

function shallowMerge(obj1, obj2) {
	var mergedObj = {};

	Object.keys(obj1).forEach(function(key) {
		if (!obj2[key]) mergedObj[key] = obj1[key];
		else mergedObj[key] = obj2[key];
	});

	return mergedObj;
};

module.exports = reporter;