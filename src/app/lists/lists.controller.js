(function() {
  'use strict';

  angular
    .module('lists')
    .controller('ListsController', controller);

  /** @ngInject */
  function controller($log, $state, trelloFactory, resolveGetLists) {
    var vm = this;
        vm.listsArr = [];
        vm.trello = trelloFactory;
        vm.boards = vm.trello.cached.boards;

    // $log.debug('resolveGetLists1', resolveGetLists);
    if ( ! vm.trello.cached.boards) {
      vm.trello.getBoards({ onlyActive: true }).then(function(result){
        vm.boards = result;
        vm.trello.cached.boards = result;
      });
    }

    $log.debug('trello cahched boards', vm.trello.cached.boards);

    vm.init = function() {

      vm.getAllListsPromise().then(function(results){
        results.forEach(function(result){
          var listObj = {};
          var tempBoardName;

          $log.info('result: ', result);

          listObj.boardId = result[0].idBoard;
          listObj.lists = result;

          vm.boards.forEach(function(board){
            if (board.id === result[0].idBoard) {
              listObj.boardName = board.name;
            }
          });

          vm.listsArr.push(listObj);

          /*
            add array to an object = {
              array: result,
              boardId: result[0].boardId,
              boardName: function that matches ids of cached boards
            }
          */
        });
      });
    }

    vm.getAllListsPromise = function() {
      return Promise.all(resolveGetLists);
    }

    // vm.prepLists = function() {
    //   var listsArr = [];
    //   // var singlelistArr;

    //   Promise.all(resolveGetLists).then(function(values) {
    //     var lists = [],
    //         tempBoardName,
    //         tempBoardId;

    //     $log.debug(values);



    //     values.forEach(function(valueArr) {
    //       //add board name to each arr item
    //       $log.warn(valueArr);

    //       tempBoardId = valueArr[0].idBoard;

    //       vm.boards.forEach(function(board){
    //         if (board.id === tempBoardId) { return tempBoardName = board.name; }
    //       });

    //       valueArr.forEach(function(value) {
    //         value.TTboarName = tempBoardName;
    //       });

    //       listsArr.push(valueArr);
    //     });

    //     vm.lists = listsArr;

    //     return listsArr;

    //   });

      // resolveGetLists.forEach(function(promise) {
      //   singlelistArr = promise.$state.value;
      //   listsArr.push(singlelistArr);
      // });

    // }



    vm.init();

  } //
})();