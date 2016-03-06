(function() {
  'use strict';

  angular
    .module('tomatoChrome',
      [
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ngResource',
        'ui.router',
        'ngMaterial',
        'toastr',
        'timer',
        'angular.filter',
        // 'trello',
        /* Pages */
        'board',
        'clock',
        'lists'
      ]
    );

})();
