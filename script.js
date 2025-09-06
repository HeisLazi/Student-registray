var studArr = [];

window.onload = function() {
    let form = document.getElementById('studForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        clearErrs();

        if (checkInputs()) {
            addStud();
            resetForm();
        }
    }
}

function addStud() {
    var f = document.getElementById('fname').value.trim();
    var l = document.getElementById('lname').value.trim();
    var em = document.getElementById('emailInput').value.trim();
    var prog = document.getElementById('progPick').value;
    let ints = getIntrests();

    let obj = {
        id: Date.now(),
        fname: f,
        lname: l,
        email: em,
        prog: prog,
        ints: ints
    };

    studArr.push(obj);
    showStuds();
    updateSummary();
}

function checkInputs() {
    var ok = true;

    if (document.getElementById('fname').value == '') {
        document.getElementById('fnameErr').innerText = "first name missing";
        ok = false;
    }

    if (document.getElementById('lname').value === '') {
        document.getElementById('lnameErr').innerText = "last name missing";
        ok = false;
    }

    let em = document.getElementById('emailInput').value;
    if (em == '') {
        document.getElementById('emailErr').innerText = "email is required";
        ok = false;
    } else if (em.indexOf('@') < 0) {
        document.getElementById('emailErr').innerText = "not a valid email adress";
        ok = false;
    }

    if (document.getElementById('progPick').value == '') {
        document.getElementById('progErr').innerText = "choose a program";
        ok = false;
    }

    if (getIntrests().length == 0) {
        document.getElementById('interestErr').innerText = "pick atleast 1 intrest";
        ok = false;
    }

    return ok;
}

function getIntrests() {
    let arr = [];
    let boxs = document.querySelectorAll('input[name="interests"]');
    for (let i=0; i<boxs.length; i++) {
        if (boxs[i].checked) arr.push(boxs[i].value);
    }
    return arr;
}

function clearErrs() {
    let errs = document.querySelectorAll('.err');
    for (var i=0; i<errs.length; i++) {
        errs[i].innerText = "";
    }
}

function showStuds() {
    let cont = document.getElementById('studentList');

    if (studArr.length == 0) {
        cont.innerHTML = "<p>No studnts yet...</p>";
        return;
    }

    let html = "";
    for (let i=0; i<studArr.length; i++) {
        let s = studArr[i];
        html += '<div class="student-box">';
        html += '<div class="student-name">' + s.fname + ' ' + s.lname + '</div>';
        html += '<div class="student-detials"><strong>Email:</strong> ' + s.email + '</div>';
        html += '<div class="student-detials"><strong>Program:</strong> ' + s.prog + '</div>';
        html += '<div><strong>Intrests:</strong> ' + s.ints.join(", ") + '</div>';
        html += '<button class="delete-btn" onclick="removeStud('+ s.id +')">Remove</button>';
        html += '</div>';
    }

    cont.innerHTML = html;
}

function removeStud(id) {
    if (confirm("Delete this student?")) {
        studArr = studArr.filter(function(s) {
            return s.id != id;
        })
        showStuds();
        updateSummary();
    }
}

function resetForm() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('progPick').value = '';
    let boxes = document.querySelectorAll('input[name="interests"]');
    boxes.forEach(function(b) { b.checked = false });
}

function updateSummary() {
    let body = document.getElementById('summaryTableBody');

    if (studArr.length == 0) {
        body.innerHTML = "<tr><td colspan='4'>No records yet.</td></tr>";
        return;
    }

    let rows = "";
    studArr.forEach(function(s) {
        rows += "<tr>" +
            "<td>" + s.fname + " " + s.lname + "</td>" +
            "<td>" + s.email + "</td>" +
            "<td>" + s.prog + "</td>" +
            "<td>" + s.ints.join(', ') + "</td>" +
            "</tr>";
    });

    body.innerHTML = rows;
}
