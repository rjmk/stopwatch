test("is there a blank counter?", function( ) {
	T.reset();
	equal($('#counter').text(), '00:00:00', 'nice work, son!');
})

test("a start button exists", function() {
	equal($('#start').attr('value'), 'Start!', 'you got the start button down!');
})


test('startTimer returns the current timestamp', function(){
	equal(T.startTimer().toPrecision(11), new Date().getTime().toPrecision(11), 'ya');
})

test('clicking the button invokes startTimer', function(){
	equal($('#start').attr('onClick'), 'T.startTimer()', 'we invoked startTimer')
})

test('calling render() displays time in #timer formatted as mm:ss:cs', function(){
	var goBackInTime = (9 * 60 + 8)*1000 + 570;
	var timestamp = new Date().getTime() - goBackInTime;
	T.startTimer(timestamp);
	T.render();
	equal($('#counter').text(), '09:08:57', 'rendered correct time');
})

test('startTimer accepts optional timestamp parameter', function(){
	// subtract 10 seconds otherwise not accepting parameter is invisible
	var timestamp = new Date().getTime() - 10000;
	T.startTimer(timestamp);
	equal(T.start, timestamp, 'started the timer with start time 10 seconds ago');
})

test('calling reset() resets the time on the timer', function(){
	T.reset();
	equal($('#counter').text(), '00:00:00', 'starterCleared');
})

test('clicking reset calls reset', function(){
	equal($('#reset').attr('onClick'), 'T.reset()', 'we invoked reset');
})

asyncTest( 'repeatRender updates about ten seconds in ten seconds', function(){
	T.repeatRender($('#counter'), new Date().getTime());
	var roundedCounter = '0';
	setTimeout(function(){
		if($('#counter').text().slice(3,7) == '06:0' || $('#counter').text().slice(3,7) == '05:9') roundedCounter = '06:0';
		
			equal(roundedCounter, '06:0');
			QUnit.start();

	}, 6000)
})

asyncTest( 'pause stops timer', function(){
	T.reset();
	T.repeatRender($('#counter'), new Date().getTime());
	setTimeout(function(){
		T.pauseTimer();
		T.useful = $('#counter').text();
	}, 3000)
	setTimeout(function(){
		equal(T.useful, $('#counter').text());
		QUnit.start();
	}, 6000)
})