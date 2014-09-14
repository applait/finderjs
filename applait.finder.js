/**
 * File picker and finder for device storages on Firefox OS devices
 *
 * This library provides an easy-to-use asynchronous interface for other Firefox OS apps to search for files
 * on Firefox OS devices. The library is based on an event-based architecture, letting developers build
 * beautiful asynchronous API for their apps.
 *
 * The `Finder` library is best used by developers looking to pick a file from the `sdcard` for their apps.
 *
 * This library depends on [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Wolfy87, included with the
 * package.
 *
 * @version 1.0.0
 * @license The MIT License (MIT)
 *
 * Copyright (c) 2014 Applait Technologies LLP
 */

var Applait = Applait || {};

/**
 * Core `Finder` class. Provides the constructor for applications to instantiate.
 *
 * @constructor
 * @param {object=} options - Default options for the `Finder` constructor. It can include any of the following
 * properties:
 *
 * - `type` : `{string}` : Can be one of `sdcard`, `music`, `pictures`, `videos`. Defaults to `sdcard`.
 * - `minSearchLength`: `{number}` : The minimum length of search string without which search will not be triggered.
 * Defaults to `3`.
 * - `debugMode`: `{boolean}` : If `true`, enables debug mode which logs all messages to the browser console. This
 * should be disabled in production mode to reduce memory footprint.
 *
 * @example
 * var finder = new Applait.Finder({ type: "sdcard", debugMode: true });
 */
Applait.Finder = function (options) {

    this.options = options || {};

    this.type = options.type || "sdcard";

    this.minSearchLength = (options.minSearchLength && typeof options.minSearchLength === "number") ?
        options.minSearchLength : 3;

    this.debugMode = options.debugMode ? true : false;

    this.storages = navigator.getDeviceStorages && navigator.getDeviceStorages(this.type);

    this.events = new EventEmitter();

};

/**
 * Instantiate search
 *
 * @memberOf Applait.Finder
 * @param {string} needle - The string to match file names from the device storage.
 * @return {null} - Only if `needle` length is less than `minSearchLength` or if no DeviceStorages are found.
 */
Applait.Finder.prototype.search = function (needle) {

    var context = this,
        filematchcount = 0;

    needle = needle.trim();

    if (needle.length < context.minSearchLength) {
        if (context.debugMode) {
            console.log("Search cancelled. Less than " + context.minSearchLength +  " characters search string");
        }
        context.events.emitEvent("searchCancelled",
                                 ["Search string should be at least " + context.minSearchLength + " characters"]);
        return null;
    }

    if (context.storages.length < 1) {
        if (context.debugMode) {
            console.log("empty", needle);
        }
        context.events.emitEvent("empty", [needle]);
        return null;
    }

    if (context.debugMode) {
        console.log("searchBegin", needle);
    }
    context.events.emitEvent("searchBegin", [needle]);

    context.storages.forEach(function (storage) {

        var cursor = storage.enumerate();

        if (context.debugMode) {
            console.log("storageSearchBegin", storage.storageName, needle);
        }
        context.events.emitEvent("storageSearchBegin", [storage.storageName, needle]);

        cursor.onsuccess = function () {

            if (this.result) {

                var file = this.result;
                var fileinfo = context.splitname(file.name);

                if (fileinfo.name.indexOf(needle) > -1) {
                    filematchcount++;
                    if (context.debugMode) {
                        console.log("fileFound", file, fileinfo, storage.storageName);
                    }
                    context.events.emitEvent("fileFound", [file, fileinfo, storage.storageName]);
                }

                if (!this.done) {
                    this.continue();
                } else {
                    if (context.debugMode) {
                        console.log("searchComplete", storage.storageName, needle, filematchcount);
                    }
                    context.events.emitEvent("searchComplete", [storage.storageName, needle, filematchcount]);
                }
            } else {
                if (context.debugMode) {
                    console.log("searchComplete", storage.storageName, needle, filematchcount);
                }
                context.events.emitEvent("searchComplete", [storage.storageName, needle, filematchcount]);
            }

        };

        cursor.onerror = function () {
            if (context.debugMode) {
                console.log("Error accessing device storage '" + storage.storageName + "'", this.error);
            }
            context.events.emitEvent('error', ["Error accessing device storage '" + storage.storageName + "'",
                                               this.error]);
        };

    });
};

/**
 * Splits full file path into basename and path to directory.
 *
 * @memberOf Applait.Finder
 * @param {string} filename - Filename obtained for `File.filename`
 * @return {object} - An object with two keys:
 *
 * - `name` - the basename of the file with extension
 * - `path` - path to the file's directory.
 */
Applait.Finder.prototype.splitname = function (filename) {
    filename = filename.split(/[\\/]/);

    return { "name": filename.pop(), "path": filename.join("/") };
};
