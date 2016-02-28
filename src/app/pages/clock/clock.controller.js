(function() {
  'use strict';

  angular
    .module('clock')
    .controller('ClockController', controller);

  /** @ngInject */
  function controller($log, trelloFactory, resolveGetChecklistItem) {
    var vm = this;
        vm.trello = trelloFactory;
        vm.item = resolveGetChecklistItem;

        $log.debug(vm.item);

        vm.completed = vm.item.state === 'complete' ? true : false;


  } //
})();