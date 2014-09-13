# Finder library for Firefox OS

This library is an interface to search and pick files from the `DeviceStorages` on Firefox OS devices. It provides an easy-to-use asynchronous interface for other Firefox OS apps to search for files on Firefox OS devices. The library is based on an event-based architecture, letting developers build beautiful asynchronous API for their apps.

The `Finder` library is best used by developers looking to pick a file from `sdcard` for their apps.

This library depends on [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Wolfy87, included with the package.

## Install

Copy the scripts to your app's directory, e.g. in the `js` subdirectory. Load these scripts in the HTML page in this order:

 - `EventEmitter.min.js`
 - `applait.finder.js`

```html
<script type="text/javascript" src="js/EventEmitter.min.js"></script>
<script type="text/javascript" src="js/applait.finder.js"></script>
```

## Usage

### 1. Create an instance

Create an instance of `Applait.Finder`. The constructor takes an `options` object which can have the following options. All options are optional:

 - `type` : Can be one of `sdcard`, `pictures`, `music`, `videos`. Default: `sdcard`.
 - `minSearchLength` : A number representing the minimum length of the search string without which search will not be triggered. Default: `3`.
 - `debugMode` : If set to `true`, enables the debug mode, which prints all activities by the library on the browser console. Default: `false`.

```js
var finder = new Applait.Finder({ type: "sdcard", debugMode: true });
```

**Note: for production use, keep `debugMode` turned off to save memory.**

### 2. Trigger search

Trigger a search by calling `finder.search()` and passing it the search string.

```js
finder.search(searchterm);
```

From this point onwards, `Finder` raises events for each action.

The `search` method will return `null` only if the search string is smaller in length than `minSearchLength` or if no `storage` mediums are found on the device for the given storage `type`. But is not necessary because `Finder` raises an event in either case.


### 3. Listen to events

To listen to events, add an event listener with a callback using `finder.events.addListener()`. Each event gets a specific set of arguments depending on the event. For example, when `search()` finds a matching file, it raises the `fileFound` event with two arguments, the `File` object and a `fileinfo` object and the storage name in which it was found:

```js
finder.events.addListener("fileFound", function (file, fileinfo, storageName) {
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
finder.events.addListener("fileFound", function (file, fileinfo, storageName) {
    // Code goes here
});
```

### searchBegin

This event is fired when search is started. It provides the following arguments:

 - `needle` - The search string.

Example:

```js
finder.events.addListener("searchBegin", function (needle) {
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
finder.events.addListener("storageSearchBegin", function (storageName, needle) {
    // Code goes here
});
```

### searchComplete

This event is fired when search has completed for a particular storage location. It provides the following arguments:

 - `storageName` - The internal name of the storage space.
 - `needle` - The search string.
 - `filematchcount` - The number of files matched in this search.

Note that `searchComplete` can be fired multiple times during a single `search()` if there are multiple storage locations.

Example:

```js
finder.events.addListener("searchComplete", function (storageName, needle, filematchcount) {
    // Code goes here
});
```

### searchCancelled

This event is fired when a search is cancelled. It provides the following arguments:

 - `message` : A string describing the reason of the cancel.

Example:

```js
finder.events.addListener("searchCancelled", function (message) {
    // Code goes here
});
```

### empty

This event is fired when there is no storage medium available for the provided storage type. It provides the following arguments:

 - `needle` - The search string.

Example:

```js
finder.events.addListener("empty", function (needle) {
    // Code goes here
});
```

### error

This event is fired when any error is faced by the search. It provides the following arguments:

 - `message` : A string describing the reason of the cancel.
 - `error` : The error object thrown.

Example:

```js
finder.events.addListener("error", function (message) {
    // Code goes here
});
```

## Credits and attribution

 - [EventEmitter](https://github.com/Wolfy87/EventEmitter) by Oliver Caldwell. Used under the MIT License.


 ~~ Built with love by [Applait](http://applait.com). ~~
