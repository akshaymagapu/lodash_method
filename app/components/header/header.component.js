var myApp = angular.module('LodashImplementation');
myApp.controller('headerController', ['$scope', function($scope) {
    // Options to display in Menu
    $scope.options = ['Size', 'Includes', 'Shuffle', 'Sample', 'Samplesize'];
    // Bootstrap code for Hamburger Menu
    $(document).ready(function() {
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function() {
            hamburger_cross();
        });

        $('a[href]').click(function() {
            $('#wrapper').toggleClass('toggled');
            hamburger_cross();

        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function() {
            $('#wrapper').toggleClass('toggled');
        });
    })
}]);
angular.module('LodashImplementation').component('lodashHeader', {
    templateUrl: 'app/components/header/header.view.html'
});