export function Calendar() {
    // Get references to calendar-related elements
    const calendarContainer = document.getElementById("calendar-container");
    const prevMonthButton = document.getElementById("prev-month-button");
    const nextMonthButton = document.getElementById("next-month-button");
    const monthYearDisplay = document.getElementById("month-year-display");
    const calendarDays = document.querySelector(".calendar-days");
    const startDateButton = document.getElementById("start-date-button");
    const dueDateButton = document.getElementById("due-date-button");
  
    // Validate existence of required DOM elements
    if (
      !calendarContainer ||
      !prevMonthButton ||
      !nextMonthButton ||
      !monthYearDisplay ||
      !calendarDays ||
      !startDateButton ||
      !dueDateButton
    ) {
      console.error("Calendar component: Missing required DOM elements.");
      return;
    }
  
    // Initialize calendar state
    const today = new Date();
    let displayedMonth = today.getMonth();
    let displayedYear = today.getFullYear();
    let selectedButton = null; // Track the button that was clicked to trigger the calendar
  
    // Function to render the calendar
    function renderCalendar(month, year) {
      // Clear existing days
      calendarDays.innerHTML = "";
  
      // Update the month and year display
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
  
      // Get the first day of the month and the total number of days
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day", "empty");
        calendarDays.appendChild(emptyCell);
      }
  
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;
  
        // Highlight today's date if it matches the displayed month and year
        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          dayCell.classList.add("selected");
        }
  
        // Add click event to select a date
        dayCell.addEventListener("click", () => {
          // Clear the `.selected` class from all days
          calendarDays
            .querySelectorAll(".day")
            .forEach((d) => d.classList.remove("selected"));
          dayCell.classList.add("selected");
  
          // Update the button with the selected date
          const selectedDate = new Date(year, month, day);
          if (selectedButton) {
            selectedButton.textContent = selectedDate.toLocaleDateString();
          }
  
          // Hide the calendar
          calendarContainer.classList.add("hidden");
        });
  
        calendarDays.appendChild(dayCell);
      }
    }
  
    // Event listeners for navigation
    prevMonthButton.addEventListener("click", () => {
      displayedMonth--;
      if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
      }
      renderCalendar(displayedMonth, displayedYear);
    });
  
    nextMonthButton.addEventListener("click", () => {
      displayedMonth++;
      if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
      }
      renderCalendar(displayedMonth, displayedYear);
    });
  
    // Show calendar when a button is clicked
    startDateButton.addEventListener("click", (e) => {
      selectedButton = e.target;
      calendarContainer.classList.remove("hidden");
      renderCalendar(displayedMonth, displayedYear);
    });
  
    dueDateButton.addEventListener("click", (e) => {
      selectedButton = e.target;
      calendarContainer.classList.remove("hidden");
      renderCalendar(displayedMonth, displayedYear);
    });
  
    // Close calendar if clicked outside
    document.addEventListener("click", (e) => {
      if (
        !calendarContainer.contains(e.target) &&
        e.target.id !== "start-date-button" &&
        e.target.id !== "due-date-button"
      ) {
        calendarContainer.classList.add("hidden");
      }
    });
  
    // Render the calendar initially
    renderCalendar(displayedMonth, displayedYear);
  }