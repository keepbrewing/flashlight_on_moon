import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050A);

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,0,0);

export const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);