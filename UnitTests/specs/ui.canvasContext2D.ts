/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../src/ui.canvascontext2d.ts" />
describe("UI.CanvasContext2D", () =>
{
    var context2d: UI.CanvasContext2D;

    beforeAll(() =>
    {
        context2d = new UI.CanvasContext2D(document.createElement('canvas'));
        context2d.canvas.width = 30;
        context2d.canvas.height = 40;
    });

    // Note: Spies don't seem to work on canvas context
    //describe("clear", () =>
    //{
    //    it("should clear entire canvas", () =>
    //    {
    //        spyOn(context2d.context, "clearRect").and.callThrough();
    //        expect(context2d.context.clearRect).toHaveBeenCalledWith(30, 40);

    //    });
    //});

    describe("fillStyle", () =>
    {
        it("should change fill style", () =>
        {
            context2d.fillStyle("rgb(1,2,3)");
            expect(context2d.fillStyle()).toBe("#010203");
        });
    });

    describe("linearGradient", () =>
    {
        it("should create a linear gradient", () =>
        {
            let lg = context2d.createLinearGradient(0, 0, 10, 10);
            expect(lg).toBeTruthy();
            context2d.fillStyle(lg);
            expect(context2d.fillStyle()).toBe(lg);
        });
    });

    describe("createImageData", () =>
    {
        it("should create image data of a specified size", () =>
        {
            let d = context2d.createImageData(10, 20);
            expect(d.width).toBe(10);
            expect(d.height).toBe(20);
        });

        it("should create image data same size as canvas", () =>
        {
            let src = context2d.createImageData(10, 20);
            let d = context2d.createImageData(src);
            expect(d.width).toBe(10);
            expect(d.height).toBe(20);
        });
    });
});