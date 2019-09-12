let data = [];
let minTemp = 0;
let maxTemp = 0;
let minYear = 0;
let maxYear = 0;

let currentIndex = 0;
let ready = false;

async function setup () {
	createCanvas(4 * 800, 600);

	data = await loadData('temperatur.csv');

	console.log(data);

	minTemp = minprop(data,'mean_temp');
	maxTemp = maxprop(data,'mean_temp');

	minYear = minprop(data,'year');
	maxYear = maxprop(data,'year');

	console.log('temperatures: ', minTemp, maxTemp);
	console.log('years: ', minYear, maxYear);

	frameRate(30);

	ready = true;
}

function draw () {

	//red backround if not ready
	if (!ready) {
		background(255, 0, 0);
		return;
	}
	background(255);

	for (var i = 0; i < data.length; i++) {
		let d = data[i];

		let x = map(d.year,minYear,maxYear,0,width);
		let darkness = map(d.mean_temp,minTemp,maxTemp,255,0);
		noStroke();
		fill(darkness);
		rect(x,0,20,height);

	}
}

function ease (n, target) {
	var easing = 0.05;
	var d = target - n;
	return n + d * easing;
}

