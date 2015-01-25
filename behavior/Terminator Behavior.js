#pragma strict

var protagonist : GameObject;
var isHaunting : boolean;
var speed_x : float;
var speed_y : float;

var animator : Animator;

function Start () {
	//animator = GetComponent("Animator");
	protagonist = GameObject.Find("Player");
}

function Update () {
	if(isHaunting == true) {
		//animator.SetBool("Terminator", true);
		if((collider2D.bounds.center.y > protagonist.collider2D.bounds.center.y + 0.05)
		|| (collider2D.bounds.center.y < protagonist.collider2D.bounds.center.y - 0.05)) {
			hauntVertical();
		}
		else if((collider2D.bounds.center.x > protagonist.collider2D.bounds.center.x + 0.05)
		|| (collider2D.bounds.center.x < protagonist.collider2D.bounds.center.x - 0.05)) {
			hauntHorizontal();
		}
	}
	else {
		//animator.SetBool("Terminator", false);
	}
}

function hauntVertical() {
	if(protagonist.collider2D.bounds.center.y < collider2D.bounds.center.y) {
		transform.position.y -= speed_y * Time.deltaTime;
	} 
	else {
		transform.position.y += speed_y * Time.deltaTime;
	}
}

function hauntHorizontal() {
	if(protagonist.collider2D.bounds.center.x < collider2D.bounds.center.x) {
		transform.position.x -= speed_x * Time.deltaTime;
	} 
	else {
		transform.position.x += speed_x * Time.deltaTime;
	}
}