/**
 * function dust(ctx, x, y) : 漂浮物对象
 * function createDust()	: 生成海葵
 */

function dust(ctx, x, y) {
	this.ctx = ctx;										// 画笔
	this.x = x;											// 坐标X
	this.y = y;											// 坐标Y
	this.speed = 0;										// 漂浮速度
	this.step = 0.5;									// 漂浮速度比例
	this.img = dustImage[parseInt(Math.random() * 6)];	// 漂浮物图片
	this.draw();
}

dust.prototype.draw = function() {
	ctx.save();
	ctx.drawImage(this.img, this.x, this.y);
	ctx.restore();
}

dust.prototype.update = function() {
	this.speed += 0.02;
	this.x = this.x + this.step * Math.sin(this.speed);
	this.draw();
}

function createDust(ctx) {
	for(let i = 0; i < 20; i ++) {
		let x = Math.random() * cw;
		let y = Math.random() * ch;
		dustArr.push(new dust(ctx, x, y));
	}
}