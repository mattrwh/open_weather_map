app.constant("OPENWEATHERMAP_BASE_URL", "http://api.openweathermap.org/data/");
app.constant("OPENWEATHERMAP_VERSION", "2.5/");
app.constant("OPENWEATHER_APPID", "59e903a164e5d565d10fe3f8799f5f27")


app.factory("responseHandlers", function() {

	function success(response) {
        return (response.data);
    }

    function error(response) {
    	// If return error is in an unexpected format, normalize message
    	if (!angular.isObject(response.data) ||
            !response.data.message) {
            throw("An unknown error occurred.");
        }

        // Otherwise, use expected error message.
        throw(response.data.message);
    }

	var publicAPI = {
		success: success,
		error: error
	};

	return publicAPI;
});

app.factory("openWeatherMapApiService", 
	["$http", "OPENWEATHERMAP_BASE_URL", "OPENWEATHERMAP_VERSION", "OPENWEATHER_APPID", "responseHandlers",
		function($http, OPENWEATHERMAP_BASE_URL, OPENWEATHERMAP_VERSION, OPENWEATHER_APPID, responseHandlers) {
	
			function getDailyForecast(city, country_code) {
				var forecast_type = "daily/";
		        var request = $http.get(OPENWEATHERMAP_BASE_URL + OPENWEATHERMAP_VERSION + "forecast/" + forecast_type, { 
		        	params: {
		        		q: city + ", " + country_code,
		        		mode: 'json',
		        		units: 'Imperial',
		        		cnt: 16,
                metric: 'Celsius',
                APPID: OPENWEATHER_APPID,
		        	},
		        	cache: true
		        	
		        });
		        return (request.then(responseHandlers.success, responseHandlers.error));
		    }

			var publicAPI = {
		        getDailyForecast: getDailyForecast
		    };


			return publicAPI;

}]);
