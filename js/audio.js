const ambience = new Audio("./audio/ambience.mp3");

ambience.loop = true;
ambience.volume = 1;

const flashlightAudio = new Audio("./audio/flashlight.mp3");

flashlightAudio.volume = 0.4;

export {
    ambience,
    flashlightAudio
};