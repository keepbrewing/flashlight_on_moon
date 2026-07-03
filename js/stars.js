import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";

export function createStars(scene) {

    const starCount = 8000;
    const positions = [];

    for (let i = 0; i < starCount; i++) {

        positions.push(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        );

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.3,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // ---------- Twinkling Stars ----------

    const twinklers = [];

    const starGeometry = new THREE.SphereGeometry(0.18, 8, 8);

    for (let i = 0; i < 40; i++) {

        const star = new THREE.Mesh(
            starGeometry,
            new THREE.MeshBasicMaterial({
                color: 0xfff8e8
            })
        );

        star.position.set(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        );

        // Each star twinkles at a different speed
        star.userData.offset = Math.random() * Math.PI * 2;
        star.userData.speed = 0.5 + Math.random();

        scene.add(star);

        twinklers.push(star);

    }

    return twinklers;

}