module UI
{
    "use strict";

    var undef = void (0);

    /**
     * Wrapper and high level drawing methods for HTMLCanvasElement 2D context
     */
    export class CanvasContext2D
    {
        private _context: CanvasRenderingContext2D;

        constructor(private _canvas: HTMLCanvasElement)
        {
            this._context = _canvas.getContext("2d");
        }

        public get context(): CanvasRenderingContext2D
        {
            return this._context;
        }
        public get canvas(): HTMLCanvasElement
        {
            return this._canvas;
        }

        ///////////////////////////////////////////////////////////////////////////////
        // Constants
        ///////////////////////////////////////////////////////////////////////////////
        public static PI_OVER_180 = Math.PI / 180;
        public static PI_OVER_2 = Math.PI / 2;
        public static TWO_PI = 2 * Math.PI;
        public static TAU = 2 * Math.PI;

        ///////////////////////////////////////////////////////////////////////////////
        // Canvas methods
        ///////////////////////////////////////////////////////////////////////////////
        public toDataUrl(): string
        {
            return this._canvas.toDataURL();
        }

        ///////////////////////////////////////////////////////////////////////////
        // Stroke and fill styles
        ///////////////////////////////////////////////////////////////////////////
        public fillStyle(gradient: CanvasGradient): CanvasContext2D;
        public fillStyle(pattern: CanvasPattern): CanvasContext2D;
        public fillStyle(color: string): CanvasContext2D;
        public fillStyle(): any;
        public fillStyle(style?: any): any
        {
            if (style === undef)
            {
                return this.context.fillStyle;
            }
            this.context.fillStyle = style;
            return this;
        }

        public strokeStyle(gradient: CanvasGradient): CanvasContext2D;
        public strokeStyle(pattern: CanvasPattern): CanvasContext2D;
        public strokeStyle(color: string): CanvasContext2D;
        public strokeStyle(): any;
        public strokeStyle(style?: any): any
        {
            if (style === undef)
            {
                return this.context.strokeStyle;
            }
            this.context.strokeStyle = style;
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Line properties
        ///////////////////////////////////////////////////////////////////////////
        public lineWidth(): number;
        public lineWidth(width: number): CanvasContext2D;
        public lineWidth(width?: number): any
        {
            if (width === undef)
            {
                return this.context.lineWidth;
            }
            this.context.lineWidth = width;
            return this;
        }

        /** Sets the line cap (Use CanvasContext2D.LineCap) */
        public lineCap(lineCap: string): CanvasContext2D;
        public lineCap(): string;
        public lineCap(lineCap?: string): any
        {
            if (lineCap === undef)
            {
                return this.context.lineCap;
            }
            this.context.lineCap = lineCap;
            return this;
        }

        /** Sets the line join (Use CanvasContext2D.LineJoin) */
        public lineJoin(join: string): CanvasContext2D;
        public lineJoin(): string;
        public lineJoin(join?: string): any
        {
            if (join === undef)
            {
                return this.context.lineJoin;
            }
            this.context.lineJoin = join;
            return this;
        }

        public miterLimit(limit: number): CanvasContext2D;
        public miterLimit(): number;
        public miterLimit(limit?: number): any
        {
            if (limit === undef)
            {
                return this.context.miterLimit;
            }
            this.context.miterLimit = limit;
            return this;
        }

        public lineDash(sequence: number[]): CanvasContext2D;
        public lineDash(): number[];
        public lineDash(sequence?: number[]): any
        {
            if ("setLineDash" in this.context)
            {
                if (sequence === undef)
                {
                    return (<any>this.context).getLineDash();
                }
                this.context["setLineDash"](sequence);
                return this;
            }
            else console.log(() => "setLineDash not supported by the browser");

            return null;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Shadow properties
        ///////////////////////////////////////////////////////////////////////////
        public shadowColor(color: string): CanvasContext2D;
        public shadowColor(): string;
        public shadowColor(color?: string): any
        {
            if (color === undef)
            {
                return this.context.shadowColor;
            }
            this.context.shadowColor = color;
            return this;
        }

        public shadowBlur(size: number): CanvasContext2D;
        public shadowBlur(): number;
        public shadowBlur(size?: number): any
        {
            if (size === undef)
            {
                return this.context.shadowBlur;
            }
            this.context.shadowBlur = size;
            return this;
        }

        public shadowOffsetX(offset: number): CanvasContext2D;
        public shadowOffsetX(): number;
        public shadowOffsetX(offset?: number): any
        {
            if (offset === undef)
            {
                return this.context.shadowOffsetX;
            }
            this.context.shadowOffsetX = offset;
            return this;
        }

        public shadowOffsetY(offset: number): CanvasContext2D;
        public shadowOffsetY(): any;
        public shadowOffsetY(offset?: number): any
        {
            if (offset === undef)
            {
                return this.context.shadowOffsetY;
            }
            this.context.shadowOffsetY = offset;
            return this;
        }

        public shadowOffset(offsetX: number, offsetY: number): CanvasContext2D;
        public shadowOffset(offset: number): CanvasContext2D;
        public shadowOffset(): { offsetX: number; offsetY: number };
        public shadowOffset(offsetX?: number, offsetY?: number): any
        {
            if (offsetX === undef)
            {
                return { offsetX: this.shadowOffsetX(), offsetY: this.shadowOffsetY() };
            }
            this.shadowOffsetX(offsetX);
            this.shadowOffsetY(offsetY === undef ? offsetX : offsetY);
            return this;
        }

        /** Sets all of the shadow styles in one call */
        public shadowStyle(color: string, offsetX: number, offsetY: number, blur: number): CanvasContext2D
        {
            this.context.shadowColor = color;
            this.context.shadowOffsetX = offsetX;
            this.context.shadowOffsetY = offsetY;
            this.context.shadowBlur = blur;
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Text properties
        ///////////////////////////////////////////////////////////////////////////
        public font(font: string): CanvasContext2D;
        public font(): string;
        public font(font?: string): any
        {
            if (font === undef)
            {
                return this.context.font;
            }
            this.context.font = font;
            return this;
        }

        /** Sets text align (use CanvasContext2D.TextAlign) */
        public textAlign(alignment: string): CanvasContext2D;
        public textAlign(): string;
        public textAlign(alignment?: string): any
        {
            if (alignment === undef)
            {
                return this.context.textAlign;
            }
            this.context.textAlign = alignment;
            return this;
        }

        /** Sets text baseline (use CanvasContext2D.TextBaseline) */
        public textBaseline(baseline: string): CanvasContext2D;
        public textBaseline(): string;
        public textBaseline(baseline?: string): any
        {
            if (baseline === undef)
            {
                return this.context.textBaseline;
            }
            this.context.textBaseline = baseline;
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Compositing properties
        ///////////////////////////////////////////////////////////////////////////
        /** Sets global alpha */
        public globalAlpha(alpha: number): CanvasContext2D;
        public globalAlpha(): number;
        public globalAlpha(alpha?: number): any
        {
            if (alpha === undef)
            {
                return this.context.globalAlpha;
            }
            this.context.globalAlpha = alpha;
            return this;
        }

        /** Sets global compositing operation (use CanvasContext2D.CompositeOperation) */
        public globalCompositeOperation(operation: string): CanvasContext2D;
        public globalCompositeOperation(): string
        public globalCompositeOperation(operation?: string): any
        {
            if (operation === undef)
            {
                return this.context.globalCompositeOperation;
            }
            this.context.globalCompositeOperation = operation;
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Clearing methods
        ///////////////////////////////////////////////////////////////////////////
        /** Clears the entire canvas */
        public clear(): CanvasContext2D
        {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return this;
        }
        /** Clears a portion of the canvas */
        public clearRect(x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.clearRect(x, y, w, h);
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Context state methods
        ///////////////////////////////////////////////////////////////////////////
        /** Pushes the current state of the context */
        public save(): CanvasContext2D
        {
            this.context.save();
            return this;
        }
        /** Restores the state of the context from the last save */
        public restore(): CanvasContext2D
        {
            this.context.restore();
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Transformation methods
        ///////////////////////////////////////////////////////////////////////////
        /** Sets the scale transform of the canvas */
        public scale(scale: number): CanvasContext2D;
        /** Sets the x and y scale transform of the canvas */
        public scale(xs: number, ys: number): CanvasContext2D;
        public scale(xs: number, ys?: number): CanvasContext2D
        {
            this.context.scale(xs, ys || xs);
            return this;
        }
        /** moves the origin to the specified location */
        public translate(x: number, y: number): CanvasContext2D
        {
            this.context.translate(x, y);
            return this;
        }
        /** Rotates the canvas */
        public rotate(radians: number): CanvasContext2D
        {
            this.context.rotate(radians);
            return this;
        }
        /**
         * Sets the current transformation matrix
         * m11 Scales the drawing horizontally
         * m12 Skews the drawing horizontally
         * m21 Scales the drawing vertically
         * m22 Skews the drawing vertically
         * dx Moves the the drawing horizontally
         * dy Moves the the drawing vertically
        */
        public transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): CanvasContext2D
        {
            this.context.transform(m11, m12, m21, m22, dx, dy);
            return this;
        }
        /** Resets to the identity matrix then applies the new transformation matrix */
        public setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): CanvasContext2D
        {
            this.context.setTransform(m11, m12, m21, m22, dx, dy);
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Image methods
        ///////////////////////////////////////////////////////////////////////////
        public drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.drawImage(image, x, y, w, h);
            return this;
        }
        public drawClippedImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, sx: number, sy: number, sw: number, sh: number, x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
            return this;
        }
        public drawRotatedImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, x: number, y: number, angle: number, width: number, height: number): CanvasContext2D
        {
            this.context.save();
            // Move to where we want to draw the image
            this.context.translate(x, y);
            this.context.rotate(angle);
            // Draw image at its center
            var cx = ((width || image.width) / 2);
            var cy = ((height || image.height) / 2);
            this.context.drawImage(image, -cx, -cy, width, height);
            this.context.restore();
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Line methods
        ///////////////////////////////////////////////////////////////////////////
        public drawLine(x1: number, y1: number, x2: number, y2: number): CanvasContext2D
        {
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.stroke();
            return this;
        }
        /** Draws the lines defined by the set of coordinates
          * @param {number[]} coords Set of x and y coordinates
          */
        public drawLines(...coords: number[]): CanvasContext2D
        {
            if (this.definePolyline(coords))
            {
                this.context.stroke();
            }
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Circle/Arc methods
        ///////////////////////////////////////////////////////////////////////////
        public drawCircle(x: number, y: number, radius: number): CanvasContext2D
        {
            this.beginPath()
                .arc(x, y, radius, 0, CanvasContext2D.TWO_PI, true)
                .closePath()
                .stroke();
            return this;
        }

        public fillCircle(x: number, y: number, radius: number): CanvasContext2D
        {
            this.beginPath()
                .arc(x, y, radius, 0, CanvasContext2D.TWO_PI, true)
                .closePath()
                .fill();
            return this;
        }

        public drawArc(x: number, y: number, radius: number, start: number, end: number, anticlockwise = false): CanvasContext2D
        {
            this.beginPath()
                .arc(x, y, radius, start, end, anticlockwise)
                .stroke();
            return this;
        }

        public fillArc(x: number, y: number, radius: number, start: number, end: number, anticlockwise = false): CanvasContext2D
        {
            this.beginPath()
                .arc(x, y, radius, start, end, anticlockwise)
                .fill();
            return this;
        }

        public drawEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D
        {
            if (rx === ry) return this.drawCircle(x, y, rx);
            this.defineEllipse(x, y, rx, ry)
                .stroke();
            return this;
        }

        public fillEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D
        {
            if (rx === ry) return this.fillCircle(x, y, rx);
            this.defineEllipse(x, y, rx, ry)
                .fill();
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Rectangle methods
        ///////////////////////////////////////////////////////////////////////////
        public drawRect(x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.strokeRect(x, y, w, h);
            return this;
        }

        public fillRect(x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.fillRect(x, y, w, h);
            return this;
        }
        /** Draws a rounded rectangle
        * @param r radius of the corners
        */
        public drawRoundedRect(x: number, y: number, w: number, h: number, r: number): CanvasContext2D;
        /** Draws a rounded rectangle
         * @param radii The radii of each corner (clockwise from upper-left)
        */
        public drawRoundedRect(x: number, y: number, w: number, h: number, radii: number[]): CanvasContext2D;
        public drawRoundedRect(x: number, y: number, w: number, h: number, r: any): CanvasContext2D
        {
            if (typeof r === "number")
            {
                r = [r, r, r, r];
            }
            this.defineRoundedRect(x, y, w, h, r);
            this.context.stroke();
            return this;
        }

        public fillRoundedRect(x: number, y: number, w: number, h: number, r: number): CanvasContext2D;
        public fillRoundedRect(x: number, y: number, w: number, h: number, r: number[]): CanvasContext2D;
        public fillRoundedRect(x: number, y: number, w: number, h: number, r: any): CanvasContext2D
        {
            if (typeof r === "number")
            {
                r = [r, r, r, r];
            }
            this.defineRoundedRect(x, y, w, h, r);
            this.context.fill();
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Shape methods
        ///////////////////////////////////////////////////////////////////////////
        /** Draws a shape defined by the set of coordinates
          * @param {number[]} coords Set of x and y coordinates
          */
        public drawShape(...coords: number[]): CanvasContext2D
        {
            if (this.definePolyline(coords))
            {
                this.context.closePath();
                this.context.stroke();
            }
            return this;
        }

        /** Fills a shape defined by the set of coordinates
          * @param {number[]} coords Set of x and y coordinates
          */
        public fillShape(...coords: number[]): CanvasContext2D
        {
            if (this.definePolyline(coords))
            {
                this.context.closePath();
                this.context.fill();
            }
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Text methods
        ///////////////////////////////////////////////////////////////////////////
        public drawText(text: string, x: number, y: number, maxWidth?: number): CanvasContext2D
        {
            if (maxWidth === undefined) this.context.strokeText(text, x, y);
            else this.context.strokeText(text, x, y);
            return this;
        }

        public fillText(text: string, x: number, y: number, maxWidth?: number): CanvasContext2D
        {
            if (maxWidth === undefined) this.context.fillText(text, x, y);
            else this.context.fillText(text, x, y, maxWidth);
            return this;
        }

        public measureText(text: string): number
        {
            return this.context.measureText(text).width;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Gradient/Pattern methods
        ///////////////////////////////////////////////////////////////////////////
        /** Creates a gradient with no color stops */
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
        /** Creates a gradient from one color to another */
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number, color1: string, color2: string): CanvasGradient;
        /** Creates a gradient with multiple color stops */
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number, ...colorStops: CanvasContext2D.IColorStop[]): CanvasGradient;
        public createLinearGradient(x0: number, y0: number, x1: number, y1: number, ...colorsOrStops: any[]): CanvasGradient
        {
            var gradient = this.context.createLinearGradient(x0, y0, x1, y1);
            if (colorsOrStops && colorsOrStops.length > 0)
            {
                if (colorsOrStops.length === 2 && typeof colorsOrStops[0] === "string")
                {
                    gradient.addColorStop(0, colorsOrStops[0]);
                    gradient.addColorStop(1, colorsOrStops[1]);
                }
                else
                {
                    for (var i = 0; i < colorsOrStops.length; i++)
                    {
                        var stop = colorsOrStops[i];
                        gradient.addColorStop(stop.offset, stop.color);
                    }
                }
            }
            return gradient;
        }

        public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, ...colorStops: CanvasContext2D.IColorStop[]): CanvasGradient
        {
            var gradient = this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            for (var i = 0; i < colorStops.length; i++)
            {
                var stop = colorStops[i];
                gradient.addColorStop(stop.offset, stop.color);
            }
            return gradient;
        }

        public createPattern(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, repetition: string): CanvasPattern
        {
            return this.context.createPattern(image, repetition);
        }

        ///////////////////////////////////////////////////////////////////////////
        // ImageData methods
        ///////////////////////////////////////////////////////////////////////////
        public createImageData(imageDataOrW?: any, h?: number): ImageData
        {
            if (h === undefined)
            {
                return this.context.createImageData(imageDataOrW);
            }
            else
            {
                return this.context.createImageData(imageDataOrW, h);
            }
        }

        public getImageData(sx?: number, sy?: number, sw?: number, sh?: number): ImageData
        {
            return this.context.getImageData(sx || 0, sy || 0, sw || this.canvas.width, sh || this.canvas.height);
        }

        public putImageData(imageData: ImageData, dx?: number, dy?: number, destX?: number, destY?: number, destW?: number, destH?: number): CanvasContext2D
        {
            dx = dx || 0;
            dy = dy || 0;
            if (destW !== undefined) this.context.putImageData(imageData, dx, dy, destX, destY, destW, destH);
            else if (destX !== undefined) this.context.putImageData(imageData, dx, dy, destX, destY);
            else this.context.putImageData(imageData, dx, dy);
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Primitive Path methods
        ///////////////////////////////////////////////////////////////////////////
        public rect(x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.context.rect(x, y, w, h);
            return this;
        }

        public fill(): CanvasContext2D
        {
            this.context.fill();
            return this;
        }

        public stroke(): CanvasContext2D
        {
            this.context.stroke();
            return this;
        }

        public beginPath(): CanvasContext2D
        {
            this.context.beginPath();
            return this;
        }

        public closePath(): CanvasContext2D
        {
            this.context.closePath();
            return this;
        }

        public moveTo(x: number, y: number): CanvasContext2D
        {
            this.context.moveTo(x, y);
            return this;
        }

        public lineTo(x: number, y: number): CanvasContext2D
        {
            this.context.lineTo(x, y);
            return this;
        }

        public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): CanvasContext2D
        {
            this.context.quadraticCurveTo(cpx, cpy, x, y);
            return this;
        }

        public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): CanvasContext2D
        {
            this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            return this;
        }

        public arc(x: number, y: number, r: number, startRads: number, endRads: number, anticlockwise?: boolean): CanvasContext2D
        {
            this.context.arc(x, y, r, startRads, endRads, anticlockwise);
            return this;
        }

        public arcTo(x1: number, y1: number, x2: number, y2: number, r: number): CanvasContext2D
        {
            this.context.arcTo(x1, y1, x2, y2, r);
            return this;
        }

        public setClipRect(x: number, y: number, w: number, h: number): CanvasContext2D
        {
            this.beginPath()
                .rect(x, y, w, h)
                .clip();
            return this;
        }

        public clip(): CanvasContext2D
        {
            this.context.clip();
            return this;
        }

        public isPointInPath(x: number, y: number): boolean
        {
            return this.context.isPointInPath(x, y);
        }

        ///////////////////////////////////////////////////////////////////////////
        // Private methods
        ///////////////////////////////////////////////////////////////////////////
        /** 
         * Defines the path for a rounded rectangle
         * @param x The top left x coordinate 
         * @param y The top left y coordinate  
         * @param width The width of the rectangle  
         * @param height The height of the rectangle 
         * @param radii The radii of each corner (clockwise from upper-left)
         */
        private defineRoundedRect(x: number, y: number, w: number, h: number, radii: number[]): CanvasContext2D
        {
            this.context.beginPath();
            this.context.moveTo(x + radii[0], y);
            this.context.lineTo(x + w - radii[1], y);
            this.context.quadraticCurveTo(x + w, y, x + w, y + radii[1]);
            this.context.lineTo(x + w, y + h - radii[2]);
            this.context.quadraticCurveTo(x + w, y + h, x + w - radii[2], y + h);
            this.context.lineTo(x + radii[3], y + h);
            this.context.quadraticCurveTo(x, y + h, x, y + h - radii[3]);
            this.context.lineTo(x, y + radii[0]);
            this.context.quadraticCurveTo(x, y, x + radii[0], y);
            this.context.closePath();
            return this;
        }

        /** Defines the path for an ellipse */
        private defineEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D
        {
            var radius = Math.max(rx, ry);
            var scaleX = rx / radius;
            var scaleY = ry / radius;

            this.context.save();
            this.context.translate(x, y);
            this.context.scale(scaleX, scaleY);
            this.context.beginPath();
            this.context.arc(0, 0, radius, 0, CanvasContext2D.TWO_PI, true);
            this.context.closePath();
            this.context.restore();
            return this;
        }

        /** Defines the path for a set of coordinates
          * @param {number[]} coords Set of x and y coordinates
          */
        private definePolyline(coords: number[]): boolean
        {
            /// Draws an set of lines without stroking or filling
            if (coords.length > 2)
            {
                this.context.beginPath();
                this.context.moveTo(coords[0], coords[1]);
                for (var i = 2; i < coords.length; i += 2)
                {
                    this.context.lineTo(coords[i], coords[i + 1]);
                }

                return true;
            }

            return false;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Static methods
        ///////////////////////////////////////////////////////////////////////////
        public static toRadians(degrees): number
        {
            return CanvasContext2D.PI_OVER_180 * degrees;
        }

        ///////////////////////////////////////////////////////////////////////////
        // Enums
        ///////////////////////////////////////////////////////////////////////////
        public static TextBaseline = {
            top: "top",
            middle: "middle",
            bottom: "bottom",
            alphabetic: "alphabetic",
            hanging: "hanging"
        };

        public static TextAlign = {
            left: "left",
            right: "right",
            center: "center",
            start: "start",
            end: "end"
        };

        public static Repetition =
        {
            repeat: "repeat",
            repeatX: "repeat-x",
            repeatY: "repeat-y",
            noRepeat: "no-repeat"
        };

        public static CompositeOperation = {
            sourceOver: "source-over",
            sourceAtop: "source-atop",
            sourceIn: "source-in",
            sourceOut: "source-out",
            destinationOver: "destination-over",
            destinationAtop: "destination-atop",
            destinationIn: "destination-in",
            destinationOut: "destination-out",
            lighter: "lighter",
            copy: "copy",
            xor: "xor"
        };

        public static LineCap = {
            butt: "butt",
            round: "round",
            square: "square"
        };
        public static LineJoin = {
            bevel: "bevel",
            round: "round",
            miter: "miter"
        };
    }

    export module CanvasContext2D
    {
        /** Defines a color stop for creating gradients */
        export interface IColorStop
        {
            color: string;
            offset: number;
        }
    }
} 