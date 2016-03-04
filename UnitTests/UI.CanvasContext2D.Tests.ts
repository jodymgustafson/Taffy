/// <reference path="../src/system.ts" />
/// <reference path="../src/ui.canvascontext2d.ts" />
module UnitTests 
{
    "use strict";
    let context2d = new UI.CanvasContext2D(document.createElement('canvas'));

    export class UICanvasContext2DTests extends TSTest.UnitTest
    {

        testFillStyle(): void
        {
            context2d.fillStyle("rgb(1,2,3)");
            this.assert.areIdentical("#010203", context2d.fillStyle());
        }

        testCreateLinearGradient(): void
        {
            var lg = context2d.createLinearGradient(0, 0, 10, 10);
            this.assert.isNotNullOrUndefined(lg);
        }
    }
}
