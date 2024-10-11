const times = [
        '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
    ];

    // Load timesheet, to-do list, and notes from localStorage
    function loadData() {
        const timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
        const toDoData = localStorage.getItem('todo') || '';
        const notesData = localStorage.getItem('notes') || '';

        // Populate the timesheet
        const timesheetTable = document.getElementById('timesheet');
        timesheetTable.innerHTML = ''; // Clear existing data
        times.forEach((time, index) => {
            const task = timesheetData[time] || '';
            const row = `
                <tr>
                    <td>${time}</td>
                    <td><input type="text" id="task_${index}" value="${task}" placeholder="Enter task"></td>
                    <td><button onclick="saveTask('${time}', ${index})">Save</button>
                        <button onclick="deleteTask('${time}', ${index})">Delete</button>
                    </td>
                </tr>`;
            timesheetTable.innerHTML += row;
        });

        // Populate to-do list and notes
        document.getElementById('todo-list').value = toDoData;
        document.getElementById('notes').value = notesData;
    }

    // Save task to localStorage
    function saveTask(time, index) {
        const taskInput = document.getElementById(`task_${index}`).value;
        let timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
        timesheetData[time] = taskInput;
        localStorage.setItem('timesheet', JSON.stringify(timesheetData));
        alert('Task saved!');
    }

    // Delete task from localStorage
    function deleteTask(time, index) {
        let timesheetData = JSON.parse(localStorage.getItem('timesheet')) || {};
        delete timesheetData[time]; // Remove task
        localStorage.setItem('timesheet', JSON.stringify(timesheetData));
        document.getElementById(`task_${index}`).value = ''; // Clear input
        alert('Task deleted!');
    }

    // Save to-do list
    function saveToDo() {
        const todo = document.getElementById('todo-list').value;
        localStorage.setItem('todo', todo);
        alert('To-do list saved!');
    }

    // Save notes
    function saveNotes() {
        const notes = document.getElementById('notes').value;
        localStorage.setItem('notes', notes);
        alert('Notes saved!');
    }

    // Load the data when the page loads
    window.onload = loadData;
