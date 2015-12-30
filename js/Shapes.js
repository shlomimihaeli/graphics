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

Shape.prototype.move = function(difx, dify){
	
	this.setPoint(this.getPoint().x + difx, this.getPoint().y + dify);
};

Shape.prototype.getLeft = function(){
	
	if(this.point != undefined) return this.point.x;
};

Shape.prototype.getTop = function(){
	
	if(this.point != undefined) return this.point.y;
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

Circle.prototype.getTop = function(){
	
	return this.point.y - this.radius;
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

Poligon.prototype.getTop = function(){
	
	return this.point.y - this.radius;
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
	
	this.setPoint(this.getPoint().x + difx, this.getPoint().y + dify);
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

Line.prototype.getTop = function(){
	
	return (this.points[0].y < this.points[1].y) ? this.points[0].y : this.points[1].y;
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
}

Curv.prototype = Object.create(Shape.prototype);

Curv.prototype.getLeft = function(){
	
	var min=1000000000;
	for(i in this.points){
		
		if(this.points[i].x < min)
			min = this.points[i].x;
	}
	
	return min;
};

Curv.prototype.getTop = function(){
	
	var min=1000000000;
	for(i in this.points){
		
		if(this.points[i].y < min)
			min = this.points[i].y;
	}
	
	return min;
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
		
		if(prev_point != undefined){
			Line.prototype.draw.call(this, preview, false, prev_point, {x:xt, y:yt});
		}
		
		prev_point = {x:xt, y:yt};
	}
	if (!preview){
		document.getElementById("canvas").appendChild(this.container);
	}
};



