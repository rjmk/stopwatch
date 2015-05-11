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

function startTimer() {
	var start = new Date().getTime();
	window.start = start;
	return start;
}