#pragma strict
var CHILD: Transform;
var DAD: Transform;
var TILES_H: int;
var TILES_V: int;
var DISTANCE_X: int;
var DISTANCE_Y: int;
function Start () {
	DISTANCE_X = transform.collider2D.bounds.size.x;
	DISTANCE_Y = transform.collider2D.bounds.size.y;
	for (var i : int = 0; i < TILES_H; i++){
	Instantiate(CHILD,Vector3(DAD.position.x + DISTANCE_X * i,DAD.position.y,0), Quaternion.identity);
	}
	for (var e : int = 0; e < TILES_V; e++){
	Instantiate(CHILD,Vector3(DAD.position.x,DAD.position.x + DISTANCE_Y * i,0), Quaternion.identity);
	}
}

function Update () {

}