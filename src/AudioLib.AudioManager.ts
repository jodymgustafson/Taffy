/// <reference path="async.tracker.ts" />
/// <reference path="system.ts" />
/// <reference path="audiolib.ts" />
/// <reference path="collections.map.ts" />

module AudioLib
{
    "use strict";
    export class LoadAudioAction extends Async.AsyncAction
    {
        constructor(public audio: HTMLAudioElement, timeout?: number)
        {
            super(timeout);
        }

        public start(): LoadAudioAction
        {
            var oncanplaythru = () =>
            {
                log("Audio loaded: " + this.audio.src);
                // In firefox we keep getting these events if it's not removed
                this.audio.removeEventListener("canplaythrough", oncanplaythru);
                this.complete();
            };
            this.audio.addEventListener("canplaythrough", oncanplaythru);

            this.audio.addEventListener("error", (evt) =>
            {
                console.error("Error loading audio: " + this.audio.src);
                this.error("Error code: " + this.audio.error.code);
            });

            return this;
        }
    }

    /**
     * Provides support for loading and caching audio elements.
     * This can be used along with an Async.Tracker to keep track of the loading process.
     */
    export class AudioManager
    {
        private audios = new Collections.Map<HTMLAudioElement>();
        private static audioExt = getSupportedFileTypes()[0];

        /**
        * Creates an audio manager
        * @param audioPath The default path to look for audio files
        * @param timeout Set timeout in ms for loading audio, default no timeout
        * @param noCache Set to true to not cache audio, default false
        */
        constructor(private audioPath = "", private timeout = 0, private noCache = false)
        {
        }

        /**
        * Gets an audio element. First checks the cache for it. If not found it will be loaded and cached.
        * @param name Name of the audio file, without a file extension
        * @param onLoaded A callback function to be called after the file has been loaded
        * @param onError A callback function to be called when there was an error loading the file
        */
        public getAudio(name: string, onLoaded?: (audio: HTMLAudioElement) => any, onError?: (audio: HTMLAudioElement) => any): HTMLAudioElement
        {
            // Try to get from cache
            var audio = this.audios.getItem(name);
            if (!audio)
            {
                // Not in cache, load it
                audio = this.createAudio(name);
                // Add event listeners
                if (onLoaded) audio.onload = () => onLoaded(audio);
                if (onError) audio.onerror = () => onError(audio);
                // Add to cache
                this.audios.setItem(name, audio);
            }
            else if (onLoaded)
            {
                onLoaded(audio);
            }
            return audio;
        }

        /**
         * Loads one or more audio clips
         * @param names One or more audio file names
         * @return A tracker object where you can define callbacks for loaded, done and error.
         */
        public loadAudio(...names: string[]): Async.Tracker<LoadAudioAction>
        {
            return this.loadAudios(names);
        }

        /**
         * Loads one or more audio clips from an array of audio file names
         * @param names An array of audio file names
         * @return An instance of an Async.Tracker<LoadAudioAction>
         */
        public loadAudios(names: string[]): Async.Tracker<LoadAudioAction>
        {
            var tracker = new Async.Tracker();

            names.forEach((name) =>
            {
                var audio = this.createAudio(name);
                tracker.addAction(new LoadAudioAction(audio, this.timeout));
                // Add to cache
                this.audios.setItem(name, audio);
            });

            return tracker;
        }

        /** Enumerates over each cached audio resource */
        public forEach(callback: (audio: HTMLAudioElement) => any): void
        {
            this.audios.each(callback);
        }

        private createAudio(name: string): HTMLAudioElement
        {
            if (AudioLib.debug) log("Loading audio: " + name + AudioManager.audioExt);
            var audio = new Audio();
            audio.id = name;
            audio.src = encodeURI(this.audioPath) + "/" + encodeURIComponent(name) + AudioManager.audioExt;
            return audio;
        }
    }
}
