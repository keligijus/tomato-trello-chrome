(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('board', {
        url: '/board',
        templateUrl: 'app/pages/board.tpl.html',
        controller: 'BoardController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
