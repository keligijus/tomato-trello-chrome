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

      if (trelloFactory.cached.boards.length < 1) {
        $log.debug(' getting cached boards from resolve @list.controller');
        trelloFactory.cached.boards = resolveGetBoards;
      }

      vm.getAllListsPromise().then(function(results) {
        results.forEach(function(result) {
          var listObj = {},
              tempBoardName;

          listObj.boardId = result[0].idBoard;
          listObj.lists = result;

          trelloFactory.cached.boards.forEach(function(board){
            if (board.id === result[0].idBoard) {
              listObj.boardName = board.name;
            }
          });

          return vm.listsArr.push(listObj);
        });
      });

    }

    vm.getAllListsPromise = function() {
      return $q.all(resolveGetLists);
    }


    vm.init();

  } //
})();