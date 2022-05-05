setTimeout(() => {
	let title = document.getElementById('title');
	title.querySelector('h1').style.opacity = 1;
}, 1000);

setTimeout(() => {
	let nextButton = document.getElementById("next");
	nextButton.style.opacity = 1;
}, 2000);

const typing1 = "In this experience, you will listen to music with and without visuals. After, you will be able to match songs and visuals based on your personal liking";
const typing2 = "you will be guided through each scenario to see just how much visuals affect your music consumption choices";
const typing3 = "hover to play songs";

const TYPING_SPEED = 30;



let state = -1;

let table = JSON.parse(localStorage.getItem('table'));

if (!table) {
	table = [];
	for (let i = 0; i < 6; i++) {
		table.push([]);
		for (let j = 0; j < 6; j++) {
			table[i].push(0);
		}
	}
	localStorage.setItem("table", JSON.stringify(table));
}

let songNamesVideo = ["crazy.wav", "crying.wav",  "look twice.wav"];
let songNamesImage = ["lovesong.wav", "here.wav", "tired.wav"];
shuffleArray(songNamesVideo);
shuffleArray(songNamesImage);

// the sentence showing up after visual is chosen
//[visual][audio]
let pairedText = [];
for (let i = 0; i < 6; i++) {
		pairedText.push([]);
		for (let j = 0; j < 6; j++) {
			pairedText[i].push('');
		}
}

// videos & audio
pairedText[0][0] = "our systems indicate that you enjoy partying...invite me next time!";
pairedText[0][1] = "wow, nice choice, it appears you have similar interests to other users";
pairedText[0][4] = "hmm...interesting choice, it seems you are extroverted and enjoy company";
pairedText[1][0] = "interesting! this choice shows that you are a very happy person";
pairedText[1][1] = "strange choice! you definitely enjoy being by yourself";
pairedText[1][4] = "interesting combo, I can tell you have a very unique way of seeing the world";
pairedText[4][0] = "I like this pairing! You play it safe but there's nothing wrong with that";
pairedText[4][1] = "nice choice! It seems you enjoy soft music!";
pairedText[4][4] = "Wow! I am surpised by this choice, our systems can tell you like abstract things";

// images & audio
pairedText[2][2] = "amazing! Our systems show that you listen to similar music daily!";
pairedText[2][3] = "nice choice! We detect that you thoroughly enjoy visual art";
pairedText[2][5] = "Intersting pairing! We can tell that you are a generally positive person";
pairedText[3][2] = "Nice! It appears you have an incredibly unique personality";
pairedText[3][3] = "Our systems detect that you enjoy popular music very much!";
pairedText[3][5] = "We can tell by this pairing that you are a very happy person";
pairedText[5][2] = "We can see that you enjoy music with emotion in it!";
pairedText[5][3] = "great choice! We detect that you enjoy looking at album covers while listening to music";
pairedText[5][5] = "nice! We detect that you enjoy soft melodies more than 80% of other users";

const staticOrder = {
	"look twice.wav": 0,
	"looktwice.mp4": 0,
	"crying.wav": 1,
	"crying.mp4": 1,
	"lovesong.wav": 2,
	"feet.png": 2,
	"here.wav": 3,
	"here.png": 3,
	"crazy.wav": 4,
	"hallway.mp4": 4,
	"tired.wav": 5,
	"tired.png": 5
};

async function loadMedia() {
	let path = Object.keys(staticOrder);
	for (let i = 0; i < path.length; i++) {
		p = path[i];
		let fileType = p.slice(-4);
		if (fileType === ".wave") {
			let fileRef = new Audio(`Sounds/${p}`);
			fileRef.load();
		} else if (fileType === ".mp4") {
			let fileRef = document.createElement("video");
			fileRef.setAttribute("src", `visuals/${p}`); 
			fileRef.load();
		} else if (fileType === ".jpg" || fileType === ".png") {
			const fileRef = new Image();
			fileRef.src = `visuals/${p}`;
			await fileRef.decode();
		}
	}
}

loadMedia();


const songIndex = [
	"look twice.wav",
	"crying.wav",
	"lovesong.wav",
	"here.wav",
	"crazy.wav",
	"tired.wav",
];

let a2v = [
			{visual: "looktwice.mp4", chosen: 0, type: null},
			{visual: "crying.mp4", chosen: 0, type: null},
			{visual: "feet.png", chosen: 0, type: null},
			{visual: "here.png", chosen: 0, type: null},
			{visual: "hallway.mp4", chosen: 0, type: null},
			{visual: "tired.png", chosen: 0, type: null}
		];
let video_calc = 0;
let image_calc = 0;
shuffleArray(a2v);

a2v.forEach((d,i) => {
	if (d.visual.slice(-3) == "mp4") {
		d.type = "video"
		d.song = songNamesVideo[video_calc];
		video_calc += 1;
	}
	else {
		d.type = "image";
		// console.log(songNamesImage[image_calc])
		d.song = songNamesImage[image_calc];
		image_calc += 1;
	};
})

console.log(a2v);


function assignAudio(type) {
    let container = document.getElementById("container");
    let groups = container.children;
    groups = Array.prototype.slice.call( groups );
    groups.forEach(function(group,i) {
        if (a2v[i].type == type) {
            group.style.display = "block";
            let css = '.visualBoxs:hover {filter: drop-shadow(8px 8px 10px black);cursor: pointer;opacity: 1 !important;}';
            let style = document.createElement('style');

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            console.log(i,a2v[i].song);
            let dot = group.querySelector(".dot");
            dot.style.display = "none";
            let audioPath = "Sounds/" + a2v[i].song;
            // console.log(a2v[i]);
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
        }
        else {
            group.style.display = "none";
        }
    })
}

function assignVisual(type) {
    let container = document.getElementById("container");
    let groups = container.children;
    groups = Array.prototype.slice.call( groups );
    // for each box assign visual and audio html element
    groups.forEach(function(group,i) {
        // group -> group div element
        // i is the index
        // a2v[i] has the data
        let dot = group.querySelector(".dot");
        dot.style.display = "block";
        if (a2v[i].type == type) {
            group.style.display = "block";
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
            visualBox.firstChild.addEventListener("mouseout", (e) => {
                playPause(e.path[0].parentNode);
                if (!a2v[i].chosen) {
                    let song = group.querySelector(".songs");
                    let src = song.querySelector("source");
                    let rand = getRandomInt(3);
                    if(type == "video") {
                        while (songNamesVideo[rand] == src.src.match('[^\/]+$')[0]) {
                            rand = getRandomInt(3);
                        }
                        src.src = `Sounds/${songNamesVideo[rand]}`;
                    }
                    else {
                        while (songNamesImage[rand] == src.src.match('[^\/]+$')[0]) {
                            rand = getRandomInt(3);
                        }
                        src.src = `Sounds/${songNamesImage[rand]}`
                    };
                    song.load();
                    console.log(src);
                }
            });
            visualBox.firstChild.addEventListener("click", (e) => {
                visualBox.style.opacity = 1;
                a2v[i].chosen = 1;
                let textBox = group.querySelector(".textBox");
                textBox.className = "textBox";
                let vIndex = staticOrder[a2v[i].visual];
                let aIndex = staticOrder[a2v[i].song];
                typingAnimation(pairedText[vIndex][aIndex], textBox, TYPING_SPEED);
                // textBox.innerHTML = pairedText[vIndex][aIndex];
                // group.appendChild(textBox);
            });
        }
        else {
            group.style.display = "none";
        }
    })
}


function updateTable() {
    a2v.forEach(function(obj,i) {
        let vIndex = staticOrder[obj.visual];
        let aIndex = staticOrder[obj.song];
        console.log(aIndex,obj.song);
        table[vIndex][aIndex] += 1;
        // a2v[i].song = songIndex[indexOfMax(table[vIndex])];
    });

}

function changeToFavSong(type) {
    let container = document.getElementById("container");
    let groups = container.children;
    groups = Array.prototype.slice.call( groups );
    groups.forEach((group,i) => {
        if (a2v[i].type == type) {
            let song = group.querySelector(".songs");
            let src = song.querySelector("source");
            console.log(i, a2v[i].song);
            src.src = `Sounds/${a2v[i].song}`;
            song.load();
        }
        
    });
}

function displayPercentage() {
    let container = document.getElementById("container");
    let groups = container.children;
    groups = Array.prototype.slice.call( groups );
    groups.forEach(function(group,i){
    		let dot = group.querySelector(".dot");
        	dot.style.display = "none";
            let visualBox = group.querySelector(".visualBoxs");
            visualBox.style.transform = "scale(0.4)";
            let hist = group.querySelector(".hist");
            let p = hist.querySelector(".percent");
            let textBox = group.querySelector(".textBox");
            console.log(textBox);
            textBox.innerHTML = "";
            let vIndex = staticOrder[a2v[i].visual];
            let aIndex = staticOrder[a2v[i].song];
            let fav_aIndex = indexOfMax(table[vIndex]);
            // favnum is the one most people chose
            // console.log(a2v[i].song,aIndex,table[vIndex][aIndex]);
            // let yournum = ((table[vIndex][aIndex] / table[vIndex].reduce((partialSum, a) => partialSum + a, 0)) * 100).toFixed(1);
            let favnum = ((table[vIndex][fav_aIndex] / table[vIndex].reduce((partialSum, a) => partialSum + a, 0)) * 100).toFixed(1);
            p.innerHTML = `${favnum}%`;
        })
}


function next(b) {
	state += 1;
	let container = document.getElementById("container");
	let groups = container.children;
	let question = document.getElementById("question");
	let title = document.getElementById('title');
	let undersentence = document.getElementById('undersentence');
	let instructions = document.getElementById("instructions");
	groups = Array.prototype.slice.call( groups );

	if (state == 0) {
		let nextButton = b;
		b.style.right = "8%";
		b.style.top = "5%";
		title.querySelector('h1').innerHTML = "Welcome to visually Sound";
		let incre = 0;
		let questionTyping = setInterval(() => {
			let r = yieldChar(typing1, incre);
			if (r !== 0) {
				question.innerHTML = r;
			}
			else {
				clearInterval(questionTyping);
				typingAnimation(typing2, undersentence, TYPING_SPEED * 0.8);
			}
			incre += 1;
		}, TYPING_SPEED * 0.8);
		// question.innerHTML = "In this experience, you will listen to music with and without visuals. After, you will be able to match songs and visuals based on your personal liking"
		// undersentence.innerHTML = "you will be guided through each scenario to see just how much visuals affect your music consumption choices";
	}

	else if (state == 1) {
		question.innerHTML = "";
		undersentence.innerHTML = "";
		container.style.opacity = 1;
		setTimeout( () => {
			typingAnimation(typing3, question, TYPING_SPEED);
		}, 1000);
		
		// question.innerHTML = "hover to play songs";
		let h1 = title.querySelector('h1');
		h1.innerHTML= "Visually Sound";
		undersentence.innerHTML= "";
		title.style.top = "2%";
		assignAudio("image");
	}

	else if (state == 2) {

		container.style.display = "none";
		instructions.style.display = "block";
		instructions.play();
		typingAnimation("Hover to change the song with the visual", question, TYPING_SPEED);
		// question.innerHTML = "Hover to change the song with the visual";


	}

	else if (state == 3) {
		container.style.display = "flex";
		instructions.style.display = "none";
		assignVisual("image");
		typingAnimation("hover over each circle and click your favorite audiovisual pair", question, TYPING_SPEED);
		// question.innerHTML = "hover over each visual and click your favorite pair";
	}

	else if (state == 4) {
		updateTable();
		displayPercentage();
		typingAnimation("percentage of users who also chose this combo", question, TYPING_SPEED);
		// question.innerHTML = "percentage of users who also chose this combo";
		// assign popular song to visual
		changeToFavSong('image');
		localStorage.setItem("table", JSON.stringify(table));
		// send table to storage
	}

	else if (state == 5) {
		groups.forEach(function(group,i){
			let visualBox = group.querySelector(".visualBoxs");
			visualBox.style.transform = "scale(1)";
			let hist = group.querySelector(".hist");
			let p = hist.querySelector(".percent");
			p.innerHTML = '';
		})
		container.style.opacity = 1;
		typingAnimation(typing3, question, TYPING_SPEED);
		title.style.top = "2%";
		assignAudio("video");
	}

	else if (state == 6) {
		assignVisual("video");
		typingAnimation("hover over each visual and click your favorite pair", question, TYPING_SPEED);
	}

	else if (state == 7) {
		updateTable();
		displayPercentage();
		typingAnimation("percentage of users who also chose this combo", question, TYPING_SPEED);
		// assign popular song to visual
		changeToFavSong('video');
		localStorage.setItem("table", JSON.stringify(table));
		// send table to storage
	}

	else if (state == 8){
		container.style.visibility = 'hidden';
		question.innerHTML = "";

		document.getElementById('next').style.visibility = "hidden";
		title.style.top = "45%";
		let h1 = title.querySelector('h1');
		h1.innerHTML = "";
		h1.style.fontSize = "1.5em";
		setTimeout( ()=> {
			typingAnimation("visuals impact our musical perceptions much more than we think...", question, TYPING_SPEED * 1.5);
			typingAnimation("while we may not always realize it...", h1, TYPING_SPEED * 1.5);
		}, 1000)
		
		
		// h1.innerHTML = "while we may not always realize it...";
	}
}


