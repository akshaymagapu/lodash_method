'use strict';

describe('header', function() {
    beforeEach(angular.mock.module('LodashImplementation'));

    var HeaderController, scope, controller;

    beforeEach(inject(function($rootScope, _$controller_) {
        scope = $rootScope.$new();
        HeaderController = _$controller_;
        controller = HeaderController('headerController', { $scope: scope });
    }));

    it('should check options property is defined', function() {
        expect(scope.options).toBeDefined();
    });

    it('should check options length', function() {
        expect(scope.options.length).toBe(4);
    });

});