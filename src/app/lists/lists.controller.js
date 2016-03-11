(function() {
  'use strict';

  angular
    .module('lists')
    .controller('ListsController', controller);

  /** @ngInject */
  function controller($q, $log, $state, trelloFactory, resolveGetLists, resolveGetBoards) {
    var vm = this;
        vm.lists = [];
        vm.trello = trelloFactory;

    vm.init = function() {
      vm.checkAndGetCachedBoards();
      vm.getAndPrepSelectedLists();
    }

    vm.getAllListsPromise = function() {
      return $q.all(resolveGetLists);
    }

    vm.checkAndGetCachedBoards = function() {
      if (vm.trello.cached.boards.length < 1) {
        $log.debug(' getting cached boards from resolve @list.controller');
        vm.trello.cached.boards = resolveGetBoards;
      }
    }

    vm.getAndPrepSelectedLists = function() {
      vm.getAllListsPromise().then(function(results) {
        results.forEach(function(result) {
          var listObj = {};

          listObj.boardId = result[0].idBoard;
          listObj.lists = result;
          listObj.boardName = vm.getBoardNameByItsId(listObj.boardId);

          return vm.lists.push(listObj);
        });
      });
    }

    vm.getBoardNameByItsId = function(boardId) {
      var boardName;

      vm.trello.cached.boards.forEach(function(board){
        if (board.id === boardId) {
          return boardName = board.name;
        }
      });

      return boardName;
    }





    vm.getAllListsIds = function(lists) {
      var allListsIds = [];

      lists.forEach( function(list) {
        allListsIds.push(list.id);
      });

      // $log.log('allListsIds: ', allListsIds);

      return allListsIds;
    }

    vm.getSelectedListIds = function() {
      var selectedLists = [];

      if (vm.lists) {
        vm.lists.forEach(function(list) {
          if (list.TTisSelected) {
            selectedLists.push(list.id);
          }
        });
      }

      return selectedLists;
    }

    vm.noSelectedLists = function() {
      var lists = vm.getSelectedListIds();
      if (lists.length < 1) { return true; }
      return false;
    }

    vm.goToCards = function(settings) {
      var listsIdsArr = [];

      if (! settings) { listsIdsArr = vm.allListsIds; }
      if (settings && settings.listId) { listsIdsArr.push(settings.listId); }
      if (settings && settings.onlySelected) { listsIdsArr = vm.getSelectedListIds(); }

      $log.debug('listsIdsArr:\njust before state.go', listsIdsArr);

      return $state.go('cards', { listsIds: listsIdsArr });
    }

    vm.init();

  } //
})();