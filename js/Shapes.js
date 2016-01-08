function Shape(){
	this.color = "#000";
	this.name;
}

Shape.prototype.draw = function(){
	throw "not implemented";
};

Shape.prototype.getPoint = function(){
	
	if(this.point != undefined) return this.point;
	// if more then one point, return first one
	else if(this.points != undefined) return this.points[0];
	else throw new "No referrence point for object";
};

Shape.prototype.setPoint = function(x,y){

	this.clear();
	this.getPoint().x = x;
	this.getPoint().y = y;
	this.draw();
};

Shape.prototype.rotate = function(ref_point, angle){
	
	//convert to radians
	//this is the anle to add to currrent angle
	angle = angle*Math.PI/180;
	
	var x = this.getPoint().x - ref_point.x;
	var y = this.getPoint().y - ref_point.y;
	var initial_angle = Math.atan2(x,y);
	
	console.log("current angle in degrees "+(initial_angle*180/Math.PI));
	var r = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	console.log("radius: "+r);
	var f_angle = initial_angle + angle;
	
	console.log("final angle in degrees "+(f_angle*180/Math.PI));
	
	xt = r*Math.sin(f_angle);
	yt = r*Math.cos(f_angle);
	
	this.setPoint(xt + ref_point.x, yt + ref_point.y);
};

Shape.prototype.move = function(difx, dify){
	
	this.setPoint(this.getPoint().x + difx, this.getPoint().y + dify);
};

Shape.prototype.getLeft = function(){
	
	if(this.point != undefined) return this.point.x;
};

Shape.prototype.getRight = function(){
	
	if(this.point != undefined) return this.point.x;
};

Shape.prototype.getTop = function(){
	
	if(this.point != undefined) return this.point.y;
};

Shape.prototype.getWidth = function(){
	
	return this.getRight() - this.getLeft();
};

/**
 * NORMALIZE
 * ---------
 * basic tool in Shape class to normalize a list of shapes
 */ 
 Shape.normalize = function(list){
 	
 	// first find the shape most to the left
 	var minx = 1000000;
 	var miny = 1000000;
 	
 	for(i in list){
 		
 		if(list[i].getLeft() < minx)
 			minx = list[i].getLeft();
 			
 		if(list[i].getTop() < miny)
 			miny = list[i].getTop();
 	}
 	
 	
 	// for each shape check distance from min shape, and move
 	for(i in list){
 		
 		var dify = miny-list[i].getTop();
 		list[i].move(minx-list[i].getLeft(), dify);
 	}
 };



Shape.prototype.putPixel = function(x,y, color, preview, jumbo){
	
	if(color == undefined) color = "#000";
	if(preview == true) color = "#ccc";
	if(jumbo == true) color = "red";
	
	var p = document.createElement('div');
	p.style.width = (jumbo == true) ? "5px" : "1px";
	p.style.height = (jumbo == true) ? "5px" : "1px";
	p.style.left = Math.round(x);
	p.style.top = Math.round(y);
	p.style.position = "fixed";
	p.style.background = color;
	
	if(preview == true){
		
		document.getElementById("prev").appendChild(p);
	}else this.container.appendChild(p);
};

Shape.prototype.clear = function(){
	document.getElementById("canvas").removeChild(this.container);
};

function Circle(point,radius,color){
	this.point = point;
	this.radius = radius;
	this.color = color;
	this.name = "Circle";
}

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.getLeft = function(){
	
	return this.point.x - this.radius;
};

Circle.prototype.getRight = function(){
	
	return this.point.x + this.radius;
};

Circle.prototype.getTop = function(){
	
	return this.point.y - this.radius;
};

Circle.prototype.getBottom = function(){
	
	return this.point.y + this.radius;
};

Circle.prototype.draw = function(preview){
	if (!preview){
		this.container = document.createElement('div');
		window.bla = this;
	}
	var step = 2*Math.PI/this.radius/2;
	var prev_point = undefined;

	for(var theta=0;  theta < 2*Math.PI+1;  theta+=step){
		var x = this.point.x + this.radius*Math.cos(theta);
		var y = this.point.y - this.radius*Math.sin(theta);

		//once you have more then one point, draw aline to get a nice clean circle
		if(prev_point !== undefined){
			this.points = [];
			this.points[0] = prev_point;
			this.points[1] = {x:x, y:y};
			Line.prototype.draw.call(this,preview,false);
		}
		
		// keep last point
		prev_point = {x:x, y:y};
	}
	if (!preview){
		document.getElementById("canvas").appendChild(this.container);
	}
};

function Poligon(point, radius, numEdges, color){
	this.point = point;
	this.radius = radius;
	this.numEdges = numEdges;
	this.color = color;
	this.name = "Poligon";
	this.container = null;
}

Poligon.prototype = Object.create(Shape.prototype);

Poligon.prototype.getLeft = function(){
	
	return this.point.x - this.radius;
};

Poligon.prototype.getRight = function(){
	
	return this.point.x + this.radius;
};

Poligon.prototype.getTop = function(){
	
	return this.point.y - this.radius;
};

Poligon.prototype.getBottom = function(){
	
	return this.point.y + this.radius;
};

Poligon.prototype.draw = function(preview){
	if (!preview){
		this.container = document.createElement('div');
	}
	
	var step = 2*Math.PI/this.numEdges;  // see note 1
	var prev_point = undefined;

    for(var theta=0;  theta < 2*Math.PI+1;  theta+=step) {
		var x = this.point.x + this.radius*Math.cos(theta);
		var y = this.point.y - this.radius*Math.sin(theta);    //note 2.
       
        //once you have more then one point, draw aline to get a nice clean circle
		if(prev_point !== undefined){
			this.points = [];
			this.points[0] = prev_point;
			this.points[1] = {x:x, y:y};
			Line.prototype.draw.call(this, preview, false);
		}
		
		// keep last point
		prev_point = {x:x, y:y};
    }
    if (!preview){
		document.getElementById("canvas").appendChild(this.container);
	}
};

function Line(point1, point2, color){
	this.points = [point1,point2];
	this.color = color;
	this.name = "Line";
}

Line.prototype = Object.create(Shape.prototype);

Line.prototype.move = function(difx, dify){
	
	this.points[0].x += difx;
	this.points[1].x += difx;
	this.points[1].y += dify;
	this.points[0].y += dify;
	
	this.clear();
	this.draw();
};

Line.prototype.setPoint = function(x,y){

	this.clear();
	
	var l = this.getLeft();
	var t = this.getTop();
	this.points[0].x += x - l;
	this.points[0].y += y - t;
	this.points[1].x += x - l;
	this.points[1].y += y - t;
	this.draw();
};

Line.prototype.getLeft = function(){
	
	return (this.points[0].x < this.points[1].x) ? this.points[0].x : this.points[1].x;
};

Line.prototype.getRight = function(){
	
	return (this.points[0].x > this.points[1].x) ? this.points[0].x : this.points[1].x;
};

Line.prototype.getTop = function(){
	
	return (this.points[0].y < this.points[1].y) ? this.points[0].y : this.points[1].y;
};

Line.prototype.getBottom = function(){
	
	return (this.points[0].y > this.points[1].y) ? this.points[0].y : this.points[1].y;
};


Line.prototype.draw = function(preview,realLine, point1, point2, color){
	if (!preview && realLine !== false){
		this.container = document.createElement('div');
	}
	p2 = (point1 == undefined) ? this.points[1] : point1;
	p1 = (point2 == undefined) ? this.points[0] : point2;
	var dis_x = p2.x - p1.x;
	var dis_y = p2.y - p1.y;
	var neg_y = p2.y > p1.y ? 1 : -1;
	var neg_x = p2.x > p1.x ? 1 : -1;
	var coter = Math.sqrt(Math.pow(dis_x,2)+Math.pow(dis_y,2));
	
	if(Math.abs(dis_x) > Math.abs(dis_y)){
		var adj = Math.abs(dis_y/dis_x);
		for(var i=0; i < Math.abs(dis_x); i++){
			
			this.putPixel(p1.x+i*neg_x, p1.y+(i*adj)*neg_y, this.color, preview);
			
		}
	}else{
		var adj = Math.abs(dis_x/dis_y);
		for(var i=0; i < Math.abs(dis_y); i++){
			
			this.putPixel(p1.x+(i*adj)*neg_x, p1.y+i*neg_y, this.color, preview);
			
		}
	}
    if (!preview && realLine !== false){
		document.getElementById("canvas").appendChild(this.container);
	}

};

function Curv(points, color){
	this.points = points;
	this.color = color;
	this.name = "Curv";
	this.border = {top:-1, bottom:-1,left:-1, right:-1};
}

Curv.prototype = Object.create(Shape.prototype);

Curv.prototype.getLeft = function(){
	
	return this.border.left;
};

Curv.prototype.getTop = function(){
	
	return this.border.top;
};

Curv.prototype.getBottom = function(){
	
	return this.border.bottom;
};

Curv.prototype.setPoint = function(x,y){

	var disx = x - this.getPoint().x;
	var disy = y - this.getPoint().y;

	this.clear();
	for(i in this.points){
		this.points[i].x += disx;
		this.points[i].y += disy;
	}
	this.draw();
};

Curv.prototype.draw = function(preview){
	if (!preview){
		this.container = document.createElement('div');
	}
	var a = this.points[0];
	var b = this.points[1];
	var c = this.points[2];
	var d = this.points[3];
	var delta = 0.01;
	var steps = 1/delta;
	var prev_point = undefined;
	var xt, yt;
	
	
	for(var t=0; t <= 1; t+=delta){
		
		var t3 = Math.pow(t,3);
		var t2 = Math.pow(t,2);
		
		/**
		 * Quadratic Bézier curves
		 * referrence: https://en.wikipedia.org/wiki/B%C3%A9zier_curve
		 */
		xt = Math.pow((1-t),3) * a.x + Math.pow((1-t),2)*3*t*b.x + 3*(1-t)*Math.pow(t,2)*c.x + d.x*Math.pow(t,3);
		yt = Math.pow((1-t),3) * a.y + Math.pow((1-t),2)*3*t*b.y + 3*(1-t)*Math.pow(t,2)*c.y + d.y*Math.pow(t,3);
		if(xt > this.border.right || this.border.right == -1) this.border.right = xt;
		if(xt < this.border.left || this.border.left == -1) this.border.left = xt;
		if(yt > this.border.bottom || this.border.bottom == -1) this.border.bottom = yt;
		if(yt < this.border.top || this.border.top == -1) this.border.top = yt;
		
		if(prev_point != undefined){
			Line.prototype.draw.call(this, preview, false, prev_point, {x:xt, y:yt});
		}
		
		prev_point = {x:xt, y:yt};
	}
	if (!preview){
		document.getElementById("canvas").appendChild(this.container);
	}
};

Curv.prototype.getRight = function(){
	
	return this.border.right;
};

function Container(shapes){
	
	this.shapes = (shapes == undefined) ? [] : shapes;
}

Container.prototype.move = function(difx, dify){
	
	for(i in this.shapes) this.shapes[i].move(difx, dify);
};

Container.prototype.getLeft = function(){
	
	var min = 1000000000;
	for(s in this.shapes){
		
		if(this.shapes[s].getLeft() < min)
			min = this.shapes[s].getLeft();
	}
	
	return min;
};

Container.prototype.getTop = function(){
	
	var min = 1000000000;
	for(s in this.shapes){
		
		if(this.shapes[s].getTop() < min)
			min = this.shapes[s].getTop();
	}
	
	return min;
};

Container.prototype.getRight = function(){
	
	var max = 0;
	for(s in this.shapes){
		
		if(this.shapes[s].getLeft() > max)
			max = this.shapes[s].getLeft();
	}
	
	return max;
};

Container.prototype.getBottom = function(){
	
	var max = 0;
	for(s in this.shapes){
		
		if(this.shapes[s].getBottom() > max)
			max = this.shapes[s].getBottom();
	}
	
	return max;
};

Container.prototype.getPoint = function(middle){
	
	return (middle) ? {x:(this.getRight()-this.getLeft())/2, y:(this.getBottom()-this.getTop())/2} : {x:this.getLeft(), y:this.getTop()};
};

/**
 * rotate container
 * rotate all container shapes in relation to container referrence point - middle
 * @param {Object} angle - the angle of rotation in degrees
 */
Container.prototype.rotate = function(angle){
	
	for(s in this.shapes){
		
		this.shapes[s].rotate(this.getPoint(true), angle);
	}
};
Container.prototype.draw = function(angle){
	
	for(s in this.shapes){
		
		this.shapes[s].draw();
	}
};


