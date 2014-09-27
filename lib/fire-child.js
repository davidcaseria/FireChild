//Require Firebase dependency
var Firebase = require('firebase');

//Construct FireChilde object
function FireChild(ref) {
    //Set ref property as an instance of a Firebase object
    this.ref = ref instanceof Firebase ? ref : new Firebase(ref);
}

//FireChild on method
FireChild.prototype.on = function (action, levels, callback) {
    var root = this.ref;

    var calcDepth = function (path) {
        return path.match(/\//g).length - (path.slice(-1) == '/' ? 3 : 2);
    };

    //Check levels
    if (levels < 1 || levels + calcDepth(this.ref.toString()) > 32) {
        throw new Error('Invalid levels value (' + levels + ')');
    }

    var traverse = function (ref) {
        if (calcDepth(ref.toString()) == calcDepth(root.toString()) + levels) {
            ref.on(action, callback);
        } else {
            ref.on('child_added', function (childSnapshot) {
                traverse(childSnapshot.ref());
            });
        }
    };

    root.on('child_added', function (childSnapshot) {
        traverse(childSnapshot.ref());
    });
};

module.exports = FireChild;