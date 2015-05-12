var T = (function(){
	function repeatRender(){
		clearInterval(T.renderEvery10)
		T.renderEvery10 = setInterval(T.render, 10);
	}

	function startTimer(timestamp) {
		var start = timestamp || new Date().getTime();
		T.start = start;
		T.repeatRender();
		$('#start, #continue').hide();
		$('#pause, #reset').show();
		return T.start;
	}


	function addLeadingZeros(string, length){
		return string.length < length ? T.addLeadingZeros('0' + string, length) : string;
	}

	function render() {
		var timeString = (new Date().getTime() - T.start).toString();
		var centiseconds = timeString.slice(-3,-1);
		var seconds = timeString.slice(-7,-3) || '00';
		var minutes = Math.floor(+seconds/60);
		seconds = +seconds - 60 * (minutes);
		seconds = T.addLeadingZeros(seconds.toString(),2);
		minutes = T.addLeadingZeros(minutes.toString(),2);
		centiseconds = T.addLeadingZeros(centiseconds,2);
		var final = minutes + ':' + seconds + ':' + centiseconds;
		$('#counter').text(final);
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