##if you want to add some animation to a div witch id is "block",
see the code

[pre]<pre><code>
// initialize a variable
var ani = new TW();
		
// left: 0 - 1200, top: 200 - 500
ani.fromTo({
	x: 0,
	y: 200
}, {
	x: 1200,
	y: 500
}, 1111).run(function(obj) {
	this.style.left = obj.x + "px";
	this.style.top = obj.y + "px";
}, document.getElementById("block"));
</code></pre>
