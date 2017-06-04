
// Teapot Explosion: WebGL Shaders
// ---------------------------------------------------------

// This funct() initializes shaders 
// ---------------------------------------------------
//   param gl: WebGLRenderingContext renders the scene
// ---------------------------------------------------
function initShaders(_gl) {
  var vertexShader = getShader(_gl, 'shader-vs')
  ,   fragmentShader = getShader(_gl, 'shader-fs');

  if( !vertexShader || !fragmentShader ) {
    console.log("Shaders failed to compile.");
    return null;
  }

  shaderProgram = _gl.createProgram();
  _gl.attachShader(shaderProgram, vertexShader);
  _gl.attachShader(shaderProgram, fragmentShader);
  _gl.linkProgram(shaderProgram);
  if( !_gl.getProgramParameter(shaderProgram, _gl.LINK_STATUS) ) {
    console.error("Could not initialize shader program.");
    return null;
  }
  _gl.useProgram(shaderProgram);

  return shaderProgram;
}


// This funct() gets the  shader program from the 
// document and compiles it
// -----------------------------------------------------
//   param gl: WebGLRenderingContext
//   param id: string id of shader script in index.html
// -----------------------------------------------------
function getShader(_gl, _id) {
  var source = document.getElementById(_id).textContent
  ,   shader = _id === 'shader-vs' ? _gl.createShader(_gl.VERTEX_SHADER)
                                  : _gl.createShader(_gl.FRAGMENT_SHADER);

  _gl.shaderSource(shader, source);
  _gl.compileShader(shader);
  if( !_gl.getShaderParameter(shader, _gl.COMPILE_STATUS) ) {
    console.error('Shader failed to compile: '+ _gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}
