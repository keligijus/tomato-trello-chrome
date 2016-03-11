(function() {
  'use strict';


  /** @ngInject */
  function factory($q, $log, SETTINGS, toastr) {
    var f = this;
        f.current = {
          board: undefined,
          card: undefined,
          checklist: undefined
        },
        f.selected = {
          boards: [],
          lists: []
        },
        f.cached = {
          boards: []
        }

    // var Trello = Trello || {};

    f.init = function () {
      f.authorize();
    }


    f.authorize = function() {
      Trello.authorize({
        type: 'popup',
        name: 'tomatoChrome',
        scope: {
          read: true,
          write: true },
        expiration: 'never',
        success: f.authenticationSuccess,
        error: f.authenticationFailure
      });
    }

    f.authenticationSuccess = function() {
      $log.info('Successful authentication');
      toastr.success('Oh yeah', 'Successful authentication');
    };
    f.authenticationFailure = function() {
      $log.error('Failed authentication');
      toastr.success('Oh noo!', 'Failed authentication');
    };

    f.getBoards = function(options) {
      var deferred = $q.defer();

      Trello.get('member/me/boards/', function(response){
        if (options.onlyActive) { response = f.onlyActiveBoards(response); }
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    f.getBoardLists = function(boardId) {
      f.authorize();

      var deferred = $q.defer();

      Trello.get('boards/' + boardId + '/lists', function(response){
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    f.onlyActiveBoards = function(boards) {
      var activeBoards = [];

      boards.forEach(function(board) {
        if ( ! board.closed) { activeBoards.push(board); }
      });

      return activeBoards;
    }

    f.getListCards = function(listId) {
      f.authorize();

      var deferred = $q.defer();
      var getParam = 'lists/'+ listId +'/cards';

      Trello.get(getParam, function(response){
        response = f.onlyCardsWithChecklists(response);
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    f.getBoardCards = function(boardId) {
      f.authorize();

      var deferred = $q.defer();
      var getParam = 'boards/'+boardId+'/cards';

      Trello.get(getParam, function(response){
        response = f.onlyCardsWithChecklists(response);
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    f.onlyCardsWithChecklists = function(cards) {
      var cardsWithChecklists = [];

      cards.forEach(function(card){
        if (card.idChecklists.length) {
          cardsWithChecklists.push(card);
        }
      });

      return cardsWithChecklists;
    }

    f.getChecklist = function(checklistId) {
      f.authorize();

      var deferred = $q.defer();
      var getParam = '/checklists/' + checklistId;

      Trello.get(getParam, function(response){
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;

    }

    f.getChecklistItem = function(checklistId, checkItemsId) {
      f.authorize();

      var deferred = $q.defer();
      var getParam = '/checklists/' + checklistId + '/checkItems/' + checkItemsId;


      Trello.get(getParam, function(response){
        deferred.resolve(response);
      }, function(err){
        deferred.reject(err);
      });

      return deferred.promise;

    }





    return f;

  }

  angular
    .module('tomatoChrome')
    .factory('trelloFactory', factory);
})();
