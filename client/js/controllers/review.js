// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', 'Category', function($scope,
      Review, Category) {

    $scope.slid = 1;

    $scope.slNo = function () {
      return $scope.slid++;
    };

    Category
      .find()
      .$promise
      .then(function (categories) {
        $scope.categories = categories;
        $scope.selectedCategory = $scope.selectedCategory || categories[0];
        $scope.filterSurvey($scope.selectedCategory);
      });

    $scope.filterSurvey = function(selectedCategory) {
      $scope.reviews = Review.find({
        filter: {
          where: {
            category: selectedCategory.name
          },
          include: [
            'reviewer'
          ]
        }
      });
    };

    $scope.reviews = Review.find({
      filter: {
        include: [
          'reviewer'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'Review',
      '$state', 'Category', 'Survey', function($scope, Review, $state, Category, Survey) {
    $scope.action = 'Add';
    $scope.pageSize = 5;
    $scope.pageReferralIndex = 0;
    $scope.isChecked;
    $scope.surveyForm = "";
    $scope.selectedCategory = "";
    $scope.review = {};
    $scope.isDisabled = false;

    $scope.surveys = [];

      Survey
        .find()
        .$promise
        .then(function (surveys) {
          $scope.surveys = surveys;
          $scope.filterSurvey($scope.selectedCategory);
        });
    $scope.myCurrentPage = function (newPg, oldPg) {
      switch (newPg) {
        case 1:
          $scope.pageReferralIndex = 0;
          break;
        case 2:
          $scope.pageReferralIndex = 5;
          break;
        case 3:
          $scope.pageReferralIndex = 10;
          break;
        default:
          $scope.pageSize = 5;
          $scope.pageReferralIndex = 0;
      }
    };
    $scope.addRemoveAns = function (questionIndex, answerIndex, newAnswer, isChecked) {
      var questionare = questionIndex + $scope.pageReferralIndex;
      var selectedAnswer = newAnswer;
      var answerSet = {};
      answerSet = $scope.surveyForm.survey[questionare];
      if (isChecked) {
        answerSet.answer.push(selectedAnswer);
      } else if (answerSet.answer.includes(newAnswer)) {
        var inIndex = answerSet.answer.indexOf("newAnswer");
        answerSet.answer.splice(inIndex, 1);
      }
    };
     $scope.filterSurvey = function(selectedCategory) {
      if (!selectedCategory) return;
       for (var i = 0; i < $scope.surveys.length; i++) {
         if ($scope.surveys[i].category === selectedCategory.name) {
           $scope.surveyForm = angular.copy($scope.surveys[i]);
           break;
         }
       }
     };

    $scope.categories = [];

      Category
        .find()
        .$promise
        .then(function (categories) {
          $scope.categories = categories;
          $scope.selectedCategory = $scope.selectedCategory || categories[0];
          $scope.filterSurvey($scope.selectedCategory);
        });

    $scope.submitForm = function() {
      console.log($scope.surveyForm, "wow");
      Review
        .create({
          rating: $scope.review.rating,
          category: $scope.selectedCategory.name,
          categoryId: $scope.selectedCategory.id,
          survey: angular.copy($scope.surveyForm.survey)
        })
        .$promise
        .then(function() {
          $state.go('my-reviews');
        });
    };
  }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'Category', 'Review',
      '$stateParams', '$state', function($scope, $q, Category, Review,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.categories = [];
    $scope.review = {};
    $scope.isDisabled = true;
    $scope.selectedCategory = {};
    $scope.surveys = [];
    $scope.surveyForm = "";
    $scope.pageSize = 5;
      $scope.isDisabled = true;
      $scope.surveys = [];
      $scope.pageReferralIndex = 0;

    $q
      .all({
        categories: Category.find().$promise,
        review: Review.findById({id: $stateParams.id}).$promise
      })
      .then(function(data) {
        $scope.categories = $scope.categories = data.categories;
        $scope.surveys = [data.review];
        $scope.review = data.review;
        var selectedCategory = $scope.categories
          .filter(function(category) {
            return category.name === $scope.review.category;
          });
        $scope.selectedCategory = selectedCategory[0];
        $scope.filterSurvey($scope.selectedCategory);
      });

      $scope.myCurrentPage = function (newPg, oldPg) {
        switch (newPg) {
          case 1:
            $scope.pageReferralIndex = 0;
            break;
          case 2:
            $scope.pageReferralIndex = 5;
            break;
          case 3:
            $scope.pageReferralIndex = 10;
            break;
          default:
            $scope.pageSize = 5;
            $scope.pageReferralIndex = 0;
        }
      };
      $scope.addRemoveAns = function (questionIndex, answerIndex, newAnswer, isChecked) {
        var questionare = questionIndex + $scope.pageReferralIndex;
        var selectedAnswer = newAnswer;
        var answerSet = {};
        answerSet = $scope.surveyForm.survey[questionare];
        if (isChecked) {
          answerSet.answer.push(selectedAnswer);
        } else if (answerSet.answer.includes(newAnswer)) {
          var inIndex = answerSet.answer.indexOf("newAnswer");
          answerSet.answer.splice(inIndex, 1);
        }
      };
      $scope.filterSurvey = function(selectedCategory) {
        if (!selectedCategory) return;
        for (var i = 0; i < $scope.surveys.length; i++) {
          if ($scope.surveys[i].category === selectedCategory.name) {
            $scope.surveyForm = angular.copy($scope.surveys[i]);
            break;
          }
        }
      };

    $scope.submitForm = function() {
      $scope.surveyForm
        .$save()
        .then(function(review) {
          $state.go('my-reviews');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review', 'Category',
      function($scope, Review, Category) {
        $scope.categories = [];
        $scope.selectedCategory = {};
        Category
          .find()
          .$promise
          .then(function (categories) {
            $scope.categories = categories;
            $scope.selectedCategory = categories[0];
            $scope.filterSurvey($scope.selectedCategory);
          });

        $scope.filterSurvey = function(selectedCategory) {
          $scope.reviews = Review.find({
            filter: {
              where: {
                category: selectedCategory.name,
                publisherId: $scope.currentUser.id
              },
              include: [
                'reviewer'
              ]
            }
          });
        };
        // after a refresh, the currenUser is not immediately on the scope
        // So, we're watching it on the scope and load my reviews only then.
        $scope.$watch('currentUser.id', function(value) {
          if (!value) {
            return;
          }
          $scope.reviews = Review.find({
            filter: {
              where: {
                publisherId: $scope.currentUser.id
              },
              include: [
                'reviewer'
              ]
            }
          });
        });
  }]);
