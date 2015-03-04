// http://www.natero.com/intern-coding-exercises/

var app = angular.module('App', []);

app.controller('QuestionOne', ['$scope', function($scope) {
  $scope.todos = [
    {text:'Clean Room'},
    {text:'Apply to Next Semester Classes'},
    {text:'Make Breakfast'}];

  $scope.updateList = function() {
    var list = $scope.listText.split(",")
    $scope.todos = [];
    angular.forEach(list, function(text) {
      $scope.todos.push({text: text.trim()});
    });

    $scope.listText = '';
  };

  $scope.remove = function(todo) {
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index,1);
  };

  $scope.output = function() {
    // should sort by making lowercase and then comparing
    return $scope.todos.map(function(el){return el.text})
    .sort().join(", ");
  };
}]);

app.controller('QuestionTwo', ['$scope', function ($scope) {
    $scope.route = function () {
        var input = [['a', 'b'], ['b', 'c'], ['b', 'e'], ['e', 'f'], ['b', 'i']];

        return $scope.findShortestPath(input, 'a', 'f');
    }

    $scope.findShortestPath = function (input, start, end) {
        // make graph from input. All nodes must be represented in nodes var
        var nodes = {};
        for (var i = 0; i < input.length; i++) {
            var nodeChild = { value: input[i][1], children: [], visited: false, previous: null };
            var nodeParent = { value: input[i][0], children: [nodeChild], visited: false, previous: null };
            if (nodes[nodeParent.value]) {
                nodes[nodeParent.value].children.push(nodeChild);
            } else {
                nodes[nodeParent.value] = nodeParent;
            }

            if (!nodes[nodeChild.value]) {
                nodes[nodeChild.value] = nodeChild;
            }
        };

        var list = [];
        var path = [];
        list.push(nodes[start]);
        while (list.length) {
            var node = list.pop();
            if (node.value === end) {
                // we found the end, get path to start
                path.push(node.value);
                while (node.value !== start) {
                    node = node.previous;
                    path.push(node.value);
                }
                return path.reverse().join(", ");
            } else {
                node.visited = true;
                for (var i = 0; i < node.children.length; i++) {
                    var childNode = nodes[node.children[i].value];
                    if (childNode && !childNode.visited) {
                        childNode.previous = node;
                        list.push(childNode);
                    }
                }
            }
        }
    }
} ])

app.controller('QuestionThree', ['$scope', function ($scope) {

    $scope.rows = 5;
    $scope.cols = 10;
    $scope.data = new Array($scope.rows);
    //$scope.data = [1, 2, 3];
    $scope.init = function () {
        for (var row = 0; row < $scope.rows; row++) {
            $scope.data[row] = new Array($scope.cols);
        }
    }
    $scope.color = function (row, col) {
        var color = $scope.data[row][col];
        return color || "";
    }
    $scope.addColor = function (row, col) {
        if ($scope.data[row][col]) {
            return;
        }
        var colors = ["blue", "green", "red"];
        // Get random color
        var color = colors[Math.floor(Math.random() * colors.length)];
        $scope.data[row][col] = color;
    }

    $scope.output = function () {
        return JSON.stringify($scope.data);
    }
    $scope.init();
} ])