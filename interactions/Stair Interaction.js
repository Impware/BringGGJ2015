#pragma strict

/*	STAIR INTERACTION
 *	This script set standard actions of other entities
 *	interacting with the Stair
 */

/*
 * Attributes
 */

// Constants
var AREA_OF_INTERACTION_X = 0.5;
var CAN_INTERACT = true;
var STANDARD_SPEED = 0.3;

// Stair Attributes
var stair : GameObject;

// Self Attributes
var animator : Animator;

var isInteractive : boolean;
var inInteraction : boolean;
var isInCenterOfTheStair : boolean;
var illGoDown : boolean;

function Start () {
	animator = GetComponent("Animator");
	isInteractive = true;
	inInteraction = false;
	isInCenterOfTheStair = false;
}

function Update () {
	if(CAN_INTERACT == true) {
		if(isInteractive == true) {
			if((Input.GetKeyDown("e") == true) && (isInInteractionRange() == true)) {
				Debug.Log(name + " interacting with " + stair.name);
				inInteraction = true;
				isInteractive = false;
				illGoDown = imInUpperFloor();
				
				rigidbody2D.gravityScale = 0;
			}
		}
		else {
			if(inInteraction == true) {
				if(isInCenterOfTheStair == true) {
					animator.SetBool("Climbing", true);
					if(illGoDown == true) {
						goDown();
					}
					else {
						goUp();
					}
				}
				else {
					goToTheCenterOfTheStair();
				}
			}
			else {
				animator.SetBool("Climbing", false);
			}
		}
	}
}

function isInInteractionRange() {
	var isInInteractionRange = false;
	var selfPosition = transform.position.x;
	var selfWidth = transform.collider2D.bounds.max.x;
	var stairCenterPositionX = stair.collider2D.bounds.center.x;
	
	if((selfPosition + selfWidth > (stairCenterPositionX - AREA_OF_INTERACTION_X))
		&& (selfPosition < (stairCenterPositionX + AREA_OF_INTERACTION_X))) {
		isInInteractionRange = true;
	}
	return isInInteractionRange;
}

function imInUpperFloor() {
	var imInUpperFloor = true;
	var stairUpperPosition = stair.collider2D.bounds.max.y;
	var stairLowerPosition = stair.collider2D.bounds.min.y;
	
	if(transform.collider2D.bounds.min.y < stairUpperPosition) {
		//Debug.Log(name + " is in the Lower Floor of " + stair.name);
		//Debug.Log(stair.name + " Upper: " + stairUpperPosition + " Lower: " + stairLowerPosition);
		//Debug.Log(name + " Lower: " + transform.collider2D.bounds.min.y);
	 	imInUpperFloor = false;
	}
	return imInUpperFloor;
}

function goDown() {
	var stairLowerPosition = stair.collider2D.bounds.min.y;
	
	if(imInUpperFloor() == true) {
		transform.position.y -= STANDARD_SPEED;
	}
	else {
		Debug.Log("In Lower Level!");
		inInteraction = false;
		isInteractive = true;
		rigidbody2D.gravityScale = 1;

	}
}

function goUp() {
	if(imInUpperFloor() == false) {
		transform.position.y += STANDARD_SPEED;
	}
	else {
		Debug.Log("In Upper Level!");
		inInteraction = false;
		isInteractive = true;
		rigidbody2D.gravityScale = 1;
	}
}

function goToTheCenterOfTheStair() {
	var stairCenterPositionX = stair.collider2D.bounds.center.x;
	
	if(transform.position.x < stairCenterPositionX) {
		transform.position.x = stairCenterPositionX;
	}
	else if(transform.position.x > stairCenterPositionX) {
		transform.position.x = stairCenterPositionX;
	}
	else {
		isInCenterOfTheStair = true;
	}
}