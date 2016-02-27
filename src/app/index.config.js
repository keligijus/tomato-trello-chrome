(function() {
  'use strict';

  angular
    .module('tomatoChrome')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, TrelloApiProvider, SETTINGS) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    TrelloApiProvider.init({
        key: SETTINGS.trello.key,
        secret: SETTINGS.trello.secret,
        scopes: {read: true, write: true, account: true},
        AppName: 'tomatoChrome'
    });
  }

})();
