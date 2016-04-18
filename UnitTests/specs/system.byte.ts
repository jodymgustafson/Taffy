﻿/// <reference path="../../src/system.byte.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />
describe("System.Byte", () =>
{
    describe("mod()", () =>
    {
        it("mod(255) should be 255", () => expect(System.Byte.mod(255)).toBe(255));
        it("mod(0) should be 0", () => expect(System.Byte.mod(0)).toBe(0));
        it("mod(256) should be 0", () => expect(System.Byte.mod(256)).toBe(0));
        it("mod(-1) should be 1", () => expect(System.Byte.mod(-1)).toBe(1));
    });

    describe("truncate()", () =>
    {
        it("truncate(255) should be 255", () => expect(System.Byte.truncate(255)).toBe(255));
        it("truncate(0) should be 0", () => expect(System.Byte.truncate(0)).toBe(0));
        it("truncate(256) should be 255", () => expect(System.Byte.truncate(256)).toBe(255));
        it("truncate(-1) should be 0", () => expect(System.Byte.truncate(-1)).toBe(0));
    });

    describe("constructor", () =>
    {
        it("new System.Byte(255) value should be 255", () => expect(new System.Byte(255).value).toBe(255));
        it("new System.Byte(256) should truncate value", () => expect(new System.Byte(256).value).toBe(255));
        it("new System.Byte(255) should not overflow", () => expect(new System.Byte(255).overflow).toBe(false));
        it("new System.Byte(256) should overflow", () => expect(new System.Byte(256).overflow).toBe(true));
    });
});