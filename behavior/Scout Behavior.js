#pragma strict

/*	SCOUT BEHAVIOR
 *	This script set standard actions to NPC enemy Scout
 */

/*
 * Attributes
 */

// Constants
var STANDARD_AREA_OF_SIGHT_X = 6;
var STANDARD_AREA_OF_SIGHT_Y_UP = 1.5;
var STANDARD_AREA_OF_SIGHT_Y_DOWN = 0.9;

var STANDARD_SPEED = 1.5;
var ALERT_SPEED = 3;
var HUNT_SPEED = 3;

var STANDARD_POSITION_X = 5;
var STANDARD_POSITION_Y = -0.48;

var PATROL_INITIAL_POSITION_X = -0.65;
var PATROL_FINAL_POSITION_X = 8.7;

var ALERT_INITIAL_POSITION_X = -2.28;
var ALERT_FINAL_POSITION_X = 7.61;
var ALERT_POSITION_Y = -5.79;

// Protagonist Attributes
var protagonist : GameObject;
var protagonistPositionX : int;
var protagonistPositionY : int;

// Stair Attributes
var stair : GameObject;
var stairPositionX : int;
var stairPositionY : int;

// Self Attributes
var isProtagonistSpotted : boolean;
var isSomethingWrongBelow : boolean;
var imPatrollingRight : boolean;

var positionX : int;
var positionY : int; 


/*
 * Methods
 */

function Start () {
	isProtagonistSpotted = false;
	isSomethingWrongBelow = false;
	imPatrollingRight = false;
	transform.position.x = STANDARD_POSITION_X;
	transform.position.y = STANDARD_POSITION_Y;
	positionX = transform.position.x;
	positionY = transform.position.y;
}

function Update () {
	updatePositions();
	updateScoutBehavior();
}

function updatePositions() {
	protagonistPositionX = protagonist.transform.position.x;
	protagonistPositionY = protagonist.transform.position.y;

	positionX = transform.position.x;
	positionY = transform.position.y;
}

function updateScoutBehavior() {
	if(isProtagonistSpotted == false) {
		if(isSomethingWrongBelow == false) {
			patrolUpperArea();
		}
		else {
			patrolLowerArea();
		}
		checkArea();
	}
	else {
		huntProtagonist();
	}
}

function patrolUpperArea() {
	if(imInUpperFloor() == true) {
		if(imPatrollingRight == true) {
			Step(PATROL_FINAL_POSITION_X);
		}
		else {
			Step(PATROL_INITIAL_POSITION_X);
		}
	}
	else {
		goToUpperArea();
	}
}

function patrolLowerArea() {
	if(imInUpperFloor() == false) {
		if(imPatrollingRight == true) {
			Step(ALERT_FINAL_POSITION_X);
		}
		else {
			Step(ALERT_INITIAL_POSITION_X);
		}
	}
	else {
		goToLowerArea();
	}
}

function checkArea() {
	if(isProtagonistOnSight() == true) {
		isProtagonistSpotted = true;
		Debug.Log("Sentry Spotted = " + isProtagonistSpotted);
	}
}

function isProtagonistOnSight() {
	var isProtagonistOnSight = false;
	if(imPatrollingRight == false) {
		if((protagonistPositionX > positionX - STANDARD_AREA_OF_SIGHT_X)
			&& (protagonistPositionY > positionY - STANDARD_AREA_OF_SIGHT_Y_UP)
			&& (protagonistPositionY < positionY + STANDARD_AREA_OF_SIGHT_Y_DOWN)) {
			isProtagonistOnSight = true;
		}
	}
	else {
		if((protagonistPositionX < positionX + STANDARD_AREA_OF_SIGHT_X)
			&& (protagonistPositionY > positionY - STANDARD_AREA_OF_SIGHT_Y_UP)
			&& (protagonistPositionY < positionY + STANDARD_AREA_OF_SIGHT_Y_DOWN)) {
			isProtagonistOnSight = true;
		}
	}
	return isProtagonistOnSight;
}

function huntProtagonist() {
	positionX = transform.position.x;
	positionY = transform.position.y;
	if(positionX < protagonistPositionX) {
		transform.Translate(Vector2(HUNT_SPEED,0) * Time.deltaTime);
	}
	else {
		transform.Translate(Vector2(-HUNT_SPEED,0) * Time.deltaTime);
	}
}

function imInUpperFloor() {
	var imInUpperFloor = true;
	if(transform.position.y > STANDARD_POSITION_Y) {
	 	imInUpperFloor = false;
	}
	return imInUpperFloor;
}

function Step(expectedPosition : float) {
	if(positionX == expectedPosition) {
		if(imPatrollingRight == true) {
			imPatrollingRight = false;
		}
		else {
			imPatrollingRight = true;
		}
	}
	else if(positionX > expectedPosition) {
		if(imPatrollingRight == true) {
			imPatrollingRight = false;
		}
		else {
			transform.Translate(Vector2(-STANDARD_SPEED,0) * Time.deltaTime);
		}
	}
	else {
		if(imPatrollingRight == true) {
			transform.Translate(Vector2(STANDARD_SPEED,0) * Time.deltaTime);
		}
		else {
			imPatrollingRight = true;
		}
	}
}

function goToUpperArea() {
	transform.position.y = STANDARD_POSITION_Y;
}

function goToLowerArea() {
	transform.position.y = ALERT_POSITION_Y;
}
