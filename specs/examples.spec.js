if (typeof require !== 'undefined') {
    var ArgumentValidator = require('../argument-validator');
} else {
    var ArgumentValidator = window.ArgumentValidator;
}

function Rabbit (name, age) {
    ArgumentValidator.string(name, 'name');
    ArgumentValidator.number(age, 'age');
    this.name = name;
}
function Hole (rabbit) {
    this.rabbit = rabbit;
}

function Hole(rabbit) {
    ArgumentValidator.instanceOf(Rabbit, rabbit, 'rabbit');
    this.rabbit = rabbit;
}
Hole.prototype.firstRabbitLetter = function () {
    return this.rabbit.name.substring(0, 1);
};

describe("Examples", function () {
    it('rabbit hole', function () {
        (function () { var r = new Rabbit(); }).should.throw();
        (function () { var r = new Rabbit('Test', '10'); }).should.throw();
        (function () { var h = new Hole(); }).should.throw();
        (function () { var h = new Hole('Test'); }).should.throw();
        (function () { var h = new Hole(new Rabbit()); }).should.throw();
        (function () {
            var r = new Rabbit("test", 10);
            var h = new Hole(new Rabbit('Test', 10));
            h.firstRabbitLetter();
        }).should.not.throw();
    });
});
