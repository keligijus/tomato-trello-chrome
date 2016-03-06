(function() {
  'use strict';

  angular
    .module('lists')
    .controller('ListsController', controller);

  /** @ngInject */
  function controller($log, $state, trelloFactory) {
    var vm = this;
        // vm.cards = resolveGetBoardCards;
        vm.trello = trelloFactory;

    // $log.debug(resolveGetBoardCards);

    vm.init = function() {
    }


    vm.init();

  } //
})();