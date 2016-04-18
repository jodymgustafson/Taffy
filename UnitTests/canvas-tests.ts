﻿import CanvasContext2D = UI.CanvasContext2D;

namespace CanvasTests
{
    let context: CanvasContext2D;

    System.ready(() =>
    {
        context = new CanvasContext2D(document.getElementsByTagName("canvas").item(0));
        testLinearGradient();
        testRadialGradient();
        testPattern();
        testImageData();
        testRoundedRectangle();
        testDrawText();
    });

    function testDrawText()
    {
        context.font("32px serif")
            .textBaseline(CanvasContext2D.TextBaseline.top)
            .drawText("Taffy!", 0, 200)
            .fillText("Taffy!", 0, 232, context.measureText("Taffy!") / 2);
    }

    function testRoundedRectangle()
    {
        context.strokeStyle("blue")
            .drawRoundedRect(400, 0, 50, 50, 4)
            .drawRoundedRect(450, 0, 50, 50, 8)
            .fillStyle("green")
            .fillRoundedRect(400, 50, 50, 50, 4)
            .fillRoundedRect(450, 50, 50, 50, 8);
    }

    function testImageData()
    {
        let imageData = context.createImageData(100, 100);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4)
        {
            data[i] = Random.nextIntTo(255);
            data[i + 1] = Random.nextIntTo(255);
            data[i + 2] = Random.nextIntTo(255);
            data[i + 3] = Random.nextIntTo(255);
        }
        context.putImageData(imageData, 300, 0);

        imageData = context.getImageData(300, 0, 100, 100);
        data = imageData.data;
        for (let i = 0; i < data.length; i += 4)
        {
            // Halve the opacity
            data[i + 3] = data[i + 3] >> 1;
        }
        context.putImageData(imageData, 300, 100);
    }

    function testPattern()
    {
        let img = new Image();
        img.src = "images/lamp.jpg";
        img.addEventListener("load", () =>
        {
            let pat = context.createPattern(img);
            context.drawPattern(200, 0, 100, 100, pat);
            context.drawPattern(200, 100, 100, 100, img, CanvasContext2D.Repetition.repeatY);
            context.drawPattern(200, 100, 100, 100, img, CanvasContext2D.Repetition.repeatX);
        });
    }

    function testLinearGradient()
    {
        context.drawLinearGradient(0, 0, 100, 100, 0, "red", "blue");

        context.drawLinearGradient(0, 100, 100, 100, CanvasContext2D.toRadians(45),
            { color: "red", offset: 0 },
            { color: "orange", offset: .2 },
            { color: "yellow", offset: .4 },
            { color: "green", offset: .6 },
            { color: "blue", offset: .8 },
            { color: "purple", offset: 1 }
        );
    }

    function testRadialGradient()
    {
        context.drawRadialGradient(150, 50, 50, "white", "blue");

        context.drawRadialGradient(150, 150, 50,
            { color: "red", offset: 0 },
            { color: "orange", offset: .2 },
            { color: "yellow", offset: .4 },
            { color: "green", offset: .6 },
            { color: "blue", offset: .8 },
            { color: "purple", offset: 1 }
        );
    }
}