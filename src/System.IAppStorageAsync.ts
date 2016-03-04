module System
{
    export interface IAppStorageAsync
    {
        /**
         * Sets the value with the specified key
         * @param key Key
         * @param val Value
         * @param callback Optional function to call when saved
         * @param replacer Optional replacer function to use when stringifying the value
         */
        setValue(key: string, val: any, callback?: () => any, replacer?: (key: string, value: any) => any): IAppStorageAsync;

        /**
         * Gets the value with the specified key
         * @param key Key
         * @param callback Fuction to call with the value. Value will be null if not found.
         * @param reviver Optional reviver to use when parsing the JSON 
         */
        getValue<T>(key: string, callback: (data: T) => any, reviver?: (key: any, value: any) => any): IAppStorageAsync;

        /**
         * Gets the raw value of an item without parsing it
         * @param key Key
         * @param callback Fuction to call with the item. Value will be null if not found.
         */
        getItem(key: string, callback: (data: string) => any): IAppStorageAsync;

        /**
         * Removes the value with the specified key
         * @param key Key
         * @param callback Optional function to call when removed
         */
        removeValue(key: string, callback?: () => any): IAppStorageAsync;

        /**
         * Removes all values
         * @param callback Optional function to call when removed
         */
        removeAll(callback?: () => any): IAppStorageAsync;

        /**
         * Determines if the specified key has a value
         * @param key Key
         * @param callback Fuction to call with the result of the check.
         */
        contains(key: string, callback?: (result: boolean) => any): IAppStorageAsync;

        /**
         * Gets all the keys, or optionally those that match a filter
         * @param filter Optional function that returns true if the key should be included in the result
         * @param callback Function to call with the array of keys
         */
        getKeys(callback: (keys: string[]) => any, filter?: (key: string) => boolean): IAppStorageAsync;
    }
}