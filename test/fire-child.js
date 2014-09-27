var Firebase = require('firebase'),
    FireChild = require('../lib/fire-child.js'),
    should = require('should');

describe('FireChild', function () {

    before(function (done) {
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
        }, function () {
            done();
        });
    });

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

        it('should not accept depth 0', function () {
            should(function () {
                fireChild.on(0, 'child_added', function () {});
            }).throw();
        });

        var createDepthTest = function (depth, expectedChildren) {
            return function (done) {
                var children = 0;
                fireChild.on(depth, 'child_added', function (childSnapshot) {
                    if (childSnapshot.val()) {
                        children++;
                        if (children == expectedChildren) {
                            done();
                        }
                    }
                });
            };
        };

        it('should return 3 grandchildern', createDepthTest(1, 3));

        it('should return 2 great-grandchildern', createDepthTest(2, 2));
        
        it('should return 1 great-great-grandchild', createDepthTest(3, 1));
        
        it('should not accept depth 33', function () {
            should(function () {
                fireChild.on(33, 'child_added', function () {});
            }).throw();
        });
    });
});