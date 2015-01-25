#pragma strict

/*
 * Attributes
 */

// Constants
var AREA_OF_INTERACTION_X = 0.2;
var CAN_INTERACT = true;

var switchObject : GameObject;
var trap : GameObject;

var inInteraction : boolean;
var isInCenterOfTheSwitch : boolean;
var trapInAction : boolean;
var trapFinished : boolean;

function Start () {
	inInteraction = false;
	isInCenterOfTheSwitch = false;
	trapFinished = false;
}

function Update () {
	if((CAN_INTERACT == true) && (trapFinished == false)) {
		if(inInteraction == false) {
			if((Input.GetKeyDown("e") == true) && (isInInteractionRange() == true)) {
				Debug.Log(name + " interacting with " + switchObject.name);
				inInteraction = true;
			}
		}
		else {
			if(isInCenterOfTheSwitch == true) {
				Debug.Log(name + " activated " + trap.name);
				activeTrap();
			}
			else {
				goToTheCenterOfTheSwitch();
			}
		}
	}
}

function isInInteractionRange() {
	var isInInteractionRange = false;
	
	var selfPosition = transform.position.x;
	var selfWidth = transform.collider2D.bounds.max.x;
	var switchCenterPositionX = switchObject.collider2D.bounds.center.x;
	
	if((selfPosition + selfWidth > (switchCenterPositionX - AREA_OF_INTERACTION_X))
		&& (selfPosition < (switchCenterPositionX + AREA_OF_INTERACTION_X))) {
		isInInteractionRange = true;
	}
	return isInInteractionRange;
}

function activeTrap() {
	trap.collider2D.isTrigger = true;
	if(trap.transform.position.y <= transform.position.y) {
		trapFinished = true;
	}
}

function goToTheCenterOfTheSwitch() {
	var switchCenterPositionX = switchObject.collider2D.bounds.center.x;
	if(transform.position.x < switchCenterPositionX) {
		transform.position.x = switchCenterPositionX;
	}
	else if(transform.position.x > switchCenterPositionX) {
		transform.position.x = switchCenterPositionX;
	}
	else {
		isInCenterOfTheSwitch = true;
	}
}