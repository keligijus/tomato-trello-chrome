(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, $state, trelloFactory) {
    var vm = this;

    vm.trello = trelloFactory;
    vm.boardsSearch = undefined;
    vm.allBoardsIds = [];
    vm.selectedBoardsIds = [];

    // activate();

    vm.trello.init();

    vm.trello.getBoards({ onlyActive: true }).then(function(result){
      vm.boards = result;
      vm.allBoardsIds = vm.getAllBoardsIds(vm.boards);
    });

    vm.getAllBoardsIds = function(boards) {
      var allBoardsIds = [];

      boards.forEach( function(board) {
        allBoardsIds.push(board.id);
      });

      $log.log('allBoardsIds: ', allBoardsIds);
      return allBoardsIds;
    }

    vm.getSelectedBoardIds = function() {
      var selectedBoards = [];

      vm.boards.forEach(function(board) {
        if (board.TTisSelected) {
          selectedBoards.push(board.id);
        }
      });

      return selectedBoards;
    }

    vm.goToLists = function(settings) {
      var boardsIdsArr = [];

      if (settings.boardId) { boardsIdsArr.push(settings.boardId); }
      else if (settings.onlySelected) { boardsIdsArr = vm.getSelectedBoardIds(); }
      else { boardsIdsArr = vm.getAllBoardsIds(); }

      $log.debug('boardsIdsArr: ', boardsIdsArr);

      $state.go('lists', { boardsIds: boardsIdsArr });
    }

  }
})();
