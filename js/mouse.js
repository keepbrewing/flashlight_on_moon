export const mouse = {
    x: 0,
    y: 0
};

const torch = document.getElementById("torch");

window.addEventListener("pointermove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    torch.style.left = `${event.clientX - 9}px`;
    torch.style.top = `${event.clientY - 9}px`;
});