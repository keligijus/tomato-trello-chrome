(function() {
  'use strict';

  var component = {
    templateUrl: 'app/shared/components/tomato-timer/tomato-timer.tpl.html',
    controller: 'TomatoTimerController as vm'
  }

angular
  .module('tomatoChrome')
  .component('tomatoTimer', component);

}());