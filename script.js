// Select all the elements that should contain stars
const starContainers = document.querySelectorAll(".content__stars");

// SVG star templates
const filledStar = `
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="#ffd027" d="M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z"></path>
  </svg>
`;

const halfStar = `
  <svg viewBox="0 0 24 24" width="24" height="24">
    <defs>
      <linearGradient id="halfGradient">
        <stop offset="50%" stop-color="#ffd027"></stop>
        <stop offset="50%" stop-color="#CBD5E0"></stop>
      </linearGradient>
    </defs>
    <path fill="url(#halfGradient)" d="M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z"></path>
  </svg>
`;

const emptyStar = `
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="#CBD5E0" d="M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z"></path>
  </svg>
`;

// Function to generate stars
function generateStars(starCount) {
  let starHTML = "<ul class='content__stars' style='display: flex;'>";
  const wholeStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 >= 0.5;

  // Generate whole filled stars
  for (let i = 0; i < wholeStars; i++) {
    starHTML += `<li>${filledStar}</li>`;
  }

  // Generate half star if needed
  if (hasHalfStar) {
    starHTML += `<li>${halfStar}</li>`;
  }

  // Generate empty stars for the remaining slots
  for (let i = wholeStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    starHTML += `<li>${emptyStar}</li>`;
  }

  starHTML += "</ul>";
  return starHTML;
}

// Go through all star containers and insert the correct number of stars
starContainers.forEach((container) => {
  const starCount = parseFloat(container.getAttribute("data-stars"));
  container.innerHTML = generateStars(starCount);
});

const popup = document.getElementById("popup");
const showPopupSection = document.getElementById("show-popup");
const sourcesSection = document.querySelector(".sources");

function showPopup() {
  popup.style.bottom = "0";
}

function hidePopup() {
  popup.style.bottom = "-100%";
}

window.addEventListener("scroll", () => {
  const showPopupRect = showPopupSection.getBoundingClientRect();
  const sourcesRect = sourcesSection.getBoundingClientRect();

  const isShowPopupVisible = showPopupRect.bottom <= window.innerHeight;
  const isAboveViewport = showPopupRect.bottom >= window.innerHeight;
  const isSourcesVisible =
    sourcesRect.top <= window.innerHeight && sourcesRect.bottom >= 0;

  if (isShowPopupVisible && !isSourcesVisible) {
    showPopup();
  } else if (isAboveViewport || isSourcesVisible) {
    hidePopup();
  }
});
