/// <reference path="system.tests.ts" />
/// <reference path="convert.tests.ts" />
/// <reference path="ui.canvascontext2d.tests.ts" />
/// <reference path="system.byte.tests.ts" />

(function ()
{
    "use strict";
    var testSuite = new TSTest.UnitTestSuite();

    // Add our unit tests
    testSuite.addUnitTest(new UnitTests.SystemTests());
    testSuite.addUnitTest(new UnitTests.ConvertTests());
    testSuite.addUnitTest(new UnitTests.SystemByteTests());
    testSuite.addUnitTest(new UnitTests.AppStorageAsyncTests());
    testSuite.addUnitTest(new UnitTests.ChromeAppStorageTests());
    testSuite.addUnitTest(new UnitTests.UICanvasContext2DTests());

    // Run it
    testSuite.runWhenDOMReady(() =>
    {
        // Log out to document
        testSuite.addLogger(new TSTest.ElementLogger());
    });
})();