function updateResumePreview() {
    const name = document.getElementById('name').value || 'John Doe';
    const address = document.getElementById('address').value || '123 Main St, City, Country';
    const email = document.getElementById('email').value || 'john.doe@example.com';
    const github = document.getElementById('github').value || 'https://github.com/johndoe';
    const summary = document.getElementById('summary').value || 'Brief summary about yourself';

    const experienceItems = [];
    document.querySelectorAll('#experience-form input').forEach(input => {
        if (input.value) {
            experienceItems.push(`<li><strong>${input.previousElementSibling.textContent}:</strong> ${input.value}</li>`);
        }
    });

    const educationItems = [];
    document.querySelectorAll('#education-form input').forEach(input => {
        if (input.value) {
            educationItems.push(`<li><strong>${input.previousElementSibling.textContent}:</strong> ${input.value}</li>`);
        }
    });

    const projectItems = [];
    document.querySelectorAll('#projects-form input, #projects-form textarea').forEach(input => {
        if (input.value) {
            projectItems.push(`<li><strong>${input.previousElementSibling.textContent}:</strong> ${input.value}</li>`);
        }
    });

    const resumeContent = `
        <div class="resume-header">
            <h1>${name}</h1>
            <p>${address}</p>
            <p>${email} | <a href="${github}" target="_blank">${github}</a></p>
        </div>
        <div class="resume-section">
            <h2>Summary</h2>
            <p>${summary}</p>
        </div>
        <div class="resume-section">
            <h2>Experience</h2>
            <ul>${experienceItems.join('')}</ul>
        </div>
        <div class="resume-section">
            <h2>Education</h2>
            <ul>${educationItems.join('')}</ul>
        </div>
        <div class="resume-section">
            <h2>Projects</h2>
            <ul>${projectItems.join('')}</ul>
        </div>
    `;

    document.getElementById('resume-content').innerHTML = resumeContent;
}


function addExperience() {
    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // You can store these values in a data structure or directly manipulate the DOM to display them
    console.log(`Experience: ${jobTitle} at ${company}, ${startDate} - ${endDate}`);
}

function addEducation() {
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const startDate = document.getElementById('edu-start-date').value;
    const endDate = document.getElementById('edu-end-date').value;

    // You can store these values in a data structure or directly manipulate the DOM to display them
    console.log(`Education: ${degree} from ${institution}, ${startDate} - ${endDate}`);
}

function addProject() {
    const projectTitle = document.getElementById('project-title').value;
    const description = document.getElementById('description').value;

    // You can store these values in a data structure or directly manipulate the DOM to display them
    console.log(`Project: ${projectTitle}, Description: ${description}`);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    
    // Header
    doc.text("Name: " + (document.getElementById('name').value || 'John Doe'), 10, 10);
    doc.text("Address: " + (document.getElementById('address').value || '123 Main St, City, Country'), 10, 20);
    doc.text("Email: " + (document.getElementById('email').value || 'john.doe@example.com'), 10, 30);
    doc.text("GitHub: " + (document.getElementById('github').value || 'https://github.com/johndoe'), 10, 40);
    
    // Summary
    doc.text("Summary:", 10, 50);
    doc.setFontSize(12);
    doc.text(document.getElementById('summary').value || 'Brief summary about yourself', 10, 60);
    
    // Experience
    doc.setFontSize(16);
    doc.text("Experience:", 10, 80);
    doc.setFontSize(12);
    document.querySelectorAll('#experience-form input').forEach((input, index) => {
        if (input.value) {
            doc.text(`${input.previousElementSibling.textContent}: ${input.value}`, 10, 90 + (10 * index));
        }
    });

    // Education
    doc.setFontSize(16);
    doc.text("Education:", 10, 120 + (10 * document.querySelectorAll('#experience-form input').length));
    doc.setFontSize(12);
    document.querySelectorAll('#education-form input').forEach((input, index) => {
        if (input.value) {
            doc.text(`${input.previousElementSibling.textContent}: ${input.value}`, 10, 130 + (10 * index) + (10 * document.querySelectorAll('#experience-form input').length));
        }
    });

    // Projects
    doc.setFontSize(16);
    doc.text("Projects:", 10, 160 + (10 * document.querySelectorAll('#experience-form input').length) + (10 * document.querySelectorAll('#education-form input').length));
    doc.setFontSize(12);
    document.querySelectorAll('#projects-form input, #projects-form textarea').forEach((input, index) => {
        if (input.value) {
            doc.text(`${input.previousElementSibling.textContent}: ${input.value}`, 10, 170 + (10 * index) + (10 * document.querySelectorAll('#experience-form input').length) + (10 * document.querySelectorAll('#education-form input').length));
        }
    });

    doc.save("resume.pdf");
}

// Initialize preview
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', updateResumePreview);
});