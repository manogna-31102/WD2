let ele = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function fillTable() {
  let obj = localStorage.getItem("user_entries");
  if (obj) {
    user_entries = JSON.parse(obj);
  } else {
    user_entries = [];
  }
  return user_entries;
}
user_entries = fillTable();

let username = ele("name"),
  email = ele("email"),
  password = ele("password"),
  tc = ele("tc"),
  dob = ele("dob");

let errormsg = classes("errormsg");

let form = ele("form");

function verify(elem, msg, condition) {
  if (condition) {
    elem.style.border = "2px solid red";
    elem.setCustomValidity(msg);
    elem.reportValidity();
  } else {
    elem.style.border = "2px solid green";
    elem.setCustomValidity("");
  }
}
function checkDOB() {
  let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
  if (age < 18 || age > 55) {
    return false;
  } else {
    return true;
  }
}
let msg_name = "Name must be at least 3 characters long";
let msg_email = "Must be a valid email id";
let msg_agree = "You must agree to the terms and conditions";
let msg_dob = "Your age must be between 18 and 55";

username.addEventListener("input", (e) => {
  let cname = username.value.length < 3;
  e.preventDefault();
  verify(username, msg_name, cname);
});

email.addEventListener("input", (e) => {
  let cemail = !(email.value.includes("@") && email.value.includes("."));
  e.preventDefault();
  verify(email, msg_email, cemail);
});

dob.addEventListener("input", (e) => {
  let cond_dob = !checkDOB();
  e.preventDefault();
  verify(dob, msg_dob, cond_dob);
});
tc.addEventListener("input", (e) => {
  let agree = !tc.checked;
  e.preventDefault();
  verify(tc, msg_agree, agree);
});

function makeObject() {
  let check = false;
  if (tc.checked) {
    check = true;
  }
  let obj = {
    name: username.value,
    email: email.value,
    password: password.value,
    dob: dob.value,
    checked: check,
  };
  return obj;
}

function displayTable() {
  let table = ele("user-table");
  let entries = user_entries;
  let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
  for (let i = 0; i < entries.length; i++) {
    str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked}</td>
                </tr>\n`;
  }
  table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
  let cond_agree = !tc.checked;
  e.preventDefault();
  if (!cond_agree) {
    let obj = makeObject();
    user_entries.push(obj);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
  }
  displayTable();
});
window.onload = (event) => {
  displayTable();
};
