QUnit.test("is there a blank counter?", function( ) {
	equal($('#counter').text(), '00:00:00', 'nice work, son!');
})

test("a start button exists", function() {
	equal($('#start').attr('value'), 'Start!', 'you got the start button down!');
})

/* test("when start is clicked there is a new date", function() {
	equal($('start').click().prototype, Date.prototype, 'cool test');
})*/


test('startTimer returns the current timestamp', function(){
	equal(startTimer(), new Date().getTime(), 'ya');
})

test('clicking the button invokes startTimer', function(){
	equal($('#start').attr('onClick'), 'startTimer()', 'we invoked startTimer')
})

test('clicking ...', function(){
	$('#start').trigger('click');
	equal(window.start.toString().length, 13, 'started timer')
})