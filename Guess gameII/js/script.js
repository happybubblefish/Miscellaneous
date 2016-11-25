"use strict"

var app = angular.module("guessApp", []);

app.controller("guessCtrl", function($scope, guessService, $window){
    $scope.cmpArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var userGuessedArr = [];
    $scope.errorMsg = "";
    $scope.playerScore = 0;
    $scope.cmpScore = 0;
    
    $scope.compare = function(event){
        var guessedNum = $scope.guessedNum;
        
        if(guessedNum == null || !Number.isInteger(Number(guessedNum))){
            $scope.errorMsg = "Please enter a number.";
        }else if(guessedNum < 0 || guessedNum > 9){
            $scope.errorMsg = "Please enter a number between 0 and 9.";
        }else{
            if(guessService.isExist(userGuessedArr, guessedNum) === "true"){
                $scope.errorMsg = "You have already guessed this number, please choose another number.";
            }else{
                $scope.errorMsg = "";
                //add guessedNum to userGuessedArr
                userGuessedArr.push(guessedNum);
                
                //change the color of selected card
                var card = document.getElementById(guessedNum + "");
                card.style.backgroundColor = "red";
                
                //compare
                var data = guessService.cmpGenNum($scope.cmpArr);
                var cmpGuessedNum = data.num;
                $scope.cmpGuess = cmpGuessedNum;
                $scope.cmpArr = data.array;
                
                if(guessedNum == 0){
                    if(cmpGuessedNum == 0){
                        $scope.playerScore++;
                        $scope.cmpScore++;
                    }else if(cmpGuessedNum == 9){
                        $scope.playerScore += 5;
                    }else{
                        $scope.cmpScore += 5;
                    }
                }else{
                    if(guessedNum == 9){
                        if(cmpGuessedNum == 0){
                            $scope.cmpScore += 5;
                        }else if(cmpGuessedNum == 9){
                            $scope.playerScore++;
                            $scope.cmpScore++;
                        }else{
                            guessedNum += 5;
                        }
                    }else{
                        if(guessedNum == cmpGuessedNum){
                            $scope.playerScore++;
                            $scope.cmpScore++;
                        }else if(guessedNum > cmpGuessedNum){
                            $scope.playerScore += 5;
                        }else{
                            $scope.cmpScore += 5;
                        }
                    }
                }
            }
        }
    };
    
    $scope.reset = function(){
        $window.location.reload();
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
        var len = array.length;
        var index = Math.floor(Math.random() * len);
        var num = array[index];
        
        array.splice(index, 1);
        
        console.log(array);
        
        return {
            array: array,
            num: num
        }
    }
});