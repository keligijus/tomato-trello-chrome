(function() {
  'use strict';

  /** @ngInject */
  function controller($log) {
    var vm = this;

        $log.debug('tomatoTimer', vm);


  } //

  angular
    .module('tomatoChrome')
    .controller('TomatoTimerController', controller);
})();