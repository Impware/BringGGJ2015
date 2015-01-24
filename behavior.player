#pragma strict
var jump: boolean;
function Start () {
var jump = false;
}

function Update () {
	if (Input.GetAxis("Horizontal") > 0) {
		transform.Translate(Vector2(10,0) * Time.deltaTime);
	}
	if (Input.GetAxis("Horizontal") < 0) {
		transform.Translate(Vector2(-10,0) * Time.deltaTime);
	}
	if (jump == false){
		if (Input.GetAxis("Vertical") > 0) {
			rigidbody2D.velocity = Vector2(0,10);
			jump = true;
		}
	}
}

function OnCollisionEnter2D(collide:Collision2D) {
	var objectCollided = collide.gameObject;
	if(isOnGround(objectCollided)) {
		jump = false;
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
