"use strict"

var app = angular.module("memoApp", []);

app.controller("memoCtrl", function($scope, $compile, memoService, $window){
   
    var card_value_array = ['A', 'A', 'B', 'B','C', 'C', 'D', 'D','E', 'E', 'F', 'F','G', 'G', 'H', 'H', 
                           'I', 'I', 'J', 'J','K', 'K', 'L', 'L','M', 'M', 'N', 'N','O', 'O', 'P', 'P', 
                           'Q', 'Q', 'R', 'R','S', 'S', 'T', 'T','U', 'U', 'V', 'V','W', 'W', 'X', 'X'];
    
    //make ng-click works in dynamic generated html
    
    var shuffledArray = memoService.shuffleArray(card_value_array);
    var output = memoService.createNewBoard(shuffledArray);
    
    var compiled_card_board = $compile(output)($scope);
    var card_board = angular.element(document.querySelector("#memory-cardboard")).append(compiled_card_board);
    
    $scope.msg = null;
    $scope.flipped_card_id_array = [];
    $scope.count = 0;
    
    $scope.clicked = function(obj){
        var data = memoService.clicked(obj, card_value_array, $scope.flipped_card_id_array);
        
        $scope.count += data.count;
        $scope.flipped_card_id_array = data.flipped_card_id_array;
        
        
        if($scope.count === card_value_array.length){
            $scope.msg = "Congraduations!";
        }
    };
    
    $scope.reset = function(){
      $window.location.reload();  
    };
})

.service("memoService", function(){
    this.createNewBoard = function(array){
        var len = array.length;
        var output = "";
    
        for(var i = 0; i < len; i++){
            output += "<div id='card_id_" + i + "' class='card' data='" + array[i] + "' flipped='false' ng-click='clicked($event)'><span class='default_value' ng-click='$event.stopPropagation();'>?</span></div>";
        }
        
        return output;
    };
    
    this.shuffleArray = function(array){
        var len = array.length;
        
        for(var i = 0; i < len / 2; i++){
            var ranIndex1 = Math.floor(Math.random() * (len));
            var ranIndex2 = Math.floor(Math.random() * (len));
            
            var temp = array[ranIndex1];
            array[ranIndex1] = array[ranIndex2];
            array[ranIndex2] = temp;
        }
        
        return array;
    };
    
    this.clicked = function(obj, card_value_array, flipped_card_id_array){
        var count = 0;
        var msg = null;
        
        //This is JS DOM element
        var card = obj.target;
        //get card id via ng-click event
        var card_id = obj.target.attributes.id.value;
        /*var card = angular.element(document.querySelector("#" + card_id + " .default_value"));*/
        
        //get card value via ng-click event
        var card_value= obj.target.attributes.data.value;
        
        var flipped = obj.target.attributes.flipped.value;
        
        /*var card_span = document.querySelector("#" + card_id + " .default_value");*/
        //to get card element's first child --- span
        var card_span = card.children[0];
        card_span.innerHTML = card_value;
        card.style.backgroundColor = "#fff";
        
        if(flipped == "false"){
            if(flipped_card_id_array.length == 0){
                flipped_card_id_array.push(card_id);
                card.setAttribute("flipped", "true");
            }else if(flipped_card_id_array.length == 1){
                var firstCard = document.getElementById(flipped_card_id_array[0]);
                var firstCard_span = document.querySelector("#" + flipped_card_id_array[0] + " .default_value");
                var firstCard_value = firstCard.getAttribute("data");
                
                card.setAttribute("flipped", "true");
                
                if(firstCard_value !== card_value){
                    setTimeout(function(){
                        firstCard_span.innerHTML = "?";
                        firstCard.style.backgroundColor = "deepskyblue";
                        firstCard.setAttribute("flipped", "false");

                        card_span.innerHTML = "?";
                        card.style.backgroundColor = "deepskyblue";
                        card.setAttribute("flipped", "false");
                    }, 300);
                }else{
                    count += 2;
                }
                
                flipped_card_id_array = [];
            }
        }
        
        return {
            count: count,
            flipped_card_id_array: flipped_card_id_array
        };
    }
});