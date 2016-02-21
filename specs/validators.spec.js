if (typeof require !== 'undefined') {
    var V = require('../argument-validator');
} else {
    var V = window.ArgumentValidator;
}

describe("Validators", function () {
    function ClassTest () { };

    it('.isNotNull()', function () {
        V.isNotNull(null).should.be.false
        V.isNotNull(undefined).should.be.false
        V.isNotNull('').should.be.true
        V.isNotNull('     ').should.be.true
        V.isNotNull({}).should.be.true
        V.isNotNull([]).should.be.true
        V.isNotNull('abcd').should.be.true
        V.isNotNull(1).should.be.true
        V.isNotNull([ 1 ]).should.be.true
        V.isNotNull({ test: 1 }).should.be.true
    });

    it('.isInstanceOf()', function () {
        var i = new ClassTest();
        V.isInstanceOf(ClassTest, i).should.be.true;
        V.isInstanceOf(Object, i).should.be.true;
        V.isInstanceOf(ClassTest, function() {}).should.be.false;
        V.isInstanceOf(ClassTest, 'abc').should.be.false;
    });

    it('.isType()', function () {
        V.isType('Date', new Date()).should.be.true;
        V.isType('Date', 'Date').should.be.false;
        V.isType('Date', '[object Date]').should.be.false;
        V.isType('Number', 123).should.be.true;
        V.isType('Number', '123').should.be.false;
        V.isType('String', 123).should.be.false;
        V.isType('String', '123').should.be.true;
        V.isType('Object', {}).should.be.true;
        V.isType('Object', []).should.be.false;
        V.isType('Function', function(){}).should.be.true;
        V.isType('Function', {}).should.be.false;
        V.isType('Array', []).should.be.true;
        V.isType('Array', {}).should.be.false;
        V.isType('RegExp', /test/).should.be.true;
        V.isType('RegExp', {}).should.be.false;
    });

    it('.isBoolean()', function () {
        V.isBoolean(1).should.be.true;
        V.isBoolean(0).should.be.true;
        V.isBoolean(true).should.be.true;
        V.isBoolean(false).should.be.true;
        V.isBoolean(Boolean(1)).should.be.true;
        V.isBoolean('1').should.be.false;
        V.isBoolean(2).should.be.false;
        V.isBoolean('').should.be.false;
        V.isBoolean([]).should.be.false;
        V.isBoolean({}).should.be.false;
    });

    it('.isStringOrEmpty()', function () {
        V.isStringOrEmpty('').should.be.true;
        V.isStringOrEmpty('Test').should.be.true;
        V.isStringOrEmpty(String(1)).should.be.true;
        V.isStringOrEmpty(1).should.be.false;
        V.isStringOrEmpty({}).should.be.false;
        V.isStringOrEmpty([]).should.be.false;
        V.isStringOrEmpty(new String('test')).should.be.true;
    });

    it('.isString()', function () {
        V.isString('').should.be.false;
        V.isString('    ').should.be.false;
        V.isString('Test').should.be.true;
        V.isString(String(1)).should.be.true;
        V.isString(String('    ')).should.be.false;
        V.isString(1).should.be.false;
        V.isString({}).should.be.false;
        V.isString([]).should.be.false;
        V.isString(new String('   ')).should.be.false;
    });

    it('.isNumber()', function () {
        V.isNumber(5).should.be.true;
        V.isNumber(12.5).should.be.true;
        V.isNumber(12.5235134).should.be.true;
        V.isNumber(4 / '2').should.be.true;
        V.isNumber('4' / 2).should.be.true;

        V.isNumber('5').should.be.false;
        V.isNumber(1/0).should.be.false;
        V.isNumber(4/'2A').should.be.false;
    });

    it('.isArrayOrEmpty()', function () {
        V.isArrayOrEmpty([]).should.be.true;
        V.isArrayOrEmpty({}).should.be.false;
        V.isArrayOrEmpty(null).should.be.false;
        V.isArrayOrEmpty([ 1 ]).should.be.true;
    });

    it('.isArray()', function () {
        V.isArray([]).should.be.false;
        V.isArray({}).should.be.false;
        V.isArray([ null ]).should.be.true;
        V.isArray(null).should.be.false;
        V.isArray([ 1 ]).should.be.true;
    });

    it('.isArrayOfNumbers()', function () {
        V.isArrayOfNumbers([]).should.be.false;
        V.isArrayOfNumbers({}).should.be.false;
        V.isArrayOfNumbers([ null ]).should.be.false;
        V.isArrayOfNumbers(null).should.be.false;
        V.isArrayOfNumbers([ 1 ]).should.be.true;
        V.isArrayOfNumbers([ 1, null ]).should.be.false;
    });

    it('.isArrayOfObjects()', function () {
        V.isArrayOfObjects([]).should.be.false;
        V.isArrayOfObjects({}).should.be.false;
        V.isArrayOfObjects([ null ]).should.be.false;
        V.isArrayOfObjects(null).should.be.false;
        V.isArrayOfObjects([ 1, null ]).should.be.false;

        V.isArrayOfObjects([ {} ]).should.be.false;
        V.isArrayOfObjects([ { test: 1 }, { test: 2 } ]).should.be.true;
        V.isArrayOfObjects([ { test: 1 }, { } ]).should.be.false;
    });

    it('.isObjectOrEmpty()', function () {
        V.isObjectOrEmpty({}).should.be.true;
        V.isObjectOrEmpty({ test: 1 }).should.be.true;
        V.isObjectOrEmpty([]).should.be.false;
        V.isObjectOrEmpty(function(){}).should.be.false;
    });

    it('.isObject()', function () {
        V.isObject({}).should.be.false;
        V.isObject({ test: 1 }).should.be.true;
        V.isObject([]).should.be.false;
        V.isObject(function(){}).should.be.false;
    });

    it('.isJson()', function () {
        V.isJson({}).should.be.true;
        V.isJson({ test: 1 }).should.be.true;
        V.isJson("NULL").should.be.false;
    });

    it('.isJsonString()', function () {
        V.isJsonString({}).should.be.false;
        V.isJsonString({ test: 1 }).should.be.false;
        V.isJsonString('{ "test": 1 }').should.be.true;
    });

    it('.hasKeys()', function () {
        V.hasKeys({}, [ 'abc' ]).should.be.false;
        V.hasKeys({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasKeys({ abc: 1 }, [ 'abc' ]).should.be.true;
    });

    it('.hasKeysWithNumber()', function () {
        V.hasKeysWithNumber({}, [ 'abc' ]).should.be.false;
        V.hasKeysWithNumber({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasKeysWithNumber({ abc: 'abc' }, [ 'abc' ]).should.be.false;
        V.hasKeysWithNumber({ abc: 1 }, [ 'abc' ]).should.be.true;
    });

    it('.hasKeysWithString()', function () {
        V.hasKeysWithString({}, [ 'abc' ]).should.be.false;
        V.hasKeysWithString({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasKeysWithString({ abc: 'abc' }, [ 'abc' ]).should.be.true;
        V.hasKeysWithString({ abc: 1 }, [ 'abc' ]).should.be.false;
    });

    it('.hasKeysWithObject()', function () {
        V.hasKeysWithObject({}, [ 'abc' ]).should.be.false;
        V.hasKeysWithObject({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasKeysWithObject({ abc: 'abc' }, [ 'abc' ]).should.be.false;
        V.hasKeysWithObject({ abc: {} }, [ 'abc' ]).should.be.false;
        V.hasKeysWithObject({ abc: { test: 1 } }, [ 'abc' ]).should.be.true;
        V.hasKeysWithObject({ abc: 1 }, [ 'abc' ]).should.be.false;
    });


    it('.isFunction', function () {
        V.isFunction(function(){}).should.be.true;
        V.isFunction(Date).should.be.true;
        V.isFunction(Function).should.be.true;

        V.isFunction(124).should.be.false;
        V.isFunction({}).should.be.false;
        V.isFunction((function(){ })()).should.be.false;
        V.isFunction((function(){ return {}; })()).should.be.false;

        V.isFunction((function(){ return function() {}; })()).should.be.true;
    });

    // has keys aliases

    it('.hasNumberKeys()', function () {
        V.hasNumberKeys({}, [ 'abc' ]).should.be.false;
        V.hasNumberKeys({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasNumberKeys({ abc: 'abc' }, [ 'abc' ]).should.be.false;
        V.hasNumberKeys({ abc: 1 }, [ 'abc' ]).should.be.true;
    });

    it('.hasStringKeys()', function () {
        V.hasStringKeys({}, [ 'abc' ]).should.be.false;
        V.hasStringKeys({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasStringKeys({ abc: 'abc' }, [ 'abc' ]).should.be.true;
        V.hasStringKeys({ abc: 1 }, [ 'abc' ]).should.be.false;
    });

    it('.hasObjectKeys()', function () {
        V.hasObjectKeys({}, [ 'abc' ]).should.be.false;
        V.hasObjectKeys({ abc: null }, [ 'abc' ]).should.be.false;
        V.hasObjectKeys({ abc: 'abc' }, [ 'abc' ]).should.be.false;
        V.hasObjectKeys({ abc: {} }, [ 'abc' ]).should.be.false;
        V.hasObjectKeys({ abc: { test: 1 } }, [ 'abc' ]).should.be.true;
        V.hasObjectKeys({ abc: 1 }, [ 'abc' ]).should.be.false;
    });

});
