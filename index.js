var assetData = {
	tree: [
		[41, 65],
		[
			[400, 500],
			[83, 35],
			[830, 135],
		],
	],

	bench_dark: [
		[46, 64],
		[
			[18, 426],
			[120, 230],
		],
	],

	flower_bush_white: [
		[28, 28],
		[
			[600, 500],
			[183, 35],
			[130, 135],
		],
	],

	flower_bush_yellow: [
		[28, 28],
		[
			[500, 600],
			[138, 53],
			[103, 153],
		],
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
		for (var j in assetData[i][1]) {
			// console.log(assetData[i][1][0] + ":" + assetData[i][1][j] + "+-n");

			var img = document.createElement("img");
			img.classList.add("asset");
			img.src = "./images/map_assets/" + i + ".png";
			img.style.position = "absolute";
			img.style.top = assetData[i][1][j][0] + "px";
			img.style.left = assetData[i][1][j][1] + "px";
			img.style.width = assetData[i][0][0] + "px";
			img.style.height = assetData[i][0][1] + "px";
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
		pot.style.height = "17px";
		pot.style.width = "17px";

		body.appendChild(per);
		body.appendChild(pot);
		map.appendChild(body);

		// console.log(pfpData[i].);
	}
}

// document.onload = loadAssets();
