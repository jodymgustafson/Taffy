module Collections
{
    /**
    * Implements a typed map where the key is a string
    */
    export class Map<V>
    {
        private _keys: string[] = [];
        private _map = {};

        public set(key: string, value: V): void
        {
            this._keys.push(key);
            this._map[key] = value;
        }

        public get(key: string): V
        {
            return this._map[key];
        }

        // can't be named delete because it's a keyword
        public remove(key: string): boolean
        {
            let i = this._keys.indexOf(key);
            if (i >= 0)
            {
                this._keys.splice(i, 1);
                delete this._map[key];
                return true;
            }

            return false;
        }

        public clear(): void
        {
            this._keys = [];
            this._map = {};
        }

        public has(key: string): boolean
        {
            return this._keys.indexOf(key) >= 0;
        }

        public forEach(callback: (value: V, key: string, map: Map<V>) => any): void
        {
            for (let key of this._keys)
            {
                callback(this._map[key], key, this);
            }
        }

        public keys(): string[]
        {
            return this._keys.slice();
        }

        public values(): V[]
        {
            var values: V[] = [];
            this.forEach(v =>
            {
                values.push(v);
            });
            return values;
        }
    }
}
