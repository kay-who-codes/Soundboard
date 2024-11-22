// Reference to the soundboard container
const soundboard = document.getElementById("soundboard");

// Store a reference to the currently playing audio
let currentAudio = null;

// Function to convert file names to Title Case (e.g., "airhorn.mp3" -> "Airhorn")
const toTitleCase = (str) => {
  return str
    .replace(".mp3", "") // Remove file extension
    .split(" ") // Split words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalise each word
    .join(" ");
};

// Fetch the list of audio files from sounds.json
fetch("sounds.json")
  .then(response => response.json())
  .then(audioFiles => {
    audioFiles.forEach(file => {
      const button = document.createElement("button");
      button.className = "sound-button";
      button.textContent = toTitleCase(file); // Use title case for the button text
      button.setAttribute("data-sound", file); // Store the filename as a data attribute
      soundboard.appendChild(button);

      // Add click event to play the corresponding sound
      button.addEventListener("click", () => {
        // Stop the currently playing sound (if any)
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; // Reset to the beginning
        }

        // Create and play the new audio
        const audio = new Audio(`sounds/${file}`);
        currentAudio = audio; // Update the reference to the current audio
        audio.play();

        // Add flash effect
        button.classList.add("flash");
        setTimeout(() => button.classList.remove("flash"), 300);

        // Remove flash effect when the audio ends
        audio.addEventListener("ended", () => {
          button.classList.remove("flash");
        });
      });
    });
  })
  .catch(error => console.error("Error fetching sounds.json:", error));
