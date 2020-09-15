/**
 * function fruit(ctx, x, y) : 果实对象
 * function createFruit()    : 生成果实
 */

function fruit(ctx, x, y) {
	this.ctx = ctx;										// 画笔
	this.x = x;											// 坐标X
	this.y = y;											// 坐标Y
	this.speed = parseInt(Math.random() * 3 + 7) / 10;	// 随机上浮速度
	this.size = Math.round(Math.random() * 10);			// 果实大小
	this.score = 0;										// 果实分数
	this.type;											// 果实类型
	this.img = randomImage();							// 果实图片
	this.draw();
}

fruit.prototype.draw = function() {
	ctx.save();
	if(this.img == fruitImage) {
		this.score = 100;
		this.type = "fruit";
	} else if(this.img == blueImage) {
		this.score = 200;
		this.type = "blue";
	}
	ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
	ctx.restore();
}

fruit.prototype.update = function() {
	this.size <= 16 ? this.size += 0.2 : 16;
	this.size >= 16 ? this.y -= this.speed : this.y;
	this.y + this.size <= 0 && this.remove();
	this.draw();
}

fruit.prototype.remove = function() {
	fruitArr.remove(this);
}

function createFruit(ctx2) {
	fruitArr.push(new fruit(ctx2, Math.random() * 600, 400 + Math.random() * 50))
}

function randomImage() {
	return Math.round(Math.random() + 0.2) ? fruitImage : blueImage;
}

Array.prototype.remove = function(obj) {
	this.indexOf(obj) > -1 ? this.splice(this.indexOf(obj), 1) : false;
}
Array.prototype.clear = function() {
	for(let obj of this) {
		this.remove(obj);
	}
}