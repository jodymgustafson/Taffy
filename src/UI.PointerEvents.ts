/// <reference path="ui.touchevents.ts" />
module UI
{
    "use strict";

    export module Events
    {
        export enum PointerType
        {
            Mouse,
            Touch,
            Pen
        }

        export interface IPointerEvent extends MouseEvent
        {
            pointerId: string;
            pointerType: PointerType;
            isPrimary: boolean;
            //baseEvent: UIEvent;
        }

        var _mouseSupported = "onmousedown" in document.documentElement;

        export function isMouseSupported(): boolean
        {
            return _mouseSupported;
        }

        export function addTouchMoveEventListener(element: HTMLElement, listener: (ev: ITouchEvent) => any, useCapture?: boolean): void
        {
            element.addEventListener("touchmove", listener, useCapture);
        }
        export function addTouchStartEventListener(element: HTMLElement, listener: (ev: ITouchEvent) => any, useCapture?: boolean): void
        {
            element.addEventListener("touchstart", listener, useCapture);
        }
        export function addTouchEndEventListener(element: HTMLElement, listener: (ev: ITouchEvent) => any, useCapture?: boolean): void
        {
            element.addEventListener("touchend", listener, useCapture);
        }
        export function addTouchCancelEventListener(element: HTMLElement, listener: (ev: ITouchEvent) => any, useCapture?: boolean): void
        {
            element.addEventListener("touchcancel", listener, useCapture);
        }

        export function addPointerMoveEventListener(element: HTMLElement, listener: (ev: IPointerEvent) => any, useCapture?: boolean): void
        {
            if (isTouchSupported())
            {
                addTouchMoveEventListener(element,(ev) => fireTouchPointerEvent(ev, listener), useCapture);
            }
            else
            {
                element.addEventListener("mousemove",(ev) => fireMousePointerEvent(ev, listener), useCapture);
            }
        }

        export function addPointerDownEventListener(element: HTMLElement, listener: (ev: IPointerEvent) => any, useCapture?: boolean): void
        {
            if (isTouchSupported())
            {
                addTouchStartEventListener(element,(ev) => fireTouchPointerEvent(ev, listener), useCapture);
            }
            else
            {
                element.addEventListener("mousedown", listener, useCapture);
            }
        }

        export function addPointerUpEventListener(element: HTMLElement, listener: (ev: IPointerEvent) => any, useCapture?: boolean): void
        {
            if (isTouchSupported())
            {
                addTouchEndEventListener(element,(ev) => fireTouchPointerEvent(ev, listener), useCapture);
            }
            else
            {
                element.addEventListener("mouseup", listener, useCapture);
            }
        }

        export function addPointerLeaveEventListener(element: HTMLElement, listener: (ev: IPointerEvent) => any, useCapture?: boolean): void
        {
            if (isTouchSupported())
            {
                addTouchCancelEventListener(element,(ev) => fireTouchPointerEvent(ev, listener), useCapture);
            }
            else
            {
                element.addEventListener("mouseleave", listener, useCapture);
            }
        }

        function fireMousePointerEvent(event: MouseEvent, listener: (ev: IPointerEvent) => any): void
        {
            var pev = createMousePointerEvent(event);
            listener(pev);
        }
        function fireTouchPointerEvent(event: ITouchEvent, listener: (ev: IPointerEvent) => any): void
        {
            var pev = createTouchPointerEvent(event);
            listener(pev);
        }

        function createMousePointerEvent(mev: MouseEvent): IPointerEvent
        {
            var event = <IPointerEvent>clone(mev);
            event.pointerType = PointerType.Mouse;
            return event;
        }

        function createTouchPointerEvent(tev: ITouchEvent): IPointerEvent
        {
            var event = <IPointerEvent>clone(tev);
            event.pointerType = PointerType.Touch;
            var touches = tev.targetTouches[0];
            event.pageX = touches.pageX;
            event.pageY = touches.pageY;
            event.clientX = touches.clientX;
            event.clientY = touches.clientY;
            event.screenX = touches.screenX;
            event.screenY = touches.screenY;
            return event;
        }

        function clone(obj)
        {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = new obj.constructor();
            for (var attr in obj)
            {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }
        //class BasePointerEvent implements IPointerEvent
        //{
        //    public pointerId: string;
        //    public pointerType: PointerType;
        //    public isPrimary: boolean;
        //    constructor(event: UIEvent)
        //    {
                
        //    }
        //}
    }
}
 