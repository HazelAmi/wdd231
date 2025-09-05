const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming...',
    technology: ['Python'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web...',
    technology: ['HTML', 'CSS'],
    completed: false
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized...',
    technology: ['Python'],
    completed: false
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes...',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// function renderCourses(filter = "all") {
//   const container = document.getElementById("course-cards");
//   container.innerHTML = "";

//   const filtered = filter === "all"
//     ? courses
//     : courses.filter(course => course.subject.toLowerCase() === filter);

//   let totalCredits = 0;

//   filtered.forEach(course => {
//     const card = document.createElement("div");
//     card.className = "course-card" + (course.completed ? " completed" : "");
//     card.innerHTML = `
//       <h3>${course.subject} ${course.number}</h3>
//       <p><strong>${course.title}</strong></p>
//       <p>${course.description}</p>
//       <p><strong>Credits:</strong> ${course.credits}</p>
//       <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
//     `;
//     container.appendChild(card);
//     totalCredits += course.credits;
//   });

//   document.getElementById("total-credits").textContent = totalCredits;
// }

// document.querySelectorAll(".filters button").forEach(button => {
//   button.addEventListener("click", () => {
//     renderCourses(button.dataset.filter);
//   });
// });

// Initial render
//renderCourses();

const courseList = document.querySelector('.course-cards');
const totalCredits = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter');

function displayCourses(filter = 'all') {
    courseList.innerHTML = '';
    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.subject.toLowerCase() === filter);
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = `course ${course.completed ? 'completed' : ''}`;
        courseDiv.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(courseDiv);
    });
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = total;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayCourses(button.dataset.filter);
    });
});

displayCourses();