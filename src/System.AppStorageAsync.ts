/// <reference path="system.iappstorageasync.ts" />
module System
{
    "use strict";

    export class AppStorageAsync implements IAppStorageAsync
    {
        private _prefix = "";
        private static _isAvailable = Boolean(("localStorage" in window) && window["localStorage"]);

        /** Used to determine if local storage available */
        public static get isAvailable(): boolean
        {
            return AppStorageAsync._isAvailable;
        }

        /** @param appName Name of the application(optional) */
        constructor(appName?: string)
        {
            this._prefix = (appName ? appName + "." : "");
        }

        /** Gets the prefix that is prepended to each key */
        public prefix(): string { return this._prefix; }

        /**
         * Sets the value with the specified key into localStorage.
         * @param key Key
         * @param val Value
         * @param callback Optional function to call when saved
         * @param replacer Optional replacer function to use when stringifying the value
         */
        public setValue(key: string, val: any, callback?: () => any, replacer?: (key: string, value: any) => any): AppStorageAsync
        {
            if (AppStorageAsync.isAvailable)
            {
                localStorage.setItem(this._prefix + key, JSON.stringify(val, replacer));
                if (callback) callback();
            }
            return this;
        }

        /**
         * Gets the value with the specified key from localStorage
         * @key Key
         * @callback Fuction to call with the value. Value will be null if not found.
         * @reviver Optional reviver to use when parsing the JSON 
         */
        public getValue<T>(key: string, callback: (data: T) => any, reviver?: (key: any, value: any) => any): AppStorageAsync
        {
            if (AppStorageAsync.isAvailable)
            {
                this.getItem(key, (item => callback(item != null ? JSON.parse(item, reviver) : null)));
            }
            return this;
        }

        /**
         * Gets the raw value of an item from localStorage without parsing it
         * @callback Fuction to call with the item. Value will be null if not found.
         */
        public getItem(key: string, callback: (data: string) => any): AppStorageAsync
        {
            callback(AppStorageAsync.isAvailable ? localStorage.getItem(this._prefix + key) : null);
            return this;
        }

        /** Removes the value with the specified key */
        public removeValue(key: string, callback?: () => any): AppStorageAsync
        {
            if (AppStorageAsync.isAvailable)
            {
                localStorage.removeItem(this._prefix + key);
                if (callback) callback();
            }
            return this;
        }

        /** Removes all items associated with the app */
        public removeAll(callback?: () => any): AppStorageAsync
        {
            this.getKeys((keys: string[]) =>
            {
                for (var i in keys)
                {
                    this.removeValue(keys[i]);
                }
                if (callback) callback();
            });
            return this;
        }

        /**
         * Determines if the specified key has a value in localStorage
         * @returns True if the key has a value
         */
        public contains(key: string, callback?: (result: boolean) => any): AppStorageAsync
        {
            this.getItem(key, (item) => callback(item !== null));
            return this;
        }

        /**
         * Gets the keys from localStorage for the application that optionally match a filter
         * @param filter: (Optional) A function that returns true if the key should be included in the result
         * @returns An array of keys
         */
        public getKeys(callback: (keys: string[]) => any, filter?: (key: string) => boolean): AppStorageAsync
        {
            var keys: string[] = [];
            if (AppStorageAsync.isAvailable)
            {
                for (var key in localStorage)
                {
                    if (this.isAppKey(key))
                    {
                        // Remove the prefix from the key
                        if (this._prefix) key = key.slice(this._prefix.length);
                        // Check the filter
                        if (!filter || filter(key))
                        {
                            keys.push(key);
                        }
                    }
                }
            }

            callback(keys);
            return this;
        }

        private isAppKey(key: string): boolean
        {
            if (this._prefix)
            {
                return key.indexOf(this._prefix) === 0;
            }
            return true;
        }

        /** Adds a storage event handler */
        public addStorageListener(callback: (evt: StorageEvent) => any, useCapture?: boolean): AppStorageAsync
        {
            addEventListener("storage", callback, useCapture);
            return this;
        }
    }
} 