window.onload = function() {
	document.getElementById("header").onclick = changeColor;
}

function changeColor() {
	let color = "#";
	const letters = "ABCDEF0123456789";
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + letters[temp];
	}
	const header = document.getElementById("header");
	header.style.color = color;
}