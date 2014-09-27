var Firebase = require('firebase'),
    FireChild = require('../lib/fire-child.js'),
    should = require('should');

var ref = new Firebase('https://fire-child.firebaseio.com/');
ref.set({
    level1: true,
    level2: {
        level1: true
    },
    level3: {
        level2: {
            level1: true
        }
    },
    level4: {
        level3: {
            level2: {
                level1: true
            }
        }
    }
});


var fireChild = new FireChild('https://fire-child.firebaseio.com/');

fireChild.on('child_added', 3, function (childSnapshot, prevChildName) {
    console.log(childSnapshot.val());
});

describe('FireChild', function () {

    describe('#constructor()', function () {
        it('should exist', function () {
            (typeof FireChild !== 'undefined').should.be.true;
        });

        it('should be a function', function () {
            (FireChild).should.be.a.Function;
        });

        it('should accept a string', function () {
            var fireChild = new FireChild('https://fire-child.firebaseio.com/');
            (typeof fireChild !== 'undefined').should.be.true;
        });

        it('should accept a Firebase reference', function () {
            var fireChild = new FireChild(new Firebase('https://fire-child.firebaseio.com/'));
            (typeof fireChild !== 'undefined').should.be.true;
        });
    });

    describe('#on()', function () {
        var fireChild = new FireChild('https://fire-child.firebaseio.com/');

        it('should exist', function () {
            (typeof fireChild.on !== 'undefined').should.be.true;
        });

        it('should be a function', function () {
            (fireChild.on).should.be.a.Function;
        });

        it('should not accept level 0', function () {
            should(function () {
                fireChild.on('child_added', 0, function () {})
            }).throw();
        });
    });
});