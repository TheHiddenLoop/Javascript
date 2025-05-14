document.querySelector(".card-inner").addEventListener("click", () => {
  document.getElementById("cardContainer").classList.toggle("flip");
});

document.getElementById("generateBtn").addEventListener("click", function () {
  const companyName =
    document.getElementById("companyName").value || "YOUR NAME";
  const tagline =
    document.getElementById("tagline").value || "YOUR TAGLINE HERE";
  const personName =
    document.getElementById("personName").value || "TOMMY SMITH";
  const address =
    document.getElementById("address").value || "ADDRESS FLOOR\n9555 7893";
  const email =
    document.getElementById("email").value ||
    "email@domain.com\nwww.website.com";
  const website =
    document.getElementById("website").value ||
    "website.domain.com\nanother.domain.com";

  document.querySelector(".company-name").textContent = companyName;
  document.querySelector(".tagline").textContent = tagline;

  document.querySelector(".person-name").textContent = personName;
  document.querySelector(".back-tagline").textContent = tagline;

  const contactTexts = document.querySelectorAll(".contact-text");
  contactTexts[0].innerHTML = address.replace(/\n/g, "<br>");
  contactTexts[1].innerHTML = email.replace(/\n/g, "<br>");
  contactTexts[2].innerHTML = website.replace(/\n/g, "<br>");

  const logoUpload = document.getElementById("logoUpload");
  if (logoUpload.files && logoUpload.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const frontLogo = document.getElementById("frontLogo");
      const backLogo = document.getElementById("backLogo");

      frontLogo.innerHTML = "";
      backLogo.innerHTML = "";

      const frontImg = document.createElement("img");
      frontImg.src = e.target.result;
      frontImg.classList.add("uploaded-logo");
      frontLogo.appendChild(frontImg);

      const backImg = document.createElement("img");
      backImg.src = e.target.result;
      backImg.classList.add("back-uploaded-logo");
      backLogo.appendChild(backImg);
    };

    reader.readAsDataURL(logoUpload.files[0]);
  } else {
    const frontLogo = document.getElementById("frontLogo");
    const backLogo = document.getElementById("backLogo");

    frontLogo.innerHTML = "";
    backLogo.innerHTML = "";

    const createFlowerLogo = (container) => {
      for (let i = 0; i < 8; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        container.appendChild(petal);
      }
      const center = document.createElement("div");
      center.className = "center-circle";
      container.appendChild(center);
    };

    createFlowerLogo(frontLogo);
    createFlowerLogo(backLogo);
  }

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.classList.add("generated");
  setTimeout(() => {
    cardContainer.classList.remove("generated");
  }, 1000);

  if (window.innerWidth <= 1100) {
    document
      .querySelector(".preview-container")
      .scrollIntoView({ behavior: "smooth" });
  }
});
