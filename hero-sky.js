// Animated blue sky behind the home page hero. White clouds drift left to right.
// Without WebGL the CSS gradient on #home stays visible instead.
(function () {
  var MAX_WIDTH = 1100; // the sky is soft, so render small and let CSS scale it
  var FRAME_MS = 1000 / 30;

  var VERTEX = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

  var FRAGMENT = [
    'precision highp float;',
    'uniform vec2 res;',
    'uniform float time;',

    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float noise(vec2 p){',
    '  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    '  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);',
    '}',
    'float fbm(vec2 p){',
    '  float v=0.,a=.5;',
    '  mat2 m=mat2(.8,.6,-.6,.8);',
    '  for(int i=0;i<6;i++){v+=a*noise(p);p=m*p*2.03+7.1;a*=.5;}',
    '  return v;',
    '}',

    // Cloud density on a flat layer overhead. Subtracting from x moves it right.
    'float clouds(vec2 p){',
    '  vec2 q=p;',
    '  q.x-=time*.05;',
    '  float shape=fbm(q*.55+vec2(3.1,8.4));',
    '  float detail=fbm(q*1.9+shape*1.4-vec2(time*.012,0.));',
    '  return shape*.72+detail*.34;',
    '}',

    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/res;',
    '  float aspect=res.x/res.y;',

    // Perspective: clouds shrink and flatten toward a horizon below the hero.
    '  float depth=uv.y+.42;',
    '  vec2 p=vec2((uv.x-.5)*aspect,1.)/depth;',
    '  p.y*=2.1;',

    '  vec3 top=vec3(.13,.38,.76);',
    '  vec3 mid=vec3(.33,.60,.90);',
    '  vec3 low=vec3(.74,.87,.97);',
    '  vec3 sky=mix(low,mid,smoothstep(0.,.5,uv.y));',
    '  sky=mix(sky,top,smoothstep(.35,1.,uv.y));',

    '  float density=clouds(p);',
    '  float mask=smoothstep(.56,.68,density);',

    // Sunlight comes from the upper right, leaving soft grey undersides.
    '  float toward=clouds(p+vec2(.1,.16));',
    '  float lit=clamp((density-toward)*6.+.72,0.,1.);',
    '  float thick=smoothstep(.62,.9,density);',
    '  vec3 white=vec3(1.,.995,.98);',
    '  vec3 shade=vec3(.66,.73,.84);',
    '  vec3 cloud=mix(shade,white,lit);',
    '  cloud=mix(cloud,shade,thick*(1.-lit)*.6);',

    // Distant clouds melt into the haze near the bottom.
    '  float haze=smoothstep(.34,0.,uv.y);',
    '  cloud=mix(cloud,low,haze*.55);',

    '  vec3 col=mix(sky,cloud,mask);',

    // A little grain stops the gradients from banding.
    '  col+=(hash(gl_FragCoord.xy+fract(time))-.5)/128.;',
    '  gl_FragColor=vec4(col,1.);',
    '}'
  ].join('\n');

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function start(canvas) {
    var gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    var program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var position = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    var resolution = gl.getUniformLocation(program, 'res');
    var timeUniform = gl.getUniformLocation(program, 'time');

    var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visible = true;
    var elapsed = 40; // the clouds are better placed here than at zero
    var last = 0;

    function draw() {
      var width = canvas.clientWidth;
      var height = canvas.clientHeight;
      if (!width || !height) return;
      var scale = Math.min(1, MAX_WIDTH / width);
      var w = Math.round(width * scale);
      var h = Math.round(height * scale);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(resolution, w, h);
      gl.uniform1f(timeUniform, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function tick(now) {
      if (!visible) return;
      requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      // Clamped so the clouds do not jump after the tab has been in the background.
      elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      draw();
    }

    addEventListener('resize', draw);
    draw();
    if (still) return;

    new IntersectionObserver(function (entries) {
      var wasVisible = visible;
      visible = entries[0].isIntersecting;
      if (visible && !wasVisible) {
        last = performance.now();
        requestAnimationFrame(tick);
      }
    }).observe(canvas);

    last = performance.now();
    requestAnimationFrame(tick);
  }

  // The hero is rendered by support.js, so wait for the real canvas to appear.
  function find() {
    var canvas = document.getElementById('hero-sky');
    return canvas && !canvas.closest('x-dc') ? canvas : null;
  }

  var canvas = find();
  if (canvas) {
    start(canvas);
    return;
  }
  var observer = new MutationObserver(function () {
    var canvas = find();
    if (!canvas) return;
    observer.disconnect();
    start(canvas);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
