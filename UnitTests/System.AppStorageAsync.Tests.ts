namespace UnitTests 
{
    "use strict";
    export class BaseAppStorageAsyncTests extends TSTest.UnitTest
    {
        private appStorage: System.IAppStorageAsync;

        constructor(storage: System.IAppStorageAsync)
        {
            super();
            this.appStorage = storage;
        }

        public setUp(): void
        {
            this.appStorage.removeAll();
        }
        public tearDown(): void
        {
            this.appStorage.removeAll();
        }

        private _testAddItem<T>(testValue: T): void
        {
            let key = "testAddItem_" + typeof testValue;
            this.appStorage.setItem(key, testValue, () =>
            {
                this.appStorage.getItem<T>(key, s => this.assert.areIdentical(testValue, s));
            });

            this.appStorage.setValue(key, testValue, () =>
            {
                this.appStorage.getValue<T>(key, s => this.assert.areIdentical(testValue, s));
            });
        }

        public testAddString(): void
        {
            this._testAddItem("testAddString");
        }

        public testAddNumber(): void
        {
            this._testAddItem(12345.67);
        }

        public testAddBoolean(): void
        {
            this._testAddItem(true);
        }

        public testAddArray(): void
        {
            let arr = ["a", "b", "c"];

            let key = "testAddArray";
            this.appStorage.setItem(key, arr, () =>
            {
                this.appStorage.getItem<string[]>(key, s => this.assert.areArraysIdentical(arr, s));
            });
            this.appStorage.setValue(key, arr, () =>
            {
                this.appStorage.getValue<string[]>(key, s => this.assert.areArraysIdentical(arr, s));
            });
        }

        public testAddObject(): void
        {
            let obj = {
                a: 1,
                b: "two",
                c: false
            };

            let key = "testAddObject";
            this.appStorage.setItem(key, obj, () =>
            {
                this.appStorage.getItem<any>(key, s =>
                {
                    this.assert.areIdentical(obj.a, s.a);
                    this.assert.areIdentical(obj.b, s.b);
                    this.assert.areIdentical(obj.c, s.c);
                });
            });
            this.appStorage.setValue(key, obj, () =>
            {
                this.appStorage.getValue<any>(key, s =>
                {
                    this.assert.areIdentical(obj.a, s.a);
                    this.assert.areIdentical(obj.b, s.b);
                    this.assert.areIdentical(obj.c, s.c);
                });
            });
        }

        public testAddObjectWithReplacer(): void
        {
            let obj = {
                a: 1,
                b: false
            };

            let key = "testAddObject";
            this.appStorage.setValue(key, obj, () =>
            {
                // test without a reviver
                this.appStorage.getValue<any>(key, s =>
                {
                    this.assert.areIdentical(obj.a, s.a);
                    this.assert.areIdentical(true, s.b);
                });

                // test with a reviver
                this.appStorage.getValue<any>(key, s =>
                    {
                        this.assert.areIdentical(obj.a, s.a);
                        this.assert.areIdentical(false, s.b);
                    },
                    (k, v) =>
                    {
                        if (k === "b") return false;
                        return v;
                    }
                );
            },
            (k, v) =>
            {
                if (k === "b") return true;
                return v;
            });
        }

        public testContains(): void
        {
            let key = "testContains";
            this.appStorage.setItem(key, {});
            this.appStorage.contains(key, result => this.assert.isTrue(result));
            this.appStorage.contains(key + "x", result => this.assert.isFalse(result));
        }

        public testRemove(): void
        {
            let key = "testRemove";
            this.appStorage.setItem(key, {});
            this.appStorage.contains(key, result => this.assert.isTrue(result));
            this.appStorage.remove(key);
            this.appStorage.contains(key, result => this.assert.isFalse(result));
        }

        public testGetKeys(): void
        {
            let key = "testRemove";
            this.appStorage.setItem(key + "a", {});
            this.appStorage.setItem(key + "b", {});
            this.appStorage.setItem(key + "c", {});
            this.appStorage.getKeys(keys =>
                {
                    this.assert.areArraysIdentical(["testRemovea", "testRemoveb", "testRemovec"], keys);
                },
                k => k.indexOf(key) === 0);
        }
    }

    export class AppStorageAsyncTests extends BaseAppStorageAsyncTests
    {
        constructor()
        {
            super(new System.AppStorageAsync("TaffyUnitTests"));
        }
    }

    class MockChromeStorage
    {
        private map = {};
        public set(items: any, callback?: () => any)
        {
            for (let i in items)
            {
                this.map[i] = items[i];
            }
            if (callback) callback();
        }
        public get(key: string, callback: (v: any) => any)
        {
            if (key === null)
            {
                callback(this.map);
            }
            else
            {
                let data = {};
                if (this.map.hasOwnProperty(key))
                {
                    data[key] = this.map[key];
                }
                callback(data);
            }
        }
        public remove(key: string, callback?: () => any)
        {
            delete this.map[key];
            if (callback) callback();
        }
    }

    function getChromeStorage(): Chrome.AppStorage
    {
        var chrome = (window["chrome"] = window["chrome"] || {});
        chrome.storage = chrome.storage || {};
        chrome.storage.local = chrome.storage.local || new MockChromeStorage();
        Chrome.AppStorage["_chromeStorage"] = chrome.storage;
        Chrome.AppStorage["_isAvailable"] = true;
        let storage = new Chrome.AppStorage(Chrome.AppStorageType.local, "TaffyUnitTests");
        return storage;
    }

    export class ChromeAppStorageTests extends BaseAppStorageAsyncTests
    {
        constructor()
        {
            super(getChromeStorage());
        }
    }
}