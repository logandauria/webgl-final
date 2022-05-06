'use strict';

// Global variables that are set and used
// across the application
let gl;

// GLSL programs
let myProgram;

// Textures for the objects
let sphereTexture = null;
let bgTexture = null;
let handTexture = null;

// VAOs for the objects
var mySphere = null;
var background = null;
// todo: export blender hands
var hand1 = null;
var hand2 = null;

let sphereMatrix;




//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
    mySphere = new Sphere(12,12);
    mySphere.VAO = bindVAO(mySphere, myProgram);


    background = new Cube(5);
    background.VAO = bindVAO(background, myProgram);

    hand1 = new Cube(5);
    hand1.VAO = bindVAO(hand1, myProgram);

    hand2 = new Cube(5);
    hand2.VAO = bindVAO(hand2, myProgram);
}

//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures() {

    // sphere texture
    sphereTexture = gl.createTexture();
    var sphereImage = document.getElementById('innersphere')
    gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sphereImage.width, sphereImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, sphereImage);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // background texture
    bgTexture = gl.createTexture();
    var bgImage = document.getElementById('bgimage')
    gl.bindTexture(gl.TEXTURE_2D, bgTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, bgImage.width, bgImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, bgImage);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // hand texture
    handTexture = gl.createTexture();
    var handImage = document.getElementById('hand')
    gl.bindTexture(gl.TEXTURE_2D, handTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, handImage.width, handImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, handImage);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}

//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera() {
    // set up your projection
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(projMatrix, radians(75), 16/9, 0.1, null);
    gl.uniformMatrix4fv(myProgram.uProjT, false, projMatrix);
    
    
    // set up your view
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0,3,4], [0,3,0], [0,1,0]);
    gl.uniformMatrix4fv(myProgram.uViewT, false, viewMatrix);
}

//
// Creates a VAO for a given object and return it.
//
// shape is the object to be bound
// program is the program (vertex/fragment shaders) to use in this VAO
//
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
// You can see the definition of the shaders themselves in the
// HTML file assn6-shading.html.   Though there are 2 sets of shaders
// defined (one for per-vertex shading and one for per-fragment shading,
// each set does have the same list of attributes and uniforms that
// need to be set
//
function bindVAO (shape, program) {
    //create and bind VAO
    let theVAO = gl.createVertexArray();
    gl.bindVertexArray(theVAO);

    // create, bind, and fill buffer for vertex locations
    // vertex locations can be obtained from the points member of the
    // shape object.  3 floating point values (x,y,z) per vertex are
    // stored in this array.    let myVertexBuffer = gl.createBuffer();
    let myVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

    // create, bind, and fill buffer for uv's
    // uvs can be obtained from the uv member of the
    // shape object.  2 floating point values (u,v) per vertex are
    // stored in this array.
    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aUV);
    gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

    // Setting up element array
    // element indicies can be obtained from the indicies member of the
    // shape object.  3 values per triangle are stored in this
    // array.
    let myIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

    // Do cleanup
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return theVAO;
}

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

//
// Use this function to create all the programs that you need
// You can make use of the auxillary function initProgram
// which takes the name of a vertex shader and fragment shader
//
// Note that after successfully obtaining a program using the initProgram
// function, you will beed to assign locations of attribute and unifirm variable
// based on the in variables to the shaders.   This will vary from program
// to program.
//
function initPrograms() {
    myProgram = initProgram('sphereMap-V', 'sphereMap-F');

    gl.useProgram(myProgram);
    myProgram.aVertexPosition = gl.getAttribLocation(myProgram, 'aVertexPosition');
    myProgram.aNormal = gl.getAttribLocation(myProgram, 'aNormal');
    myProgram.aUV = gl.getAttribLocation(myProgram, 'aUV');
    myProgram.uLightPos = gl.getUniformLocation(myProgram, 'lightPosition');
    myProgram.uModelT = gl.getUniformLocation(myProgram, 'modelT');
    myProgram.uViewT = gl.getUniformLocation(myProgram, 'viewT');
    myProgram.uProjT = gl.getUniformLocation(myProgram, 'projT');
    myProgram.uIsTextured = gl.getUniformLocation(myProgram, 'isTextured');
    myProgram.uTheTexture = gl.getUniformLocation(myProgram, 'theTexture');
    myProgram.uColor = gl.getUniformLocation(myProgram, 'color');
    myProgram.uAmbientLight = gl.getUniformLocation(myProgram, 'ambientLight');
    myProgram.uLightColor = gl.getUniformLocation(myProgram, 'lightColor');
    myProgram.uKa = gl.getUniformLocation(myProgram, 'ka');
    myProgram.uKd = gl.getUniformLocation(myProgram, 'kd');
    myProgram.uKs = gl.getUniformLocation(myProgram, 'ks');
    myProgram.uKe = gl.getUniformLocation(myProgram, 'ke');
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
      
    return program;
  }

//
//  This function draws all of the shapes required for your scene
//
function drawShapes() {

    // init uniforms
    let ka = 1.0;
    let kd = 1.0;
    let ks = 0.9;
    let ke = 20.0;
    let lightPosition = [0, 8, 0];
    let lightColor = [1, 1, 1];
    let ambientLight = [1, 1, 1];
    let sphereTranslate = [0, 2.4, 0];
    let sphereScale = [2, 2, 2];
    let sphereRot = [2, 2, 2];
    let bgTranslate = [0, 2, -2];
    let bgScale = [20, 13, .2];
    let hand1Translate = [1.5, 2.4, 0];
    let hand1Scale = [.5,1,.5];
    let hand1Rot = [-1,1,0];
    let hand2Translate = [-1.5, 2.4, 0];
    let hand2Scale = [.5,1,.5];
    let hand2Rot = [-1,1,0];

    // set uniforms
    gl.uniform1f(myProgram.uKa, ka);
    gl.uniform1f(myProgram.uKd, kd);
    gl.uniform1f(myProgram.uKs, ks);
    gl.uniform1f(myProgram.uKe, ke);
    gl.uniform3fv(myProgram.uLightPosition, lightPosition);
    gl.uniform3fv(myProgram.uLightColor, lightColor);
    gl.uniform3fv(myProgram.uAmbientLight, ambientLight);

    // sphere
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
    gl.uniform1i(myProgram.uIsTextured, 1);
    gl.uniform1i(myProgram.uTheTexture, 0);
    sphereMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(sphereMatrix, sphereMatrix, sphereTranslate);
    glMatrix.mat4.scale(sphereMatrix, sphereMatrix, sphereScale);
    glMatrix.mat4.rotateY(sphereMatrix, sphereMatrix, radians(70));
    gl.uniformMatrix4fv(myProgram.uModelT, false, sphereMatrix);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);

    // background
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, bgTexture);
    gl.uniform1i(myProgram.uIsTextured, 1);
    gl.uniform1i(myProgram.uTheTexture, 1);
    let bgMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(bgMatrix, bgMatrix, bgTranslate);
    glMatrix.mat4.scale(bgMatrix, bgMatrix, bgScale);
    gl.uniformMatrix4fv(myProgram.uModelT, false, bgMatrix);
    gl.bindVertexArray(background.VAO);
    gl.drawElements(gl.TRIANGLES, background.indices.length, gl.UNSIGNED_SHORT, 0);

    // hands
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, handTexture);
    gl.uniform1i(myProgram.uIsTextured, 1);
    gl.uniform1i(myProgram.uTheTexture, 2);
    let hand1Matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(hand1Matrix, hand1Matrix, hand1Translate);
    glMatrix.mat4.scale(hand1Matrix, hand1Matrix, hand1Scale);
    glMatrix.mat4.rotate(hand1Matrix, hand1Matrix, radians(60), hand1Rot);
    gl.uniformMatrix4fv(myProgram.uModelT, false, hand1Matrix);
    gl.bindVertexArray(hand1.VAO);
    gl.drawElements(gl.TRIANGLES, background.indices.length, gl.UNSIGNED_SHORT, 0);

    gl.uniform1i(myProgram.uIsTextured, 1);
    gl.uniform1i(myProgram.uTheTexture, 2);
    let hand2Matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(hand2Matrix, hand2Matrix, hand2Translate);
    glMatrix.mat4.scale(hand2Matrix, hand2Matrix, hand2Scale);
    glMatrix.mat4.rotate(hand2Matrix, hand2Matrix, radians(60), hand2Rot);
    gl.uniformMatrix4fv(myProgram.uModelT, false, hand2Matrix);
    gl.bindVertexArray(hand2.VAO);
    gl.drawElements(gl.TRIANGLES, background.indices.length, gl.UNSIGNED_SHORT, 0);

    //glMatrix.mat4.rotateY(sphereMatrix, sphereMatrix, Math.PI / 300);
    //requestAnimationFrame(drawShapes);
}

  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Calls when html page opened
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    initPrograms();
    
    createShapes();

    setUpTextures();

    setUpCamera();

    // do a draw
    draw();

    //animate();
  }

function animate() {
    //while (true) {
    //    glMatrix.mat4.rotateY(sphereMatrix, sphereMatrix, Math.PI / 300);
    //}
}

function radians(degrees){
    return (Math.PI/180.0) * degrees;
}
