let state = -1;

let a2v = JSON.parse(localStorage.getItem('user_ranks'));

if (!a2v) {
	a2v = [
		{
			song: "Look Twice.wav",
			visual: "looktwice.mp4",
			first: 0,
			second: 0,
			third: 0,
			fourth: 0
		},
		{
			song: "crying.wav",
			visual: "crying.mp4",
			first: 0,
			second: 0,
			third: 0,
			fourth: 0
		},
		{
			song: "lovesong.wav",
			visual: "feet.png",
			first: 0,
			second: 0,
			third: 0,
			fourth: 0
		},
		{
			song: "tired.wav",
			visual: "tired.png",
			first: 0,
			second: 0,
			third: 0,
			fourth: 0
		}
	];

	localStorage.setItem("user_ranks", JSON.stringify(a2v));
}



function assignAudioVisual() {
	let container = document.getElementById("container");
	let groups = container.children;
	groups = Array.prototype.slice.call( groups );
	// for each box assign visual and audio html element
	groups.forEach(function(group,i) {
		// group -> group div element
		// i is the index
		// a2v[i] has the data
		let visualBox = group.querySelector(".visualBoxs");
		visualBox.style.opacity = 1;
		let path = "visuals/" + a2v[i].visual;
		// visual part
		if (path.slice(-1) == "v" || path.slice(-1) == "4") {
			console.log('video');
			let video = document.createElement('video');
			video.controls = false;
			video.loop = true;
			video.style.width = "70%";
			video.style.height = "200px"
			let src = document.createElement('source');
			src.src = path;
			video.appendChild(src);
			visualBox.appendChild(video);
		}else {
			console.log('image');
			let img = document.createElement('img');
			img.src = path;
			img.style.width = "70%";
			visualBox.appendChild(img);
		}
		let button = group.querySelector('.changeButton');
		hide(button);
		// audio part
		let audioPath = "Sounds/" + a2v[i].song;
		let audioBox = document.createElement('audio');
		audioBox.className = 'songs';
		audioBox.loop = true;
		let audioSrc = document.createElement('source');
		audioSrc.src = audioPath;
		audioBox.appendChild(audioSrc);
		group.appendChild(audioBox);
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

assignAudioVisual();





function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function next() {
	state += 1;
	let container = document.getElementById("container");
	let groups = container.children;
	let question = document.getElementById("question");
	groups = Array.prototype.slice.call( groups );
	if (state == 0) {
		container.style.opacity = 1;
		let title = document.getElementById('title');
		title.style.top = "2%";
	}
	else if (state == 1) {
		question.innerHTML = "Click to show visuals";
		groups.forEach(function(group,i) {
			let hideButton = group.querySelector('.changeButton');
			hideButton.style.visibility = 'visible';
			hide(hideButton);
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.style.opacity = 0;
			let audio = group.querySelector('audio');
			audio.currentTime = 0;
			let video = group.querySelector('video');
			if (video) video.currentTime = 0;
		})
	}
	else if (state == 2) {
		
		question.innerHTML = "Which audiovisual situation do you like the best? (1= Favorite, 4= Least Favorite)";
		// document.body.appendChild(question);
		groups.forEach(function(group){
			let form = group.querySelector('.ranking');
			form.style.visibility = 'visible';
		})
	}
	else if (state == 3) {
		groups.forEach(function(group,i){
			let form  = group.querySelector('.ranking');
			let select = form.querySelector('select');
			switch(select.value) {
				case "1":
					a2v[i].first += 1
					break;
				case "2":
					a2v[i].second += 1
					break;
				case "3":
					a2v[i].third += 1
					break;
				case "4":
					a2v[i].fourth += 1
					break;
			}
			let hist = group.querySelector('.hist');
			let total = a2v[i].first + a2v[i].second + a2v[i].third + a2v[i].fourth;
			let first_percentage = ((a2v[i].first / total)*100).toFixed(1);
			let second_percentage = ((a2v[i].second / total)*100).toFixed(1);
			let third_percentage = ((a2v[i].third / total)*100).toFixed(1);
			let fourth_percentage = ((a2v[i].fourth / total)*100).toFixed(1);
			let b1 = hist.querySelector('.b1');
			b1.style.height = `${first_percentage}%`;
			let b2 = hist.querySelector('.b2');
			b2.style.height = `${second_percentage}%`;
			let b3 = hist.querySelector('.b3');
			b3.style.height = `${third_percentage}%`;
			let b4 = hist.querySelector('.b4');
			b4.style.height = `${fourth_percentage}%`;

			let p1 = hist.querySelector('.p1');
			p1.style.bottom = `${first_percentage}%`;
			p1.innerHTML = `${first_percentage}%`;
			let p2 = hist.querySelector('.p2');
			p2.style.bottom = `${second_percentage}%`;
			p2.innerHTML = `${second_percentage}%`;
			let p3 = hist.querySelector('.p3');
			p3.style.bottom = `${third_percentage}%`;
			p3.innerHTML = `${third_percentage}%`;
			let p4 = hist.querySelector('.p4');
			p4.style.bottom = `${fourth_percentage}%`;
			p4.innerHTML = `${fourth_percentage}%`;
		});
		
		// send the data to local storage
		localStorage.setItem("user_ranks", JSON.stringify(a2v));
		console.log(a2v);
	}
	else {
		return
	}
	

}


function playPause(b) {
	// console.log(b);
	let visualBox = b.parentNode.querySelector(".visualBoxs");
	let video = visualBox.querySelector('video');
	console.log(video);
	let audioBox = b.parentNode.querySelector(".songs");
  if (audioBox.paused) {
  	b.innerHTML = "pause";
  	audioBox.play();
  	if (video) {
  		if (video.paused) video.play();
  	}
  }else {
  	b.innerHTML = "play";
  	audioBox.pause();
  	if (video) {
  		if (!video.paused) video.pause();
  	}
  }
}


function hide(b) {
	let visualBox = b.parentNode.querySelector(".visualBoxs");
	// console.log(visualBox.style);
	if (visualBox.style.opacity == 1) {
		// b.innerHTML = "hide";
		visualBox.style.opacity = 0;
	} else {
		
		// b.innerHTML = "show visual";
		visualBox.style.opacity = 1;
	}
}