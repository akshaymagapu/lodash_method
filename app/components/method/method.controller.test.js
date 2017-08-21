'use strict';

describe('method', function() {
    beforeEach(angular.mock.module('LodashImplementation'));

    var methodController, MethodService, scope, controller, $document;

    beforeEach(inject(function($rootScope, _$controller_, _methodService_, _$document_) {
        scope = $rootScope.$new();
        methodController = _$controller_;
        MethodService = _methodService_;
        $document = _$document_;
        controller = methodController('methodController', { $scope: scope, 'methodService': MethodService });
    }));
    // test scenarios covered in below test cases
    it('should check methods property is defined', function() {
        expect(scope.methods).toBeDefined();
        expect(scope.methods.length).toBe(5);
    });

    it('should check methods length', function() {
        expect(scope.methods.length).toBe(5);
    });


    it('should check methodModel', function() {
        var methodName = 'Sample';
        scope.$broadcast('method-changed', {
            methodName: methodName
        });
        scope.methodModel = MethodService.getMethodModel();
        expect(scope.methodModel.name).toBe('Sample');
        expect(scope.methodModel.description).toBe('Gets a random element from collection.');
        expect(scope.methodModel.args).toBe(`collection (Array|Object): The collection to sample.`);
    });


    it('should call method based on input', function() {
        scope.methodModel.name = 'Sample';
        scope.customInputs.methodInput = '[1,2,3]';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.showChart).toHaveBeenCalled();
    });

    it('should call sample method based on input and expect output', function() {
        scope.methodModel.name = 'Sample';
        scope.customInputs.methodInput = '[1,2,3]';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult.toString().length).toBe(1);
    });

    it('should call size method based on input and expect output', function() {
        scope.methodModel.name = 'Size';
        scope.customInputs.methodInput = '[1,2,3]';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult).toBe(3);
    });

    it('should call Samplesize method based on input and expect output size', function() {
        scope.methodModel.name = 'Samplesize';
        scope.customInputs.collection = '[1,2,3]';
        scope.customInputs.value = '2';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult.length).toBe(2);
    });

    it('should call Samplesize method based on input and expect output to be desired length', function() {
        scope.methodModel.name = 'Samplesize';
        scope.customInputs.collection = '[1,2,3]';
        scope.customInputs.value = '2';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult.length).toBe(2);
    });

    it('should call Shuffle method based on input and expect output to be desired length', function() {
        scope.methodModel.name = 'Shuffle';
        scope.customInputs.methodInput = '[1,2,3]';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult.length).toBe(3);
    });

    it('should call Includes method based on input and expect output to be boolean', function() {
        scope.methodModel.name = 'Includes';
        scope.customInputs.collection = '[1,2,3]';
        scope.customInputs.value = '2';
        scope.customInputs.index = '0';
        spyOn(scope, 'showChart').and.stub();
        scope.callMethod();
        expect(scope.outputResult).toBe(true);
    });
});