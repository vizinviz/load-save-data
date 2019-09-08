let data = [];
let minTemp = 0;
let maxTemp = 0;

let colors = ['rgb(165,0,38)','rgb(215,48,39)','rgb(244,109,67)','rgb(253,174,97)','rgb(254,224,144)','rgb(255,255,191)','rgb(224,243,248)','rgb(171,217,233)','rgb(116,173,209)','rgb(69,117,180)','rgb(49,54,149)'];

let currentIndex = 0;
async function setup () {
	createCanvas(4 * 1920, 1080);


	data = await loadData('temperatur_ch_long.csv');

	console.log(data);

	minTemp = d3.min(data, function (d) {
		return d.temperature;
	});
	maxTemp = d3.max(data, function (d) {
		return d.temperature;
	});

	console.log('temps: ' , minTemp,maxTemp);

	frameRate(30);
}

function draw () {

	background(200);

	currentIndex = constrain(currentIndex + 1, 0, data.length);
	//console.log(currentIndex);


	let w = width / data.length;
	let x = 0;
	colorMode(RGB);
	let from = color('#FFC200');
	let middle = color(255, 255, 0);
	let to = color("#FF4B00");

	for (let i = 0; i < currentIndex; i++) {
		const d = data[i];
		x = i * w;
		//let amt = map(d.temperature, minTemp, maxTemp, 0, 1);
		//colorMode(RGB);
		//let col = lerpColor(from, to, amt);
		//map value to color index
		var colorIndex = floor(map(d.temperature, -20, 20,0,11));
		var col = colors[colorIndex];
		fill(col);
		noStroke();
		rect(x, 0, w, height);
	}

}

