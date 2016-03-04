/// <reference path="system.iappstorageasync.ts" />
module Chrome
{
    "use strict";

    export enum AppStorageType
    {
        sync, local, managed
    }

    interface StorageArea
    {
        get(key: string, callback: (data: any) => any): void;
        get(keys: string[], callback: (data: any) => any): void;
        get(key: any, callback: (data: any) => any): void;
        set(items: any, callback?: () => any);
        remove(key: string, callback?: () => any): void;
        remove(keys: string[], callback?: () => any): void;
    }

    /**
     * Wraps Chrome storage to comply with the System.IAppStorageAsync interface
     */
    export class AppStorage implements System.IAppStorageAsync
    {
        private static _chromeStorage = window["chrome"]["storage"];
        private static _isAvailable = Boolean(AppStorage._chromeStorage);

        private _storageType: AppStorageType;
        private _storageArea: StorageArea;
        private _prefix = "";

        /** Used to determine if local storage available */
        public static get isAvailable(): boolean
        {
            return AppStorage._isAvailable;
        }

        /** @param appName Name of the application(optional) */
        constructor(storageType: AppStorageType, appName?: string)
        {
            if (AppStorage.isAvailable)
            {
                this._storageType = storageType;
                this._storageArea = AppStorage._chromeStorage[AppStorageType[storageType]];
                this._prefix = (appName ? appName + "." : "");
            }
        }

        /** Gets the prefix that is prepended to each key */
        public get prefix() { return this._prefix; }

        /**
         * Sets the value with the specified key into this._storageArea.
         * @param key Key
         * @param val Value
         * @param callback Optional function to call when saved
         * @param replacer Optional replacer function to use when stringifying the value
         */
        public setValue(key: string, val: any, callback?: () => any, replacer?: (key: string, value: any) => any): AppStorage
        {
            if (AppStorage.isAvailable)
            {
                key = this._prefix + key;
                this._storageArea.set({ key: JSON.stringify(val, replacer) }, callback);
                if (callback) callback();
            }
            return this;
        }

        /**
         * Gets the value with the specified key from this._storageArea
         * @key Key
         * @callback Fuction to call with the value. Value will be null if not found.
         * @reviver Optional reviver to use when parsing the JSON 
         */
        public getValue<T>(key: string, callback: (data: T) => any, reviver?: (key: any, value: any) => any): AppStorage
        {
            if (AppStorage.isAvailable)
            {
                this.getItem(key, (item => callback(item != null ? JSON.parse(item, reviver) : null)));
            }
            return this;
        }

        /**
         * Gets the raw value of an item from this._storageArea without parsing it
         * @returns The value or null if not found
         */
        public getItem(key: string, callback: (data: string) => any): AppStorage
        {
            this._storageArea.get(this._prefix + key, (data) => callback(data[key]));
            return this;
        }

        /** Removes the value with the specified key */
        public removeValue(key: string, callback?: () => any): AppStorage
        {
            if (AppStorage.isAvailable)
            {
                this._storageArea.remove(this._prefix + key, callback);
            }
            return this;
        }

        /** Removes all items associated with the app */
        public removeAll(callback?: () => any): AppStorage
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
         * Determines if the specified key has a value in this._storageArea
         * @returns True if the key has a value
         */
        public contains(key: string, callback?: (result: boolean) => any): AppStorage
        {
            this.getItem(key, (item) => callback(item !== null));
            return this;
        }

        /**
         * Gets the keys from this._storageArea for the application that optionally match a filter
         * @param filter: (Optional) A function that returns true if the key should be included in the result
         * @returns An array of keys
         */
        public getKeys(callback: (keys: string[]) => any, filter?: (key: string) => boolean): AppStorage
        {
            var keys: string[] = [];
            if (AppStorage.isAvailable)
            {
                this._storageArea.get(null, allKeys =>
                {
                    for (var key in allKeys)
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
                    callback(keys);
                });
            }

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
        public addStorageListener(callback: (evt: StorageEvent) => any, useCapture?: boolean): AppStorage
        {
            addEventListener("storage", callback, useCapture);
            return this;
        }
    }
} 