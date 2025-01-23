export function Calendar() {
  const calendarContainer = document.getElementById("calendar-container");
  const prevMonthButton = document.getElementById("prev-month-button");
  const nextMonthButton = document.getElementById("next-month-button");
  const monthYearDisplay = document.getElementById("month-year-display");
  const calendarDays = document.querySelector(".calendar-days");
  const startDateButton = document.getElementById("start-date-button");
  const dueDateButton = document.getElementById("due-date-button");

  let displayedMonth = new Date().getMonth();
  let displayedYear = new Date().getFullYear();
  let selectedButton = null;
  let startDate = null;
  let dueDate = null;

  function renderCalendar(month, year) {
    calendarDays.innerHTML = "";
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("day", "empty");
      calendarDays.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("day");
      dayCell.textContent = day;

      const date = new Date(year, month, day);

      if (
        (startDate && date.getTime() === startDate.getTime()) ||
        (dueDate && date.getTime() === dueDate.getTime())
      ) {
        dayCell.classList.add("selected");
      }

      dayCell.addEventListener("click", () => {
        const selectedDate = new Date(year, month, day);

        if (selectedButton === startDateButton) {
          if (dueDate && selectedDate > dueDate) {
            alert("Start date must be less than or equal to the due date.");
            return;
          }
          startDate = selectedDate;
          startDateButton.textContent = selectedDate.toLocaleDateString();
        } else if (selectedButton === dueDateButton) {
          if (startDate && selectedDate < startDate) {
            alert("Due date must be greater than or equal to the start date.");
            return;
          }
          dueDate = selectedDate;
          dueDateButton.textContent = selectedDate.toLocaleDateString();
        }

        calendarContainer.classList.add("hidden");
        renderCalendar(displayedMonth, displayedYear); // Re-render to update selected days
      });

      calendarDays.appendChild(dayCell);
    }
  }

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

  document.addEventListener("click", (e) => {
    if (
      !calendarContainer.contains(e.target) &&
      e.target.id !== "start-date-button" &&
      e.target.id !== "due-date-button"
    ) {
      calendarContainer.classList.add("hidden");
    }
  });

  renderCalendar(displayedMonth, displayedYear);
}
