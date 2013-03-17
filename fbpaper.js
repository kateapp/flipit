var flipBook = {
		id:0,
		layers: [],
		init: function(){

			this.id = Math.floor((Math.random()*10000) +1);//generate random id	

			// BUTTONS
			
			// click the next button to set opacity of current drawing to 30% and make new layer and remove the older layers.
			$('#next').on('click', function(){

				var canvas = document.getElementById("myCanvas");
//				var frameUrl = canvas.toDataURL();//base64 png pf a frame
//			  flipBook.layers.push(frameUrl);		
			  

				setOpacity(0.2, project.activeLayer);
				hideOlderLayers(project.activeLayer);	

				
				var newLayer = new Layer();//create a new layer 	
					
				//console.log(flipBook.layers.length);

				}
			);
			
			$('#play').on('click', function(){
				flipBook.play();
				}
			);
			$('#undo').on('click', function(){
				flipBook.undo();
				}
			);	
			
			$('#share').on('click', function(){
				flipBook.share();
				}
			);
				
		},
		pushLayer: function(l){//add layer data into the array
			this.layers.push(l);
		},
		play: function(){
			var l= project.layers.length;
			var i = 0;
			for (k=0; k<l; k++){
				project.layers[k].visible = false;
			}	
			function showNext(myi) {
	
				setTimeout(function(){
					for (k=0; k<l; k++){
						project.layers[k].visible = false;
					}
				         if(myi == project.layers.length - 1) return;
				         project.layers[myi].visible = true;
				         view.draw(); //refresh canvas
				         showNext(myi+1);
				     }, 500);
			}
			showNext(0);		
		},
		
		undo: function(){
			if(!project.activeLayer.hasChildren()){	
				return;
			}
			project.activeLayer.lastChild.remove();
		},
		
//		share: function(){
//			$('#myCanvas').hide();
//			
//			var newImg = document.createElement("img"),
//					layers = this.layers;
//					
//			for (var i =0; i< this.layers.length; i++){
//				(function(index){
//					newImg.src = layers[index];
//					document.body.appendChild(newImg);
//					setTimeout(function(index){
//						document.body.removeChild(newImg);
//					},1000);	
//				})(i);
//			};	
//
//						
//		}
};
	

	
	//DRAW TOOL
var myPath;
//This function is called whenever the user clicks the mouse in the view and it create a path
function onMouseDown(event) {
		$('.cta').hide();
    myPath = new Path();
    myPath.strokeColor = 'red';
    myPath.strokeWidth = 2;

}

$('.cta').on('click', function(){
	$('.cta').hide();
	}
);
	
//When you drag the mouse it will add segments to the path.
function onMouseDrag(event) {
    myPath.add(event.point);
    myPath.smooth();

}

//The mouse was released, so we add the new location as the end segment of the line
function onMouseUp(event) {
    myPath.add(event.point);
    //add to the active Layer and change it color property
    project.activeLayer.strokeColor = 'black';  
}	


	var setOpacity = function (n, l){// n is the percentage of opacity and l is the layer it acts on
		if (l.hasChildren()){
			var currentDrawing = l.children;//assign ref to array containing all children items of the layer.
			for (i=0; i< currentDrawing.length; i++){
					currentDrawing[i].opacity = n;
			}
		}
	}

	var hideOlderLayers = function(a){// hide all layers older than layer a from the canvas
		var l = project.layers.length;
		var j = a.index; 
		for (i=0; i<l; i++){
			if (i < j) project.layers[i].visible = false;
		}
	}

	
	$(document).ready(function(){
		flipBook.init();
	});

	
		