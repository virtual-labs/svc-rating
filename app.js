"use_strict";

const modal_div = document.createElement("div");
// const image_container = document.createElement("div");
let b64 = "";
let lab_data = {};

let expRating = 4.44;
let compRating = 5;

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    // mode: "no-co rs",
    cache: "no-cache",
    headers: {
      "X-Api-Key": "wBtn7JUmMYalFiBXKgS0mCvJ6iU3qtK60yAYrG10",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response;
  // return response.json(); // parses JSON response into native JavaScript objects
}

const submit_bug_report = async (
  college,
  labname,
  phase,
  expname,
  img = false,
  description = false
) => {
  const data = {
    college,
    labname,
    phase,
    expname,
    img,
    description,
  };
  console.log(
    "Submitting bug report: \ncollege: " +
      college +
      "\nlabname: " +
      labname +
      "\nphase: " +
      phase +
      "\nexpname: " +
      expname +
      "\nimg: " +
      (img ? true : img) +
      "\ndescription: " +
      description
  );
  let response = await postData(
    (url = "https://uyvac0qyuh.execute-api.us-east-2.amazonaws.com/test/"),
    data
  );
  console.log(response);
  return response;
};

const get_lab_data = () => {
  lab_data["labName"] = dataLayer[0]["labName"];
  lab_data["label"] = dataLayer[0]["college"];
  lab_data["phase"] = dataLayer[0]["phase"];
  lab_data["expName"] = dataLayer[0]["expName"];
};

const create_checkbox = (id, custom_label) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "image-checkbox";
  checkbox.value = "false";
  checkbox.id = id;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.appendChild(document.createTextNode(custom_label));
  return [label, checkbox];
};

const create_star = (id, value) => {
  const star = document.createElement("input");
  star.type = "radio";
  star.name = "stars";
  star.id = id;

  const label = document.createElement("label");
  label.htmlFor = id;
  return [star, label];
};

const create_button = () => {
  const button = document.createElement("button");
  button.id = "submit";
  button.classList += "button";
  button.innerHTML = "Submit";
  button.onclick = async () => {
    let ss_checkbox = document.getElementById("ss-chkbox");
    let tf_included = document.getElementById("bug-description").value;
    let response = await submit_bug_report(
      lab_data["label"],
      lab_data["labName"],
      lab_data["phase"],
      lab_data["expName"],
      ss_checkbox.checked ? b64 : false,
      tf_included ? tf_included : false
    );
    console.log("Response is: " + response);
    if (response.status) {
      if (response.status === 200 || response.status === 201)
        alert("Bug report submitted successfully");
    } else {
      alert("Bug report failed to submit, PLease try again");
    }
    modal_div.style.display = "none";
  };
  return button;
};

// const create_text_field = () => {
//   const tf = document.createElement("textarea");
//   tf.cols = 50;
//   tf.rows = 10;
//   tf.id = "bug-description";
//   tf.placeholder = "Please enter bug description if any";
//   return tf;
// };

const add_deps = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(link);
  const script = document.createElement("script");
  script.src =
    "https://rawcdn.githack.com/vjspranav/vleads-bug-report/2def0aae0804156d78c5aa24a8e7101c704a2dbf/client/html2canvas.js";
  document.head.appendChild(script);
};

const add_modal_box = () => {
  modal_div.classList += "modal";
  document.getElementById("rating").appendChild(modal_div);
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
  const close_button = document.createElement("span");

  // const tf = create_text_field();
  close_button.innerHTML = "&times;";
  close_button.classList += "close";
  close_button.onclick = () => {
    modal_div.style.display = "none";
  };
  let data = document.createElement("p");
  data.innerHTML = "Rate the experiment component!";
  modal_content.appendChild(close_button);
  modal_content.appendChild(data);
  modal_div.appendChild(modal_content);
  // modal_content.appendChild(ss_checkbox);
  // modal_content.appendChild(ss_label);
  // image_container.id = "image-cotainer";
  // modal_content.appendChild(image_container);
  // modal_content.appendChild(tf);
  const star_div = document.createElement("div");
  star_div.classList += "star-div";
  const starIDs = ["star-a", "star-b", "star-c", "star-d", "star-e"];
  const starValues = ["5", "4", "3", "2", "1"];
  let i;
  for (i = 0; i < 5; i++) {
    const [star, label] = create_star(starIDs[i], starValues[i]);
    star_div.appendChild(star);
    star_div.appendChild(label);
  }
  modal_content.appendChild(star_div);
  modal_content.appendChild(create_button());
};

const add_display_box = () => {
  const button_div = document.getElementById("rating");
  const component_rating_div = display_rating(compRating, "component-rating");
  const experiment_rating_div = display_rating(expRating, "experiment-rating");
  const experiment_heading = document.createElement("h3");
  experiment_heading.innerHTML = "Experiment Rating";
  button_div.appendChild(experiment_heading);
  button_div.appendChild(experiment_rating_div);
  const component_heading = document.createElement("h3");
  component_heading.innerHTML = "Component Rating";
  button_div.appendChild(component_heading);
  button_div.appendChild(component_rating_div);
  const button = document.createElement("button");
  button.id = "rating-button";
  button.innerHTML = "Rate this component";
  button_div.appendChild(button);
  button.onclick = () => {
    // var canvas = document.createElement("canvas");
    // // canvas.scale = 0.3;
    // var opts = {
    //   // canvas: canvas,
    //   logging: true,
    //   useCORS: true,
    // };
    // html2canvas(document.body, opts).then(function (canvas) {
    //   canvas.id = "image-canva";
    //   image_container.innerHTML = "";
    //   image_container.appendChild(canvas);
    //   let dataURL = canvas.toDataURL();
    //   b64 = dataURL.split(",")[1];
    // });
    modal_div.style.display = "block";
    get_lab_data();
    console.log(lab_data);
  };
};

window.onclick = function (event) {
  if (event.target == modal_div) {
    modal_div.style.display = "none";
  }
};

add_deps();
add_modal_box();
add_display_box();
populate_modal();
