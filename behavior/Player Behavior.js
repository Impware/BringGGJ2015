#pragma strict

/*	PLAYER BEHAVIOR
 *	This script set standard actions to Player Character
 * 	And his interaction with the environment
 */

/*
 * Attributes
 */
 
// Constants
var STANDARD_SPEED_X = 10;
var STANDARD_SPEED_Y = 10;

// Self Attributes
var jump: boolean;

// Environment Attributes
var isGameOver : boolean;

/*
 * Methods
 */

function Start () {
	jump = false;
	isGameOver = false;
}

function Update () {
	if(isGameOver == false) {
		if (Input.GetAxis("Horizontal") > 0) {
			transform.Translate(Vector2(STANDARD_SPEED_X,0) * Time.deltaTime);
		}
		if (Input.GetAxis("Horizontal") < 0) {
			transform.Translate(Vector2(-STANDARD_SPEED_X,0) * Time.deltaTime);
		}
		if ((jump == false) && (rigidbody2D.velocity.y == 0)){
			if (Input.GetAxis("Vertical") > 0) {
				rigidbody2D.velocity = Vector2(0,STANDARD_SPEED_Y);
				jump = true;
			}
		}
	}
}

function OnCollisionEnter2D(collide:Collision2D) {
	if(isGameOver == false) {
		var objectCollided = collide.gameObject;
		if(isOnGround(objectCollided)) {
			jump = false;
		}
		else if(isAnEnemy(objectCollided)) {
			Debug.Log("GAME OVER");
			isGameOver = true;
		}
	}
}

function isOnGround(objectCollided:GameObject) {
	var isOnGround = false;
	if((objectCollided.tag == "Ground")
		&& (rigidbody2D.velocity.y <= 0)
		&& (objectCollided.transform.position.y < transform.position.y)) {
		isOnGround = true;
	}
	return isOnGround;
}

function isAnEnemy(objectCollided:GameObject) {
	var isAnEnemy = false;
	if(objectCollided.tag == "Enemy") {
		Debug.Log(objectCollided.name + " catched " + name + "!!");
		isAnEnemy = true;
	}
	return isAnEnemy;
}
