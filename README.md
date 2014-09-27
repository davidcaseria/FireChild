# FireChild

[![Build Status](https://travis-ci.org/davidcaseria/FireChild.svg?branch=master)](https://travis-ci.org/davidcaseria/FireChild)
[![NPM version](https://badge.fury.io/js/fire-child.svg)](http://badge.fury.io/js/fire-child)

A Node.js module which attaches listeners to grandchildren of a Firebase reference.

Read more about Firebase listeners here: https://www.firebase.com/docs/web/api/query/on.html.

## Installation

To install FireChild, run the following command:

```bash
$ npm install fire-child
```

## API Reference

### FireChild

A `FireChild` instance is used to add listeners to grandchild locations.

```JavaScript
var FireChild = require('fire-child');
```

#### new FireChild(ref)

Creates and returns a new `FireChild` instance to add listeners. Note that this `ref` can point to anywhere in your Firebase and can either be a string or an instance of the Firebase object.

```JavaScript
// Create a FireChild object
var fireChild = new FireChild('https://<your-firebase>.firebaseio.com/');
```

#### FireChild.on(depth, eventType, callback, [cancelCallback], [context])

Adds a Firebase listener at the specified depth from the reference which created the `FireChild`.

```JavaScript
// Add child_added eventType to grandchildren of Firebase reference
fireChild.on(1, 'child_added', function (childSnapshot, prevChildName) {});
```

## Contributing

If you'd like to contribute to FireChild, you'll need to run the following commands to get your environment set up:

```bash
$ git clone https://github.com/davidcaseria/FireChild.git
$ cd FireChild           # go to the geofire directory
$ npm install -g mocha   # globally install mocha test framework
$ npm install            # locally install all dependencies
```