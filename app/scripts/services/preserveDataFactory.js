angular.module("extensionConsole").factory('extensionService', [function () {

	var factory = {};
	// Save last clicked extension details
	var savedExtensionDetails = {};
	var showDetails = false;
	var activeRow = undefined;
	
	factory.setExtensionDetails = function(extension) {
		savedExtensionDetails = extension;
	};
	
	factory.getExtensionDetails = function() {
		return savedExtensionDetails;
	};
	
	factory.setVisualComponent = function(show, rowIndex) {
		showDetails = show;
		activeRow = rowIndex;
	};
	
	factory.getVisualComponent = function() {
		return {
			"show" : showDetails,
			"activeRow" : activeRow
		};
	};
	
	return factory;
}]);

angular.module("extensionConsole").factory('executionService', [ function () {
	
	var factory = {};
	var savedActiveRow = {};
	var savedExecutionInfo = {};
	
	factory.setActiveRow = function(activeRow) {
		savedActiveRow = activeRow;
	};
	
	factory.getActiveRow = function() {
		return savedActiveRow;
	};
	
	factory.setExecutionInfo = function(extensioName, executionInfo) {
		savedExecutionInfo[extensioName] = executionInfo;
	};
	
	factory.getExecutionInfo = function(extensionName) {
		return savedExecutionInfo[extensionName];
	};
	
	factory.getAllExecutionInfo = function() {
		return savedExecutionInfo;
	};
	
    return factory;
}]);