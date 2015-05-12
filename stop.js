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

function repeatRender(toUpdate, timeToMeasureFrom){
	if(!toUpdate){
		clearInterval(window.renderEvery10);
		window.renderEvery10 = window.setInterval(render, 10, toUpdate, timeToMeasureFrom);
	}
	else window.fakeRender = window.setInterval(render, 10, toUpdate, timeToMeasureFrom);
}

function startTimer(timestamp) {
	var start = timestamp || new Date().getTime();
	window.start = start;
	repeatRender();
	// render();
	return start;
}


function addLeadingZeros(string, length){
	return string.length < length ? addLeadingZeros('0' + string, length) : string;
}

function render(toUpdate, timeToMeasureFrom) {
	var counter = toUpdate || $('#counter');
	var timeString =  timeToMeasureFrom ? (new Date().getTime() - timeToMeasureFrom).toString() : (new Date().getTime() - window.start).toString();

	// var startTime = timeToMeasureFrom || window.start;
	// var timeString = (new Date().getTime() - startTime).toString();
	var centiseconds = timeString.slice(-3,-1);
	var seconds = timeString.slice(-7,-3) || '00';
	var minutes = Math.floor(+seconds/60);
	seconds = parseInt(seconds,10) - 60 * (minutes);
	seconds = addLeadingZeros(seconds.toString(),2);
	minutes = addLeadingZeros(minutes.toString(),2);
	centiseconds = addLeadingZeros(centiseconds,2);
	var final = minutes + ':' + seconds + ':' + centiseconds;
	counter.text(final);

	//$('#counter').text('yo');
}

function reset() {
	pauseTimer();
	window.start = 0;
	$('#counter').text('00:00:00');
}

function pauseTimer() {
	clearInterval(renderEvery10);
}