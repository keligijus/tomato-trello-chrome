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
      vm.trello.cached.boards = result;
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

      if (vm.boards) {
        vm.boards.forEach(function(board) {
          if (board.TTisSelected) {
            selectedBoards.push(board.id);
          }
        });
      }

      return selectedBoards;
    }

    vm.noSelectedBoards = function() {
      var boards = vm.getSelectedBoardIds();
      if (boards.length < 1) { return true; }
      return false;
    }

    vm.goToLists = function(settings) {
      var boardsIdsArr = [];

      if (! settings) { boardsIdsArr = vm.allBoardsIds; }
      if (settings && settings.boardId) { boardsIdsArr.push(settings.boardId); }
      if (settings && settings.onlySelected) { boardsIdsArr = vm.getSelectedBoardIds(); }

      $log.debug('boardsIdsArr:\njust before state.go', boardsIdsArr);

      $state.go('lists', { boardsIds: boardsIdsArr });
    }

  }
})();
