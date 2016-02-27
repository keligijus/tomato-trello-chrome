(function() {
  'use strict';

  angular
    .module('board')
    .controller('BoardController', controller);

  /** @ngInject */
  function controller($log, trelloFactory) {
    var vm = this;
    $log(vm, trelloFactory);
  }
})();