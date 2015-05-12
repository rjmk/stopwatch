test("is there a blank counter?", function( ) {
	reset();
	equal($('#counter').text(), '00:00:00', 'nice work, son!');
})

test("a start button exists", function() {
	equal($('#start').attr('value'), 'Start!', 'you got the start button down!');
})


test('startTimer returns the current timestamp', function(){
	equal(startTimer().toPrecision(11), new Date().getTime().toPrecision(11), 'ya');
})

test('clicking the button invokes startTimer', function(){
	equal($('#start').attr('onClick'), 'startTimer()', 'we invoked startTimer')
})

test('calling render() displays time in #timer formatted as mm:ss:cs', function(){
	var goBackInTime = (9 * 60 + 8)*1000 + 570;
	var timestamp = new Date().getTime() - goBackInTime;
	startTimer(timestamp);
	render();
	equal($('#counter').text(), '09:08:57', 'rendered correct time');
})

test('startTimer accepts optional timestamp parameter', function(){
	// subtract 10 seconds otherwise not accepting parameter is invisible
	var timestamp = new Date().getTime() - 10000;
	startTimer(timestamp);
	equal(window.start, timestamp, 'started the timer with start time 10 seconds ago');
})

test('calling reset() resets the time on the timer', function(){
	reset();
	equal($('#counter').text(), '00:00:00', 'starterCleared');
})

test('clicking reset calls reset', function(){
	equal($('#reset').attr('onClick'), 'reset()', 'we invoked startTimer');
})

repeatRender($('#counter2'), new Date().getTime());
setTimeout(test, 6000, 'repeatRender updates about ten seconds in ten seconds', function(){
	var roundedCounter = '0';
	if($('#counter2').text().slice(3,7) == '06:0' || $('#counter2').text().slice(3,7) == '05:9') roundedCounter = '06:0';
	equal(roundedCounter, '06:0')
})