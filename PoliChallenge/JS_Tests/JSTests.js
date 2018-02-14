/// <reference path="../bower_components/jquery/dist/jquery.js" />
/// <reference path="../bower_components/jquery/test/unit/traversing.js" />
/// <reference path="../bower_components/jquery/test/unit/tween.js" />
/// <reference path="../bower_components/jquery/test/unit/ready.js" />
/// <reference path="../bower_components/jquery/test/unit/queue.js" />
/// <reference path="../bower_components/jquery/test/unit/serialize.js" />
/// <reference path="../bower_components/jquery/test/unit/serialize.js" />
/// <reference path="../bower_components/jquery/test/unit/offset.js" />
/// <reference path="../bower_components/jquery/test/unit/selector.js" />

/// <reference path="../bower_components/jasmine-core/lib/jasmine-core/jasmine.js" />
/// <reference path="../site/guidgenerator.js" />

describe("Guid_Generator_Tests", function () {
    var sut = guidGenerator;

    it("Should_Generate_Valid_Guid", function() {
        var regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

        var actual = sut.generate();

        var result = regex.test(actual);

        expect(result).toBe(true);
    });
});