let data = [];
let minTemp = 0;
let maxTemp = 0;

let currentIndex = 0;
async function setup () {
	createCanvas(4 * 1920, 1080);

	await d3.csv('temperatur_ch.csv', function (d) {
		return {
			time: +d.time,
			temp: +d.jan
		};
	}).then(function (csv) {
		data = csv;
		console.log(data);

		minTemp = d3.min(data, function (d) {
			return d.temp;
		});
		maxTemp = d3.max(data, function (d) {
			return d.temp;
		});

		// minTemp = -15;
		// maxTemp = 5;
		console.log(minTemp, maxTemp);
	});




	frameRate(10);
}

function draw () {

	background(255);

	currentIndex = constrain(currentIndex+1,0,data.length);
	console.log(currentIndex);


	let w = width / data.length;
	let x = 0;
	colorMode(RGB);
	let from = color('#FFC200');
	let middle = color(255, 255, 0);
	let to = color("#FF4B00");

	for (let i = 0; i < currentIndex; i++) {
		const d = data[i];
		x = i * w;
		let amt = map(d.temp, minTemp, maxTemp, 0, 1);
		//let col = 0;
		// if (amt < 0.5) {
		// 	col = lerpColor(from, middle, map(amt, 0, 0.5, 0, 1));
		// }
		// else {
		// 	col = lerpColor(middle, to, map(amt, 0.5, 1, 0, 1));
		// }
		console.log(d.temp, maxTemp, amt);
		colorMode(RGB);
		let col = lerpColor(from, to, amt);
		fill(col);
		noStroke();
		rect(x, 0, w, height);
	}

}