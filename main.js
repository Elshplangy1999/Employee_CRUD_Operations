let fName = document.querySelector('#exampleInputFName');
let lName = document.querySelector('#exampleInputLName');
let age = document.querySelector('#exampleInputAge');
let salary = document.querySelector('#exampleInputSalary');
let department = document.querySelector('#departments');
let addBtn = document.querySelector('.addBtn');
let updateBtn = document.querySelector('.updateBtn');
updateBtn.style.display = 'none';
let body = document.querySelector('body');
let tbody = document.querySelector('tbody');
let form = document.querySelector('form');

form.onsubmit = (e) => {
  e.preventDefault();
}

addBtn.onclick = () => {
  createEmp();
}

body.onload = () => {
  readEmp();
}

updateBtn.onclick = () => {
  updateEmp();
}

function clearFields() {
  fName.value = '';
  lName.value = '';
  age.value = '';
  salary.value = '';
  department.value = '';
}

async function createEmp() {
  if (fName.value && lName.value && age.value && salary.value && department.value) {
    let employee = {
      fName: fName.value,
      lName: lName.value,
      age: age.value,
      salary: salary.value,
      department: department.value,
    }
    let response = await fetch(`https://crud-operations-27456-default-rtdb.firebaseio.com/employee.json`, {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    clearFields();
    tbody.innerHTML = ``;
    readEmp();
  }
}

async function readEmp() {
  let request = await fetch(`https://crud-operations-27456-default-rtdb.firebaseio.com/employee.json`);
  let response = await request.json();
  let counter = 1;
  for (const key in response) {
    tbody.innerHTML += `
      <tr>
        <th>${counter++}</th>
        <td>${response[key].fName}</td>
        <td>${response[key].lName}</td>
        <td>${response[key].age}</td>
        <td>${response[key].salary}</td>
        <td>${response[key].department}</td>
        <td class="d-flex justify-content-between">
          <button class="btn btn-success update w-75 me-2" onClick="getSpecificEmp('${key}', '${response[key].fName}', '${response[key].lName}', '${response[key].age}', '${response[key].salary}', '${response[key].department}')">Update</button>
          <button class="btn btn-danger delete w-75" onClick="deleteEmp('${key}')">Delete</button>
        </td>
      </tr>
    `;
  }
}

let idToUpdate = "";

function getSpecificEmp(empId, empFName, empLName, empage, empsalary, empdepartment) {
  fName.value = empFName;
  lName.value = empLName;
  age.value = +empage;
  salary.value = +empsalary;
  department.value = empdepartment;
  idToUpdate = empId;
  updateBtn.style.display = 'block';
  addBtn.style.display = 'none';
}

async function deleteEmp(id) {
  let request = await fetch(`https://crud-operations-27456-default-rtdb.firebaseio.com/employee/${id}.json`, {
    method: 'DELETE'
  });
  tbody.innerHTML = ``;
  readEmp();
}

async function updateEmp() {
  let employee = {
    fName: fName.value,
    lName: lName.value,
    age: age.value,
    salary: salary.value,
    department: department.value,
  };
  await fetch(`https://crud-operations-27456-default-rtdb.firebaseio.com/employee/${idToUpdate}.json`, {
    method: 'PATCH',
    body: JSON.stringify(employee),
  });
  clearFields();
  tbody.innerHTML = ``;
  readEmp();
  updateBtn.style.display = 'none';
  addBtn.style.display = 'block';
}
