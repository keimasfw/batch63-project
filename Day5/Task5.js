
//init var for element projectForm and result
const projectForm = document.getElementById("projectForm"); 
const result = document.getElementById("result");

let projects = [];

projectForm.addEventListener("submit", function (e) {
  e.preventDefault(); //make action of submit button

  // get data from value form
  const name = document.getElementById("project-name").value;
  const startDate = document.getElementById("date-start").value;
  const endDate = document.getElementById("end-date").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("upload-files").files[0];

  // checkbox radio
  const technology = [];
  if (document.getElementById("tech-node").checked) technology.push("fa-node-js");
  if (document.getElementById("tech-react").checked) technology.push("fa-react");
  if (document.getElementById("tech-next").checked) technology.push("fa-nuget");
  if (document.getElementById("tech-typescript").checked) technology.push("fa-code");

  // count duration of start and end date
  const start = new Date(startDate);
  const end = new Date(endDate);

// count times within milisecond
const timeDiff = end - start;

// change milisecond into day (1 day = 1000 ms * 60 hr * 60 mnt * 24 hr)
const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

// show duration within day
const duration = `${dayDiff} day`;


  // change data files into URL
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageURL = event.target.result;

    // save project from get data form value
    projects.push({
      name,
      duration,
      description,
      technology,
      image: imageURL
    });

    // display all project
    displayProjects();
  };

  if (!name || !startDate || !endDate || !description){
    alert("Please fill the form");
    return;
  }
  
  // condition user must upload image
  if (image) {
    reader.readAsDataURL(image);
  } else {
    alert("Please upload image");
  }

});

// create function for displayProjects (show project has been clicked by button)
function displayProjects() {
  result.innerHTML = ""; 
  //create some looping project (using for)
  for (let i = 0; i < projects.length; i++){
    const project = projects[i];

    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    // looping for icon
    let icons = "";
    for (let j = 0; j < project.technology.length; j++){
      icons += `<i class="fab ${project.technology[j]} fa-xl me-2"></i>`;
    }

    // value for innerHTML
    card.innerHTML = `
    <div class="card shadow-lg">
    <img src="${project.image}" class="card-img-top" alt="project image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="text-muted mb-1">duration: ${project.duration}</p>
            <p class="card-text">${project.description}</p>
            <div class="mb-3">
              ${icons}
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-dark px-3 btn rounded-pill">edit</button>
              <button class="btn btn-dark px-3 btn rounded-pill">delete</button>
            </div>
          </div>
        </div>
        </div>`;

        result.appendChild(card);
  }
}
