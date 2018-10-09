var JSONReporter = require('../index.js')

describe('JSONReporter', function() {
	it('Have defaults', function() {
		var reporter = new JSONReporter();
		expect(!!reporter.options.file).toBe(true);
		expect(!!reporter.options.beautify).toBe(true);
		expect(!!reporter.options.indentationLevel).toBe(true);
	});

	it('Override defaults', function() {
		var customFile = 'test-filename.json';
		var customIndent = 2;
		var reporter = new JSONReporter({
			file: customFile,
			beautify: false,
			indentationLevel: customIndent
		});
		expect(reporter.options.file).toBe(customFile);
		expect(reporter.options.beautify).toBe(false);
		expect(reporter.options.indentationLevel).toBe(customIndent);
	});
});
