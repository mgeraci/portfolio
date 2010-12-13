$(function() {
	startAnimation();
});

function startAnimation(){
	$('#go').click(function(){
		var startAngle = Math.floor(Math.random()*120) + 40;
		if (startAngle == 90){
			startAngle = 91;
		}
		$('#startAngle').html(startAngle);
		if (startAngle < 90){
			// going up and left
			calculateUL(startAngle, 500);
		} else {
			// going up and right
			calculateUR(startAngle, 500);
		}
	});
}

function calculateUL(angle, distance) {
	// change angle degree to radians
	angleRad = angle * (Math.PI / 180.0);

	// calculate other parts
	hyp = distance / Math.cos(angleRad); // the hypotenuse 
	side = distance * Math.tan(angleRad); // the height, from bottom to point of contact
	topAngle = 90.0 - angle; // the top angle

	if (side > 500) { // if it's going to hit the top
		onTop = (side - 500) / Math.tan(angleRad); // the bottom of the triangle created by the cieling, if you were to extend the hypotenuse all the way
		onTopHyp = (side - 500) / Math.sin(angleRad); // the hypotenuse from the ceiling to the point of contact
		$('#ball').animate({
			top: '13px',
			left: onTop
		}, (hyp - onTopHyp)*2,  'linear');
	} else { // if it's going to hit the left side
		// handle the 45º problem
		if (angle == 45) {
			animationTop = 13;
		} else {
			animationTop = 500 - side;
		}

		$("#ball").animate({ 
			top: animationTop,
			left: '13px'
		}, hyp*2, 'linear');
		calculateLeftWall((90 - topAngle), (500 - side));
	}
}

function calculateUR(angle, distance) {
	// make the angle the opposite
	angle = 180 - angle;

	// change angle degree to radians
	angleRad = angle * (Math.PI / 180.0);

	// calculate other parts
	hyp = distance / Math.cos(angleRad);
	side = distance * Math.tan(angleRad);

	if (side > 500) {
		// if it's going to hit the top
		onTop = (side - 500) / Math.tan(angleRad);
		onTopHyp = (side - 500) / Math.sin(angleRad);
		$('#ball').animate({
			top: '13px',
			left: 1000 - onTop
		}, (hyp - onTopHyp)*2, 'linear');
	} else {
		// if it's going to hit the right side
		$("#ball").animate({ 
			top: 500 - side,
			left: '1000px'
		}, hyp*2, 'linear');
		calculateRightWall(angle, side);
	}
}

function calculateLeftWall(angle, side) {
	// change angle to radians
	angleRad = angle * (Math.PI / 180.0);

	// calculate other parts
	hyp = side / Math.sin(angleRad);
	bottom = side / Math.tan(angleRad);
	// angleEDeg = 90.0 - angleDDeg;
		
	if (bottom > 990){ // if it's going to hit the right side
		// change angle to radians
		angleRad = angle * (Math.PI / 180.0);

		// calculate other parts
		hyp = 1000 / Math.cos(angleRad);
		rise = 1000 * Math.tan(angleRad);
		topAngle = 90 - angle;

		$('#ball').animate({
			top: rise,
			left: 1000
		}, hyp*2, 'linear');
		// calculate right wall
	} else { // if it's going to hit the top
		$('#ball').animate({
			top: 13,
			left: bottom
		}, hyp*2, 'linear');
		// calculate top wall
	}
}

function calculateRightWall(angle, side) {
	// change angle to radians
	angleRad = angle * (Math.PI / 180.0);

	// calculate other parts
	hyp = side / Math.sin(angleRad);
	bottom = side / Math.tan(angleRad);
	// angleEDeg = 90.0 - angleDDeg;
		
	if (bottom > 990){ // if it's going to hit the right side
		// change angle to radians
		angleRad = angle * (Math.PI / 180.0);

		// calculate other parts
		hyp = 1000 / Math.cos(angleRad);
		rise = 1000 * Math.tan(angleRad);
		topAngle = 90 - angle;

		$('#ball').animate({
			top: rise,
			left: 1000
		}, hyp*2, 'linear');
		// calculate right wall
	} else { // if it's going to hit the top
		$('#ball').animate({
			top: 13,
			left: bottom
		}, hyp*2, 'linear');
		// calculate top wall
	}
}