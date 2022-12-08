var covered = [];
var mapWidth = 458,
	mapHeight = 458;

var radius = 18;

function initCovered() {
	for (var i = 0; i < mapWidth; ++i) {
		covered[i] = [];
		for (var j = 0; j < mapHeight; ++j) {
			covered[i][j] = false;
		}
	}
}

function loadAssets() {
	var map = document.getElementById("map");
	initCovered();
	// console.log(covered);
	map.style.width = mapWidth + "px";
	map.style.height = mapHeight + "px";

	for (var i in assetData) {
		for (var j in assetData[i][1]) {
			// console.log(assetData[i][1][0] + ":" + assetData[i][1][j] + "+-n");

			var img = document.createElement("img");
			img.classList.add("asset");
			img.src = "./images/map_assets/" + i + ".png";
			img.style.position = "absolute";
			img.style.left = assetData[i][1][j][0] + "px";
			img.style.top = assetData[i][1][j][1] + "px";
			img.style.width = assetData[i][0][0] + "px";
			img.style.height = assetData[i][0][1] + "px";

			for (
				var x = assetData[i][1][j][0] - radius;
				x < assetData[i][1][j][0] + assetData[i][0][0] + radius;
				++x
			) {
				for (
					var y = assetData[i][1][j][1] - radius;
					y < assetData[i][1][j][1] + assetData[i][0][1] + radius;
					++y
				) {
					// console.log(x + ":" + y);
					if (x >= 0 && x <= mapWidth && y >= 0 && y <= mapHeight)
						covered[x][y] = true;
				}
			}

			// console.log(covered.toString());

			map.appendChild(img);
		}
	}

	for (var i in pfpData) {
		var body = document.createElement("div");
		var per = document.createElement("img");
		var pot = document.createElement("img");
		var flower = document.createElement("img");
		var shadow = document.createElement("img");
		var tooltip = document.createElement("span");
		var color;

		// body.classList.add("pfpasset");
		per.classList.add("pxperson");
		pot.classList.add("pxpot");
		tooltip.classList.add("tooltiptext");
		tooltip.innerText = pfpData[i].url;
		per.src = "./images/pfp_assets/" + pfpData[i].url + ".png";
		per.style.height = "32px";
		per.style.width = "32px";

		body.style.zIndex = i;

		switch (i % 5) {
			case 0:
				color = "Blue";
				break;
			case 1:
				color = "Green";
				break;
			case 2:
				color = "Pink";
				break;
			case 3:
				color = "Teal";
				break;
			case 4:
				color = "Yellow";
				break;
		}

		flower.src =
			"./images/map_assets/Planter/Flower/" +
			(pfpData[i].premium ? "premium" : "regular") +
			"/Flower_" +
			color +
			".png";

		flower.style.height = !pfpData[i].premium ? "10px" : "16px";
		flower.style.width = !pfpData[i].premium ? "8px" : "13px";
		flower.classList.add("flower");
		if (pfpData[i].premium) flower.classList.add("flwprem");

		body.style.position = "absolute";
		per.style.position = "absolute";
		pot.style.position = "absolute";
		pot.style.left = "50%";

		// body.style.left = pfpData[i].position[0] + "px";
		// body.style.top = pfpData[i].position[1] + "px";
		body.classList.add("tooltip");

		pot.src = "./images/map_assets/Planter/Pot.png";
		pot.style.height = "17px";
		pot.style.width = "17px";

		shadow.src = "./images/map_assets/Planter/Shadow.png";
		shadow.style.height = "17px";
		shadow.style.width = "17px";
		shadow.classList.add("shadow");

		body.appendChild(per);
		body.appendChild(pot);
		body.appendChild(flower);
		body.appendChild(shadow);
		body.appendChild(tooltip);
		map.appendChild(body);

		// console.log(body.offsetLeft + ":" + body.offsetTop);

		// console.log(pfpData[i].);
	}

	pxls = document.getElementsByClassName("tooltip");
	// console.log(pxls);
	ctrx = 0;
	ctry = 0;
	reset = false;

	for (var i = 0; i < pxls.length; ++i) {
		// console.log(covered[ctrx][ctry]);
		if (reset) {
			i--;
		}
		console.log(i);
		reset = areaFilled(ctrx, ctry);

		if (i == "length") break;
		if (!reset) {
			pxls[i].style.left = ctrx + "px";
			pxls[i].style.top = ctry + "px";
			fillArea(ctrx, ctry);
		} else {
			if (ctrx != mapWidth && ctrx + radius <= mapWidth) {
				ctrx++;
			} else {
				console.log("im here");
				if (ctry != mapHeight && ctry + radius <= mapHeight) {
					ctry++;
					ctrx = 0;
				}
			}
		}
		console.log(ctrx + ":" + ctry);

		// console.log(i);
		// console.log(pxls[i].innerHTML);
		// console.log(pxls[i].offsetLeft + ":" + pxls[i].offsetTop);
		// console.log(ctrx + ":" + ctry);
	}
}

function areaFilled(x, y) {
	for (xrad = x - radius; xrad < x + radius; ++xrad) {
		for (yrad = y - radius; yrad < y + radius; ++yrad) {
			if (xrad >= 0 && xrad <= mapWidth && yrad >= 0 && yrad <= mapHeight)
				if (covered[xrad][yrad]) return true;
		}
	}
	return false;
}

function fillArea(x, y) {
	for (xrad = x - radius; xrad < x + radius; ++xrad) {
		for (yrad = y - radius; yrad < y + radius; ++yrad) {
			if (xrad >= 0 && xrad <= mapWidth && yrad >= 0 && yrad <= mapHeight)
				covered[xrad][yrad] = true;
		}
	}
}

// document.onload = loadAssets();
