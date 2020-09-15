var canvas,
	ctx,					// 画布1
	ctx2,					// 画布2
	cw,						// 画布宽度
	ch,						// 画布高度
	mouseX,					// 记录鼠标坐标X
	mouseY,					// 记录鼠标坐标Y
	aneArr = [],			// 海葵存放数组
	dustArr = [],			// 漂浮物存放数组
	fruitArr = [],			// 果实存放数组
	bigfish,				// 大鱼对象
	babyfish,				// 小鱼对象
	bigFishScore = 0,		// 大鱼分数
	babyFishScore = 0,		// 小鱼分数 -> 展示
	bigFishSwimNum = 0,		// 大鱼肚子图片序号
	bigFishSwimType,		// 大鱼肚子图片类型 (蓝色 红色)
	babyFishFadeNum = 10,	// 小鱼肚子图片序号
	babyHungerSpeed = 1,	// 小鱼饥饿速度
	gameCount = 0,			// 游戏次数
	time = 0,				// 游戏时间计时
	displaytime = 180,		// 游戏结束文字展示时间
	eattime = 0,			// 大鱼吃到果实时出现光环展示时间
	fadetime = 0,			// 大鱼喂给小鱼时出现光圈展示时间
	GameOver = true,		// 游戏结束标志
	ReStart = false;		// 重新开始游戏标志

/* 预加载图片 */
async function loadImage() {
	await loadBabyEyeImage();
	await loadBabyFadeImage();
	await loadBabyTailImage();
	await loadBackgoundImage();
	await loadBigEyeImage();
	await loadBigSwimImage();
	await loadBigSwimBlueImage();
	await loadBigTailImage();
	await loadBlueImage();
	await loadDustImage();
	await loadFruitImage();
}

/* 游戏开始 */
async function init() {
	canvas1 = document.querySelector("#canvas1");
	canvas2 = document.querySelector("#canvas2");
	ctx = canvas1.getContext("2d");
	ctx2 = canvas2.getContext("2d");
	cw = canvas1.width;
	ch = canvas1.height;
	await loadImage();
	ctx.drawImage(backgoundImage, 0, 0, cw, ch);
	createAne();				// 生成海葵
	createDust(ctx);			// 生成漂浮物
	
	// 生成果实
	for(let i = 0; i < 15; i ++) {
		createFruit(ctx2);			// 第一次产生15个果实
	}
	setInterval(function() {
		Math.round(Math.random() + 0.5) && createFruit();	// 随机生成果实
	}, 1000);

	await createBigFish();		// 生成大鱼对象
	createBabyFish();			// 等待大鱼对象生成后生成小鱼对象
	interval();					// 启用定时器
}

function interval() {
	setInterval(function() {
		time ++;	/* 游戏时间time每1000 / 60 毫秒进行加1 , 即每秒加60 */
		ctx.clearRect(0, 0, cw, ch);
		ctx2.clearRect(0, 0, cw, ch);
		ctx.drawImage(backgoundImage, 0, 0, 800, 600);
		/* 更新海葵 */
		for(let ane of aneArr) { ane.update(); };
		/* 更新漂浮物 */
		for(let dust of dustArr) { dust.update(); };
		
		/* 更新果实状态 isEat() : 判断当前果实是否被吃掉 */
		for(let fruit of fruitArr) {
			if(!GameOver && isEat(fruit.x, fruit.y, fruit.size, bigfish.x, bigfish.y)) {
				if(fruit.type == "blue") {
					bigFishSwimType = "blue";
				} else {
					bigFishSwimType = "fruit";
				}
				bigFishSwimNum ++;
				bigFishSwimNum = bigFishSwimNum >= 7 ? 7 : bigFishSwimNum;
				bigFishScore += parseInt(fruit.score);
				eattime = 30;
				fruit.remove();
				return ;
			}
			fruit.update();
		}
		
		/* isFade() : 判断大鱼是否喂给小鱼 */
		if(!GameOver && isFade(bigfish.x, bigfish.y, babyfish.x, babyfish.y)) {
			babyFishFadeNum -= bigFishSwimNum * 3;
			if(babyFishFadeNum <= 0) {
				babyFishFadeNum = 0;
			}
			babyFishScore += bigFishScore;
			if(bigFishSwimNum) {
				fadetime = 60;
			}
			bigFishSwimNum = 0;
			bigFishScore = 0;
			
		}
		/* 更新大鱼 */
		if(bigFishSwimType == "blue") {
			bigfish.update(mouseX, mouseY, bigSwimBlueImage[bigFishSwimNum]);
		} else {
			bigfish.update(mouseX, mouseY, bigSwimImage[bigFishSwimNum]);
		}
		/* 更新小鱼 */
		babyfish.update(bigfish.x, bigfish.y, babyFadeImage[babyFishFadeNum]);
		/* 更新分数 */
		showScore();
		/* 判断游戏是否结束 */
		if(!GameOver && time % 90 == 0) {
			babyHungerSpeed =  Math.round(time / 1800) + 1;	// 每30秒小鱼饥饿速度加1
			babyFishFadeNum += babyHungerSpeed;
			if(babyFishFadeNum > 19) {
				babyFishFadeNum = 19;
				GameOver = true;
			}
		}
		/* 大鱼吃到果实时光圈展示 */
		if(eattime >= 0) {
			eat(bigfish.x, bigfish.y, 70 - eattime);
			eattime -= 2;
		}
		/* 大鱼喂给小鱼时光圈展示 */
		if(fadetime >= 0) {
			fade(babyfish.x, babyfish.y, 100 - fadetime);
			fadetime -= 1.5;
		}
		/* 游戏结束文字展示倒计时 */
		if(GameOver) {
			if(!gameCount) {
				/* 开始游戏 */
				Start();
				rules();
				ReStart = true;
			} else {
				gameOver();
				displaytime --;
			}
		}
		/* 重新开始游戏展示 */
		if(displaytime <= 0) {
			ctx2.clearRect(0, 0, cw, ch);
			ReStart = true;
			reStart();
			rules();
		}
		/* 展示游戏其他信息 */
		displayInfo();
	}, 1000 / 60);
}

init();

// 鼠标移动
document.onmousemove = function(event) {
	let rect = canvas2.getBoundingClientRect();
	mouseX = event.pageX - rect.left;
	mouseY = event.pageY - rect.top;

	mouseX = mouseX > cw ? cw : mouseX;
	mouseX = mouseX < 0 ? 0 : mouseX;

	mouseY = mouseY > ch ? ch : mouseY;
	mouseY = mouseY < 0 ? 0 : mouseY;
}

// 点击重新开始
document.onmousedown = function(event) {
	if(!ReStart) {
		return;
	}
	let rect = canvas2.getBoundingClientRect();
	mouseX = event.pageX - rect.left;
	mouseY = event.pageY - rect.top;
	if(mouseX >= 345 && mouseX <= 455 && mouseY >= 285 && mouseY <= 315) {
		bigFishScore = 0,		// 大鱼分数
		babyFishScore = 0,		// 小鱼分数 -> 展示
		bigFishSwimNum = 0,		// 大鱼肚子图片序号
		babyFishFadeNum = 10,	// 小鱼肚子图片序号
		time = 0,				// 游戏时间计时
		displaytime = 180,		// 游戏结束文字展示时间
		eattime = 0,			// 大鱼吃到果实时出现光环展示时间
		fadetime = 0,			// 大鱼喂给小鱼时出现光圈展示时间
		GameOver = false,		// 游戏结束标志
		ReStart = false;		// 重新开始游戏标志
		gameCount ++;			// 游戏次数
		fruitArr = [];
		for(let i = 0; i < 15; i ++) {
			createFruit();
		}
		createBigFish();
		createBabyFish();
		
	}
}

function showScore() {
	ctx2.save();
	ctx2.textAlign = "center";
	ctx2.fillStyle = "red";
	ctx2.font = "30px Georgia";
	ctx2.fillText("Score:" + babyFishScore, cw / 2, 500);
	ctx2.restore();
}

function gameOver() {
	ctx2.save();
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.fillStyle = "red";
	ctx2.font = "30px Georgia";
	ctx2.fillText("GameOver", cw / 2, ch / 2);
	ctx2.restore();
}

function reStart() {
	ctx2.save();
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.fillStyle = "red";
	ctx2.font = "30px Georgia";
	ctx2.fillText("ReStart", cw / 2, ch / 2);
	ctx2.restore();
}

function Start() {
	ctx2.save();
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.fillStyle = "red";
	ctx2.font = "30px Georgia";
	ctx2.fillText("Start", cw / 2, ch / 2);
	ctx2.restore();
}

function isEat(fruitX, fruitY, fruitSize, fishX, fishY) {
	return fruitX >= fishX - 25 && fruitX + fruitSize <= fishX + 25 && fruitY >= fishY - 25 && fruitY + fruitSize <= fishY + 25;
}

function isFade(bigfishX, bigfishY, babyfishX, babyfishY) {
	return babyfishX - 15 >= bigfishX - 25 && babyfishX + 15 <= bigfishX + 25 && babyfishY - 15 >= bigfishY - 25 && babyfishY + 15 <= bigfishY + 25;
}

function fade(x, y, size) {
	ctx.save();
	ctx.lineWidth = 3;
	ctx.globalAlpha = 0.8;
	ctx.strokeStyle = "orangered";
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function eat(x, y, size) {
	ctx.save();
	ctx.lineWidth = 2;
	ctx.globalAlpha = 0.8;
	ctx.strokeStyle = "darkgrey";
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function displayInfo() {
	let displayX = 10;
	let displayY = 20;
	ctx2.save();
	ctx2.globalAlpha = 0.4;
	ctx2.fillStyle = "wheat";
	ctx2.fillRect(displayX - 10, displayY - 20, 150, 220);
	ctx2.textBaseline = "middle";
	ctx2.globalAlpha = 1;
	ctx2.fillStyle = "red";
	ctx2.font = "14px Georgia";
	ctx2.fillText("游戏时间: " + Math.round(time / 60) || 0, displayX, displayY + 0);
	ctx2.fillText("海葵数目: " + Math.round(aneArr.length) || 0, displayX, displayY + 20);
	ctx2.fillText("漂浮物数目: " + Math.round(dustArr.length) || 0, displayX, displayY + 40);
	ctx2.fillText("果实数目: " + Math.round(fruitArr.length) || 0, displayX, displayY + 60);
	ctx2.fillText("大鱼分数: " + Math.round(bigFishScore) || 0, displayX, displayY + 80);
	ctx2.fillText("小鱼分数: " + Math.round(babyFishScore) || 0, displayX, displayY + 100);
	ctx2.fillText("大鱼现有果实数: " + Math.round(bigFishSwimNum) || 0, displayX, displayY + 120);
	ctx2.fillText("小鱼现有果实数: " + Math.round(19 - babyFishFadeNum) || 0, displayX, displayY +140);
	ctx2.fillText("小鱼饥饿速度: " + Math.round(babyHungerSpeed) || 0, displayX, displayY + 160);
	ctx2.fillText("游戏次数: " + Math.round(gameCount) || 0, displayX, displayY + 180);
	ctx2.restore();
}

function rules() {
	let displayX = cw - 290;
	let displayY = 20;
	ctx2.save();
	ctx2.textBaseline = "middle";
	ctx2.globalAlpha = 0.9;
	ctx2.fillStyle = "wheat";
	ctx2.font = "14px Georgia";
	ctx2.fillRect(displayX - 10, displayY - 15, 300, 350);
	ctx2.fillStyle = "red";
	ctx2.fillText("点击Start开始游戏", displayX, displayY + 0);
	ctx2.fillText("游戏开始会生成15个果实, 之后会", displayX, displayY + 20);
	ctx2.fillText("随机生成果实, 红色果实加100分,", displayX, displayY + 40);
	ctx2.fillText("蓝色果实加200分, 大鱼吃到果实之"	, displayX, displayY + 60);
	ctx2.fillText("后不会立即加分, 由大鱼将吃到的果", displayX, displayY + 80);
	ctx2.fillText("实喂给小鱼后进行加分, 小鱼不会主", displayX, displayY + 100);
	ctx2.fillText("动吃果实.", displayX, displayY + 120);
	ctx2.fillText(""		, displayX, displayY + 140);
	ctx2.fillText("游戏开始小鱼会获得9个果实, 大鱼获", displayX, displayY + 160);
	ctx2.fillText("得的每一个果实喂给小鱼时小鱼会增加", displayX, displayY + 180);
	ctx2.fillText("3个果实, 大鱼最多获得7个果实, 小", displayX, displayY + 200);
	ctx2.fillText("鱼最多获得19个果实, 小鱼每秒会减少", displayX, displayY + 220);
	ctx2.fillText("1个果实, 随着时间的增加每30秒会多", displayX, displayY + 240);
	ctx2.fillText("减少一个果实, 当小鱼拥有的果实为0", displayX, displayY + 260);
	ctx2.fillText("时游戏结束!", displayX, displayY + 280);
	ctx2.fillText("" , displayX, displayY + 300);
	ctx2.fillText("游戏结束3秒之后可点击ReStart重新开始游戏。" , displayX, displayY + 320);
	// ctx2.fillText("", 10, 480);
	ctx2.restore();
}