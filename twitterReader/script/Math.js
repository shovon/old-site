(function (Math, undefined) {
	
	/**
	 * Retrieves a random integer between the number defined by
	 * min and by max.
	 * 
	 * @param min: the smallest bound.
	 * @param max: the highest bound.
	 * @returns a random integer between the values min and max.
	 */
	Math.getRandomInt = function (min, max) {
		
		// Math.floor works much better when converting a 
		// random floating-point value into an integer.
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
})(Math);