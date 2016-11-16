"use strict"

var myApp = angular.module("jumpApp", []);

myApp.controller("jumpCtrl", function($scope, jumpService, $window){
    var count = 5;
    var numbers = [];
    
    for(var i = 0; i < 10; i++){
        var ran = Math.floor(Math.random() * 5);
        numbers.push(ran);
    }
    
    $scope.numbers = numbers;
    
    var result = jumpService.jumpFunc(numbers);
    
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
        if(value === result){
            console.log("You are right!");
            $scope.score += 5;
            
        }else{
            $scope.score -= 2;
            console.log("Sorry, try it again.");
        }
        
        $scope.checked = true;
    }
    
    $("#btn-again").click(function(){
        $window.localStorage.setItem("score", $scope.score);
        $window.location.reload();
    });
    
    //use ng-click instead of using jquery click function.
    $scope.reset = function(){
        $window.localStorage.setItem("score", 0);
        $scope.score = 0; 
        $window.location.reload();
    };
});

myApp.service("jumpService", function(){
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