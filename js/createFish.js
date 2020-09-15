
/**
 * function bigFish(ctx, x, y)  : 大鱼对象
 * function createBigFish()     : 创建大鱼
 * function babyFish(ctx, x, y) : 小鱼对象
 * function createBabyFish()    : 创建小鱼
 */

function bigFish(ctx, x, y) {
	this.ctx = ctx;					// 画笔
	this.x = x;						// 坐标X
	this.y = y;						// 坐标Y
	this.speedX = 0;				// X方向移动速度
	this.speedY = 0;				// Y方向移动速度
	this.angle = 0;					// 旋转角度
	this.num = 0;					// 拖尾图片序号计数
	this.scale = 80;				// 速度移动比例
	this.eye = bigEyeImage[0];		// 眼睛图片
	this.swim = bigSwimImage[0];	// 肚子图片
	this.tail = bigTailImage[0];	// 拖尾图片
	this.draw();
}

bigFish.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle);
	ctx.drawImage(this.swim, -25, -25, 50, 50);
	ctx.drawImage(this.eye, -6, -6, 12, 12);
	ctx.drawImage(this.tail, 13, -20, 30, 40);
	ctx.restore();
}

bigFish.prototype.update = function(x, y, swim) {
	/* 随机数判断是否进行眼睛图片改变 - 眨眼 */
	this.eye = Math.round(Math.random() * 5) == 0 ? babyEyeImage[Math.round(Math.random() - 0.2)] : this.eye;
	/* 随机数判断是否进行拖尾图片改变 - 摆尾 */
	if(Math.round(Math.random() * 2) == 0) {
		this.num ++; 
		this.num = this.num >= 8 ? 0 : this.num;
		this.tail = babyTailImage[this.num];
	}
	
	x = (x || this.x) - this.x;
	y = (y || this.y) - this.y;
	
	this.speedX = x / this.scale;
	this.speedY = y / this.scale;
	
	this.x += this.speedX;
	this.y += this.speedY;
	this.angle = Math.atan2(y, x) + Math.PI;
	this.swim = swim || this.swim;
	this.draw();
}

function createBigFish() {
	bigfish = new bigFish(ctx2, 380,280);
}


function babyFish(ctx, x, y) {
	this.ctx = ctx;					// 画笔
	this.x = x;						// 坐标X
	this.y = y;						// 坐标Y
	this.speedX = 0;				// X方向移动速度
	this.speedY = 0;				// Y方向移动速度
	this.angle = 0;					// 旋转角度
	this.num = 0;					// 拖尾图片序号计数
	this.scale = 100;				// 速度移动比例
	this.eye = babyEyeImage[0];		// 眼睛图片
	this.fade = babyFadeImage[10];	// 肚子图片
	this.tail = babyTailImage[0];	// 拖尾图片
	this.draw();
}

babyFish.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle);
	ctx.drawImage(this.fade, -20, -20, 40, 40);
	ctx.drawImage(this.eye, -4, -4, 8, 8);
	ctx.drawImage(this.tail, 10, -15, 20, 30);
	ctx.restore();
}

babyFish.prototype.update = function(x, y, fade) {
	/* 随机数判断是否进行眼睛图片改变 - 眨眼 */
	this.eye = Math.round(Math.random() * 5) == 0 ? babyEyeImage[Math.round(Math.random() - 0.2)] : this.eye;
	/* 随机数判断是否进行拖尾图片改变 - 摆尾 */
	if(Math.round(Math.random() * 2) == 0) {
		this.num ++; 
		this.num = this.num >= 8 ? 0 : this.num;
		this.tail = babyTailImage[this.num];
	}
	
	x = (x || bigfish.x) - this.x;
	y = (y || bigfish.y) - this.y;

	this.speedX = x / 100;
	this.speedY = y / 100;
	this.x += this.speedX;
	this.y += this.speedY;
	this.angle = Math.atan2(y, x) + Math.PI;
	this.fade = fade || this.fade;
	this.draw();
}

function createBabyFish() {
	babyfish = new babyFish(ctx2, 450, 280);
}