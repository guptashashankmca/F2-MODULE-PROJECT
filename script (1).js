document.addEventListener('DOMContentLoaded', () => {
    let employeeId = 1;
    const employees = [];

    const employeeForm = document.getElementById('employeeForm');
    const nameInput = document.getElementById('name');
    const professionInput = document.getElementById('profession');
    const ageInput = document.getElementById('age');
    const messageDiv = document.getElementById('message');
    const employeeList = document.getElementById('employeeList');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');

    function displayMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    function renderEmployees() {
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            const employeeItem = document.createElement('div');
            employeeItem.className = 'employee-item';
            employeeItem.innerHTML = `
                <span>${employee.id}. ${employee.name}, ${employee.profession}, ${employee.age}</span>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            `;
            employeeList.appendChild(employeeItem);
        });
    }

    addEmployeeBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const profession = professionInput.value.trim();
        const age = ageInput.value.trim();

        if (name === '' || profession === '' || age === '') {
            displayMessage('All fields are required.', 'error');
            return;
        }

        const newEmployee = {
            id: employeeId++,
            name,
            profession,
            age: parseInt(age)
        };

        employees.push(newEmployee);
        renderEmployees();
        displayMessage('Employee added successfully.', 'success');

        nameInput.value = '';
        professionInput.value = '';
        ageInput.value = '';
    });

    window.deleteEmployee = function (id) {
        const index = employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            employees.splice(index, 1);
            renderEmployees();
            displayMessage('Employee deleted successfully.', 'success');
        }
    };
});
