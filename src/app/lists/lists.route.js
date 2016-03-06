(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lists', {
        url: '/lists/:boardsIds',
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
            var promisesArr = [],
                promise;

            $stateParams.boardsIds.forEach(function(boardId) {
              promise = trelloFactory.getBoardLists(boardId);
              promisesArr.push(promise);
            });

            return promisesArr;
          },
          resolveGetBoards: function(trelloFactory) {
            if (trelloFactory.cached.boards.length < 1) {
              return trelloFactory.getBoards({ onlyActive: true });
            }
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
