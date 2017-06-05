
// Teapot Explosion: Main Program
// -------------------------------------

// Main function that executes once the OBJ model
// has been loaded
// ----------------------------------------------
//   param teapot: Teapot model
// ----------------------------------------------
function main(_teapot) {
  /// HTML Canvas contains the instance of WebGL
  var canvas = document.getElementById('webgl-canvas');
  canvas.width = window.innerWidth > 800 ? 500 : 300;
  canvas.height = canvas.width;
  $(canvas).css('left', (window.innerWidth/2-canvas.width/2)+'px');

  // Initializing WebGL scene - Scene()
  var scene = buildScene(canvas, _teapot);
  scene.render();

  // Adding dynamic style and event listeners to sliders
  $('.slider, .slider-label').css('left', (window.innerWidth/2-150)+'px');

  // Number of teapots
  $('#num-teapots').css('top', window.innerWidth > 800? 540 : 340);
  $('#num-teapots-slider').css('top', window.innerWidth > 800? 560 : 360)
    .on('change', function(ev) {
      ev.preventDefault();
      scene.teapots.numTeapots = this.value;
      document.getElementById('num-teapots').innerHTML = "<b>Teapots:</b> "+this.value;
      scene.teapots.exploding = false;
      scene.teapots.explosionTime = 0;
      scene.teapots.explosionStart = null;
    });

    // Number of tessellations
    $('#num-tessellations').css('top', window.innerWidth > 800? 600 : 400);
    $('#num-tessellations-slider').css('top', window.innerWidth > 800? 620 : 420)
      .on('change', function(ev) {
        ev.preventDefault();
        scene.teapots.tessellate(this.value);
        document.getElementById('num-tessellations').innerHTML = "<b>Tessellations:</b> "+this.value;
        scene.teapots.exploding = false;
        scene.teapots.explosionTime = 0;
        scene.teapots.explosionStart = null;
      });

  // Adding event listener to the canvas containing the scene
  $('#webgl-canvas').on('click', function(ev) {
    ev.preventDefault();
    scene.teapots.exploding = true;
  });
}


//**** STARTS HERE ****//

var teapot;
$.ajax({
  method: 'GET',
  url: '../teapot.obj',
  success: function(res) {
    teapot = new OBJ.Mesh(res);
    main(teapot);
  }
});
