(function() {
  'use strict';

  angular
    .module('board')
    .controller('BoardController', controller);

  /** @ngInject */
  function controller($log, $scope, resolveGetBoardCards, trelloFactory, $stateParams) {
    var vm = this;
        vm.cards = resolveGetBoardCards;
        vm.trello = trelloFactory;

    $log.debug(resolveGetBoardCards);

    vm.cards.forEach(function(card, index){
      var checklists = [];
      card.idChecklists.forEach(function(checklistId){
          vm.trello.getChecklist(checklistId).then(function(result){
            checklists.push(result);
          });
        });
        $log.info(checklists);
        return checklists;
      });

    vm.getChecklists = function(checklistId) {
        return vm.trello.getChecklist(checklistId);
    }

  } //
})();