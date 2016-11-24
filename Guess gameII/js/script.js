"use strict"

var app = angular.module("guessApp", []);

app.controller("guessCtrl", function($scope, guessService){
    var cmpGuessedArr = [];
    var userGuessedArr = [];
    
    $scope.compare = function(){
        var guessedNum = $scope.guessedNum;
        $scope.errorMsg = "";
        
        if(guessedNum < 0 || guessedNum > 9){
            $scope.errorMsg = "Please enter a number between 0 and 9.";
        }else{
            if(guessService.isExist(userGuessedArr, guessedNum) === "true"){
                $scope.errorMsg = "You have already guessed this number, please choose another number.";
            }else{
                //change the color of selected card
                
                //compare
                
                //output result
            }
        }
    }
    
})

.service("guessService", function(){
    this.isExist = function(array, number){
        var len = array.length;
        
        for(var i = 0; i < len; i++){
            if(array[i] == number){
                return "true";
            }
        }
        
        return "false";
    };
    
    this.cmpGenNum = function(array){
        
    }
});