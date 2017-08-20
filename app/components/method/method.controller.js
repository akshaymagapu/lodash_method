var myApp = angular.module('LodashImplementation');
myApp.controller('methodController', ['$rootScope', '$scope', 'methodService', function($rootScope, $scope, MethodService) {
    // Getting method name and executing method
    var methodName = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    if (methodName) {
        $rootScope.$broadcast('method-changed', {
            methodName: methodName
        });
    }
    $scope.textInput = '';
    $scope.methodModel = MethodService.getMethodModel();
    $scope.callMethod = function() {
            var inputs;
            eval('inputs=' + $scope.textInput);
            var outputResult = myLodash[$scope.methodModel.name](inputs);
            $scope.myInputs = inputs;
            $scope.outputResult = outputResult;
            $scope.showChart();
        }
        // to disable send button
    $scope.disableSend = null;
    // Static Data for methods and their description
    $scope.methods = [{
            name: 'Sample',
            description: 'Gets a random element from collection.',
            arguments: 'collection (Array|Object): The collection to sample.'
        },
        {
            name: 'Samplesize',
            description: 'Gets n random elements at unique keys from collection up to the size of collection.',
            arguments: `collection (Array|Object): The collection to sample.
            [n=1] (number): The number of elements to sample.`
        },
        {
            name: 'Size',
            description: 'Gets the size of collection by returning its length for array-like values or the number of own enumerable string keyed properties for objects.',
            arguments: 'collection (Array|Object|string): The collection to inspect.'
        },
        {
            name: 'Shuffle',
            description: 'Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.',
            arguments: 'collection (Array|Object): The collection to shuffle.'
        },
        {
            name: 'Includes',
            description: 'Checks if value is in collection. If collection is a string, it\'s checked for a substring of value, otherwise SameValueZero is used for equality comparisons. If fromIndex is negative, it\'s used as the offset from the end of collection.',
            arguments: `collection (Array|Object|string): The collection to inspect.
            value( * ): The value to search
            for.
            [fromIndex = 0](number): The index to search from.
            `
        },

    ];
    // High charts code for showing flowchart
    $scope.showChart = function() {
            if ($scope.outputResult) {
                Highcharts.chart('chartContainer', {
                    chart: {
                        backgroundColor: 'white',
                        events: {
                            load: function() {

                                // Draw the flow chart
                                var ren = this.renderer,
                                    colors = Highcharts.getOptions().colors,
                                    rightArrow = ['M', 0, 0, 'L', 100, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
                                    leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];



                                // Separator, client from service
                                /* ren.path(['M', 200, 40, 'L', 400, 330])
                                    .attr({
                                        'stroke-width': 2,
                                        stroke: 'silver',
                                        dashstyle: 'dash'
                                    })
                                    .add(); */

                                // Headers
                                ren.label('Input', 100, 40)
                                    .css({
                                        fontWeight: 'bold'
                                    })
                                    .add();
                                ren.label('Output', 280, 40)
                                    .css({
                                        fontWeight: 'bold'
                                    })
                                    .add();

                                // SaaS client label
                                ren.label($scope.myInputs, 50, 82)
                                    .attr({
                                        fill: colors[0],
                                        r: 5
                                    })
                                    .css({
                                        color: 'white'
                                    })
                                    .add()
                                    .shadow(true);

                                // Arrow from SaaS client to Phantom JS
                                ren.path(rightArrow)
                                    .attr({
                                        'stroke-width': 2,
                                        stroke: colors[3]
                                    })
                                    .translate(160, 95)
                                    .add();

                                ren.label('Execute', 180, 60)
                                    .css({
                                        fontSize: '10px',
                                        color: colors[3]
                                    })
                                    .add();

                                ren.label($scope.outputResult, 280, 82)
                                    .attr({
                                        r: 5,
                                        width: 100,
                                        fill: colors[1]
                                    })
                                    .css({
                                        color: 'white',
                                        fontWeight: 'bold'
                                    })
                                    .add();
                            }
                        }
                    },
                    title: {
                        text: 'Lodash Method ' + $scope.methodModel.name + ' Input/Output',
                        style: {
                            color: 'black'
                        }
                    }


                });
            }
        }
        // Listener for event broadcasted and make a model to render in view
    if (!$rootScope.$$listenerCount['method-changed']) {
        $scope.$on('method-changed', function(event, args) {
            var anyThing = args.methodName;
            $scope.methods.forEach(function(element) {
                if (element.name === anyThing) {
                    $scope.tempModel = {};
                    $scope.tempModel['name'] = element.name;
                    $scope.tempModel['description'] = element.description;
                    $scope.tempModel['args'] = element.arguments;
                    MethodService.saveMethodModel($scope.tempModel);
                }
            });
        });
    }
}]);
myApp.factory('methodService', ['$rootScope', function($rootScope) {
    var methodModel = {};
    return {
        saveMethodModel: function(data) {
            methodModel = data;
        },
        getMethodModel: function() {
            return methodModel;
        }
    };
}]);