#pragma strict

/*	SCOUT BEHAVIOR
 *	This script set standard actions to NPC enemy Scout
 */

/*
 * Attributes
 */

// Constants
var STANDARD_SPEED = 1.5;
var ALERT_SPEED = 3;
var HUNT_SPEED = 3;

var PATROL_INITIAL_POSITION_X = -0.65;
var PATROL_FINAL_POSITION_X = 8.7;

var ALERT_INITIAL_POSITION_X = -2.28;
var ALERT_FINAL_POSITION_X = 7.61;
var ALERT_POSITION_Y = -5.79;

// Protagonist Attributes
var protagonist : GameObject;
var protagonistPositionX : int;
var protagonistPositionY : int;

// Limiters Attributes
var limiterPatrolX0 : GameObject;
var limiterPatrolX1 : GameObject;

var limiterAlertX0 : GameObject;
var limiterAlertX1 : GameObject;

// Area of Sight Interactions
var areaOfSightLeft : AreaOfSight_Interaction;
var areaOfSightRight : AreaOfSight_Interaction;

// Self Attributes
var isProtagonistSpotted : boolean;
var isSomethingWrongBelow : boolean;
var imPatrollingRight : boolean;
var imInPatrol : boolean;

var positionX : int;
var positionY : int; 


/*
 * Methods
 */

function Start () {
	areaOfSightLeft = GameObject.Find("AreaOfSightScoutLeft").GetComponent(AreaOfSight_Interaction);
	areaOfSightRight = GameObject.Find("AreaOfSightScoutRight").GetComponent(AreaOfSight_Interaction);
	limiterPatrolX0 = GameObject.Find("Scout_PatrolX0");
	limiterPatrolX1 = GameObject.Find("Scout_PatrolX1");
	limiterAlertX0 = GameObject.Find("Scout_AlertX0");
	limiterAlertX1 = GameObject.Find("Scout_AlertX1");
	isProtagonistSpotted = false;
	isSomethingWrongBelow = false;
	imPatrollingRight = false;
	imInPatrol = true;
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
		if(areaOfSightLeft.protagonistIsOnSight == true) {
			isProtagonistOnSight = true;
		}
	}
	else {
		if(areaOfSightRight.protagonistIsOnSight == true) {
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
	if(transform.position.y > limiterPatrolX0.transform.position.y) {
	 	imInUpperFloor = false;
	}
	return imInUpperFloor;
}

function Step(expectedPosition : float) {
	if(imInPatrol == false) {
		if(imPatrollingRight == true) {
			imPatrollingRight = false;
		}
		else {
			imPatrollingRight = true;
		}
		imInPatrol = true;
	}
	else{
		if(imPatrollingRight == true) {
			transform.Translate(Vector2(STANDARD_SPEED,0) * Time.deltaTime);
		}
		else {
			transform.Translate(Vector2(-STANDARD_SPEED,0) * Time.deltaTime);
		}
	}
}

function goToUpperArea() {
	transform.position.y = limiterPatrolX0.transform.position.y;
}

function goToLowerArea() {
	transform.position.y = ALERT_POSITION_Y;
}

function OnCollisionEnter2D(collide:Collision2D) {
	if(collide.gameObject.tag == "PatrolLimiter") {
		imInPatrol = false;
	}
}