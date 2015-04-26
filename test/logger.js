import Logger from "../src/modules/logger.es6";

var assert = require("assert");
describe('Logger', function() {
    describe('log', function() {
        it('should return false when debugMode is false', function() {
            Logger.debugMode = false;
            assert.equal(false, Logger.log('test'));
        });
    })
});

//TODO: Write some tests :)
