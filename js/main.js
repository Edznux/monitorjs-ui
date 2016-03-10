var app = angular.module('monitor', [
	'ngResource',
	'ngRoute'
])
.constant('apiConfig', {
	base_url : 'monitor.edznux.fr/api',
	base_ws : 'monitor.edznux.fr',
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
	console.log("okok");
	return new WebSocket("ws://"+apiConfig.base_ws);
}])

.controller('PageCtrl', function ($scope, $location, $http) {

})

.controller('CpuCtrl', function ($scope, $location, $http, apiConfig, ApiFactory, WebSocketFactory) {
	console.log("wtf");
	var socket = io.connect('http://'+apiConfig.base_url);
	socket.on('clients', function(data) {
		console.log(data);
	});
	console.log(socket);
})
.controller('memoryCtrl', function ($scope, $location, $http) {
	
});