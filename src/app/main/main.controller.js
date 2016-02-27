(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, webDevTec, toastr, TrelloApi, trelloFactory) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1456512590100;
    vm.showToastr = showToastr;

    vm.trello = trelloFactory;

    activate();

    vm.trello.init();

    vm.trello.getBoards({ onlyActive: true }).then(function(result){
      vm.boards = result;
    });





    // vm.boards = [];
    //             vm.test = function () {
    //                 TrelloApi.Authenticate().then(function(){
    //                     $log.log(TrelloApi.Token());
    //                 }, function(){
    //                     $log.log('no');
    //                 });
    //             };

    //             vm.getMe = function () {
    //                 TrelloApi.Rest('GET', 'members/me').then(function(res){
    //                     vm.boards = res.idBoards;
    //                     $log.log(res);
    //                     $log.info("boards ", vm.boards);
    //                 }, function(err){
    //                     $log.log(err);
    //                 });
    //             };

    //             vm.getMyBoard = function(boardId) {
    //               TrelloApi.Rest('GET', 'member/me/boards/' + vm.boards[0])
    //                 .then( function(res) {
    //                   $log(res);
    //                 });
    //             }

    //             vm.getBoards = function() {
    //                 TrelloApi.boards(vm.boards[0], {}).then(function(res) {
    //                     $log.log(res);
    //                 }, function(err) {
    //                     $log.log(err);
    //                 });
    //             };

    //             vm.what = function() {
    //               $log.info('what test');
    //             }







    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
