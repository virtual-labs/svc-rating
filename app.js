"use_strict";

const modal_div = document.createElement("div");

let expRating;
let pageRating;
let labRating;
let ratingValue;
let expName;
let learningUnit;
let taskName;

const expSheetURL =
  "https://sheets.googleapis.com/v4/spreadsheets/1lwvnf2zXlSjIu-wI6eG0uSa-cWfRk3nX6mPS5Yn2PIs/values/Sheet2!A:B?key=AIzaSyAJ9pMGaHcmOiNeHEXQLGCiJcr5k3TV4F8";

const pageSheetURL =
  "https://sheets.googleapis.com/v4/spreadsheets/1lwvnf2zXlSjIu-wI6eG0uSa-cWfRk3nX6mPS5Yn2PIs/values/Sheet1!A:B?key=AIzaSyAJ9pMGaHcmOiNeHEXQLGCiJcr5k3TV4F8";

function getPageData() {
  const metas = document.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === "experiment_short_name") {
      expName = metas[i].getAttribute("content");
    } else if (metas[i].getAttribute("name") === "learning_unit") {
      learningUnit = metas[i].getAttribute("content");
    } else if (metas[i].getAttribute("name") === "task_name") {
      taskName = metas[i].getAttribute("content");
    }
  }
  console.log("experimentName", expName);
  console.log("TaskName", taskName);
  console.log("LUName", learningUnit);
}

async function getRating(url, name) {
  const resp = await fetch(url);
  let data = await resp.json();

  let pageData;
  pageData = data["values"];

  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i][0] === name) {
      console.log(pageData);
      console.log(pageRating);
      return pageData[i][1];
    }
  }
}

const create_star = (id, value) => {
  const star = document.createElement("input");
  star.type = "radio";
  star.name = "stars";
  star.id = id;

  const label = document.createElement("label");
  label.htmlFor = id;
  return [star, label];
};

const check_Submission = () => {
  const starIDs = ["star-a", "star-b", "star-c", "star-d", "star-e"];
  let i;
  for (i = 0; i < 5; i++) {
    const minStar = document.getElementById(starIDs[i]);
    if (minStar.checked) {
      console.log("Stars Selected");
      return true;
    }
  }
  return false;
};

const recordRating = () => {
  const starIDs = ["star-a", "star-b", "star-c", "star-d", "star-e"];
  const starValues = ["5", "4", "3", "2", "1"];
  let i;
  for (i = 0; i < 5; i++) {
    let element = document.getElementById(starIDs[i]);
    if (element.checked) {
      ratingValue = starValues[i];
      sessionStorage.setItem("UserRating", ratingValue);
      console.log(
        "sessionrating Update: ",
        sessionStorage.getItem("UserRating")
      );
      break;
    }
  }
};

const submitRating = () => {
  const userEngagementEvent = {
    event: "userEngagement",
    eventCategory: "rating",
    eventAction: taskName,
    eventLabel: learningUnit,
    eventValue: sessionStorage.getItem("UserRating"),
  };
  console.log("Submitted a rating of: ", sessionStorage.getItem("UserRating"));
  dataLayer.push(userEngagementEvent);
  // return false;
};

const cancelRating = () => {
  const starIDs = ["star-a", "star-b", "star-c", "star-d", "star-e"];
  let i;
  for (i = 0; i < 5; i++) {
    let element = document.getElementById(starIDs[i]);
    element.checked = false;
  }
};

const clearModal = () => {
  document.getElementById("user-message").innerHTML = "Thanks for Rating us!";
  document.getElementById("star-div").style.display = "none";
  document.getElementById("button-div").style.display = "none";
};

const setModal = () => {
  document.getElementById("user-message").innerHTML = "Rate the page!";
  document.getElementById("star-div").style.display = "flex";
  document.getElementById("button-div").style.display = "block";
};

const create_cancel_button = () => {
  const button = document.createElement("button");
  button.id = "cancel-button";
  button.innerHTML = "Cancel";
  button.classList += "button";
  button.onclick = () => {
    modal_div.style.display = "none";
    cancelRating();
  };
  return button;
};

const create_submit_button = () => {
  const button = document.createElement("button");
  button.id = "submit-button";
  button.classList += "button";
  button.innerHTML = "Submit";
  button.onclick = async () => {
    check_Submission();
    if (check_Submission()) {
      recordRating();
      clearModal();
    }
  };
  return button;
};

const add_deps = () => {
  const link1 = document.createElement("link");
  link1.rel = "stylesheet";
  link1.type = "text/css";
  link1.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(link1);

  const link2 = document.createElement("link");
  link2.rel = "stylesheet";
  link2.type = "text/css";
  link2.href = "./app.css";
  document.head.appendChild(link2);

  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(meta);
};

const add_modal_box = () => {
  modal_div.classList += "modal";
  if (document.getElementById("rating-page")) {
    document.getElementById("rating-page").appendChild(modal_div);
  }
};

const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const isHalf = (num) => {
  if (num % 1 == 0) {
    return false;
  } else {
    return true;
  }
};

const display_rating = (rating, cls) => {
  let roundRating = roundHalf(rating);
  let full;
  let half = 0;
  if (isHalf(roundRating)) {
    roundRating = Math.round(roundRating);
    full = roundRating - 1;
    half = 1;
  } else {
    full = roundRating;
  }
  let empty = 5 - roundRating;
  const rating_component = document.createElement("div");
  rating_component.classList += cls;
  let i;
  for (i = 0; i < full; i++) {
    const span_component = document.createElement("span");
    span_component.classList += "fa fa-star checked";
    rating_component.appendChild(span_component);
  }
  if (half != 0) {
    const span_component = document.createElement("span");
    span_component.classList += "fa fa-star-half-full";
    rating_component.appendChild(span_component);
  }
  for (i = 0; i < empty; i++) {
    const span_component = document.createElement("span");
    span_component.classList += "fa fa-star-o";
    rating_component.appendChild(span_component);
  }
  return rating_component;
};

const populate_modal = () => {
  const modal_content = document.createElement("div");
  modal_content.classList += "modal-content";

  const header = document.createElement("div");
  header.classList += "rating-header";

  const logo = document.createElement("img");
  logo.src = "./images/vlabs-color-small-moe.jpg";
  const close_button = document.createElement("span");

  close_button.innerHTML = "&times;";
  close_button.classList += "close";
  close_button.onclick = () => {
    modal_div.style.display = "none";
    cancelRating();
  };
  header.appendChild(logo);
  header.appendChild(close_button);
  modal_content.appendChild(header);

  let data = document.createElement("p");
  data.id = "user-message";
  data.innerHTML = "Rate the page!";

  modal_content.appendChild(data);
  modal_div.appendChild(modal_content);

  const star_div = document.createElement("div");
  star_div.classList += "star-div";
  star_div.id = "star-div";
  const starIDs = ["star-a", "star-b", "star-c", "star-d", "star-e"];
  const starValues = ["5", "4", "3", "2", "1"];
  let i;
  for (i = 0; i < 5; i++) {
    const [star, label] = create_star(starIDs[i], starValues[i]);
    star_div.appendChild(star);
    star_div.appendChild(label);
  }
  modal_content.appendChild(star_div);
  const button_div = document.createElement("div");
  button_div.classList += "button-div";
  button_div.id = "button-div";
  button_div.appendChild(create_submit_button());
  button_div.appendChild(create_cancel_button());
  modal_content.appendChild(button_div);
};

const display_rating_lab = () => {
  if (document.getElementById("rating-lab")) {
    const button_div = document.getElementById("rating-lab");
    const lab_rating_div = display_rating(labRating, "lab-rating");
    const lab_heading = document.createElement("h3");
    lab_heading.innerHTML = "Lab Rating";
    button_div.appendChild(lab_heading);
    button_div.appendChild(lab_rating_div);
  }
};

async function display_rating_experiment() {
  if (document.getElementById("rating-experiment")) {
    const button_div = document.getElementById("rating-experiment");
    expRating = await getRating(expSheetURL, expName);
    const experiment_rating_div = display_rating(
      expRating,
      "experiment-rating"
    );
    const experiment_heading = document.createElement("h3");
    experiment_heading.innerHTML = "Experiment Rating";
    button_div.appendChild(experiment_heading);
    button_div.appendChild(experiment_rating_div);
  }
}

async function display_rating_page() {
  if (document.getElementById("rating-page")) {
    const button_div = document.getElementById("rating-page");

    pageRating = await getRating(pageSheetURL, window.location.href);
    const component_rating_div = display_rating(pageRating, "page-rating");

    const component_heading = document.createElement("h3");
    component_heading.innerHTML = "Rating";
    button_div.appendChild(component_heading);
    button_div.appendChild(component_rating_div);
    const button = document.createElement("button");
    button.id = "rating-button";
    button.innerHTML = "Rate";
    button_div.appendChild(button);
    button.onclick = () => {
      modal_div.style.display = "flex";
    };
  }
}

window.onclick = function (event) {
  if (event.target == modal_div) {
    modal_div.style.display = "none";
    cancelRating();
    setModal();
  }
};

window.onbeforeunload = function () {
  submitRating();
};

add_deps();
add_modal_box();
getPageData();
display_rating_lab();
display_rating_experiment();
display_rating_page();
populate_modal();
