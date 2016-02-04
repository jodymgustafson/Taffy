/// <reference path="system.tests.ts" />
/// <reference path="convert.tests.ts" />

(function ()
{
    "use strict";
    var testSuite = new TSTest.UnitTestSuite();

    // Add our unit tests
    testSuite.addUnitTest(new UnitTests.SystemTests());
    testSuite.addUnitTest(new UnitTests.ConvertTests());
    testSuite.addUnitTest(new UnitTests.SystemByteTests());

    // Run it
    testSuite.runWhenDOMReady(() =>
    {
        // Log out to document
        testSuite.addLogger(new TSTest.ElementLogger());
    });
})();