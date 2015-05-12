/*function increment(){
	newDate().getMilliseconds() - now.get
}

function timing(){
	var now = new Date();
	window.setInterval(increment, 100, now);
}*/


// startTimer initiates our stopwatch
// accepts optional start parameter
// param start - a valid timestamp (e.g. new Date().getTime())

//window.renderEvery10 = [];


var T = (function(){
	function repeatRender(toUpdate, timeToMeasureFrom){
		clearInterval(T.renderEvery10)
		T.renderEvery10 = setInterval(render, 10, toUpdate, timeToMeasureFrom);
	}

	function startTimer(timestamp) {
		var start = timestamp || new Date().getTime();
		T.start = start;
		T.repeatRender();
		return T.start;
	}


	function addLeadingZeros(string, length){
		return string.length < length ? T.addLeadingZeros('0' + string, length) : string;
	}

	function render(toUpdate, timeToMeasureFrom) {
		var counter = toUpdate || $('#counter');
		var timeString =  timeToMeasureFrom ? (new Date().getTime() - timeToMeasureFrom).toString() : (new Date().getTime() - T.start).toString();

		// var startTime = timeToMeasureFrom || window.start;
		// var timeString = (new Date().getTime() - startTime).toString();
		var centiseconds = timeString.slice(-3,-1);
		var seconds = timeString.slice(-7,-3) || '00';
		var minutes = Math.floor(+seconds/60);
		seconds = parseInt(seconds,10) - 60 * (minutes);
		seconds = T.addLeadingZeros(seconds.toString(),2);
		minutes = T.addLeadingZeros(minutes.toString(),2);
		centiseconds = T.addLeadingZeros(centiseconds,2);
		var final = minutes + ':' + seconds + ':' + centiseconds;
		counter.text(final);

		//$('#counter').text('yo');
	}

	function reset() {
		T.pauseTimer();
		T.start = 0;
		$('#counter').text('00:00:00');
	}

	function pauseTimer() {
		clearInterval(T.renderEvery10);
	}

	return {

		repeatRender: repeatRender,
		startTimer: startTimer,
		addLeadingZeros: addLeadingZeros,
		render: render,
		reset: reset,
		pauseTimer: pauseTimer

	}
}());