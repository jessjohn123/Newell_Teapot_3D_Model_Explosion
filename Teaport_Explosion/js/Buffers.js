
// WebGL Teapot Explosion: WebGL Buffers
// --------------------------------------

// This func() initializes the WebGLBuffer objects
//   param gl: WebGLRenderingContext
function initBuffers(gl) {
  return { positions:    gl.createBuffer(),
           offsets:      gl.createBuffer(),
           normals:      gl.createBuffer(),
           randomSeeds:  gl.createBuffer(),
           rotationAxes: gl.createBuffer() };
}

// This funct() sends data from the model to the
// attribute values in the shader
// ---------------------------------------------------------------------------
//   param gl: WebGLRenderingContext
//   param shaderProgram: WebGLProgram
//   param buffers: object returned by initBuffers
//   param teapots: Teapots object (see Teapots.js)
//   param index: Number representing which teapot currently being rendered
// ----------------------------------------------------------------------------
function sendAttributeData(gl, shaderProgram, buffers, teapots, index) {
  // Sending vertex position data using the array buffer
  var mPosition = gl.getAttribLocation(shaderProgram, 'm_Position');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
  gl.vertexAttribPointer(mPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mPosition);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapots.vertices), gl.STATIC_DRAW);

  // Sending offset data to the GPU
  var mOffset = gl.getAttribLocation(shaderProgram, 'm_Offset');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.offsets);
  gl.vertexAttribPointer(mOffset, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mOffset);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapots.offsets), gl.DYNAMIC_DRAW);

  // Sending normal vectors to the GPU
  var mNormal = gl.getAttribLocation(shaderProgram, 'm_Normal');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals);
  gl.vertexAttribPointer(mNormal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mNormal);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapots.normals), gl.DYNAMIC_DRAW);

  // Sending random numbers to the GPU
  var mRandom = gl.getAttribLocation(shaderProgram, 'm_Random');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.randomSeeds);
  gl.vertexAttribPointer(mRandom, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mRandom);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapots.randomSeeds), gl.DYNAMIC_DRAW);

  // Sending rotation axes to the GPU
  var mAxis = gl.getAttribLocation(shaderProgram, 'm_Axis');
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.rotationAxes);
  gl.vertexAttribPointer(mAxis, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mAxis);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapots.rotationAxes), gl.DYNAMIC_DRAW);
}

// This func() helps to send data from the model to the 
// uniforms in the WebGL shader
// ---------------------------------------------------------------
//   param gl: WebGLRenderingContext
//   param shaderProgram: WebGLProgram
//   param teapots: Teapots object (see Teapots.js)
//   param index: Number represents which teapot is being rendered
// ----------------------------------------------------------------
function sendUniformData(gl, shaderProgram, teapots, index) {
  // Camera position
  var m_eye = { x: 0, y: 1, z: 1.5+2.25*teapots.numTeapots };
  // Sending camera position to GPU
  var m_cameraPosLocation = gl.getUniformLocation(shaderProgram, 'm_cameraPos');
  gl.uniform3fv(m_cameraPosLocation, new Float32Array([m_eye.x, m_eye.y, m_eye.z]));

  // Time since explosion started
  var m_expTimeLocation = gl.getUniformLocation(shaderProgram, 'm_expTime');
  gl.uniform1f(m_expTimeLocation, teapots.explosionTime);

  // Translation matrix
  var m_translationMatrix = teapots.getTranslationMatrix(index)
  ,   t_MatrixLocation = gl.getUniformLocation(shaderProgram, 'transMatrix');
  gl.uniformMatrix4fv(t_MatrixLocation, false, m_translationMatrix.elements);

  // View matrix
  var m_viewMatrix = new Matrix4().setLookAt(m_eye.x, m_eye.y, m_eye.z, 0, 0.5, 0, 0, 1, 0)
  ,   v_MatrixLocation = gl.getUniformLocation(shaderProgram, 'viewMatrix');
  gl.uniformMatrix4fv(v_MatrixLocation, false, m_viewMatrix.elements);

  // Perspective matrix
  var m_perspectiveMatrix = new Matrix4().setPerspective(45, 1, 0.1, 1000)
  ,   p_MatrixLocation = gl.getUniformLocation(shaderProgram, 'perspMatrix');
  gl.uniformMatrix4fv(p_MatrixLocation, false, m_perspectiveMatrix.elements);
}
