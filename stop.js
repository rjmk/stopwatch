var T = (function(){
	'use strict';
	function repeatRender(){
		
	}

	function startTimer(timestamp) {
		var start = timestamp || new Date().getTime();
		T.start = start;
		clearInterval(T.renderEvery10)
		T.renderEvery10 = setInterval(T.render, 10);
		$('#start, #continue').hide();
		$('#pause, #reset').show();
		return T.start;
	}


	function addLeadingZeros(string, length){
		var string = string.toString();
		return string.length < length ? T.addLeadingZeros('0' + string, length) : string;
	}

	function render() {
		var timeDiff= new Date().getTime() - T.start;
		console.log(timeDiff);
		var minutes = addLeadingZeros(Math.floor(timeDiff / (60 * 1000)), 2);
		var seconds = addLeadingZeros(Math.floor((timeDiff - minutes * 60 * 1000) / 1000), 2);
		var centiseconds = addLeadingZeros(Math.floor((timeDiff - minutes * 60 * 1000 - seconds * 1000) / 10),2);
		$('#counter').text(minutes + ':' + seconds + ':' + centiseconds);
	}

	function reset() {
		T.pauseTimer();
		T.start = new Date().getTime();
		$('#counter').text('00:00:00');
		$('#start').show();
		$('#pause, #continue, #reset').hide();
	}

	function pauseTimer() {
		clearInterval(T.renderEvery10);
		T.stop = new Date().getTime();
		$('#continue,#reset').show();
		$('#pause,#start').hide();
	}

	function continueTimer() {
		var timeToCountFrom = T.start + new Date().getTime() - T.stop;
		startTimer(timeToCountFrom);
	}

	return {

		repeatRender: repeatRender,
		startTimer: startTimer,
		addLeadingZeros: addLeadingZeros,
		render: render,
		reset: reset,
		pauseTimer: pauseTimer,
		continueTimer: continueTimer

	}
}());