(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('board', {
        url: '/board-:boardId',
        templateUrl: 'app/pages/board/board.tpl.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        resolve: {
          resolveGetBoardCards: function(trelloFactory, $stateParams) {
            return trelloFactory.getBoardCards($stateParams.boardId)
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
