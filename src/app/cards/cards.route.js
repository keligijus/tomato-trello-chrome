(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cards', {
        url: '/cards/:listsIds',
        templateUrl: 'app/cards/cards.tpl.html',
        controller: 'CardsController',
        controllerAs: 'vm',
        params: {
          listsIds: {
            array: true
          }
        },
        resolve: {
          resolveGetCards: function(trelloFactory, $stateParams) {
            var promisesArr = [],
                promise;

            $stateParams.listsIds.forEach(function(listId) {
              promise = trelloFactory.getListCards(listId);
              promisesArr.push(promise);
            });

            return promisesArr;
          },
          // resoleGetLists: function() {
          //   var promisesArr = [],
          //       promise;

          //   $stateParams.Ids.forEach(function(boardId) {
          //     promise = trelloFactory.getBoardLists(boardId);
          //     promisesArr.push(promise);
          //   });

          //   return promisesArr;
          // },
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
