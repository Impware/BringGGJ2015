#pragma strict

/*	SENTINEL BEHAVIOR
 *	This script set standard actions to NPC enemy Sentinel
 */

/*
 * Attributes
 */

// Constants
var STANDARD_SPEED = 3;

// Protagonist Attributes
var protagonist : GameObject;
var protagonistPositionX : int;
var protagonistPositionY : int;

// Area Of Sight Attributes
var areaOfSight : AreaOfSight_Interaction;

// Self Attributes
var isProtagonistSpotted : boolean;

var positionX : int;
var positionY : int; 


/*
 * Methods
 */

function Start () {
	areaOfSight = GameObject.Find("AreaOfSightSentry").GetComponent(AreaOfSight_Interaction);
	isProtagonistSpotted = false;
	positionX = transform.position.x;
	positionY = transform.position.y;
}

function Update () {
	updateProtagonistPosition();
	updateSentryBehavior();
}

function updateProtagonistPosition() {
	protagonistPositionX = protagonist.transform.position.x;
	protagonistPositionY = protagonist.transform.position.y;
}

function updateSentryBehavior() {
	if(isProtagonistSpotted == false) {
		checkArea();
	}
	else {
		huntProtagonist();
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
	if(areaOfSight.protagonistIsOnSight == true) {
		isProtagonistOnSight = true;
	}
	return isProtagonistOnSight;
}

function huntProtagonist() {
	positionX = transform.position.x;
	positionY = transform.position.y;
	if(positionX < protagonistPositionX) {
		transform.Translate(Vector2(STANDARD_SPEED,0) * Time.deltaTime);
	}
	else {
		transform.Translate(Vector2(-STANDARD_SPEED,0) * Time.deltaTime);
	}
}
