// Add a new attendee input with a checkbox
function addAttendee() {
    const attendeeSection = document.getElementById('attendee-section');

    // Create a container for each attendee
    const attendeeContainer = document.createElement('div');
    
    // Input for attendee's name
    const attendeeInput = document.createElement('input');
    attendeeInput.type = 'text';
    attendeeInput.placeholder = 'Enter attendee name';
    
    // Checkbox to mark attendance
    const attendanceCheckbox = document.createElement('input');
    attendanceCheckbox.type = 'checkbox';

    // Append inputs to the attendee container
    attendeeContainer.appendChild(attendeeInput);
    attendeeContainer.appendChild(attendanceCheckbox);

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

    // Get all attendees and their status
    const attendees = document.getElementById('attendee-section').children;
    let content = 'Attendees:\n';
    for (let i = 0; i < attendees.length; i++) {
        const attendeeName = attendees[i].querySelector('input[type="text"]').value;
        const isPresent = attendees[i].querySelector('input[type="checkbox"]').checked;
        content += `${attendeeName} - ${isPresent ? 'Present' : 'Absent'}\n`;
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