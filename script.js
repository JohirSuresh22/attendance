document.getElementById('add-person').addEventListener('click', () => {
    const attendeesDiv = document.getElementById('attendees');
    
    const newAttendee = document.createElement('div');
    newAttendee.classList.add('attendee');
    
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.classList.add('name');
    nameInput.setAttribute('placeholder', 'Enter Name');
    
    const cuidInput = document.createElement('input');
    cuidInput.setAttribute('type', 'text');
    cuidInput.classList.add('cuid');
    cuidInput.setAttribute('placeholder', 'Enter CUID');
    
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('attendance-checkbox');
    
    newAttendee.appendChild(nameInput);
    newAttendee.appendChild(cuidInput);
    newAttendee.appendChild(checkbox);
    attendeesDiv.appendChild(newAttendee);
});

document.getElementById('generate-pdf').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const names = document.querySelectorAll('.name');
    const cuids = document.querySelectorAll('.cuid');
    const checkboxes = document.querySelectorAll('.attendance-checkbox');
    
    const attendanceList = [];
    names.forEach((name, index) => {
        attendanceList.push({
            name: name.value,
            cuid: cuids[index].value,
            attended: checkboxes[index].checked
        });
    });
    
    generatePDF(title, attendanceList);
});

function generatePDF(title, attendanceList) {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    
    attendanceList.forEach((attendee, i) => {
        doc.setFontSize(12);
        const status = attendee.attended ? 'Present' : 'Absent';
        doc.text(`${i + 1}. Name: ${attendee.name}, CUID: ${attendee.cuid}, Status: ${status}`, 10, 20 + (i * 10));
    });
    
    doc.save(`${title}-attendance.pdf`);
}
