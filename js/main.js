var app = angular.module('monitor', [
	'ngResource',
	'ngRoute'
])
.constant('apiConfig', {
	base_url : window.location.hostname+'/api',
	base_ws : window.location.hostname,
	endpointList : {
		disk : ["all", "fileSystem", "size", "used","use","mounted"],
		cpu : ["stats", "uptime", "load", "infos"],
		memory : ["all", "total", "free", "cached", "buffers", "active", "inactive"],
		os : ["release", "architecture", "type"],
		network : ["interfaces", "rx", "tx", "ping"]
	}
})

/**
 * Routing
 */
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		// Home
		.when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
		// Pages
		.when("/cpu", {templateUrl: "partials/cpu.html", controller: "CpuCtrl"})
		.when("/memory", {templateUrl: "partials/memory.html", controller: "memoryCtrl"})

		// else 404
		.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}])

.factory('ApiFactory',['$resource', 'apiConfig', function($resource, apiConfig){
	return $resource("http://"+apiConfig.base_url+"/:route/:item");
}])
.factory('WebSocketFactory', ['apiConfig', function(apiConfig){
}])

.controller('PageCtrl', function ($scope, $location, $http) {

})

.controller('CpuCtrl', function ($scope, $location, $http, apiConfig, ApiFactory, WebSocketFactory) {
	var socket = io.connect(apiConfig.base_ws, {origins : "*"});
	socket.on('clients', function(data) {
		console.log(data);
	});
	console.log(socket);
})
.controller('memoryCtrl', function ($scope, $location, $http) {
	
});