window.onload = function() {
		window.myShapes = [];
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					console.log(reader.result);
					var data = JSON.parse(reader.result);
					handleMouseUp(data.shapes[0]);
					for (var i = 0; i < data.shapes.length; i++) {
						var s = data.shapes[i];
						switch (data.shapes[i].shape.toLowerCase()){
							case "circle":
								myShapes.push(new Circle(s.point,s.radius,s.color));
								break;
							case "poligon":
								myShapes.push(new Poligon(s.point, s.radius, s.numEdges, s.color));
								break;
							case "line":
								myShapes.push(new Line(s.points, s.color));
								break;
							case "curv":
								myShapes.push(new Curv(s.points,s.color));
								break;
						}
						myShapes[myShapes.length-1].draw();
					};
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
};

function jsonToShapes(data){
	
	var myShapes = [];
	for (var i = 0; i < data.shapes.length; i++) {
						var s = data.shapes[i];
						switch (data.shapes[i].shape.toLowerCase()){
							case "circle":
								myShapes.push(new Circle(s.point,s.radius,s.color));
								break;
							case "poligon":
								myShapes.push(new Poligon(s.point, s.radius, s.numEdges, s.color));
								break;
							case "line":
								myShapes.push(new Line(s.points[0], s.points[1], s.color));
								break;
							case "curv":
								myShapes.push(new Curv(s.points,s.color));
								break;
						}
						//myShapes[myShapes.length-1].draw();
					};
					
	return myShapes;
}

shapes = jsonToShapes(JSON.parse('{"shapes": [ { "shape":"circle", "point":{"x":300,"y":300}, "radius":50, "color":"red" },{ "shape":"circle", "point":{"x":100,"y":300}, "radius":50, "color":"red" }, { "shape":"poligon", "point":{"x":700,"y":250}, "numEdges":7, "radius":80, "color":"blue" }, { "shape":"line", "points":[{"x":500,"y":250},{"x":600,"y":350}], "color":"green" }, { "shape":"curv", "points":[{"x":500,"y":250},{"x":600,"y":350},{"x":700,"y":450},{"x":200,"y":500}], "color":"orange" } ] }'));

shapes = jsonToShapes({"shapes":[

	{"shape":"line", "points":[{x:150,y:450},{x:220,y:550}]},
	{"shape":"line", "points":[{x:220,y:550},{x:400,y:550}]},
	{"shape":"line", "points":[{x:550,y:450},{x:400,y:550}]},
	{"shape":"line", "points":[{x:150,y:450},{x:550,y:450}]},
	{"shape":"line", "points":[{x:350,y:150},{x:350,y:450}]},
	{"shape":"line", "points":[{x:350,y:150},{x:450,y:400}]},
	{"shape":"line", "points":[{x:350,y:400},{x:450,y:400}]},
	{"shape":"circle", "point":{x:370,y:250}, radius:10},
	{"shape":"circle", "point":{x:380,y:300}, radius:15},
	{"shape":"circle", "point":{x:390,y:350}, radius:20},
]});

pic = new Container(shapes);

pic.draw();
//pic.move(10,0);

setInterval(function(){
	
	//shapes[0].rotate({x:800, y:200}, 5);
	//shapes[1].rotate({x:800, y:200}, 5);
	//shapes[2].rotate({x:800, y:200}, 5);
	//shapes[3].rotate({x:800, y:200}, 5);
},100);
