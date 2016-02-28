(function() {
  'use strict';

  angular
    .module('board')
    .controller('BoardController', controller);

  /** @ngInject */
  function controller($log, $scope, resolveGetBoardCards, trelloFactory) {
    var vm = this;
        vm.cards = resolveGetBoardCards;
        vm.trello = trelloFactory;

    $log.debug(resolveGetBoardCards);

    vm.init = function() {
      vm.getChecklists(vm.cards);
    }


    vm.getChecklists = function(cards) {
      cards.forEach(function(card, index){
        var checklists = [];
        card.idChecklists.forEach(function(checklistId){
            vm.trello.getChecklist(checklistId).then(function(result){
              checklists.push(result);
            });
          });
        return card.returnedChecklists = checklists;
      });
    }

    vm.init();

  } //
})();