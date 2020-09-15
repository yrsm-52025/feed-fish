/**
 * 预加载所有用到的图片并创建对应的数组存放
 */
var babyEyeImage = [];
var babyFadeImage = [];
var babyTailImage = [];
var backgoundImage = new Image();
var bigEyeImage = [];
var bigSwimImage = [];
var bigSwimBlueImage = [];
var bigTailImage = [];
var blueImage = new Image();
var dustImage = [];
var fruitImage = new Image();

function loadBabyEyeImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 2; i ++) {
			let image = new Image();
			image.src = "./img/babyEye"+i+".png";
			image.onload = function() {
				babyEyeImage[i] =  image;
				if(babyEyeImage.length == 2) {
					resolve();
				}
			}
		}
	})
}

function loadBabyFadeImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 20; i ++) {
			let image = new Image();
			image.src = "./img/babyFade"+i+".png";
			image.onload = function() {
				babyFadeImage[i] = image;
				if(babyFadeImage.length == 20) {
					resolve();
				}
			}
		}
	})
}

function loadBabyTailImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 8; i ++) {
			let image = new Image();
			image.src = "./img/babyTail"+i+".png";
			image.onload = function() {
				babyTailImage[i] = image;
				if(babyTailImage.length == 8) {
					resolve();
				}
			}
		}
	})
}

function loadBackgoundImage() {
	return new Promise(function(resolve,reject){
		backgoundImage.src = "./img/background.jpg";
		backgoundImage.onload;
		resolve();
	})
}

function loadBigEyeImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 2; i ++) {
			let image = new Image();
			image.src = "./img/bigEye"+i+".png";
			image.onload = function() {
				bigEyeImage[i] = image;
				if(bigEyeImage.length == 2) {
					resolve();
				}
			}
		}
	})
}

function loadBigSwimImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 8; i ++) {
			let image = new Image();
			image.src = "./img/bigSwim"+i+".png";
			image.onload = function() {
				bigSwimImage[i] = image;
				if(bigSwimImage.length == 8) {
					resolve();
				}
			}
		}
	})
}

function loadBigSwimBlueImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 8; i ++) {
			let image = new Image();
			image.src = "./img/bigSwimBlue"+i+".png";
			image.onload = function() {
				bigSwimBlueImage[i] = image;
				if(bigSwimBlueImage.length == 8) {
					resolve();
				}
			}
		}
	})
}

function loadBigTailImage() {
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 8; i ++) {
			let image = new Image();
			image.src = "./img/bigTail"+i+".png";
			image.onload = function() {
				bigTailImage[i] = image;
				if(bigTailImage.length == 8) {
					resolve();
				}
			}
		}
	})
}

function loadBlueImage() {
	return new Promise(function(resolve,reject){
		blueImage.src = "./img/blue.png";
		blueImage.onload;
		resolve();
	})
}

function loadDustImage(){
	return new Promise(function(resolve,reject){
		for(let i = 0; i < 7; i ++) {
			let image = new Image();
			image.src = "./img/dust"+i+".png";
			image.onload = function() {
				dustImage[i] = image;
				if(dustImage.length == 7) {
					resolve();
				}
			}
		}
	})
}

function loadFruitImage() {
	return new Promise(function(resolve,reject){
		fruitImage.src = "./img/fruit.png";
		fruitImage.onload;
		resolve();
	})
}
