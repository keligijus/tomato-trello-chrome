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

      // if (trelloFactory.cached.boards.length < 1) {
      //   $log.debug(' getting cached boards from resolve @cards.controller');
      //   trelloFactory.cached.boards = resolveGetBoards;
      // }

      // vm.getAllCardsPromise().then(function(results) {
      //   results.forEach(function(result) {
      //     var listObj = {},
      //         tempBoardName;

      //     listObj.boardId = result[0].idBoard;
      //     listObj.cards = result;

      //     trelloFactory.cached.boards.forEach(function(board){
      //       if (board.id === result[0].idBoard) {
      //         listObj.boardName = board.name;
      //       }
      //     });

      //     return vm.cardsArr.push(listObj);
      //   });
      // });

    }

    vm.getAllCardsPromise = function() {
      // return $q.all(resolveGetCards);
    }


    vm.init();

  } //
})();