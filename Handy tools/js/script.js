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
    
})
.controller("weatherCtrl", function($scope, $http, weatherService){
    $scope.zipcode = 20878;
    var zipcode = $scope.zipcode;
    console.log(zipcode);
    
    /*need refactor code*/
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=886d5759361b79376962cecd40bf0234";
        $http.get(url).then(function(response){
            console.log(response.data);
            var data = response.data;
            $scope.date = new Date();
        $scope.condition = data.weather[0].main;
        $scope.icon = data.weather[0].icon;
        $scope.humidity = data.main.humidity;
        $scope.temp = weatherService.K2C(data.main.temp);
        $scope.minTemp = weatherService.K2C(data.main.temp_min);
        $scope.maxTemp = weatherService.K2C(data.main.temp_max);
        $scope.pressure = data.main.pressure;
        $scope.sunrise = weatherService.UTC2LocalTime(data.sys.sunrise);
        $scope.sunset = weatherService.UTC2LocalTime(data.sys.sunset);
        $scope.windSpeed = data.wind.speed;
        $scope.windDirection = weatherService.deg2dir(data.wind.deg);
    
        });
    
    
    $scope.checkWeather = function(){
        /*console.log($scope.zipcode);*/
        var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + $scope.zipcode + ",us&appid=886d5759361b79376962cecd40bf0234";
        $http.get(url).then(function(response){
            console.log(response.data);
            var data = response.data;
            $scope.date = new Date();
        $scope.condition = data.weather[0].main;
        $scope.icon = data.weather[0].icon;
        $scope.humidity = data.main.humidity;
        $scope.temp = weatherService.K2C(data.main.temp);
        $scope.minTemp = weatherService.K2C(data.main.temp_min);
        $scope.maxTemp = weatherService.K2C(data.main.temp_max);
        $scope.pressure = data.main.pressure;
        $scope.sunrise = weatherService.UTC2LocalTime(data.sys.sunrise);
        $scope.sunset = weatherService.UTC2LocalTime(data.sys.sunset);
        $scope.windSpeed = data.wind.speed;
        $scope.windDirection = weatherService.deg2dir(data.wind.deg);
            
        });
        
    }
});


/*{"coord":{"lon":-122.08,"lat":37.39},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":289.35,"pressure":1019,"humidity":47,"temp_min":288.15,"temp_max":291.15},"visibility":16093,"wind":{"speed":0.97,"deg":14.0001},"clouds":{"all":20},"dt":1479423360,"sys":{"type":1,"id":471,"message":0.1924,"country":"US","sunrise":1479394287,"sunset":1479430527},"id":5375480,"name":"Mountain View","cod":200}*/







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
})
.service("weatherService", function($http){
    this.checkWeather = function(zipcode){
        var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=886d5759361b79376962cecd40bf0234";
        $http.get(url).then(function(response){
            console.log(response.data);
            return response.data;
            
        });
    }
    
    this.K2C = function(temp){
        return Math.round(temp - 273.15);
    }
    
    this.K2F = function(temp){
        return Math.round((temp * 9 / 5 - 459.67));
    }
    
    this.UTC2LocalTime = function(time){
        var date = new Date(time * 1000);
        return date.toLocaleTimeString();
    }
    
    this.deg2dir = function(deg){
    /*http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm*/
        var direction = null;
        
        if(deg >= 11.25 && deg < 33.75){
            direction = "NNE";
        }else if(deg >= 33.75 && deg < 56.25){
            direction = "NE";
        }else if(deg >= 56.25 && deg < 78.75){
            direction = "ENE";
        }else if(deg >= 78.75 && deg < 101.25){
            direction = "E";
        }else if(deg >= 101.25 && deg < 123.75){
            direction = "ESE";
        }else if(deg >= 123.75 && deg < 146.25){
            direction = "SE";
        }else if(deg >= 146.25 && deg < 168.75){
            direction = "SSE";
        }else if(deg >= 168.75 && deg < 191.25){
            direction = "S";
        }else if(deg >= 191.25 && deg < 213.75){
            direction = "SSW";
        }else if(deg >= 213.75 && deg < 236.25){
            direction = "SW";
        }else if(deg >= 236.25 && deg < 258.75){
            direction = "WSW";
        }else if(deg >= 258.75 && deg < 281.25){
            direction = "W";
        }else if(deg >= 281.25 && deg < 303.75){
            direction = "WNW";
        }else if(deg >= 303.75 && deg < 326.25){
            direction = "NW";
        }else if(deg >= 326.25 && deg < 348.75){
            direction = "NNW";
        }else{
            direction = "N";
        }
        
        return direction;
    };
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    