let speechRecognition;
try {
	speechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
} catch (error) {
	navigator.mediaDevices.getUserMedia({ audio: true });
} finally {
	const recog = new speechRecognition();
	recog.languages = "hi_IN";
	recog.continuous = true;
	recog.interimResults = true;

	const textarea = document.getElementById("output");

	recog.addEventListener("result", (event) => {
		clearTimeout(timer);
		const transcript = event.results[0][0].transcript;
		textarea.value = transcript;
		currextoutput = transcript;
		timer = setTimeout(() => {
			if (currextoutput == textarea.value) {
				stop();
				currextoutput = textarea.value;
			}
		}, 3000);
	});

	function start() {
		recog.start();
		output.placeholder = "Listening...";
		stopbtn.style.display = "block";
		startbtn.style.display = "none";
	}

	function stop() {
		recog.stop();
		startbtn.style.display = "block";
		stopbtn.style.display = "none";
		output.placeholder = "Type or click the mic and start speeking";
	}

	let timer;
	let currextoutput = "";
	recog.onstart = () => {
		timer = setTimeout(() => {
			if (currextoutput == textarea.value) {
				stop();
				console.log("Stopped after 3 seconds of inactivity.");
			}
		}, 3000);
	};

	recog.onend = () => {
		clearTimeout(timer);
	};
}
