export function BoardProject() {

const projectBox = document.getElementById("projectbox");
const boardSection = document.getElementById("board-section");
const projectSection = document.getElementById("project-section");

projectBox.addEventListener("click", () => {
  if (boardSection.style.display === "none") {
    boardSection.style.display = "block";
    projectSection.style.display = "none";
  } else {
    boardSection.style.display = "none";
    projectSection.style.display = "block";
  }
});

}