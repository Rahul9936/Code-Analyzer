var app = angular.module("CodeAnalyzerApp", []);
app.controller("AnalyzerCtrl", function($scope, $http) {
    $scope.languages = ["Javascript"];
    $scope.selectedLanguage = $scope.languages[0];

    $scope.analyzeCode = function(){
        $http({
            method: "POST",
            url: "analyze",
            data: {
                code: document.getElementsByName("codearea")[0].value,
                language: $scope.selectedLanguage
            }
        }).then(function(response) {
            $scope.lintingData = response.data;
        }, function(error) {

        });
    };

    $scope.readFile = function() {
        var file = document.getElementById("uploadfile").files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                document.getElementsByName("codearea")[0].value = evt.target.result;
            }
            reader.onerror = function (evt) {
                document.getElementById("codearea").value = "error reading file";
            }
        }
    }

    //document.getElementById('uploadfile').addEventListener('change', $scope.readFile, false);
});