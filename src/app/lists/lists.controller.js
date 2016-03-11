(function() {
  'use strict';

  angular
    .module('lists')
    .controller('ListsController', controller);

  /** @ngInject */
  function controller($q, $log, $state, trelloFactory, resolveGetLists, resolveGetBoards) {
    var vm = this;
        vm.listsArr = [];
        vm.trello = trelloFactory;

    vm.init = function() {

      vm.checkAndGetCachedBoards();
      vm.getAndPrepSelectedLists();

    }

    vm.getAllListsPromise = function() {
      return $q.all(resolveGetLists);
    }

    vm.checkAndGetCachedBoards = function() {
      if (trelloFactory.cached.boards.length < 1) {
        $log.debug(' getting cached boards from resolve @list.controller');
        trelloFactory.cached.boards = resolveGetBoards;
      }
    }

    vm.getAndPrepSelectedLists = function() {
      vm.getAllListsPromise().then(function(results) {
        results.forEach(function(result) {
          var listObj = {};

          listObj.boardId = result[0].idBoard;
          listObj.lists = result;
          listObj.boardName = vm.getBoardNameByItsId(listObj.boardId);

          return vm.listsArr.push(listObj);
        });
      });
    }

    vm.getBoardNameByItsId = function(boardId) {
      var boardName;

      trelloFactory.cached.boards.forEach(function(board){
        if (board.id === boardId) {
          $log.info('before return', board.name);
          return boardName = board.name;
        }
      });

      return boardName;
    }


    vm.init();

  } //
})();