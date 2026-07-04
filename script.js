import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";
import { scene, camera, renderer } from "./js/scene.js";
import { createMoon } from "./js/moon.js";
import { mouse, flashlightActive } from "./js/mouse.js";
import { createFlashlight } from "./js/light.js";
import { createStars } from "./js/stars.js";

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

const twinklers = createStars(scene);

function animate() {

    requestAnimationFrame(animate);
    if (flashlightActive) {
        flashlight.intensity = 100;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.at(15, target);
        flashlight.target.position.copy(target);
        flashlight.target.updateMatrixWorld();
    }
    else {
        const targetIntensity = flashlightActive ? 100 : 0;
        flashlight.intensity += (targetIntensity - flashlight.intensity) * 0.15;
    }
    moon.rotation.y += 0.001;

    const time = performance.now() * 0.001;

    twinklers.forEach(star => {

        const brightness =
            0.4 +
            0.6 * Math.sin(
                time * star.userData.speed +
                star.userData.offset
            );

        star.material.opacity = brightness;
        star.material.transparent = true;

    });

    renderer.render(scene, camera);

}

animate();