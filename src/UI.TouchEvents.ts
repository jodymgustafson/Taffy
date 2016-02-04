module UI
{
    "use strict";

    export module Events
    {
        export interface ITouch
        {
            identifier: string;
            target: HTMLElement;
            pageX: number;
            pageY: number;
            screenX: number;
            screenY: number;
            clientX: number;
            clientY: number;
        }

        export interface ITouchEvent extends UIEvent
        {
            altKey: boolean;
            ctrlKey: boolean;
            metaKey: boolean;
            shiftKey: boolean;
            changedTouches: ITouch[];
            touches: ITouch[];
            targetTouches: ITouch[];
        }

        var _touchSupported = ("ontouchstart" in document.documentElement);

        export function isTouchSupported(): boolean
        {
            return _touchSupported;
        }
    }
} 