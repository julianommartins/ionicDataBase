// Database instance.
var db = null;

// Include dependency: ngCordova
var starter = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        db = $cordovaSQLite.openDB({name: "my.db"});
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY, firstname text, lastname text)");
    });
})

starter.controller('DBController', function($scope, $cordovaSQLite) {
  
    $scope.resultado = [];
    $scope.mensagemFinal = "Iniciou Sistema";
    
    $scope.insert = function(firstname, lastname) {
        var query = "insert into pessoas (firstname, lastname) values (?,?)";
        $cordovaSQLite.execute(db,query,[firstname,lastname]).then(function(result) {
            $scope.mensagemFinal = "FOI";
            $scope.resultado.push({mensagem: "Insert Ok"});
            console.log("Insert ID -> " + result.insertId);
        }, function(error){
            $scope.resultado.push({mensagem: "insert Fail"});
            $scope.mensagemFinal = "Fail";
            console.log(error);
        });
    }
    
    $scope.select = function(lastname){
        var query = "select firstname, lastname from pessoas where lastname = ?";
        $cordovaSQLite.execute(db,query,[lastname]).then(function(result) {
            if(result.rows.length > 0){
                $scope.mensagemFinal = "ACHEI";
                $scope.resultado = result.rows.item(0).firstname;
                console.log("Achei " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
            } else {
                $scope.mensagemFinal = "NAO ACHEI";
                $scope.resultado = [];
                console.log("Nao achei");
            }
            
        }, function(error){
            console.log(error);
        });
    }
    
});