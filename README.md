##if you want to add some animation to a div witch id is "block",
see the code

var ani = new TW();
		
ani.fromTo({
	x: 5,
	y: 200
}, {
	x: 1200,
	y: 500
}, 1111).run(function(obj) {
	this.style.left = obj.x + "px"
}, document.getElementById("block"));
