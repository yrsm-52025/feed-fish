/**
 * function ane(ctx, rootX, rootY, topX, topY) : 海葵对象
 * function createAne()						   : 生成海葵
 */

function ane(ctx, rootX, rootY, topX, topY) {
	this.ctx = ctx;											// 画笔
	this.rootX = rootX;										// 海葵根部 x坐标
	this.rootY = rootY;										// 海葵根部 y坐标
	this.topX = topX;										// 海葵顶部 x坐标
	this.topY = topY;										// 海葵顶部 y坐标
	this.width = 20;										// 海葵宽度
	this.angle = 0;											// 海葵摇摆角度
	this.speed = 0.02;										// 海葵摆动速度
	this.elastic = 80;										// 海葵弹性程度
	this.extend = Math.random() * 50 + 50;					// 海葵伸长幅度
	this.color = "rgb(128, 0, 128)";						// 海葵颜色
	this.draw();
}

ane.prototype.draw = function() {
	ctx.save();
	ctx.strokeStyle = this.color;
	ctx.lineCap = "round";
	ctx.lineWidth = this.width;
	ctx.beginPath();
	//			起始点x		起始点y
	ctx.moveTo(this.rootX, this.rootY);
	//						控制点x			控制点y				终点x		终点y
	ctx.quadraticCurveTo(this.rootX, this.rootY - this.elastic, this.topX, this.topY);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

ane.prototype.update = function() {
	this.angle += this.speed;
	this.topX = this.rootX + Math.sin(this.angle) * this.extend;
	this.draw();
}

function createAne() {
	for(let i = 0; i < 50; i ++) {
		let rootX = i * 16 + Math.random() * 20;
		let rootY = ch;
		let topX = rootX;
		let topY = ch - 200 + Math.random() * 50;
		aneArr.push(new ane(ctx, rootX, rootY, topX, topY));
	}
}