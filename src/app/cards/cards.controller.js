(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsController', controller);

  /** @ngInject */
  function controller($q, $log, $state, trelloFactory, resolveGetCards, resolveGetBoards) {
    var vm = this;
        vm.cardsArr = [];
        vm.trello = trelloFactory;

    vm.init = function() {
      vm.checkAndGetCachedBoards();
      vm.getAndPrepSelectedCards();
    }

    vm.getAllCardsPromise = function() {
      return $q.all(resolveGetCards);
    }

    vm.checkAndGetCachedBoards = function() {
      if (vm.trello.cached.boards.length < 1) {
        $log.debug(' getting cached boards from resolve @cards.controller');
        vm.trello.cached.boards = resolveGetBoards;
      }
    }

    vm.getAndPrepSelectedCards = function() {
      vm.getAllCardsPromise().then(function(results) {
        results.forEach(function(result) {
          var listObj = {};

          $log.info('getAndPrepSelectedCards:')
          $log.info(result);

          // listObj.listId = result[0].idList;
          // listObj.cards = result;
          // listObj.listName = vm.getListNameByItsId(listObj.listId);

          // return vm.listsArr.push(listObj);
        });
      });
    }

    vm.getListNameByItsId = function(listId) {
      var listName;

      vm.trello.cached.boards.forEach(function(list){
        if (list.id === listId) {
          return listName = list.name;
        }
      });

      return listName;
    }


    vm.init();

  } //
})();