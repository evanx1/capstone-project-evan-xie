function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



function voteSong() {
    let parent = this.parentNode.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, this.parentNode);
    a2v[index].vote1 += 1;
    next();
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

function yieldChar(wholeString,i) {
    if (i > wholeString.length) return 0
    else return wholeString.slice(0, i)
}


function typingAnimation(wholeString, htmlDOM, speed) {
    let incre = 0;
    let typing = setInterval(() => {
        let r = yieldChar(wholeString, incre);
        if (r !== 0) {
            htmlDOM.innerHTML = r;
        }
        else {
            clearInterval(typing);
        }
        incre += 1;
    }, speed);
}
