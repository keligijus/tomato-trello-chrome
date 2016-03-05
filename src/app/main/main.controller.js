(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, trelloFactory) {
    var vm = this;

    vm.trello = trelloFactory;
    vm.boardsSearch = undefined;

    // activate();

    vm.trello.init();

    vm.trello.getBoards({ onlyActive: true }).then(function(result){
      vm.boards = result;
    });

    vm.goToBoard = function(boardId) {
      $log.info(boardId);
      vm.trello.getBoardCards(boardId).then(function(result){
        $log.info('result');
        $log.debug(result);
      });
    }

    vm.goToSelectedBoards = function() {
      vm.boards.forEach(function(board) {
        if (board.TTisSelected) {
          
        }
      });
    }

  }
})();
