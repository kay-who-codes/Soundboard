// Reference to the soundboard container
const soundboard = document.getElementById("soundboard");

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
        const audio = new Audio(`sounds/${file}`);
        audio.play();

        // Add flash effect
        button.classList.add("flash");
        setTimeout(() => button.classList.remove("flash"), 300);
      });
    });
  })
  .catch(error => console.error("Error fetching sounds.json:", error));
