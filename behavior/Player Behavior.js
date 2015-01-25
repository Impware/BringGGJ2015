#pragma strict

/*	PLAYER BEHAVIOR
 *	This script set standard actions to Player Character
 * 	And his interaction with the environment
 */

/*
 * Attributes
 */
 
// Constants
var STANDARD_SPEED_X = 180;
var STANDARD_SPEED_Y = 5;
//var PLAYER : GameObject;
var ANIMATOR: Animator;
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

	
	ANIMATOR = GetComponent("Animator");
	if(isGameOver == false) {
		if (Input.GetAxis("Horizontal") == 0) {
			rigidbody2D.velocity = Vector2(0,rigidbody2D.velocity.y);
			if( jump == false){
				ANIMATOR.SetBool("Iddle",true);
				ANIMATOR.SetBool("Walking",false);
				ANIMATOR.SetBool("Jumping_Up",false);
				ANIMATOR.SetBool("Jumping_Down", false);
				ANIMATOR.speed = 0.35;
				}
		}
		else if (Input.GetAxis("Horizontal") > 0) {
			rigidbody2D.velocity = Vector2(STANDARD_SPEED_X * Time.deltaTime,rigidbody2D.velocity.y);
			transform.localScale.x = 1.5;
			if( jump == false){
			ANIMATOR.SetBool("Iddle",false);
			ANIMATOR.SetBool("Walking",true);
			ANIMATOR.SetBool("Jumping_Up",false);
			ANIMATOR.SetBool("Jumping_Down", false);
			ANIMATOR.speed = 1.25;	
			}
		}
		
		else if (Input.GetAxis("Horizontal") < 0) {
			rigidbody2D.velocity = Vector2(-STANDARD_SPEED_X * Time.deltaTime,rigidbody2D.velocity.y);
			transform.localScale.x = -1.5;
			if( jump == false){
			ANIMATOR.SetBool("Iddle",false);
			ANIMATOR.SetBool("Walking",true);
			ANIMATOR.SetBool("Jumping_Up",false);
			ANIMATOR.SetBool("Jumping_Down", false);
			ANIMATOR.speed = 1.25;	
			}
		}

		if ((jump == false) && (rigidbody2D.velocity.y == 0)){
			if ((Input.GetAxis("Vertical") > 0) || Input.GetKey(KeyCode.Space)) {
				rigidbody2D.velocity = Vector2(rigidbody2D.velocity.x, STANDARD_SPEED_Y);
				jump = true;
				ANIMATOR.SetBool("Jumping_Up", true);
				ANIMATOR.SetBool("Iddle", false);
				ANIMATOR.SetBool("Walking",false);
				ANIMATOR.SetBool("Jumping_Down", false);
			}
		}
		else if(rigidbody2D.velocity.y < 0){
			ANIMATOR.SetBool("Jumping_Up", false);
			ANIMATOR.SetBool("Jumping_Down", true);
			ANIMATOR.SetBool("Iddle", false);
			ANIMATOR.SetBool("Walking",false);
			}
	}
}

function OnCollisionEnter2D(collide:Collision2D) {
	if(isGameOver == false) {
		var objectCollided = collide.gameObject;
		if(isOnGround(objectCollided) == true) {
		ANIMATOR.SetBool("Jumping_Down", false);
			jump = false;
		}
		else if(isAnEnemy(objectCollided) == true) {
			Debug.Log("GAME OVER");
			isGameOver = true;
		}

	}
}

function isOnGround(objectCollided:GameObject) {
	var isOnGround = false;
	if((rigidbody2D.velocity.y <= 0)
		&& (objectCollided.tag == "Ground")
		&& (objectCollided.transform.position.y < transform.position.y)) {
		isOnGround = true;
		ANIMATOR.SetBool("Jumping_Down", false);
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