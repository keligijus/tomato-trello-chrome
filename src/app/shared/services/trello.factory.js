(function() {
  'use strict';


  /** @ngInject */
  function factory($q, $log, SETTINGS, toastr) {
    var f = this;
        f.boards = [];

    f.authenticationSuccess = function() { $log.info('Successful authentication'); };
    f.authenticationFailure = function() { $log.error('Failed authentication'); };

    f.init = function () {
      f.authorize();
      // return f.getBoards({ onlyActive: true });
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

    f.getBoards = function(options) {
      var deferred = $q.defer();

      Trello.get('member/me/boards', function(response){

        if (options.onlyActive) { response = f.onlyActiveBoards(response); }

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



    return f;

  }

  angular
    .module('tomatoChrome')
    .factory('trelloFactory', factory);
})();
