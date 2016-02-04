/** Collection of assertion methods */
module Assert
{
    "use strict";
    export class AssertInfo
    {
        actual: any;
        expected: any;
        name: string;
    }

    /** Asserts that a value is true */
    export function isTrue(b: boolean, name: string = ""): void
    {
        Assert.areIdentical(true, b, name);
    }

    /** Asserts that a value is false */
    export function isFalse(b: boolean, name: string = ""): void
    {
        Assert.areIdentical(false, b, name);
    }

    /** Asserts that a value is null or undefined */
    export function isNullOrUndefined(val: any): void
    {
        if (!(val === null || typeof val === "undefined"))
            Assert.fail("null or undefined", val);
    }

    /** Asserts that a value is undefined */
    export function isUndefined(val: any): void
    {
        if (typeof val !== "undefined")
            Assert.fail("undefined", val);
    }

    /** Determines if two objects are identical using strict equality operator (===) */
    export function areIdentical(expected: any, actual: any, name: string = ""): void
    {
        if (expected !== actual)
        {
            Assert.fail(expected, actual, name);
        }
    }
    /** Determines if two objects are not identical using strict equality operator (===) */
    export function notIdentical(expected: any, actual: any, name: string = ""): void
    {
        if (expected === actual)
        {
            Assert.fail(expected, actual, name);
        }
    }

    /** Determines if the members of two arrays are equal */
    export function areArraysEqual(expected: any[], actual: any[], name: string = "")
    {
        Assert.areIdentical(expected.length, actual.length, name);
        for (var i = 0; i < expected.length; i++)
        {
            Assert.areEqual(expected[i], actual[i]);
        }
    }

    /** Determines if the members of two arrays are identical */
    export function areArraysIdentical(expected: any[], actual: any[], name: string = "")
    {
        Assert.areIdentical(expected.length, actual.length, name);
        for (var i = 0; i < expected.length; i++)
        {
            Assert.areIdentical(expected[i], actual[i]);
        }
    }

    /** Determines if two objects are equal using equality operator (==) */
    export function areEqual(expected: any, actual: any, name: string = ""): void
    {
        if (expected != actual)
        {
            Assert.fail(expected, actual, name);
        }
    }
    /** Determines if two objects are not equal using equality operator (==) */
    export function notEqual(expected: any, actual: any, name: string = ""): void
    {
        if (expected == actual)
        {
            Assert.fail(expected, actual, name);
        }
    }

    /** Throws a fail exception */
    export function fail(expected: any, actual: any, name: string = ""): void
    {
        var info = new AssertInfo();
        info.name = name;
        info.expected = expected;
        info.actual = actual;
        throw info;
    }
} 