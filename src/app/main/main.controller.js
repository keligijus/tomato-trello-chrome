(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, TrelloApi, trelloFactory) {
    var vm = this;

    vm.trello = trelloFactory;

    // activate();

    vm.trello.init();

    vm.trello.getBoards({ onlyActive: true }).then(function(result){
      vm.boards = result;
    });

    vm.goToBoard = function(boardId) {
      $log.info(boardId);
      vm.trello.getBoardCards(boardId).then(function(result){
        $log.info('result');
        $log.debug(result);
      });
    }







    // function activate() {
    //   getWebDevTec();
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }

    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }

    // function getWebDevTec() {
    //   vm.awesomeThings = webDevTec.getTec();

    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
  }
})();
