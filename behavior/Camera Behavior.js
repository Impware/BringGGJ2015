#pragma strict

var protagonist : GameObject;

function Start () {
	protagonist = GameObject.Find("Player");
}

function Update () {
	if(isProtagonistInStandardLevel() == true) {
		transform.position.y = 1.3;
	}
	else if(isProtagonistInBasementLevel() == true) {
		transform.position.y = -1.25;
	}
	else if(isProtagonistInVerticalRushArea() == true) {
		transform.position.y = (protagonist.transform.position.y + 0.67);
	}
	else if(isProtagonistInHighLevel() == true) {
		transform.position.y = 23;
	}
}

function isProtagonistInStandardLevel() {
	var isProtagonistInStandardLevel = false;
	if((protagonist.collider2D.bounds.center.y > 0)
		&& (protagonist.collider2D.bounds.center.x < 55)) {
		isProtagonistInStandardLevel = true;
	}
	return isProtagonistInStandardLevel;
}

function isProtagonistInBasementLevel() {
	var isProtagonistInBasementLevel = false;
	if((protagonist.collider2D.bounds.center.y > (-2))
		&& (protagonist.collider2D.bounds.center.y < 0)) {
		isProtagonistInBasementLevel = true;
	}
	return isProtagonistInBasementLevel;
}

function isProtagonistInVerticalRushArea() {
	var isProtagonistInVerticalRushArea = false;
	if((protagonist.collider2D.bounds.center.x > 56.5)
		&& (protagonist.collider2D.bounds.center.y < 22)) {
		isProtagonistInVerticalRushArea = true;
	}
	return isProtagonistInVerticalRushArea;
}

function isProtagonistInHighLevel() {
	var isProtagonistInHighLevel = false;
	if (protagonist.collider2D.bounds.center.y > 22) {
		isProtagonistInHighLevel = true;
	}
	return isProtagonistInHighLevel;
}