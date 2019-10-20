/// <reference path="./libraries/p5.global-mode.d.ts" />

var data = [];
async function setup () {
	createCanvas(800, 600);

	data = await loadData('temperatur.csv');
	console.log(data);

	frameRate(30);

}

function draw () {

	background(200);


}



