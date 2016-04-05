/// <reference path="../src/system.ts" />
namespace UnitTests 
{
    "use strict";
    export class SystemTests extends TSTest.UnitTest
    {
        testIsNullOrUndefined(): void
        {
            this.assert.isTrue(System.isNullOrUndefined(null), "System.isNullOrUndefined(null)");
            this.assert.isTrue(System.isNullOrUndefined(void (0)), "System.isNullOrUndefined(void(0))");
            this.assert.isFalse(System.isNullOrUndefined(true), "System.isNullOrUndefined(true)");
            this.assert.isFalse(System.isNullOrUndefined(false), "System.isNullOrUndefined(false)");
            this.assert.isFalse(System.isNullOrUndefined(0), "System.isNullOrUndefined(0)");
            this.assert.isFalse(System.isNullOrUndefined(""), "System.isNullOrUndefined(\"\")");
        }

        testIsUndefined(): void
        {
            this.assert.isTrue(System.isUndefined(void (0)), "System.isUndefined(void(0))");
            this.assert.isFalse(System.isUndefined(null), "System.isUndefined(null)");
            this.assert.isFalse(System.isUndefined(false), "System.isUndefined(false)");
            this.assert.isFalse(System.isUndefined(0), "System.isUndefined(0)");
            this.assert.isFalse(System.isUndefined(""), "System.isUndefined(\"\")");
        }

        testIsNumber(): void
        {
            this.assert.isTrue(System.isNumber(0), "System.isNumber(0)");
            this.assert.isTrue(System.isNumber(-1), "System.isNumber(-1)");
            this.assert.isTrue(System.isNumber(1.23456), "System.isNumber(1.23456)");
            this.assert.isTrue(System.isNumber(NaN), "System.isNumber(NaN)");
            this.assert.isTrue(System.isNumber(Infinity), "System.isNumber(Infinity)");
            this.assert.isFalse(System.isNumber("0"), "System.isNumber(\"0\")");
            this.assert.isFalse(System.isNumber(null), "System.isNumber(null)");
            this.assert.isFalse(System.isNumber(void(0)), "System.isNumber(void(0))");
        }

        testIsFiniteNumber(): void
        {
            this.assert.isTrue(System.isFiniteNumber(0), "System.isFiniteNumber(0)");
            this.assert.isTrue(System.isFiniteNumber(-1), "System.isFiniteNumber(-1)");
            this.assert.isTrue(System.isFiniteNumber(1.23456), "System.isFiniteNumber(1.23456)");
            this.assert.isFalse(System.isFiniteNumber(NaN), "System.isFiniteNumber(NaN)");
            this.assert.isFalse(System.isFiniteNumber(Infinity), "System.isFiniteNumber(Infinity)");
        }

        testIsNotANumber(): void
        {
            this.assert.isTrue(System.isNotANumber(NaN), "System.isNotANumber(NaN)");
            this.assert.isFalse(System.isNotANumber(Infinity), "System.isNotANumber(Infinity)");
            this.assert.isFalse(System.isNotANumber(0), "System.isNotANumber(0)");
            this.assert.isFalse(System.isNotANumber(123), "System.isNotANumber(123)");
        }

        testIsString(): void
        {
            this.assert.isTrue(System.isString("0"), "System.isString(\"0\")");
            this.assert.isTrue(System.isString("a"), "System.isString(\"a\")");
            this.assert.isTrue(System.isString("abc123"), "System.isString(\"abc123\")");
            this.assert.isFalse(System.isString(0), "System.isString(0)");
            this.assert.isFalse(System.isString(null), "System.isString(null)");
            this.assert.isFalse(System.isString(void(0)), "System.isString(void(0))");
        }

        testToJson(): void
        {
            var o = {
                a: 1,
                b: "b"
            };

            this.assert.areIdentical('{"a":1,"b":"b"}', System.toJson(o));
        }

        testParseJson(): void
        {
            var o = System.parseJson<any>('{"a":1,"b":"b"}');
            this.assert.areIdentical(1, o.a);
            this.assert.areIdentical("b", o.b);
        }

        testClone(): void
        {
            var o = {
                a: 1,
                b: "b"
            };

            var copy = System.clone<any>(o);
            this.assert.areIdentical(1, copy.a);
            this.assert.areIdentical("b", copy.b);
            this.assert.notEqual(o, copy);
        }
    }
}
 