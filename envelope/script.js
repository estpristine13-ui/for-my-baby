// Select the main envelope wrapper element from the DOM
const wrapper = document.querySelector(".envelope-wrapper");

// Select the letter element (the paper inside the envelope)
const letter = document.querySelector(".letter");

// Listen for any click event on the entire document
document.addEventListener("click", (e) => {
    // First condition: check if the user clicked on one of the envelope parts
    if (
        e.target.matches(".envelope") ||     // Clicked on an element with class "envelope" (currently not in HTML)
        e.target.matches(".right-flap") ||   // Clicked on the right flap of the envelope
        e.target.matches(".left-flap") ||    // Clicked on the left flap of the envelope
        e.target.matches(".sticker")         // Clicked on the sticker in the middle
    ) {
        // Toggle the "open" class on the envelope wrapper
        // This triggers CSS animations for the flap and sticker
        wrapper.classList.toggle("open");

        // Add a class to deactivate some interactions (class name used here is "deactivate-envelope")
        // NOTE: In CSS, there is a class named "deactivate-wrapper", so this may be a mismatch.
        wrapper.classList.add("deactivate-envelope");

        // If the letter is not already in the "open" state
        if (!letter.classList.contains("open")) {
            // Wait 1 second before starting to move the letter
            setTimeout(() => {
                // Add "show-letter" class to animate the letter coming out
                letter.classList.add("show-letter");

                // After 0.5 seconds, switch from "show-letter" to "open"
                setTimeout(() => {
                    // Remove the temporary class used for the initial animation
                    letter.classList.remove("show-letter");
                    // Mark the letter as "open" (used in CSS for z-index and/or future logic)
                    letter.classList.add("open");
                }, 500); // 500ms delay to let the animation play
            }, 1000); // 1000ms delay to sync with flap opening
        }
    }
    // Second condition: click inside the envelope wrapper, but not on the specific clickable parts above
    else if (e.target.matches(".envelope-wrapper *")) {
        // Remove the "open" class from the wrapper to close the envelope
        wrapper.classList.remove("open");

        // Remove the class that deactivates the envelope (if present)
        wrapper.classList.remove("deactivate-envelope");

        // If the letter is currently marked as open
        if (letter.classList.contains("open")) {
            // Add a class for closing animation
            // NOTE: The CSS uses ".closing-letter", but here it is "closing-envelope"
            letter.classList.add("closing-envelope");

            // After 0.5 seconds, remove closing classes and reset state
            setTimeout(() => {
                // Remove the closing animation class (different name in CSS: "closing-letter")
                letter.classList.remove("closing-letter");
                // Remove the "open" state from the letter
                letter.classList.remove("open");
            }, 500); // Wait for the closing animation to complete
        }
    }
});
