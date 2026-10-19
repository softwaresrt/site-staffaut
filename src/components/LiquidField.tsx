'use client';

import { useEffect, useRef } from 'react';

const vert = `attribute vec2 a_position;
void main(){gl_Position=vec4(a_position,0.0,1.0);}`;
const frag = `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res.xy;
 uv.x*=u_res.x/u_res.y;
 float t=u_time*.17;
 vec2 center=vec2(u_res.x/u_res.y*.72,.44)+vec2(u_mouse.x*.12,u_mouse.y*.1);
 float r=length(uv-center);
 float angle=atan(uv.y-center.y,uv.x-center.x);
 float bend=sin(angle*3.0+t*1.6)*.045+cos(angle*6.5-t)*.023;
 float wave=sin(uv.x*7.0+uv.y*9.0+t*3.0+sin(uv.y*8.0+t*2.0))*.07;
 float ring=exp(-pow((r-bend-wave-.34)*15.0,2.0));
 float ring2=exp(-pow((r+bend*.7+wave*.5-.53)*22.0,2.0));
 float fluid=pow(max(0.0,sin(uv.y*10.0+sin(uv.x*7.0+t*1.3)*2.0+t*4.0)),15.0)*.2;
 float glow=exp(-r*r*5.5)*.30;
 float light=ring*.7+ring2*.28+fluid*.24+glow;
 vec3 base=vec3(.035,.033,.031);
 vec3 orange=vec3(1.0,.15,.025);
 vec3 color=base+orange*light;
 color+=vec3(hash(gl_FragCoord.xy+u_time)-.5)*.015;
 gl_FragColor=vec4(color,1.0);
}`;

export default function LiquidField(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
   const canvas=canvasRef.current;
   if(!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const gl=canvas.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});
   if(!gl)return;
   const shader=(type:number,src:string)=>{const s=gl.createShader(type);if(!s)return null;gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s};
   const vs=shader(gl.VERTEX_SHADER,vert),fs=shader(gl.FRAGMENT_SHADER,frag);
   if(!vs||!fs)return;
   const program=gl.createProgram();if(!program)return;
   gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
   if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
   gl.useProgram(program);
   const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const pos=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
   const res=gl.getUniformLocation(program,'u_res'),time=gl.getUniformLocation(program,'u_time'),mouse=gl.getUniformLocation(program,'u_mouse');
   let width=0,height=0,frame=0,visible=false,start=performance.now(),mx=0,my=0;
   function resize(){if(!canvas||!gl)return;const rect=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,1.25);const w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);if(w!==width||h!==height){width=w;height=h;canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}}
   function render(now:number){if(!gl)return;resize();gl.uniform2f(res,width,height);gl.uniform1f(time,(now-start)/1000);gl.uniform2f(mouse,mx,my);gl.drawArrays(gl.TRIANGLES,0,6);if(visible)frame=requestAnimationFrame(render);}
   const observer=new IntersectionObserver(entries=>{const next=entries[0]?.isIntersecting ?? false;if(next&&!visible){visible=true;frame=requestAnimationFrame(render)}else if(!next){visible=false;cancelAnimationFrame(frame)}},{threshold:0});observer.observe(canvas);
   const move=(ev:PointerEvent)=>{const r=canvas.getBoundingClientRect();mx=(ev.clientX-r.left)/r.width-.5;my=.5-(ev.clientY-r.top)/r.height;};const parent=canvas.parentElement;parent?.addEventListener('pointermove',move);
   return ()=>{visible=false;cancelAnimationFrame(frame);observer.disconnect();parent?.removeEventListener('pointermove',move);gl.deleteBuffer(buf);gl.deleteShader(vs);gl.deleteShader(fs);gl.deleteProgram(program)};
 },[]);
 return <canvas className="liquid-field" ref={canvasRef} aria-hidden="true"/>;
}
