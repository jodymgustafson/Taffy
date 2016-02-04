module System
{
    "use strict";

    export class Byte
    {
        constructor(n: number)
        {
            this._value = Byte.truncate(n);
            this._overflow = (this._value !== n);
        }

        private _overflow = false;
        /** Returns true if the number was modified to fit into a byte value */
        public get overflow(): boolean { return this._overflow; }

        private _value = 0;
        /** Gets the value of the byte **/
        public get value(): number { return this._value; }

        public static MIN_VALUE = 0;
        public static MAX_VALUE = 255;

        /** Makes a number fit into a byte by truncating it */
        public static truncate(b: number): number
        {
            if (b > Byte.MAX_VALUE) return Byte.MAX_VALUE;
            if (b < Byte.MIN_VALUE) return Byte.MIN_VALUE;
            return b | 0;
        }

        /** @returns true if the number is in the range of a byte */
        public static isByte(b: number): boolean
        {
            return b >= Byte.MIN_VALUE && b <= Byte.MAX_VALUE;
        }

        /** Makes a number fit into a byte using modulus */
        public static mod(b: number): number
        {
            return (Math.abs(b) | 0) % 256;
        }
    }
}