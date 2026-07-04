import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";
import { scene, camera, renderer } from "./js/scene.js";
import { createMoon } from "./js/moon.js";
import { mouse, flashlightActive } from "./js/mouse.js";
import { createFlashlight } from "./js/light.js";
import { createStars } from "./js/stars.js";
import { ambience, flashlightAudio } from "./js/audio.js";

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.2
);

scene.add(ambient);

const raycaster = new THREE.Raycaster();

const moon = createMoon();
scene.add(moon);

const target = new THREE.Vector3();

const flashlight = createFlashlight(camera);
scene.add(camera);

const { stars, twinklers } = createStars(scene);

let previousState = flashlightActive;

function animate() {
    if(previousState !== flashlightActive) {
        flashlightAudio.currentTime = 0;
        flashlightAudio.play();
        previousState = flashlightActive;
    }

    requestAnimationFrame(animate);
    const targetIntensity = flashlightActive ? 100 : 0;

    flashlight.intensity += (targetIntensity - flashlight.intensity) * 0.15;
    if (flashlightActive) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.at(15, target);
        flashlight.target.position.copy(target);
        flashlight.target.updateMatrixWorld();
    }
    moon.rotation.y += 0.0008 + Math.sin(performance.now() * 0.0002) * 0.00005;
    stars.rotation.y += 0.00001;
    stars.rotation.x += 0.000003;

    const time = performance.now() * 0.001;

    twinklers.forEach(star => {

        const brightness =
            0.3 +
            0.7 * (
                0.5 +
                0.5 * Math.sin(
                    time * star.userData.speed +
                    star.userData.offset
                )
            );

        star.material.opacity = brightness;

    });

    renderer.render(scene, camera);

}

animate();

window.addEventListener("pointerdown", () => {

    if(ambience.paused){

        ambience.play();

    }

}, { once:true });