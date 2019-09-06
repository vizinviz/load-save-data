async function loadData(file){

	let theData = [];
	await d3.csv(file, function (d) {
		return {
			time: +d.time,
			temp: +d.jan
		};
	}).then(function (csv) {
		theData = csv;
	
	});

	return theData;
}