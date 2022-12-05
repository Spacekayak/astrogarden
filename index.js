var assetData = {
	tree1: [
		[400, 500],
		[83, 35],
		[830, 135],
	],

	bench_dark: [
		[18, 426],
		[120, 230],
	],

	flower_bush_white: [
		[600, 500],
		[183, 35],
		[130, 135],
	],

	flower_bush_yellow: [
		[500, 600],
		[138, 53],
		[103, 153],
	],
};

var pfpData = [
	{ url: "Anish MohammedAstroPixel_", position: [10, 20] },
	{ url: "Anish MohammedAstroPixel_", position: [100, 40] },
	{ url: "Anish MohammedAstroPixel_", position: [500, 40] },
];

function loadAssets() {
	var map = document.getElementById("map");
	console.log(map);

	for (var i in assetData) {
		for (var j in assetData[i]) {
			// console.log(assetData[i][j][0] + ":" + assetData[i][j][1]);

			var img = document.createElement("img");
			img.classList.add("asset");
			img.src = "./images/map_assets/" + i + ".png";
			img.style.position = "absolute";
			img.style.top = assetData[i][j][0] + "px";
			img.style.left = assetData[i][j][1] + "px";
			map.appendChild(img);
		}
	}

	for (var i in pfpData) {
		var body = document.createElement("div");
		var per = document.createElement("img");
		var pot = document.createElement("img");

		// body.classList.add("pfpasset");
		per.classList.add("pxperson");
		pot.classList.add("pxpot");
		per.src = "./images/pfp_assets/" + pfpData[i].url + ".png";
		per.style.height = "32px";
		per.style.width = "32px";

		body.style.position = "absolute";
		per.style.position = "absolute";
		pot.style.position = "absolute";
		pot.style.left = "50%";

		body.style.top = pfpData[i].position[0] + "px";
		body.style.left = pfpData[i].position[1] + "px";

		pot.src = "./images/map_assets/Pot.png";

		body.appendChild(per);
		body.appendChild(pot);
		map.appendChild(body);

		// console.log(pfpData[i].);
	}
}

// document.onload = loadAssets();
