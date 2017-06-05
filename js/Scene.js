
// Teapot Explosion: WebGL Scene
// -------------------------------------------

// This funct() initializes the WebGL scene and
// returns an object with methods to manipulate the
// WebGL scene
// ------------------------------------------------
//   param canvas: HTMLCanvasElement
//   param teapot: Teapot model
// ------------------------------------------------
function buildScene(_canvas, _teapot) {

  // Initializing WebGL scene
  var gl = _canvas.getContext('webgl')
            || _canvas.getContext('experimental-webgl');
  gl.viewport(0, 0, _canvas.width, _canvas.height);
  gl.clearColor(0, 0, 0, 0.5);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

  // Initializing shaders (see Shaders.js)
  shaderProgram = initShaders(gl);
  if( !shaderProgram === null ) {
    throw new Error("Could not initialize shaders.");
  }

  // Initialize buffers (see Buffers.js)
  var buffers = initBuffers(gl);

  // Initialize Teapot models (see Teapots.js)
  var teapots = initTeapots(_teapot);

 // Scene() returns an object which allows
 // main.js to access functions defined in this scope
 // and the teapots object in the scene
 return { teapots:       teapots,
          render:        render.bind(null, gl, buffers, teapots) };
}

// Explode the teapots in the scene
// This funct() renders the  explosion effect
// onto the scene
// ____________________________________
//   param gl: WebGLRenderingContext
//   param buffers: see Buffers.js
//   param teapots: see Teapots.js
// _____________________________________
function render(_gl, _buffers, _teapots) {
  if(_teapots.exploding) _teapots.explode();

  // Clear last frame
  _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

  for(var i = 0; i < _teapots.numTeapots; i++) {
    // Sending model data to the GPU
    sendAttributeData(_gl, shaderProgram, _buffers, _teapots);
    sendUniformData(_gl, shaderProgram, _teapots, i);

    // Draw triangles
    _gl.drawArrays(_gl.TRIANGLES, 0, _teapots.numTriangles);
  }

 // Render next animation frame
 window.requestAnimationFrame(render.bind(null, _gl, _buffers, _teapots));
}
