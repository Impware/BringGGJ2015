#pragma strict

var limit : GameObject;
var isThisLimitOnLeft : boolean;
var protagonist : GameObject;
var isThisLimitInactive : boolean;

function Start () {
	protagonist = GameObject.Find("Player");
}

function Update () {
	var VARIANT = 3.5;
	if((transform.position.y < limit.collider2D.bounds.max.y) &&
		(transform.position.y > limit.collider2D.bounds.min.y)) {
		if(isThisLimitOnLeft == true) {
			if(isThisLimitInactive == false) {
				if(limit.collider2D.bounds.max.x + VARIANT > transform.position.x) {
					transform.position.x = limit.collider2D.bounds.max.x + VARIANT;
				}
				if(limit.collider2D.bounds.max.x + 3.4 < protagonist.collider2D.bounds.min.x) {
					transform.position.x = (protagonist.transform.position.x + (protagonist.collider2D.bounds.size.x/2));
				}
			}
			if(limit.collider2D.bounds.max.x + VARIANT*3 < transform.position.x) {
				isThisLimitInactive = true;
			}
			else {
				isThisLimitInactive = false;
			}
		}
		else {
			if(isThisLimitInactive == false) {
				if(limit.collider2D.bounds.min.x - VARIANT < transform.position.x) {
					transform.position.x = limit.collider2D.bounds.min.x - VARIANT;
				}
				if(limit.collider2D.bounds.min.x > protagonist.collider2D.bounds.max.x + 3.75) {
					transform.position.x = (protagonist.transform.position.x + (protagonist.collider2D.bounds.size.x/2));
				}
			}
			if(limit.collider2D.bounds.min.x - VARIANT*3 > transform.position.x) {
				isThisLimitInactive = true;
			}
			else {
				isThisLimitInactive = false;
			}
		}
	}
}