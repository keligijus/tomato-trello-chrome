(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('clock', {
        url: '/clock-:checklistId&:checkItemsId',
        templateUrl: 'app/pages/clock/clock.tpl.html',
        controller: 'ClockController',
        controllerAs: 'vm',
        resolve: {
          resolveGetChecklistItem: function(trelloFactory, $stateParams) {
            return trelloFactory.getChecklistItem($stateParams.checklistId, $stateParams.checkItemsId);
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
