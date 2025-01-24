export function BoardProject() {
  const projectBox = document.getElementById("projectbox");
  const boardSection = document.getElementById("board-section");
  const projectSection = document.getElementById("project-section");
  const triangleSymbol = document.createElement("div");

  // Add triangle symbol to projectBox
  triangleSymbol.id = "triangle-symbol";
  triangleSymbol.classList.add("triangle-right"); // Default direction
  projectBox.prepend(triangleSymbol);

  projectBox.addEventListener("click", () => {
    if (boardSection.style.display === "none") {
      boardSection.style.display = "block";
      projectSection.style.display = "none";
      triangleSymbol.classList.remove("triangle-down");
      triangleSymbol.classList.add("triangle-right");
    } else {
      boardSection.style.display = "none";
      projectSection.style.display = "block";
      triangleSymbol.classList.remove("triangle-right");
      triangleSymbol.classList.add("triangle-down");
    }
  });
}
