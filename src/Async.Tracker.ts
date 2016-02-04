module Async
{
    "use strict";

    export interface IAsyncAction
    {
        /** Adds a function to be called when the action is completed */
        onCompleted: (callback: (action: IAsyncAction) => any) => IAsyncAction;
        /** Adds a function to be called when the action errors out */
        onError: (callback: (action: IAsyncAction, message: string) => any) => IAsyncAction;
        /** Called when the action should be started */
        start: () => IAsyncAction;
    }

    /**
     * Abstract base class for building an async action with optional timeout.
     * The start() method must be implemented.
     * When the action is done it should call either complete() or error().
     */
    export class AsyncAction implements IAsyncAction
    {
        private timeoutId = 0;
        private callbacks = {
            complete: <((action: AsyncAction) => any)[]>[],
            error: <((action: AsyncAction, message: string) => any)[]>[]
        };

        /** @param timeout (optional) Sets the number of ms before the action times out */
        constructor(timeout?: number)
        {
            if (timeout)
            {
                this.timeoutId = setTimeout(() =>
                {
                    if (this.callbacks.error) this.error("Action timed out");
                }, timeout);
            }
        }
        
        public start(): AsyncAction
        {
            throw new Error("AsyncAction.start() not implemented");
        }

        public onCompleted(callback: (action: AsyncAction) => any): AsyncAction
        {
            this.callbacks.complete.push(callback);
            return this;
        }

        public onError(callback: (action: AsyncAction, message: string) => any): AsyncAction
        {
            this.callbacks.error.push(callback);
            return this;
        }

        /** Method to be called when the action is complete */
        protected complete(): void
        {
            if (this.timeoutId) clearTimeout(this.timeoutId);
            this.callbacks.complete.forEach((callback) => callback(this));
        }
        /** Method to be called when the action errors out */
        protected error(message: string): void
        {
            if (this.timeoutId) clearTimeout(this.timeoutId);
            this.callbacks.error.forEach((callback) => callback(this, message));
        }
    }

    /**
     * Used to track the progress of any number of async actions, usually loading external resources
     */
    export class Tracker<T extends IAsyncAction>
    {
        constructor()
        {
        }

        private internal = {
            totalCount: 0,
            loadedCount: 0,
            errorCount: 0
        };
        private callbacks = {
            actionCompleted: (action: T, tracker: Tracker<T>) => void (0),
            actionError: (action: T, tracker: Tracker<T>) => void (0),
            done: (tracker: Tracker<T>, hasErrors?: boolean) => void (0)
        };

        /** Percentage of actions that have been completed (including errors), between 0 and 1 */
        public get percentComplete(): number
        {
            return (this.internal.loadedCount + this.internal.errorCount) / this.internal.totalCount;
        }
        /** Total number of actions being tracked */
        public get totalCount(): number
        {
            return this.internal.totalCount;
        }
        /** Total number of actions that have been successfully completed */
        public get completedCount(): number
        {
            return this.internal.loadedCount;
        }
        /** Total number of actions that have errored out */
        public get errorCount(): number
        {
            return this.internal.errorCount;
        }
        /** Used to determine if all actions have been completed */
        public get isDone(): boolean
        {
            return this.internal.loadedCount + this.internal.errorCount === this.internal.totalCount;
        }

        /** Adds any number of actions to the tracker and starts them */
        public addActions(...items: T[]): Tracker<T>
        {
            items.forEach((item) => this.addAction(item));
            return this;
        }

        /** Adds one action to the tracker and starts it */
        public addAction(item: T): Tracker<T>
        {
            this.internal.totalCount++;

            item.onCompleted(() =>
            {
                this.internal.loadedCount++;
                this.callbacks.actionCompleted(item, this);
                if (this.isDone)
                {
                    this.callbacks.done(this, this.internal.errorCount > 0);
                }
            })
            .onError(() =>
            {
                this.internal.errorCount++;
                this.callbacks.actionError(item, this);
                if (this.isDone)
                {
                    this.callbacks.done(this, this.internal.errorCount > 0);
                }
            })
            .start();

            return this;
        }

        /** Sets the function to be called when an action is successfully completed */
        public actionComplete(callback: (item: T, tracker: Tracker<T>) => any): Tracker<T>
        {
            this.callbacks.actionCompleted = callback;
            return this;
        }

        /** Sets the function to call when an action errors out */
        public actionError(callback: (item: T, tracker: Tracker<T>) => any): Tracker<T>
        {
            this.callbacks.actionError = callback;
            return this;
        }

        /** Sets the function to call when all actions have completed or errored out */
        public done(callback: (tracker: Tracker<T>, hasErrors: boolean) => any): Tracker<T>
        {
            this.callbacks.done = callback;
            return this;
        }
    }
}
 