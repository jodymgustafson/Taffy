# Taffy
TypeScript library for creating web apps

This library contains a number of modules and classes that I use when developing single page applications in TypeScript.

Hilights include:

* AudioLib module - Contains a number of classes for loading, managing and playing HTML5 audio.
* AudioLib.AudioClip - A class that wraps an audio element providing chainable methods and utils.
* AudioLib.AudioManager - Provides support for loading and caching audio elements.
* AudioLib.MultiChannelAudioClip - An audio clip with multiple channels so multiple instances can be played simultaneously.
* Collections.Map - A generic typed Map
* System module - Contains a number of functions and classes that make it easier to work with the JavaScript system.
* System.AppStorage - A wrapper over localstorage with generic typing and application namespacing
* System.Byte - A class for working with bytes (0-255)
* System.Color - Classes for working with rgba colors
* System.KeyCodes - An enumeration of JavaScript key codes for handling keyboard input
* UI.CanvasContext2D - A wrapper and chainable high level drawing methods for HTMLCanvasElement 2D context
* UI.Elements - Defines classes to make working with elements and event easier
