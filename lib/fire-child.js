//Require Firebase dependency
var Firebase = require('firebase');

//Construct FireChilde object
function FireChild(ref) {
    //Set ref property as an instance of a Firebase object
    this.ref = ref instanceof Firebase ? ref : new Firebase(ref);
}

//FireChild on method
FireChild.prototype.on = function (depth, eventType, callback, cancelCallback, context) {
    var calcDepth = function (path) {
        return path.match(/\//g).length - (path.slice(-1) == '/' ? 3 : 2);
    };
    
    var initialDepth = calcDepth(this.ref.toString());
    
    var traverse = function (ref) {
        if (calcDepth(ref.toString()) == initialDepth + depth) {
            ref.on(eventType, callback, cancelCallback, context);
        } else {
            ref.on('child_added', function (childSnapshot) {
                traverse(childSnapshot.ref());
            });
        }
    };
    
    //Check depth
    if (depth < 1 || depth + initialDepth > 32) {
        throw new Error('Invalid depth (' + depth + ')');
    }

    this.ref.on('child_added', function (childSnapshot) {
        traverse(childSnapshot.ref());
    });
};

module.exports = FireChild;