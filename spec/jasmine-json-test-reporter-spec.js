let JSONReporter = require('../index.js');

describe('JSONReporter', function() {
  it('Have defaults', function() {
    let reporter = new JSONReporter();
    expect(!!reporter.options.file).toBe(true);
    expect(!!reporter.options.beautify).toBe(true);
    expect(!!reporter.options.indentationLevel).toBe(true);
  });

  it('Override defaults', function() {
    let customFile = 'test-filename.json';
    let customIndent = 2;
    let reporter = new JSONReporter({
      file: customFile,
      beautify: false,
      indentationLevel: customIndent,
    });
    expect(reporter.options.file).toBe(customFile);
    expect(reporter.options.beautify).toBe(false);
    expect(reporter.options.indentationLevel).toBe(customIndent);
  });
});
