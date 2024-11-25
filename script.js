// Reference to the soundboard container
const soundboard = document.getElementById("soundboard");

// Store a reference to the currently playing audio
let currentAudio = null;
let currentButton = null;

// Function to convert file names to Title Case (e.g., "airhorn.mp3" -> "Airhorn")
const toTitleCase = (str) => {
  return str
    .replace(/\.(mp3|m4a)$/, "") // Remove .mp3 or .m4a extensions
    .split(" ") // Split words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalise each word
    .join(" ");
};

// Function to stop the currently playing audio
const stopCurrentAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Reset to the beginning
    currentAudio = null;
  }
  if (currentButton) {
    currentButton.textContent = currentButton.getAttribute("data-original-text"); // Revert text
    currentButton.classList.remove("flash"); // Remove any flash effect
  }
};

// Generate buttons for each category and its sounds
const generateButtons = (categories) => {
  for (const [category, sounds] of Object.entries(categories)) {
    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = category;
    soundboard.appendChild(categoryHeading);

    const categoryContainer = document.createElement("div");
    categoryContainer.className = "category-container";
    soundboard.appendChild(categoryContainer);

    sounds.forEach(file => {
      const button = document.createElement("button");
      button.className = "sound-button";
      button.textContent = toTitleCase(file); // Capitalise and remove extensions
      button.setAttribute("data-sound", file); // Store the filename as a data attribute
      button.setAttribute("data-original-text", button.textContent); // Store original text for later use
      categoryContainer.appendChild(button);

      // Add click event to play/stop the corresponding sound
      button.addEventListener("click", () => {
        if (currentAudio && currentAudio.src.endsWith(file) && !currentAudio.paused) {
          // If the same button is pressed and the sound is playing, stop it
          stopCurrentAudio();
        } else {
          // Otherwise, stop any current sound and play the new one
          stopCurrentAudio();
          const audio = new Audio(`sounds/${file}`);
          currentAudio = audio;
          currentButton = button;
          button.textContent = "⏸️"; // Show pause icon while sound is playing
          audio.play();

          // Add flash effect
          button.classList.add("flash");
          setTimeout(() => button.classList.remove("flash"), 300);

          // Remove flash effect when the audio ends
          audio.addEventListener("ended", () => {
            button.textContent = button.getAttribute("data-original-text"); // Restore original text
            currentAudio = null; // Clear the reference when finished
            currentButton = null;
          });
        }
      });
    });
  }
};

// Fetch and sort the list of sounds from categories
const categories = {
  "🎲 General": [
    "airhorn.mp3", "applause.mp3", "Badum Tss.mp3", "Fail Horn.mp3", 
    "Fail Tuba.mp3", "Glass breaking.mp3", "Goofy car horn.mp3", 
    "laugh.mp3", "Mouse click.mp3", "Munch.mp3", "Notification.mp3", 
    "Punch.mp3", "Record scratch.mp3", "Splat.mp3", "Suspense.mp3", 
    "Whip.mp3", "Windows Error.mp3", "wrong answer.mp3", "Gasp.MP3",
    "Train Whistle.mp3", "Unzip.mp3"
  ].sort((a, b) => a.localeCompare(b)),

  "🤡 Meme": [
    "Ain't Got Time.mp3", "Another one.mp3", "Are you sure.mp3", "Bruh.mp3",
    "Curb your enthusiasm.mp3", "Daaamn.mp3", "Deez Nuts.mp3", 
    "Dun, Dun, DUUUNNNNN.mp3", "ha, gay.mp3", "Immeasurable Disappointment.m4a", 
    "John Cena.mp3", "You a Gay.mp3", "OHHHH.m4a", "Noice.mp3",
    "sad violin.mp3", "snore.mp3", "Stop it.m4a", "Surprise.mp3",
    "The more you know.m4a"
  ].sort((a, b) => a.localeCompare(b)),

  "🎮 Gaming": [
    "Achievement Unlocked.mp3", "Game Over.mp3", "Get Over Here.mp3",
    "Mario Power Up.mp3", "Minecraft Injury.m4a", "Wasted.mp3", "Exclamation.mp3",
  ].sort((a, b) => a.localeCompare(b)),

  "🎬 TV & Film": [
    "Batman Transition.mp3", "Countdown.mp3", "Inception.mp3", 
    "Law & Order.mp3", "Violin Screech.mp3", "Wilhelm scream.mp3", "Hasta La Vista Baby.mp3",
    "I’ll Be Back.mp3", "NOOOO.mp3", "Nein!.mp3", "That is numberwang.mp3",
    "You Shall Not Pass.mp3"
  ].sort((a, b) => a.localeCompare(b)),

  "💨 Farts": [
    "All-Round Fart.mp3", "Deeper Fart.mp3", "Extended Fart.mp3", "Microfart.mp3",
    "Minifart.mp3", "Shot Fart.mp3", "Wet Fart.mp3", "deep fart.mp3", "quick fart.mp3"
  ].sort((a, b) => a.localeCompare(b)),

  "🐾 Animals": [
    "Crow.mp3", "Dog Growl & Bark.mp3", "Meow 2.mp3", "Meow.mp3", "Rooster.mp3",
    "Screaming Goat.mp3"
  ].sort((a, b) => a.localeCompare(b)),
};

// Call the function to generate the sound buttons
generateButtons(categories);

// DARK MODE / LIGHT MODE TOGGLE FUNCTIONALITY
const themeSwitch = document.getElementById("themeSwitch");

// Add event listener for the theme switch toggle
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

// MOBILE DROPDOWN TOGGLE FUNCTIONALITY
const dropdownButton = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

dropdownButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent click from bubbling up to document
  dropdown.classList.toggle('open'); // Toggle dropdown open/close
});

// Close dropdown if clicking outside of it
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
    dropdown.classList.remove('open'); // Remove 'open' if outside click
  }
});
