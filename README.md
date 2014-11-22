# Finder library for Firefox OS

[![Build Status](https://travis-ci.org/applait/finderjs.svg?branch=master)](https://travis-ci.org/applait/finderjs)

This library is an interface to search and pick files from the `DeviceStorages` on Firefox OS devices. It provides an easy-to-use asynchronous interface for other Firefox OS apps to search for files on Firefox OS devices. The library is based on an event-based architecture, letting developers build beautiful asynchronous API for their apps.

The `Finder` library is best used by developers looking to pick a file from `sdcard` for their apps.

This library depends on [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Wolfy87, included with the package.

## Install

Copy the minified script `./applait.finder.min.js` to your app's directory, e.g. in the `js` subdirectory. Add the script to the HTML page:

```html
<script type="text/javascript" src="js/applait.finder.min.js"></script>
```

The minified version includes its dependencies, so you need to add just this one file to get started.

## Usage

### 1. Create an instance

Create an instance of `Applait.Finder`. The constructor takes an `options` object which can have the following options. All options are optional:

 - `type` : Can be one of `sdcard`, `pictures`, `music`, `videos`. Default: `sdcard`.
 - `minSearchLength` : A number representing the minimum length of the search string without which search will not be triggered. Default: `3`.
 - `hidden` : If set to `true`, excludes hidden files from search. Default: `false`.
 - `caseSensitive` : If set to `true`, makes search case sensitive. Default: `false`.
 - `debugMode` : If set to `true`, enables the debug mode, which prints all activities by the library on the browser console. Default: `false`.

```js
var finder = new Applait.Finder({ type: "sdcard", debugMode: true });
```

**Note: for production use, keep `debugMode` turned off to save memory.**

#### 1.1 Set permissions in `manifest.webapp`

In your app's manifest, add permission for the type of `DeviceStorage` access you need. For details, see [Device Storage Permissions](https://developer.mozilla.org/en-US/docs/Web/API/Device_Storage_API#Device_storage_permissions).

### 2. Trigger search

Trigger a search by calling `finder.search()` and passing it the search string.

```js
finder.search(searchterm);
```

From this point onwards, `Finder` raises events for each action.

The `search` method will return `null` only if the search string is smaller in length than `minSearchLength` or if no `storage` mediums are found on the device for the given storage `type`. But is not necessary because `Finder` raises an event in either case.


### 3. Listen to events

To listen to events, add an event listener with a callback using `finder.on()`. Each event gets a specific set of arguments depending on the event. For example, when `search()` finds a matching file, it raises the `fileFound` event with two arguments, the `File` object and a `fileinfo` object and the storage name in which it was found:

```js
finder.on("fileFound", function (file, fileinfo, storageName) {
    console.log("Found file " + fileinfo.name + " at " + fileinfo.path + " in " + storageName, file);
}
```

## List of events

The `search` method raises events depending on the stage and result of processing the search. When `finder.search()` is triggered, it raises the following events:

### fileFound

This event is fired each time when a file is matched during the search. It provides the following arguments:

 - `file` - the [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object of the result matched.
 - `fileinfo` - An object containing the name and path of the file with the following keys:
     - `name`: A string containing the file name and extension.
     - `path`: A string containing the path to the directory of the file.
 - `storageName` - The internal name of the storage space.

Example:

```js
finder.on("fileFound", function (file, fileinfo, storageName) {
    // Code goes here
});
```

### searchBegin

This event is fired when search is started. It provides the following arguments:

 - `needle` - The search string.

Example:

```js
finder.on("searchBegin", function (needle) {
    // Code goes here
});
```

### storageSearchBegin

This event is event when a search is begun for a particular [DeviceStorage](https://developer.mozilla.org/en-US/docs/Web/API/DeviceStorage).

For instance, `sdcard` storage type can have multiple locations. `Finder` iterates over all available location of the provided storage type using [navigator.getDeviceStorages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getDeviceStorages).

This event provides the following arguments:

 - `storageName` - The internal name of the storage space.
 - `needle` - The search string.

Example:

```js
finder.on("storageSearchBegin", function (storageName, needle) {
    // Code goes here
});
```

### storageSearchComplete

This event is event when a search is completed for a particular [DeviceStorage](https://developer.mozilla.org/en-US/docs/Web/API/DeviceStorage). It can be raised multiple times per search, depending on the number of `storage` locations available.

This event provides the following arguments:

 - `storageName` - The internal name of the storage space.
 - `needle` - The search string.

Example:

```js
finder.on("storageSearchComplete", function (storageName, needle) {
    // Code goes here
});
```

### searchComplete

This event is fired when the entire search has completed. It is raised only once for each search. It provides the following arguments:

 - `needle` - The search string.
 - `filematchcount` - The number of files matched in this search.

Note that `searchComplete` can be fired multiple times during a single `search()` if there are multiple storage locations.

Example:

```js
finder.on("searchComplete", function (needle, filematchcount) {
    // Code goes here
});
```

### searchCancelled

This event is fired when a search is cancelled. It provides the following arguments:

 - `message` : A string describing the reason of the cancel.

Example:

```js
finder.on("searchCancelled", function (message) {
    // Code goes here
});
```

### empty

This event is fired when there is no storage medium available for the provided storage type. It provides the following arguments:

 - `needle` - The search string.

Example:

```js
finder.on("empty", function (needle) {
    // Code goes here
});
```

### error

This event is fired when any error is faced by the search. It provides the following arguments:

 - `message` : A string describing the reason of the cancel.
 - `error` : The error object thrown.

Example:

```js
finder.on("error", function (message, err) {
    // Code goes here
});
```

## Properties

Here are some useful properties of the `Applait.Finder` class:

- `this.filematchcount` : Number of files matched in latest search.
- `this.searchkey` : Search key (needle) of latest search.
- `this.storagesearchcount` : Number of storage locations already searched in the current search.
- `this.options` : Options object passed to the constructor.

## Credits and attribution

 - [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Oliver Caldwell. Used under the MIT License.


 ~~ Built with love by [Applait](http://applait.com). ~~
