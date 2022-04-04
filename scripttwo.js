let state = -1;

let a2v = JSON.parse(localStorage.getItem('user_ranks'));

if (!a2v) {
	a2v = [
		{
			song: "Look Twice.wav",
			visual: "looktwice.mp4",
			vote1: 0,
			vote2: 0
		},
		{
			song: "crying.wav",
			visual: "crying.mp4",
			vote1: 0,
			vote2: 0
		},
		{
			song: "lovesong.wav",
			visual: "feet.png",
			vote1: 0,
			vote2: 0
		},
		{
			song: "here.wav",
			visual: "here.png",
			vote1: 0,
			vote2: 0
		},
		{
			song: "crazy.wav",
			visual: "hallway.mp4",
			vote1: 0,
			vote2: 0
		},
		{
			song: "tired.wav",
			visual: "tired.png",
			vote1: 0,
			vote2: 0
		}
	];

	localStorage.setItem("user_ranks", JSON.stringify(a2v));
}

function assignAudio() {
	let container = document.getElementById("container");
	let groups = container.children;
	groups = Array.prototype.slice.call( groups );
	groups.forEach(function(group,i) {
		let css = '.visualBoxs:hover {filter: drop-shadow(8px 8px 10px black);cursor: pointer;opacity: 1 !important;}';
		let style = document.createElement('style');

		if (style.styleSheet) {
    		style.styleSheet.cssText = css;
		} else {
    		style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName('head')[0].appendChild(style);
		let audioPath = "Sounds/" + a2v[i].song;
		let audioBox = document.createElement('audio');
		audioBox.className = 'songs';
		audioBox.loop = true;
		let audioSrc = document.createElement('source');
		audioSrc.src = audioPath;
		audioBox.appendChild(audioSrc);
		group.appendChild(audioBox);
		let visualBox = group.querySelector(".visualBoxs");
		let playIcon = document.createElement('img');
		playIcon.src = "visuals/play.png";
		playIcon.style.width = "20%";
		playIcon.style.position = "absolute";
		playIcon.style.left = '40%';
		playIcon.style.top = "40%";
		playIcon.addEventListener("mouseover", (e) => playPause(e.fromElement));
		playIcon.addEventListener("mouseout", (e) => playPause(e.fromElement.parentNode));
		visualBox.appendChild(playIcon);
	})
}

function assignVisual() {
	let container = document.getElementById("container");
	let groups = container.children;
	groups = Array.prototype.slice.call( groups );
	// for each box assign visual and audio html element
	groups.forEach(function(group,i) {
		// group -> group div element
		// i is the index
		// a2v[i] has the data
		let visualBox = group.querySelector(".visualBoxs");
		visualBox.style.opacity = 0;
		visualBox.removeChild(visualBox.firstElementChild);
		
		let path = "visuals/" + a2v[i].visual;
		// visual part
		if (path.slice(-1) == "v" || path.slice(-1) == "4") {
			console.log('video');
			let video = document.createElement('video');
			video.controls = false;
			video.loop = true;
			video.style.marginTop = "20%";
			let src = document.createElement('source');
			src.src = path;
			video.appendChild(src);
			visualBox.appendChild(video);
		}else {
			console.log('image');
			let img = document.createElement('img');
			img.src = path;
			visualBox.appendChild(img);
		}
		visualBox.firstChild.addEventListener("mouseover", (e) => playPause(e.path[0].parentNode));
		visualBox.firstChild.addEventListener("mouseout", (e) => playPause(e.path[0].parentNode));
	})
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(a2v);

console.log('shuffled', a2v);



function voteSong() {
	let parent = this.parentNode.parentNode;
	let index = Array.prototype.indexOf.call(parent.children, this.parentNode);
	a2v[index].vote1 += 1;
	next();
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function next() {
	state += 1;
	let container = document.getElementById("container");
	let groups = container.children;
	let question = document.getElementById("question");
	let title = document.getElementById('title');
	groups = Array.prototype.slice.call( groups );
	let total = 0;
		groups.forEach((group,i) => {
			total += a2v[i].vote1;
		});
	if (state == 0) {
		container.style.opacity = 1;
		question.innerHTML = "hover to play songs";
		title.style.top = "2%";
		assignAudio();
	}

	else if (state == 1) {
		question.innerHTML = "click to choose your favorite song";
		groups.forEach(function(group,i){
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.addEventListener("click", voteSong);
		})
	}

	else if (state == 2) {
		question.innerHTML = "favorite songs by percentage of users";
		groups.forEach(function(group,i){
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.removeEventListener("click", voteSong);
			setTimeout(() => {
				visualBox.style.transform = "scale(0.4)";
				let hist = group.querySelector(".hist");
				let p = hist.querySelector(".percent");
				let num = ((a2v[i].vote1 / total) * 100).toFixed(1);
				p.innerHTML = `${num}%`;
			}, 300);
		})
	}

	else if (state == 3) {
		assignVisual();
		question.innerHTML = "hover to show visuals";
		groups.forEach(function(group,i) {
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.style.transform = "scale(1)";
			let p = group.querySelector(".hist").querySelector(".percent");
			p.innerHTML = "";
			let audio = group.querySelector('audio');
			audio.currentTime = 0;
			let video = group.querySelector('video');
			if (video) video.currentTime = 0;
		})
	}
	else if (state == 4) {
		document.getElementById('next').style.visibility = "hidden";
		question.innerHTML = "now click to choose your favorite audiovisual situation";
		groups.forEach(function(group,i){
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.style.opacity = "0.3";
			visualBox.addEventListener("click", () => {
				a2v[i].vote2 += 1;
				console.log(a2v[i]);
				next();
			});

		})
	}
	else if (state == 5) {
		document.getElementById('next').style.visibility = "visible";
		question.innerHTML = "favorite situations by percentage of users";
		groups.forEach(function(group,i){
			let visualBox = group.querySelector(".visualBoxs");
			setTimeout(() => {
				visualBox.style.transform = "scale(0.4)";
				let hist = group.querySelector(".hist");
				let p = hist.querySelector(".percent");
				let num = ((a2v[i].vote2 / total) * 100).toFixed(1);
				p.innerHTML = `${num}%`;
			}, 300);
		});
		
		// send the data to local storage
		localStorage.setItem("user_ranks", JSON.stringify(a2v));
		console.log(a2v);
	}
	else if (state == 6){
		container.style.visibility = 'hidden';
		
		document.getElementById('next').style.visibility = "hidden";
		title.style.top = "45%";
		let h1 = title.querySelector('h1');
		//title.innerHTML = "while we may not always realize it..."
		h1.style.fontSize = "1.5em";
		question.innerHTML = "visuals impact our musical perceptions much more than we think...";
		h1.innerHTML = "while we may not always realize it...";
	}
	

}


function playPause(e) {
	console.log(e);
	let visualBox = e;
	let video = visualBox.querySelector('video');
	let audioBox = e.parentNode.querySelector(".songs");
	console.log(audioBox.paused);
  if (audioBox.paused) {
  	audioBox.play();
  	if (video) {
  		if (video.paused) video.play();
  	}
  }else {
  	audioBox.pause();
  	if (video) {
  		if (!video.paused) video.pause();
  	}
  }
}