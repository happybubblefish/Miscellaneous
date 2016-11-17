"use strict"

var app = angular.module("toolApp", []);

app.controller("palindromCtrl", function($scope, palindromService){
    $scope.output = null;
    $scope.disabled = true;
    
    $scope.chooseFlag = function(){
        $scope.disabled = false;
    }
    
    $scope.checkPalindrome = function(){
        $scope.output = palindromService.checkPalindrome($scope.palindrome, $scope.flag);
    };
    
    $scope.reset = function(){
        $scope.palindrome = "";
        $scope.flag = null;
        $scope.output = null;
        $scope.disabled = true;
    };
    
});

app.service("palindromService", function(){
    this.checkPalindrome = function(text, flag){
        if(text !== undefined || text !== null){
            text = text.trim();
            text = text.replace(/\s/g, '');
            text = text.replace(/[^a-zA-Z0-9]/g, '');
            
            var len = text.length;
            if(flag == "insensitive"){
                text = text.toLowerCase();
            }
        
        for(var i = 0; i < len / 2; i++){
            if(text[i] !== text[len - i - 1]){
                return false;
            }
        }
        
        return true;
        }
    };
});