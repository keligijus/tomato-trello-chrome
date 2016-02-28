(function() {
  'use strict';

  angular
    .module('clock')
    .controller('ClockController', controller);

  /** @ngInject */
  function controller($log, trelloFactory, resolveGetChecklistItem) {
    var vm = this;
    //     vm.cards = resolveGetBoardCards;
        vm.trello = trelloFactory;
        // vm.item = vm.trello.current.checklist;

        vm.item = resolveGetChecklistItem;

        $log.debug(vm.item)

    // $log.debug(resolveGetBoardCards);

    // vm.init = function() {
    //   vm.getChecklists(vm.cards);
    // }


    // vm.getChecklists = function(cards) {
    //   cards.forEach(function(card, index){
    //     var checklists = [];
    //     card.idChecklists.forEach(function(checklistId){
    //         vm.trello.getChecklist(checklistId).then(function(result){
    //           checklists.push(result);
    //         });
    //       });
    //     return card.returnedChecklists = checklists;
    //   });
    // }

    // vm.init();

  } //
})();