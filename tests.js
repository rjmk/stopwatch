test("is there a blank counter?", function( ) {
	T.reset();
	equal($('#counter').text(), '00:00:00', 'nice work, son!');
})

test("a start button exists", function() {
	equal($('#start').text(), 'Start!', 'you got the start button down!');
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
	T.reset();
	T.repeatRender();
	setTimeout(function(){
		equal($('#counter').text().slice(6,7), '3');
		QUnit.start();
	}, 330)
})

asyncTest( 'pause stops timer', function(){
	var useful;
	T.reset();
	T.repeatRender();
	setTimeout(function(){
		T.pauseTimer();
		useful = $('#counter').text();
	}, 300)
	setTimeout(function(){
		equal(useful, $('#counter').text());
		QUnit.start();
	}, 600)
})

asyncTest('continue resumes counting', function(){
	var stopTime;
	T.reset();
	T.startTimer();
	setTimeout(function(){
		T.pauseTimer();
		stopTime = $('#counter').text();
	}, 100)

	setTimeout(T.continueTimer, 200);
	setTimeout(function(){
		equal($('#counter').text().slice(0,7),stopTime.slice(0,6) + (+stopTime.slice(7,7) + 1));
		QUnit.start();
	}, 300)
})

test('clicking continue calls continue', function(){
	equal($('#continue').attr('onClick'), 'T.continueTimer()', 'we invoked reset');
})

test('start is visible with a blank timer', function(){
	T.reset();
	equal($('#start').filter(':visible').text(), $('#start').text());
})

test('pause is NOT visible with a blank timer', function(){
	T.reset();
	equal($('#pause').filter(':visible').text(), '');
})

test('continue is NOT visible with a blank timer', function(){
	T.reset();
	equal($('#continue').filter(':visible').text(), '');
})

test('reset is NOT visible with a blank timer', function(){
	T.reset();
	equal($('#reset').filter(':visible').text(), '');
})

test('start disappears when startTimer is called', function(){
	T.startTimer();
	equal($('#start').filter(':visible').text(), "");
})

test('when timer is counting, pause is visible', function(){
	T.startTimer();
	equal($('#pause').filter(':visible').text(), $('#pause').text())
})

test('when timer is counting, reset is visible', function(){
	T.startTimer();
	equal($('#reset').filter(':visible').text(), $('#reset').text())
})

test('when timer is counting, continue is NOT visible', function(){
	T.startTimer();
	equal($('#continue').filter(':visible').text(), $('').text())
})

test('when timer is paused, continue is visible', function(){
	T.startTimer();
	T.pauseTimer();
	equal($('#continue').filter(':visible').text(), $('#continue').text());
	T.reset();
})

test('when timer is paused, pause is NOT visible', function(){
	T.startTimer();
	T.pauseTimer();
	equal($('#pause').filter(':visible').text(), '');
	T.reset();
})