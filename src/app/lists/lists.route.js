(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lists', {
        url: '/lists',
        templateUrl: 'app/lists/lists.tpl.html',
        controller: 'ListsController',
        controllerAs: 'vm',
        params: {
          boardsIds: {
            array: true
          }
        },
        resolve: {
          resolveGetLists: function(trelloFactory, $stateParams) {
            // return trelloFactory.getLists($stateParams)
            return console.warn($stateParams)
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
