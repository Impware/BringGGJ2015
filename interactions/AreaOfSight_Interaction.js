#pragma strict

var protagonistIsOnSight : boolean;

function Start() {
	protagonistIsOnSight = false;
}

function OnTriggerEnter2D(collide:Collider2D) {
		protagonistIsOnSight = (collide.gameObject.tag == "Player");
}