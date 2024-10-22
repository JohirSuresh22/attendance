// Add a new attendee input with a name, CUID, and checkbox
function addAttendee() {
    const attendeeSection = document.getElementById('attendee-section');

    // Create a container for each attendee's details
    const attendeeContainer = document.createElement('div');

    // Label and input for attendee's name
    const nameLabel = document.createElement('label');
    nameLabel.innerText = 'Name: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter attendee name';

    // Label and input for attendee's CUID
    const cuidLabel = document.createElement('label');
    cuidLabel.innerText = 'CUID: ';
    const cuidInput = document.createElement('input');
    cuidInput.type = 'text';
    cuidInput.placeholder = 'Enter attendee CUID';

    // Checkbox to mark attendance
    const attendanceCheckbox = document.createElement('input');
    attendanceCheckbox.type = 'checkbox';
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerText = ' Present';

    // Append inputs and labels to the attendee container
    attendeeContainer.appendChild(nameLabel);
    attendeeContainer.appendChild(nameInput);
    attendeeContainer.appendChild(document.createElement('br')); // line break for better layout

    attendeeContainer.appendChild(cuidLabel);
    attendeeContainer.appendChild(cuidInput);
    attendeeContainer.appendChild(document.createElement('br')); // line break for better layout

    attendeeContainer.appendChild(attendanceCheckbox);
    attendeeContainer.appendChild(checkboxLabel);

    // Add the attendee container to the attendee section
    attendeeSection.appendChild(attendeeContainer);
}

// Download the attendance list as a PDF
function downloadAttendance() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const title = document.getElementById('meeting-title').value || 'Meeting Attendance';
    doc.setFontSize(18);
    doc.text(title, 10, 10);

    // Get all attendees and their details
    const attendees = document.getElementById('attendee-section').children;
    let content = 'Attendees:\n';
    for (let i = 0; i < attendees.length; i++) {
        const attendeeName = attendees[i].querySelector('input[type="text"]:first-of-type').value;
        const attendeeCUID = attendees[i].querySelector('input[type="text"]:nth-of-type(2)').value;
        const isPresent = attendees[i].querySelector('input[type="checkbox"]').checked;
        content += `Name: ${attendeeName}, CUID: ${attendeeCUID}, Present: ${isPresent ? 'Yes' : 'No'}\n`;
    }

    // Add content to PDF
    doc.setFontSize(12);
    doc.text(content, 10, 20);

    // Save the PDF with a dynamic filename
    doc.save(`${title}.pdf`);
}

// Automatically add the first attendee input when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addAttendee();  // Add the initial attendee input
});
