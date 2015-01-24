#pragma strict
var protagonist : GameObject;
var protagonistPositionX : int;
var protagonistPositionY : int;

var areaOfSight : int;
var isProtagonistSpotted : boolean;

var positionX : int;
var positionY : int; 

function Start () {
	areaOfSight = 6;
	isProtagonistSpotted = false;
}

function Update () {
	protagonistPositionX = protagonist.transform.position.x;
	protagonistPositionY = protagonist.transform.position.y;
	positionX = transform.position.x;
	positionY = transform.position.y;
	
	if(isProtagonistSpotted == false) {
		if(protagonistPositionX > positionX - areaOfSight) {
			isProtagonistSpotted = true;	
			Debug.Log("Spotted = " + isProtagonistSpotted);
		}
	}
	else {
		if(positionX < protagonistPositionX) {
			transform.Translate(Vector2(3,0) * Time.deltaTime);
		}
		else {
			transform.Translate(Vector2(-3,0) * Time.deltaTime);
		}
	}
}
