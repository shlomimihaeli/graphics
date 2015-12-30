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
						myShapes[myShapes.length-1].draw();
					};
					
	return myShapes;
}

shapes = jsonToShapes(JSON.parse('{"shapes": [ { "shape":"circle", "point":{"x":300,"y":300}, "radius":50, "color":"red" }, { "shape":"poligon", "point":{"x":700,"y":250}, "numEdges":7, "radius":80, "color":"blue" }, { "shape":"line", "points":[{"x":500,"y":250},{"x":600,"y":350}], "color":"green" }, { "shape":"curv", "points":[{"x":500,"y":250},{"x":600,"y":350},{"x":700,"y":450},{"x":200,"y":500}], "color":"orange" } ] }'));
