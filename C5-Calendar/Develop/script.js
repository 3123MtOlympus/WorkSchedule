// Get the current date
const currentDate = moment().format("MMMM Do YYYY");
document.getElementById("currentDay").textContent = currentDate;

// Function to update time blocks' colors based on the current time
function updateEventColors() {
  const currentHour = moment().hour();

  // Loop through each time block
  document.querySelectorAll(".time-block").forEach((block) => {
    const hour = parseInt(block.querySelector(".event").dataset.time);

    // Check if the hour is in the past, present, or future
    if (hour < currentHour) {
      block.classList.add("past");
    } else if (hour === currentHour) {
      block.classList.add("present");
    } else {
      block.classList.add("future");
    }
  });
}

// Save event to local storage
function saveEvent(eventTime) {
  const eventText = document.querySelector(`textarea[data-time="${eventTime}"]`).value;
  localStorage.setItem(`event-${eventTime}`, eventText);
}

// Load saved events from local storage
function loadSavedEvents() {
  document.querySelectorAll(".time-block").forEach((block) => {
    const eventTime = parseInt(block.querySelector(".event").dataset.time);
    const savedEvent = localStorage.getItem(`event-${eventTime}`);
    if (savedEvent) {
      block.querySelector(".event").value = savedEvent;
    }
  });
}

// Event listener for save buttons
document.querySelectorAll(".saveBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const eventTime = parseInt(this.dataset.time);
    saveEvent(eventTime);
  });
});

// Update colors on page load
updateEventColors();

// Load saved events on page load
loadSavedEvents();

// Update colors every minute to handle the current time change
setInterval(updateEventColors, 60000);
