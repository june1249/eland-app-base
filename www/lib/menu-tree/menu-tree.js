angular.module('menuTree', [])
  .directive('menuTree', function() {
    return {
      restrict: 'E',
      scope: {
        title: '@',
        menus: '=',
        menuState: '@'
      },
      replace: false,
      templateUrl: "templates/partials/menu-tree.html",
      controller: ['$scope', '$ionicSideMenuDelegate', '$state', '$stateParams', '$ionicHistory', '$location',
      function($scope, $ionicSideMenuDelegate, $state, $stateParams, $ionicHistory, $location) {

        var CATEGORY_STATE = $scope.categoryState || false;

        $scope.checkLink = function(menu) {
          if (angular.isUndefined(menu.items) || menu.items.length == 0) {
            if (menu.url) {
              $location.path(menu.url);
              $location.replace();
              // $state.go(menu.url);
              $scope.toggleLeft();
            } else if (CATEGORY_STATE) {
              $state.go(CATEGORY_STATE, {id: menu.id});
              $scope.toggleLeft();
            }
          }
        }

        $scope.isActive = function(menu) {
          if (menu.url && $location.path().indexOf(menu.url) !== -1) {
            return 'active';
          } else if (CATEGORY_STATE && $state.includes(CATEGORY_STATE) && $stateParams.id == menu.id) {
            return 'active';
          }
        }

        $scope.toggleMenu = function(menu) {
          $scope.checkLink(menu);

          if ($scope.isMenuShown(menu)) {
            $scope.activeMenu = null;
          } else {
            $scope.activeMenu = menu;
          }
          $scope.activeSubMenu = null;// Also hide all subCats
        };

        $scope.isMenuShown = function(menu) {
          return $scope.activeMenu === menu;
        };

        $scope.toggleSubMenu = function(menu) {
          $scope.checkLink(menu);

          if ($scope.isSubMenuShown(menu)) {
            $scope.activeSubMenu = null;
          } else {
            $scope.activeSubMenu = menu;
          }
        };

        $scope.isSubMenuShown = function(menu) {
          return $scope.activeSubMenu === menu;
        };

        $scope.toggleLeft = function() {
          $ionicSideMenuDelegate.toggleLeft();

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
        };

      }]
    }
  });
