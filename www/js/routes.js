angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
$stateProvider
  .state('tabsController.listOfNotifications', {
    url: '/pagelistnotifications',
    views: {
      'tab1': {
        templateUrl: 'templates/listOfNotifications.html',
        controller: 'listOfNotificationsCtrl'
      }
    }
  })

  .state('tabsController.deviceInfo', {
    url: '/pagedeviceinfo',
    views: {
      'tab2': {
        templateUrl: 'templates/deviceInfo.html',
        controller: 'deviceInfoCtrl'
      }
    }
  })

  .state('tabsController.configuration', {
    url: '/pageconfiguration',
    views: {
      'tab3': {
        templateUrl: 'templates/configuration.html',
        controller: 'configurationCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('detailNotification', {
    cache: false,
    url: '/detailnotification',
    templateUrl: 'templates/detailNotification.html',
   controller: 'detailCtrl'
  })  

$urlRouterProvider.otherwise('/page1/pagelistnotifications')

  

});