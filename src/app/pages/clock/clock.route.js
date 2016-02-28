(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('clock', {
        url: '/clock-:checkItemsId',
        templateUrl: 'app/pages/clock/clock.tpl.html',
        controller: 'ClockController',
        controllerAs: 'vm'//,
        // resolve: {
        //   resolveGetBoardCards: function(trelloFactory, $stateParams) {
        //     return trelloFactory.getBoardCards($stateParams.boardId)
        //   }
        // }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
