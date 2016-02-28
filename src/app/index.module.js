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
        'trello',
        /* Pages */
        'board',
        'clock'
      ]
    );

})();
