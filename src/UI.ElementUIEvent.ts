/// <reference path="ui.touchevents.ts" />
module UI
{
    "use strict";

    interface IPosition
    {
        left: number;
        top: number;
    }

    export interface IElementUIEvent
    {
        /** X-Position of the mouse inside the element */
        elementX: number;
        /** Y-Position of the mouse inside the element */
        elementY: number;
        /** The underlying event */
        event: UIEvent;
    }

    class ElementUIEvent
    {
        /** X-Position of the mouse inside the element */
        public elementX: number;
        /** Y-Position of the mouse inside the element */
        public elementY: number;

        constructor(public element: HTMLElement, pageX: number, pageY: number)
        {
            this.elementX = this.toElementX(pageX);
            this.elementY = this.toElementY(pageY);
        }

        /** Converts page x to element x position */
        private toElementX(pageX: number): number
        {
            return pageX - this.position().left;
        }
        /** Converts page y to element y position */
        private toElementY(pageY: number): number
        {
            return pageY - this.position().top;
        }

        private position(): IPosition
        {
            var rect = this.element.getBoundingClientRect();
            // Apply page offsets
            return {
                left: rect.left + window.pageXOffset,
                top: rect.top + window.pageYOffset
            };
        }
    }

    /**
     * Wraps a mouse event to provide element based positions
     */
    export class ElementMouseEvent extends ElementUIEvent implements IElementUIEvent
    {
        constructor(element: HTMLElement, public event: MouseEvent)
        {
            super(element, event.pageX, event.pageY);
        }
    }

    /**
     * Wraps a touch event to provide element based positions
     */
    export class ElementTouchEvent extends ElementUIEvent implements IElementUIEvent
    {
        constructor(element: HTMLElement, public event: UI.Events.ITouchEvent)
        {
            super(element,
                event.touches.length > 0 ? event.touches[0].pageX : 0,
                event.touches.length > 0 ? event.touches[0].pageY : 0);
        }
    }
} 