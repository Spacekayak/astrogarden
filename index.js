var covered = [];
var mapWidth = 458,
	mapHeight = 458;

var radius = 18;
var moving = true;

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
	var camera = document.getElementById("camera");
	var button = document.getElementById("playbutton");
	var loader = document.getElementById("loader");
	var gamecont = document.getElementsByClassName("gamecont")[0];
	var overlay = document.getElementById("overlay");
	var spotlight = document.getElementById("spotlight");

	gamecont.addEventListener("onmouseover", function () {
		alert("oh");
		changeViewer(false);
	});

	viewer = document.getElementById("nftviewer");

	viewer.addEventListener("mouseover", function () {
		spotlight.classList.remove("spotlightClose");
		spotlight.classList.add("spotlight");
		overlay.classList.remove("overlayClose");
		overlay.classList.add("overlayOpen");
	});
	viewer.addEventListener("mouseout", function () {
		spotlight.classList.add("spotlightClose");
		spotlight.classList.remove("spotlight");
		overlay.classList.remove("overlayOpen");
		overlay.classList.add("overlayClose");
	});

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
	avatars = document.querySelectorAll(".tooltip");

	avatars.forEach((avatar, i) => {
		avatar.addEventListener("mouseover", function () {
			changeViewer(
				true,
				pfpData[i].url,
				pfpData[i].premium,
				pfpData[i].type,
				avatar.style.left,
				avatar.style.top
			);
		});
		avatar.addEventListener("mouseout", function () {
			changeViewer(false);
		});
	});

	viewer = document.getElementById("nftviewer");
	viewer.addEventListener("mouseover", function () {
		viewer.classList.remove("nftviewerclose");
	});
	viewer.addEventListener("mouseout", function () {
		viewer.classList.add("nftviewerclose");
	});

	// console.log(pxls);
	ctrx = 0;
	ctry = 0;
	reset = false;

	for (var i = 0; i < pxls.length; ++i) {
		reset = areaFilled(ctrx, ctry);

		if (i == "length") break;
		if (!reset) {
			pxls[i].style.left = ctrx + "px";
			pxls[i].style.top = ctry + "px";
			// console.log(
			// 	i +
			// 		":" +
			// 		pxls[i].style.left +
			// 		":" +
			// 		pxls[i].style.top +
			// 		":" +
			// 		pfpData[i].url
			// );

			fillArea(ctrx, ctry);
		} else {
			if (ctrx != mapWidth && ctrx + radius <= mapWidth) {
				// console.log("im here");
				ctrx++;
			} else {
				// console.log("im here");
				if (ctry != mapHeight && ctry + radius <= mapHeight) {
					ctry++;
					ctrx = 0;
				}
			}
			// console.log(
			// 	i +
			// 		":" +
			// 		pxls[i].style.left +
			// 		":" +
			// 		pxls[i].style.top +
			// 		":" +
			// 		pfpData[i].url +
			// 		ctrx +
			// 		":" +
			// 		ctry
			// );
		}

		if (reset) {
			i--;
		}
		// console.log(ctrx + ":" + ctry);

		// console.log(i);
		// console.log(pxls[i].innerHTML);
		// console.log(pxls[i].offsetLeft + ":" + pxls[i].offsetTop);
		// console.log(ctrx + ":" + ctry);
	}

	camera.style.display = "block";
	button.style.display = "flex";
	loader.style.display = "none";
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

function toggleMotion() {
	moving = !moving;
	map = document.getElementById("map");
	button = document.getElementById("playbutton");
	camera = document.getElementById("camera");
	if (moving) {
		map.classList.add("pause");
		camera.classList.remove("unscrollable");
		button.innerHTML =
			"Resume <span id='buttonsecondtext'> &nbsp;Animation</span> ";
		map.style.top = "0px";
		map.style.left = "0px";
	} else {
		map.classList.remove("pause");
		camera.classList.add("unscrollable");
		button.innerHTML =
			"Pause <span id='buttonsecondtext'> &nbsp;Animation</span> ";
	}
}

async function changeViewer(show, name, premium, type, x, y) {
	if (show) {
		// console.log("name:" + name);
		viewer = document.getElementById("nftviewer");
		spotlight.classList.remove("spotlightClose");
		spotlight = document.getElementById("spotlight");
		overlay = document.getElementById("overlay");
		spotlight.style.left = x;
		spotlight.style.top = y;
		spotlight.classList.add("spotlight");
		overlay.classList.remove("overlayClose");
		overlay.classList.add("overlayOpen");
		viewer.classList.remove("nftviewerclose");
		viewer.style.display = "flex";
		img = document.getElementById("pxfg");
		bgimg = document.getElementById("pxbg");
		assetName = document.getElementById("assetName");

		img.src = "./images/pfp_assets/" + name + ".png";
		if (premium) {
			bgimg.src = "./images/pxbackgrounds/" + type + ".png";
		} else {
			bgimg.src = "./images/pxbackgrounds/ethindia.png";
		}
		assetName.innerText = name;
		// viewer.style.display = "flex";
	} else {
		viewer.classList.add("nftviewerclose");
		spotlight.classList.add("spotlightClose");
		spotlight.classList.remove("spotlight");
		overlay.classList.remove("overlayOpen");
		overlay.classList.add("overlayClose");

		// viewer.classList.remove("nftviewerclose");
	}
}

// document.onload = loadAssets();

function screenshot() {
	html2canvas(document.getElementsByClassName("nftimg")[0]).then(function (
		canvas
	) {
		document.getElementsByClassName("gamecont")[0].appendChild(canvas);
	});
}

function downloadScreenshot() {
	var download = document.getElementById("download");

	html2canvas(document.getElementsByClassName("gamecont")[0]).then(function (
		canvas
	) {
		document.getElementsByClassName("gamecont")[0].appendChild(canvas);
		// canvas.display.transform = "scale(3)";
		var image = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		download.setAttribute("href", image);
		document.getElementsByClassName("gamecont")[0].removeChild(canvas);
	});
}

function download2() {
	var options = {
		// width: mapWidth,
		// height: mapHeight,
	};

	assetName = document.getElementById("assetName").innerText;

	domtoimage
		.toBlob(document.getElementById("map"), options)
		.then(function (blob) {
			saveAs(blob, assetName + "| Astrogarden by Spacekayak.png");
		});
}

var getPostTitle =
		"gm frens!%0aETHIndia might be over, but Astrogarden is forever!%0aSpot me at Astrogarden by @spacekayak: astrogarden.netlify.app/%0a%0a(add in the image that was just downloaded and delete this line and you're good to share!)",
	linkElement = document.getElementById("download");

$(linkElement).click(function (event) {
	event.preventDefault();

	if (!window.location.origin) {
		tweetedLink =
			window.location.protocol +
			"//" +
			window.location.hostname +
			window.location.pathname;
	} else {
		tweetedLink = window.location.origin + window.location.pathname;
	}

	window.open(
		"http://twitter.com/intent/tweet?&text=" + getPostTitle,
		"twitterwindow",
		"height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
	);
});
