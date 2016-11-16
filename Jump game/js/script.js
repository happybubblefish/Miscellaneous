"use strict"

var myApp = angular.module("jumpApp", []);

myApp.controller("jumpCtrl", function($scope, jumpService, $window){
    var count = 5;
    var numbers = [];

    $scope.numbers = numbers;
    
    
    /*$scope.$watch("answer", function(value){
        if(value === result){
            console.log("You are right!");
        }else{
            console.log("Sorry, try it again.");
        }
    });*/
    
    var score = $window.localStorage.getItem("score");
    $scope.score = Number(score);
    
    $scope.getAnswer = function(value){
        if(value === $scope.result){
            $scope.output = "You are right!";
            $scope.score += 5;
        }else{
            $scope.score -= 2;
            $scope.output = "Sorry, please try another time.";
        }
        
        $scope.disableCheckedAnswer = true;
    }
    
    $scope.playAgain = function(){
        $window.localStorage.setItem("score", $scope.score);
        $scope.chooseLevel($scope.level);
        $scope.disableCheckedAnswer = false;
        //clear the checked radio button
        $scope.answer = null;
    };
    
    //use ng-click instead of using jquery click function.
    $scope.reset = function(){
        $window.localStorage.setItem("score", 0);
        $scope.score = 0; 
        $window.location.reload();
    };
    
    $scope.chooseLevel = function(level){
        if(level === "easy"){
            $scope.numbers = jumpService.generateNumbers(5);
        }else if(level === "normal"){
            $scope.numbers = jumpService.generateNumbers(10);
        }else{
            $scope.numbers = jumpService.generateNumbers(15);
        }
        
        $scope.checkedLevel = true;
        $scope.result = jumpService.jumpFunc($scope.numbers);
    }
});

myApp.service("jumpService", function(){
    
    this.generateNumbers = function(length){
        var numbers = [];
        for(var i = 0; i < length; i++){
            var ran = Math.floor(Math.random() * 5);
            numbers.push(ran);
        }
        
        return numbers;
    };
    
    this.jumpFunc = function(numbers){
        var len = numbers.length;
        var max = numbers[0];
        var temp = 0;
        
        for(var i = 0; i <= max; i++){
            temp = i + numbers[i];
            
            if(max < temp){
                max = temp;
            }
            
            if(max >= len - 1){
                return "true";
            }
        }
        
        return "false";
    };
});