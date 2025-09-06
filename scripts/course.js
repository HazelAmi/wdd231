const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming...',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web...',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized...',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes...',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
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