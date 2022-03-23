// document.getElementsByClassName('changeButton').addEventListener('click', changeVisual);

let previous = 0;

const visuals = ["Look Twice.mp4", "cryingmv.mp4 " "placeholder.jpeg", "temporary.jpeg"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function changeVisual(b) {
	console.log(b);
	let visualBox = b.parentNode.querySelector(".visualBoxs");
	console.log(visualBox);
	while(visualBox.firstChild) {
		visualBox.removeChild(visualBox.firstChild);
	}
	let random = previous + 1;
	random = random % visuals.length;
	previous = random;
	// let random = getRandomInt(visuals.length);
	// while (random == previous) {
	// 	random = getRandomInt(visuals.length);
	// }
	// previous = random;
	let path = "visuals/" + visuals[random];
	if (path.slice(-1) == "v" || path.slice(-1) == "4") {
		console.log('video');
		let video = document.createElement('video');
		video.controls = true;
		video.style.width = "70%";
		video.style.height = "200px"
		let src = document.createElement('source');
		src.src = path;
		visualBox.appendChild(video);
	}else {
		console.log('image');
		let img = document.createElement('img');
		img.src = path;
		img.style.width = "70%";
		visualBox.appendChild(img);
	}
}

function hide(b) {
	let visualBox = b.parentNode.querySelector(".visualBoxs");
	console.log(visualBox.style);
	if (visualBox.style.visibility != 'hidden') {
		visualBox.style.visibility = 'hidden';
	} else {
		visualBox.style.visibility = 'visible';
	}
}