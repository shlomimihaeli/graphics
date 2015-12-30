 
			var shape = "";					// current global selected shape
			var global_color = "#000";		// global selected color
			var drawing = false;			// are we in drawing mode
			
			/**
			 *	clear preview drawn objects from screen 
			 */
			function clearPreview(){
				document.getElementById("prev").innerHTML = "";
			}
			
			/**
			 *	clear all drawings from screen 
			 */
			function clearCanvas(){
				
				document.getElementById("canvas").innerHTML = "";
			}
			
			// mouse point collection, a collection of all the points pressed by mouse
			var points = [];
			
			
			$(document).ready(function(){
				// var circle = {circle:{point:{x:300,y:300},radius:50}};
				// drawCircle(circle.circle.point, circle.circle.radius, "#000");
				// catch mouse events
				$(document).on("mousedown", "#board", function(e){
				
					drawing = true;
					
					points.push({x:e.clientX, y:e.clientY});
				
					handleMouseDown(e);

				});
				
				$(document).on("mousemove", "#board", handleMove);
				
				$(document).on("mouseup", "#board", function(e){
					
					drawing = false;
					
					handleMouseUp(e);
				});
				
				$("#menu li.shape").click(function(){
					
					points = [];
					$(".shape.selected").removeClass("selected");
					$(this).addClass("selected");
					shape = $(this).attr("shape");
				});
				
				$("#global-color").on("change keypress", function(){
					
					global_color = ($(this).val() != "" ) ? $(this).val() : "#000";
				});
				
				$("#clear").click(function(){
					
					clearCanvas();
				});

			});
			
			/**
			 * Mouse event handlers
			 * these events will handle each mouse event according the current "shape" mode and
			 * count of pressure points collected so far.
 				* @param {Object} e
			 */		
			function handleMouseDown(e){
				
				switch(shape){
					
					case "curv":
					
						if(points.length <= 4){
							new Shape().putPixel(e.clientX, e.clientY, undefined, true, true);
						}
					
					break;
				}
			}
			
			function handleMove(e){
				
				if(!drawing) return;
				
				switch(shape){
					
					case "circle":
						clearPreview();
						var radius = Math.sqrt(Math.pow(Math.abs(points[0].x -e.clientX), 2) + Math.pow(Math.abs(points[0].y -e.clientY), 2));
						var cir = new Circle(points[0], radius, undefined);
						cir.draw(true);
					break;
					
					case "poligon":
						clearPreview();
						var radius = Math.sqrt(Math.pow(Math.abs(points[0].x -e.clientX), 2) + Math.pow(Math.abs(points[0].y -e.clientY), 2));
						var poli = new Poligon(points[0], radius, $("#adj_num").val(), undefined);
						poli.draw(true);
					break;
					
					case "line":
						clearPreview();
						var line = new Line(points[0],{x:e.clientX, y:e.clientY}, undefined);
						line.draw(true);
					break;
				}
			}
			function handleMouseUp(e){
				
				switch(shape){
					
					case "circle":
						clearPreview();
						var radius = Math.sqrt(Math.pow(Math.abs(points[0].x -e.clientX), 2) + Math.pow(Math.abs(points[0].y -e.clientY), 2));
						myShapes.push(new Circle(points[0],radius,global_color));
						points = [];
						myShapes[myShapes.length-1].draw();
					break;
					
					case "poligon":
						clearPreview();
						var radius = Math.sqrt(Math.pow(Math.abs(points[0].x -e.clientX), 2) + Math.pow(Math.abs(points[0].y -e.clientY), 2));
						myShapes.push(new Poligon(points[0], radius, $("#adj_num").val(), global_color));
						points = [];
						myShapes[myShapes.length-1].draw();
					break;
					
					case "line":
						clearPreview();
						myShapes.push(new Line(points[0],{x:e.clientX, y:e.clientY}, global_color));
						points = [];
						myShapes[myShapes.length-1].draw();
					break;
					
					case "curv":
						if(points.length == 4){
							clearPreview();
							myShapes.push(new Curv(points,global_color));
							points = [];
							myShapes[myShapes.length-1].draw();
						}
					break;
				}
			}
