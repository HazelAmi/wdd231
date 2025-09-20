function setSectionSelection() {
  const sectionSelect = document.querySelector("#sectionNumber");
  byuiCourse.sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}
export function populateSections(sections) {
            const sectionSelect = document.querySelector("#sectionNumber");
            // Clear existing options except the first one
            while (sectionSelect.options.length > 1) {
                sectionSelect.remove(1);
            }
            
            byuiCourse.sections.forEach((section) => {
                const option = document.createElement("option");
                option.value = section.sectionNumber;
                option.textContent = `Section ${section.sectionNumber} - ${section.instructor}`;
                sectionSelect.appendChild(option);
            });
        }