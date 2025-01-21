export function Calendar() {
    const calendarButton = document.querySelector("#calendar-button");
    const calendarContainer = document.querySelector("#calendar-container");

    // Initially hide the calendar using 'hidden' class
    calendarContainer.classList.add("hidden");

    // Event listener to toggle the calendar visibility
    calendarButton.addEventListener("click", toggleCalendar);

    // Event listener to close the calendar when clicking outside of it
    calendarContainer.addEventListener("click", closeCalendar);

    // Initialize the calendar UI
    const monthYearDisplay = document.querySelector("#month-year-display");
    const calendarDays = document.querySelector(".calendar-days");
    let currentDate = new Date();

    // Render the calendar for the current date
    renderCalendar(currentDate, monthYearDisplay, calendarDays);
}

function toggleCalendar() {
    const calendarContainer = document.querySelector("#calendar-container");
    // Toggle visibility using 'hidden' class
    calendarContainer.classList.toggle("hidden");
}

function closeCalendar(event) {
    const calendarContainer = document.querySelector("#calendar-container");
    if (event.target === calendarContainer) {
        calendarContainer.classList.add("hidden"); // Close the calendar if clicked outside
    }
}

function renderCalendar(date, monthYearDisplay, calendarDays) {
    // Clear previous calendar content
    calendarDays.innerHTML = "";
    monthYearDisplay.innerText = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;

    // Get the number of days in the current month
    const numberOfDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Loop through each day of the month and render it
    for (let i = 1; i <= numberOfDaysInMonth; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerText = i;

        // Add an event listener to each day to select the date
        dayElement.addEventListener("click", () => selectDate(day));
        calendarDays.appendChild(dayElement);
    }
}

function selectDate(date) {
    const selectedDay = document.querySelector(".selected");
    if (selectedDay) {
        selectedDay.classList.remove("selected");
    }
    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach((dayElement) => {
        if (parseInt(dayElement.innerText) === date.getDate()) {
            dayElement.classList.add("selected");
        }
    });
}
