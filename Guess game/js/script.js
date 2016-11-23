"use strict"

var app = angular.module("guessApp", []);

app.controller("guessCtrl", function($scope){
    var pickedNumber = Math.floor(Math.random() * 25 + 1);
    
    $scope.res = null;
    
    $scope.submit = function(){
        var guessedNum = Number($scope.guessedNum);
        console.log("Picked number: " + pickedNumber);
        console.log($scope.guessedNum);
        
        if(guessedNum < pickedNumber){
            $scope.res = "Smaller...";
        }else if(guessedNum > pickedNumber){
            $scope.res = "Bigger...";
        }else if(guessedNum === pickedNumber){
            $scope.res = "You got it!";
        }
    }
});