// Attach event listeners to each button
document.querySelectorAll('.sound-button').forEach(button => {
  button.addEventListener('click', () => {
    const soundName = button.getAttribute('data-sound');
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();

    // Add flash animation
    button.classList.add('flash');
    setTimeout(() => button.classList.remove('flash'), 300); // Remove class after animation
  });
});
