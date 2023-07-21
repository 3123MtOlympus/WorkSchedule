
const currentDate = moment().format("MMMM Do YYYY");
document.getElementById("currentDay").textContent = currentDate;


function updateEventColors() {
  const currentHour = moment().hour();


  document.querySelectorAll(".time-block").forEach((block) => {
    const hour = parseInt(block.querySelector(".event").dataset.time);


    if (hour < currentHour) {
      block.classList.add("past");
    } else if (hour === currentHour) {
      block.classList.add("present");
    } else {
      block.classList.add("future");
    }
  });
}


function saveEvent(eventTime) {
  const eventText = document.querySelector(`textarea[data-time="${eventTime}"]`).value;
  localStorage.setItem(`event-${eventTime}`, eventText);
}


function loadSavedEvents() {
  document.querySelectorAll(".time-block").forEach((block) => {
    const eventTime = parseInt(block.querySelector(".event").dataset.time);
    const savedEvent = localStorage.getItem(`event-${eventTime}`);
    if (savedEvent) {
      block.querySelector(".event").value = savedEvent;
    }
  });
}


document.querySelectorAll(".saveBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const eventTime = parseInt(this.dataset.time);
    saveEvent(eventTime);
  });
});


updateEventColors();


loadSavedEvents();

setInterval(updateEventColors, 60000);
