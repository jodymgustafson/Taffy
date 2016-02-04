/// <reference path="../src/convert.ts" />
module UnitTests 
{
    "use strict";
    export class ConvertTests extends TSTest.UnitTest
    {
        testToString(): void
        {
            this.assert.areIdentical("1", Convert.toString(1.0));
            this.assert.areIdentical("", Convert.toString(null));
            this.assert.areIdentical("", Convert.toString(void(0)));
        }

        testToCamelCase(): void
        {
            this.assert.areIdentical("", Convert.toCamelCase(""), 'Convert.toCamelCase("")');
            this.assert.areIdentical("foo", Convert.toCamelCase("foo"), 'Convert.toCamelCase("foo")');
            this.assert.areIdentical("fooBar", Convert.toCamelCase("foo-bar"), 'Convert.toCamelCase("foo-bar")');
            this.assert.areIdentical("fooBarBaz", Convert.toCamelCase("foo-bar-baz"), 'Convert.toCamelCase("foo-bar-baz")');
        }
    }
}
 