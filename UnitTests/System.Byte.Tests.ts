/// <reference path="../src/system.byte.ts" />
module UnitTests 
{
    "use strict";
    export class SystemByteTests extends TSTest.UnitTest
    {
        testMinMax(): void
        {
            this.assert.areIdentical(255, System.Byte.MAX_VALUE, "System.Byte.MAX_VALUE");
            this.assert.areIdentical(0, System.Byte.MIN_VALUE, "System.Byte.MIN_VALUE");
        }

        testMod(): void
        {
            this.assert.areIdentical(255, System.Byte.mod(255), "System.Byte.mod(255)");
            this.assert.areIdentical(0, System.Byte.mod(0), "System.Byte.mod(0)");
            this.assert.areIdentical(0, System.Byte.mod(256), "System.Byte.mod(256)");
            this.assert.areIdentical(1, System.Byte.mod(-1), "System.Byte.mod(-1)");
        }

        testTruncate(): void
        {
            this.assert.areIdentical(255, System.Byte.truncate(255), "System.Byte.truncate(255)");
            this.assert.areIdentical(0, System.Byte.truncate(0), "System.Byte.truncate(0)");
            this.assert.areIdentical(255, System.Byte.truncate(256), "System.Byte.truncate(256)");
            this.assert.areIdentical(0, System.Byte.truncate(-1), "System.Byte.truncate(-1)");
        }

        testConstructor(): void
        {
            this.assert.areIdentical(255, new System.Byte(255).value, "System.Byte(255).value");
            this.assert.isFalse(new System.Byte(255).overflow, "System.Byte(255).overflow");
            this.assert.areIdentical(255, new System.Byte(256).value, "System.Byte(256).value");
            this.assert.isTrue(new System.Byte(256).overflow, "System.Byte(256).overflow");
        }
    }
}
 