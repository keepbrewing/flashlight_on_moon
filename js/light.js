import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";

export function createFlashlight(camera) {

    const flashlight = new THREE.SpotLight(
        0xffffff,
        100,
        100,
        Math.PI / 8,
        0.3,
        2
    );

    flashlight.position.set(0, 0, 0);

    flashlight.target.position.set(0, 0, -10);

    camera.add(flashlight);
    camera.add(flashlight.target);

    return flashlight;

}