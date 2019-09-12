let data = [];
let minTemp = 0;
let maxTemp = 0;
let minYear = 0;
let maxYear = 0;

let currentIndex = 0;
let ready = false;


async function setup () {
	createCanvas(4 * 800, 600);

	data =  await loadData('temperatur.csv');

	console.log(data);
	
	minTemp = d3.min(data, function (d) {
		return d.mean_temp;
	});
	maxTemp = d3.max(data, function (d) {
		return d.mean_temp;
	});

	minYear = d3.min(data, function (d) {
		return d.year;
	});
	maxYear = d3.max(data, function (d) {
		return d.year;
	});

	console.log('temperatures: ', minTemp, maxTemp);
	console.log('years: ', minYear, maxYear);

	frameRate(30);

	//initalize positions
	for (var i = 0; i < data.length; i++) {
		let d = data[i];
		d.x0 = map(d.year, minYear, maxYear, 0, width);
		d.x1 = map(d.year, minYear, maxYear, 0, width);
	}

	ready = true;
}

function draw () {

	if (!ready) {
		background(255, 0, 0);
		return;
	}
	background(0);

	//change index every ten frames
	if (frameCount % 10 == 0) {
		currentIndex = constrain(currentIndex + 1, 0, data.length - 1);
	}

	for (var i = 0; i < data.length; i++) {
		let d = data[i];

		let xdiff = 0;
		if (i < currentIndex) {
			//then calculate the x1 based on the temparature
			xdiff = map(d.mean_temp, minTemp, maxTemp, -100, 100);
		}

		d.x1 = ease(d.x1, d.x0 + xdiff);
		stroke('white');
		strokeWeight(7);
		line(d.x1, 0, d.x0, height);
	}

	noStroke();
	fill(255);
	rect(0, height - 50, 100, 50);

	textSize(40);
	fill(0);
	text(data[currentIndex].year, 5, height - 10);

}

function ease (n, target) {
	var easing = 0.05;
	var d = target - n;
	return n + d * easing;
}

