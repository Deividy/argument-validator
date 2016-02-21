if (typeof require !== 'undefined') {
    var V = require('../argument-validator');
} else {
    var V = window.ArgumentValidator;
}

describe("Demands", function () {
    function ClassTest () { };

    it('.notNull()', function () {
         (function () {
            V.notNull('')
            V.notNull('     ')
            V.notNull({})
            V.notNull([])
            V.notNull('abcd')
            V.notNull(1)
            V.notNull([ 1 ])
            V.notNull({ test: 1 })
        }).should.not.throw();

        (function () { V.notNull(null); }).should.throw();
        (function () { V.notNull(undefined); }).should.throw();
    });

    it('.instaceOf()', function () {
        (function () {
            var i = new ClassTest();
            V.isInstanceOf(ClassTest, i);
            V.isInstanceOf(Object, i);
        }).should.not.throw();

        (function() { V.instanceOf(ClassTest, function(){}); }).should.throw();
        (function() { V.instanceOf(ClassTest, 'abc'); }).should.throw();
    });


    it('.type()', function () {
        (function () {
            V.type('Date', new Date());
            V.type('Number', 12345);
            V.type('Number', 12345.51);
            V.type('String', '');
            V.type('String', '123');
            V.type('Object', {});
            V.type('Array', []);
            V.type('Function', function(){});
            V.type('RegExp', /test/);
        }).should.not.throw();

        (function () { V.type('Date', '1'); }).should.throw();
        (function () { V.type('Number', '1'); }).should.throw();
        (function () { V.type('String', 1); }).should.throw();
        (function () { V.type('Object', []); }).should.throw();
        (function () { V.type('Array', {}); }).should.throw();
        (function () { V.type('Function', {}); }).should.throw();
        (function () { V.type('RegExp', {}); }).should.throw();
    });

    it('.boolean()', function () {
        (function () {
            V.boolean(1);
            V.boolean(0);
            V.boolean(true);
            V.boolean(false);
            V.boolean(Boolean(1));
        }).should.not.throw();

        (function () { V.boolean('1'); }).should.throw();
        (function () { V.boolean(2); }).should.throw();
        (function () { V.boolean(''); }).should.throw();
        (function () { V.boolean([]); }).should.throw();
        (function () { V.boolean({}); }).should.throw();
    });

    it('.stringOrEmpty()', function () {
        (function () {
            V.stringOrEmpty('');
            V.stringOrEmpty('Test');
            V.stringOrEmpty(String(1));
            V.stringOrEmpty(new String('test'));
        }).should.not.throw();

        (function () { V.stringOrEmpty(1); }).should.throw();
        (function () { V.stringOrEmpty({}); }).should.throw();
        (function () { V.stringOrEmpty([]); }).should.throw();
    });

    it('.string()', function () {
        (function () {
            V.string('Test');
            V.string(String(1));
            V.string(new String('test'));
        }).should.not.throw();

        (function () { V.string(String('')); }).should.throw();
        (function () { V.string(new String('')); }).should.throw();
        (function () { V.string(''); }).should.throw();
        (function () { V.string(1); }).should.throw();
        (function () { V.string({}); }).should.throw();
        (function () { V.string([]); }).should.throw();
    });

    it('.number()', function () {
        (function () {
            V.number(5);
            V.number(4/'2');
            V.number('4' / '2');
            V.number(12.5);
            V.number(12.5235134);
        }).should.not.throw();
        (function () { V.number('5'); }).should.throw();
        (function () { V.number(1/0); }).should.throw();
        (function () { V.number(1/'A'); }).should.throw();
    });


    it('.arrayOrEmpty()', function () {
        (function () {
            V.arrayOrEmpty([]);
            V.arrayOrEmpty([ 1 ]);
        }).should.not.throw();

        (function () { V.arrayOrEmpty({}); }).should.throw();
        (function () { V.arrayOrEmpty(null); }).should.throw();
    });

    it('.array()', function () {
        (function () {
            V.array([ 1 ]);
            V.array([ 'test' ]);
        }).should.not.throw();

        (function () { V.array([]); }).should.throw();
        (function () { V.array({}); }).should.throw();
        (function () { V.array(null); }).should.throw();
    });

    it('.arrayOfNumbers()', function () {
        (function () {
            V.arrayOfNumbers([ 1 ]);
        }).should.not.throw();

        (function () { V.arrayOfNumbers([]); }).should.throw();
        (function () { V.arrayOfNumbers({}); }).should.throw();
        (function () { V.arrayOfNumbers([ null ]); }).should.throw();
        (function () { V.arrayOfNumbers(null); }).should.throw();
        (function () { V.arrayOfNumbers([ 1, null ]); }).should.throw();
    });

    it('.arrayOfObjects()', function () {
        (function () {
            V.arrayOfObjects([ { test: 1 }, { test: 2 } ]);
        }).should.not.throw();

        (function () { V.arrayOfObjects([]); }).should.throw();
        (function () { V.arrayOfObjects({}); }).should.throw();
        (function () { V.arrayOfObjects([ null ]); }).should.throw();
        (function () { V.arrayOfObjects(null); }).should.throw();
        (function () { V.arrayOfObjects([ 1, null ]); }).should.throw();
        (function () { V.arrayOfObjects([ {} ]); }).should.throw();
        (function () { V.arrayOfObjects([ { test: 1 }, { } ]); }).should.throw();
    });


    it('.objectOrEmpty()', function () {
        (function () {
            V.objectOrEmpty({});
            V.objectOrEmpty({ test: 1 });
        }).should.not.throw();

        (function () { V.objectOrEmpty([]); }).should.throw();
        (function () { V.objectOrEmpty(function(){}); }).should.throw();
    });

    it('.object()', function () {
        (function () {
            V.object({ test: 1 });
        }).should.not.throw();

        (function () { V.object({}); }).should.throw();
        (function () { V.object([]); }).should.throw();
        (function () { V.object(function(){}); }).should.throw();
    });

    it('.json()', function () {
        (function () {
            V.json({ test: 1 });
            V.json({});
        }).should.not.throw();

        (function () { V.json("NULL"); }).should.throw();
    });

    it('.jsonString()', function () {
        (function () {
            V.jsonString('{ "test": 1 }');
        }).should.not.throw();

        (function () { V.jsonString({}); }).should.throw();
        (function () { V.jsonString({ test: 1 }) }).should.throw();
    });

    it('.keys()', function () {
        (function () {
            V.keys({ abc: 1 }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.keys({}, [ 'abc' ]); }).should.throw();
        (function () { V.keys({ abc: null }, [ 'abc' ]); }).should.throw();
    });

    it('.keysWithNumber()', function () {
        (function () {
            V.keysWithNumber({ abc: 1 }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.keysWithNumber({}, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithNumber({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithNumber({ abc: 'abc' }, [ 'abc' ]); }).should.throw();
    });

    it('.keysWithString()', function () {
        (function () {
            V.keysWithString({ abc: 'abc' }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.keysWithString({}, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithString({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithString({ abc: 1 }, [ 'abc' ]); }).should.throw();
    });

    it('.keysWithObject()', function () {
        (function () {
            V.keysWithObject({ abc: { test: 1 } }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.keysWithObject({}, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithObject({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithObject({ abc: 'abc' }, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithObject({ abc: {} }, [ 'abc' ]); }).should.throw();
        (function () { V.keysWithObject({ abc: 1 }, [ 'abc' ]); }).should.throw();
    });

    it('.function()', function () {
        (function () {
            V.function(function() {});
            V.function((function() { return function() { } })());
        }).should.not.throw();

        (function () { V.function(1); }).should.throw();
        (function () { V.function(null); }).should.throw();
        (function () { V.function(undefined); }).should.throw();
        (function () { V.function((function() { })()); }).should.throw();
    });

    // keys aliases

    it('.numberKeys()', function () {
        (function () {
            V.numberKeys({ abc: 1 }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.numberKeys({}, [ 'abc' ]); }).should.throw();
        (function () { V.numberKeys({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.numberKeys({ abc: 'abc' }, [ 'abc' ]); }).should.throw();
    });

    it('.stringKeys()', function () {
        (function () {
            V.stringKeys({ abc: 'abc' }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.stringKeys({}, [ 'abc' ]); }).should.throw();
        (function () { V.stringKeys({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.stringKeys({ abc: 1 }, [ 'abc' ]); }).should.throw();
    });

    it('.objectKeys()', function () {
        (function () {
            V.objectKeys({ abc: { test: 1 } }, [ 'abc' ]);
        }).should.not.throw();

        (function () { V.objectKeys({}, [ 'abc' ]); }).should.throw();
        (function () { V.objectKeys({ abc: null }, [ 'abc' ]); }).should.throw();
        (function () { V.objectKeys({ abc: 'abc' }, [ 'abc' ]); }).should.throw();
        (function () { V.objectKeys({ abc: {} }, [ 'abc' ]); }).should.throw();
        (function () { V.objectKeys({ abc: 1 }, [ 'abc' ]); }).should.throw();
    });
});
