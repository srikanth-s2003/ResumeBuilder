
      // Toggle mobile menu
      document
        .querySelector(".menu-toggle")
        .addEventListener("click", function () {
          const mainMenu = document.querySelector(".main-menu");
          if (mainMenu.style.display === "block") {
            mainMenu.style.display = "none";
          } else {
            mainMenu.style.display = "block";
          }
        });

      // Other language checkbox toggle
      document
        .getElementById("otherLangCheckbox")
        .addEventListener("change", function () {
          const otherLanguageInput = document.getElementById("otherLanguage");
          otherLanguageInput.style.display = this.checked
            ? "inline-block"
            : "none";
        });

      // Current job checkbox toggle
      document
        .getElementById("currentJob")
        .addEventListener("change", function () {
          const endDateInput = document.getElementById("endDate");
          endDateInput.disabled = this.checked;
          if (this.checked) {
            endDateInput.value = "";
          }
        });

      // Preview modal functionality
      const previewModal = document.getElementById("previewModal");
      const openPreviewBtn = document.getElementById("openPreview");
      const previewResumeBtn = document.getElementById("previewResume");
      const closePreviewBtn = document.querySelector(".close-preview");

      function openPreview() {
        previewModal.style.display = "block";
        updateResumePreview();
      }

      function closePreview() {
        previewModal.style.display = "none";
      }

      openPreviewBtn.addEventListener("click", openPreview);
      previewResumeBtn.addEventListener("click", openPreview);
      closePreviewBtn.addEventListener("click", closePreview);

      window.addEventListener("click", function (event) {
        if (event.target === previewModal) {
          closePreview();
        }
      });

      // Update resume preview with form data
      function updateResumePreview() {
        const resumeTemplate = document.getElementById("resumeTemplate");

        // Get form values
        const firstName = document.getElementById("firstName").value || "Name";
        const lastName = document.getElementById("lastName").value || "Surname";
        const email =
          document.getElementById("email").value || "example@gmail.com";
        const phone =
          document.getElementById("phone").value || "9xxxxxxxx0";
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;
        const location =
          city && country
            ? `${city}, ${country}`
            : city || country || "India";
        const linkedin =
          document.getElementById("linkedin").value ||
          "linkedin.com/";
        const jobPosition =
          document.getElementById("jobPosition").value || "Software Engineer";
        const profileSummary =
          document.getElementById("profileSummary").value ||
          "Software engineer with 5 years of experience in web development and cloud infrastructure. Passionate about creating scalable and efficient solutions using modern technologies.";

        // Update header section
        let headerHTML = `
          <div class="header">
            <h1 class="name">${firstName} ${lastName}</h1>
            <p class="title">${jobPosition}</p>
            <div class="contact-info">
              <span class="contact-item">${email}</span>
              ${phone ? `<span class="contact-item">${phone}</span>` : ""}
              ${location ? `<span class="contact-item">${location}</span>` : ""}
              ${linkedin ? `<span class="contact-item">${linkedin}</span>` : ""}
            </div>
          </div>
        `;

        // Professional summary section
        let summaryHTML = "";
        if (profileSummary) {
          summaryHTML = `
            <div class="section" style="margin-top: 10px">
              <h2 class="section-title">Professional Summary</h2>
              <p class="item-description">${profileSummary}</p>
            </div>
          `;
        }

        // Experience section
        const jobTitle = document.getElementById("jobTitle").value;
        const employer = document.getElementById("employer").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("currentJob").checked
          ? "Present"
          : document.getElementById("endDate").value;
        const jobDescription = document.getElementById("jobDescription").value;

        let experienceHTML = "";
        if (jobTitle && employer) {
          const formattedStartDate = startDate
            ? new Date(startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
          const formattedEndDate =
            endDate === "Present"
              ? "Present"
              : endDate
              ? new Date(endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : "";
          const dateRange =
            formattedStartDate || formattedEndDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : "";

          experienceHTML = `
            <div class="section">
              <h2 class="section-title">Experience</h2>
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${jobTitle}</h3>
                    <p class="item-subtitle">${employer}</p>
                  </div>
                  ${dateRange ? `<p class="date">${dateRange}</p>` : ""}
                </div>
                ${
                  jobDescription
                    ? `<p class="item-description">${jobDescription.replace(
                        /\n/g,
                        "<br />"
                      )}</p>`
                    : ""
                }
              </div>
            </div>
          `;
        }

        // Education section
        const schoolName = document.getElementById("schoolName").value;
        const degree = document.getElementById("degree").value;
        const fieldOfStudy = document.getElementById("fieldOfStudy").value;
        const graduationMonth =
          document.getElementById("graduationMonth").value;
        const graduationYear = document.getElementById("graduationYear").value;
        const gpa = document.getElementById("gpa").value;
        const educationDescription = document.getElementById(
          "educationDescription"
        ).value;

        let educationHTML = "";
        if (schoolName && degree) {
          const degreeFieldText = fieldOfStudy
            ? `${degree} in ${fieldOfStudy}`
            : degree;
          const graduationText =
            graduationMonth && graduationYear
              ? `Graduated: ${graduationMonth} ${graduationYear}`
              : "";

          educationHTML = `
            <div class="section">
              <h2 class="section-title">Education</h2>
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${degreeFieldText}</h3>
                    <p class="item-subtitle">${schoolName}</p>
                  </div>
                  ${
                    graduationText
                      ? `<p class="date">${graduationText}</p>`
                      : ""
                  }
                </div>
                ${
                  gpa || educationDescription
                    ? `<p class="item-description">
                    ${gpa ? `GPA: ${gpa}` : ""}
                    ${gpa && educationDescription ? ", " : ""}
                    ${educationDescription || ""}
                  </p>`
                    : ""
                }
              </div>
            </div>
          `;
        }

        // Skills section
        const skills = [
          document.getElementById("skill1").value,
          document.getElementById("skill2").value,
          document.getElementById("skill3").value,
          document.getElementById("skill4").value,
          document.getElementById("skill5").value,
          document.getElementById("skill6").value,
        ].filter((skill) => skill);

        let skillsHTML = "";
        if (skills.length > 0) {
          const skillItems = skills
            .map((skill) => `<li class="skill-item">${skill}</li>`)
            .join("");
          skillsHTML = `
            <div class="section">
              <h2 class="section-title">Skills</h2>
              <ul class="skills-list">
                ${skillItems}
              </ul>
            </div>
          `;
        }

        // Languages section
        const languageCheckboxes = document.querySelectorAll(
          'input[name="languages[]"]:checked'
        );
        const languages = Array.from(languageCheckboxes).map((cb) => cb.value);
        if (document.getElementById("otherLangCheckbox").checked) {
          const otherLang = document.getElementById("otherLanguage").value;
          if (otherLang) {
            languages.push(otherLang);
          }
        }

        let languagesHTML = "";
        if (languages.length > 0) {
          const languageItems = languages
            .map((lang) => `<li class="skill-item">${lang}</li>`)
            .join("");
          languagesHTML = `
            <div class="section">
              <h2 class="section-title">Languages</h2>
              <ul class="skills-list">
                ${languageItems}
              </ul>
            </div>
          `;
        }

        // Certifications section
        const certification = document.getElementById("certification").value;
        const certificationIssuer = document.getElementById(
          "certificationIssuer"
        ).value;
        const certificationDate =
          document.getElementById("certificationDate").value;

        let certificationsHTML = "";
        if (certification && certificationIssuer) {
          const formattedCertDate = certificationDate
            ? new Date(certificationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";

          certificationsHTML = `
            <div class="section">
              <h2 class="section-title">Certifications</h2>
              <div class="certification-item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${certification}</h3>
                    <p class="item-subtitle">${certificationIssuer}</p>
                  </div>
                  ${
                    formattedCertDate
                      ? `<p class="date">Issued: ${formattedCertDate}</p>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `;
        }

        // Projects section
        const projectTitle = document.getElementById("projectTitle").value;
        const projectRole = document.getElementById("projectRole").value;
        const projectDescription =
          document.getElementById("projectDescription").value;

        let projectsHTML = "";
        if (projectTitle) {
          projectsHTML = `
            <div class="section">
              <h2 class="section-title">Projects</h2>
              <div class="project-item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${projectTitle}</h3>
                    ${
                      projectRole
                        ? `<p class="item-subtitle">${projectRole}</p>`
                        : ""
                    }
                  </div>
                </div>
                ${
                  projectDescription
                    ? `<p class="item-description">${projectDescription.replace(
                        /\n/g,
                        "<br />"
                      )}</p>`
                    : ""
                }
              </div>
            </div>
          `;
        }

        // Achievements section
        const achievements = document.getElementById("achievements").value;

        let achievementsHTML = "";
        if (achievements) {
          achievementsHTML = `
            <div class="section">
              <h2 class="section-title">Achievements</h2>
              <p class="item-description">${achievements.replace(
                /\n/g,
                "<br />"
              )}</p>
            </div>
          `;
        }

        // Volunteer work section
        const volunteerWork = document.getElementById("volunteerWork").value;
        const volunteerDuration =
          document.getElementById("volunteerDuration").value;
        const volunteerDescription = document.getElementById(
          "volunteerDescription"
        ).value;

        let volunteerHTML = "";
        if (volunteerWork) {
          volunteerHTML = `
            <div class="section">
              <h2 class="section-title">Volunteer Experience</h2>
              <div class="volunteer-item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${volunteerWork}</h3>
                  </div>
                  ${
                    volunteerDuration
                      ? `<p class="date">${volunteerDuration}</p>`
                      : ""
                  }
                </div>
                ${
                  volunteerDescription
                    ? `<p class="item-description">${volunteerDescription.replace(
                        /\n/g,
                        "<br />"
                      )}</p>`
                    : ""
                }
              </div>
            </div>
          `;
        }

        // References section
        const references = document.getElementById("references").value;

        let referencesHTML = "";
        if (references) {
          referencesHTML = `
            <div class="section">
              <h2 class="section-title">References</h2>
              <p class="item-description">${references.replace(
                /\n/g,
                "<br />"
              )}</p>
            </div>
          `;
        }

        // Combine all sections
        resumeTemplate.innerHTML =
          headerHTML +
          summaryHTML +
          experienceHTML +
          educationHTML +
          skillsHTML +
          languagesHTML +
          certificationsHTML +
          projectsHTML +
          achievementsHTML +
          volunteerHTML +
          referencesHTML;
      }

      // Download PDF functionality
      document
        .getElementById("downloadPdf")
        .addEventListener("click", function () {
          // Import jsPDF from the loaded library
          const { jsPDF } = window.jspdf;

          // First ensure the resume template is updated with latest data
          updateResumePreview();

          // Use html2canvas to capture the resume content
          html2canvas(document.getElementById("resumeTemplate")).then(
            (canvas) => {
              const imgData = canvas.toDataURL("image/png");

              // A4 size: 210mm x 297mm
              const pdf = new jsPDF("p", "mm", "a4");
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();

              // Calculate ratio to fit the content to the PDF
              const canvasRatio = canvas.height / canvas.width;
              const pdfImageWidth = pdfWidth - 20; // 10mm margins on each side
              const pdfImageHeight = pdfImageWidth * canvasRatio;

              // Add the image to the PDF (centered horizontally)
              pdf.addImage(
                imgData,
                "PNG",
                10,
                10,
                pdfImageWidth,
                pdfImageHeight
              );

              // Save the PDF
              const fullName = `${
                document.getElementById("firstName").value || "John"
              }_${document.getElementById("lastName").value || "Doe"}`;
              pdf.save(`${fullName}_Resume.pdf`);
            }
          );
        });

      // Add Education, Experience, etc. buttons functionality
      // These could be expanded to dynamically add new form fields
      document
        .getElementById("addEducation")
        .addEventListener("click", function () {
          alert(
            "This feature would add another education section in a complete implementation."
          );
        });

      document
        .getElementById("addExperience")
        .addEventListener("click", function () {
          alert(
            "This feature would add another experience section in a complete implementation."
          );
        });

      document
        .getElementById("addCertification")
        .addEventListener("click", function () {
          alert(
            "This feature would add another certification section in a complete implementation."
          );
        });

      document
        .getElementById("addProject")
        .addEventListener("click", function () {
          alert(
            "This feature would add another project section in a complete implementation."
          );
        });

      document
        .getElementById("addVolunteer")
        .addEventListener("click", function () {
          alert(
            "This feature would add another volunteer experience section in a complete implementation."
          );
        });
