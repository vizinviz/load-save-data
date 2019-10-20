/// <reference path="./libraries/p5.global-mode.d.ts" />

var data = [];
function preload () {
	data = loadStrings('data.txt');
}

function setup () {
	createCanvas(800, 600);

	//convert all data to numbers
	for(var i=0; i<data.length; i++){
		data[i] = +data[i];
	}
	console.log(data);

	var client = mqtt.connect('mqtt://aeba5ae7:98e21bb6bccdb957@broker.shiftr.io', {
		clientId: 'vizinviz-simple-circle'
	});
	console.log('client', client);

	client.on('connect', function () {
		console.log('client has connected!');
		client.subscribe('/temperature');
	});

	client.on('message', function (topic, message) {
		console.log('new message:', topic, message.toString());
		var temperature = +message.toString();
		data.push(temperature);
		console.log(data);
	});

	noLoop();
	frameRate(30);
}

function draw () {

	background('yellow');


}

function keyTyped(){
	if(key == 's'){
		console.log('saving data to json file');
		saveStrings(data,'data.txt');
	}
}



