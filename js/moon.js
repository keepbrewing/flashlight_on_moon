import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";

export function createMoon() {

    // Load the texture
    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load(
        "./textures/moon_color.jpg"
    );
    const moonAO = textureLoader.load(
        "./textures/moon_ao.jpg"
    );

    const moonDisplacement = textureLoader.load(
        "./textures/moon_displacement.png"
    );

    // Geometry
    const geometry = new THREE.SphereGeometry(
        8,
        256,
        256
    );

    // Material
    const material = new THREE.MeshStandardMaterial({
        map: moonTexture,

        displacementMap: moonDisplacement,

        displacementScale: 0.25,

        roughness: 1.0
    });

    // Mesh
    const moon = new THREE.Mesh(
        geometry,
        material
    );

    const haloGeometry = new THREE.SphereGeometry(
        8.25,
        64,
        64
    );

    const haloMaterial = new THREE.MeshBasicMaterial({

        color: 0x88aaff,

        transparent: true,

        opacity: 0.05,

        side: THREE.BackSide

    });

    const halo = new THREE.Mesh(
        haloGeometry,
        haloMaterial
    );

    moon.add(halo);

    // Position
    moon.position.set(0, 0, -19);

    return moon;

}