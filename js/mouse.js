export const mouse = {
    x: 0,
    y: 0
};

export let flashlightActive = true;

const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    flashlightActive = false;
}

const torch = document.getElementById("torch");

function updatePointer(x, y) {

    // Convert screen coordinates to Three.js coordinates
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = -(y / window.innerHeight) * 2 + 1;

    // Move the glowing cursor
    if (torch) {
        torch.style.left = `${x - 9}px`;
        torch.style.top = `${y - 9}px`;
    }
}

// Desktop + Stylus + Touch (Pointer Events)
window.addEventListener("pointermove", (event) => {
    updatePointer(event.clientX, event.clientY);
});

// Extra support for mobile browsers
window.addEventListener("touchmove", (event) => {

    event.preventDefault();

    const touch = event.touches[0];

    updatePointer(
        touch.clientX,
        touch.clientY
    );

}, { passive: false });

window.addEventListener("touchstart", (event) => {

    flashlightActive = true;

    const touch = event.touches[0];

    updatePointer(
        touch.clientX,
        touch.clientY
    );

    if (torch) {
        torch.style.opacity = "1";
    }

}, { passive: false });

window.addEventListener("touchend", () => {

    flashlightActive = false;

    if (torch) {
        torch.style.opacity = "0";
    }

});