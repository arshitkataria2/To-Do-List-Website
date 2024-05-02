var taskCount = 0;

function openPopup() {
    var taskName = document.getElementById('taskInput').value;

    var popupBox = document.createElement('div');
    popupBox.style.position = 'fixed';
    popupBox.style.top = '50%';
    popupBox.style.left = '50%';
    popupBox.style.transform = 'translate(-50%, -50%)';
    popupBox.style.background = 'black';
    popupBox.style.padding = '20px';
    popupBox.style.border = '1px solid';
    popupBox.style.borderRadius = '20px';
    popupBox.style.zIndex = '1000';

    var backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.background = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.backdropFilter = 'blur(5px)';
    backdrop.style.zIndex = '1000';

    document.body.appendChild(backdrop);

    var closeIcon = document.createElement('div');
    closeIcon.innerHTML = '&#10006;';
    closeIcon.style.fontSize = "20px";
    closeIcon.style.position = "absolute";
    closeIcon.style.cursor = "pointer";
    closeIcon.style.width = "20px";
    closeIcon.style.height = "20px";
    closeIcon.style.top = "7px";
    closeIcon.style.right = "7px";
    closeIcon.style.color = "white";
    closeIcon.style.fontFamily = "Neon";
    closeIcon.style.zIndex = "1001";

    closeIcon.addEventListener('mouseenter', function () {
        closeIcon.style.color = "cyan";
    });

    closeIcon.addEventListener('mouseleave', function () {
        closeIcon.style.color = "white";
    });

    closeIcon.onclick = function () {
        document.body.removeChild(popupBox);
        document.body.removeChild(backdrop);
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    };
    popupBox.appendChild(closeIcon);

    var taskNameDisplay = document.createElement('p');
    taskNameDisplay.style.fontSize = '18px';
    taskNameDisplay.style.color = "white";
    taskNameDisplay.style.height = "107px";
    taskNameDisplay.style.fontFamily = "Neon";
    taskNameDisplay.textContent = 'Select Deadline Date';
    popupBox.appendChild(taskNameDisplay);

    var dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.style.fontSize = "20px";
    dateInput.style.width = "216px";
    dateInput.style.position = "absolute";
    dateInput.style.top = "94px";
    dateInput.id = 'dateInput';
    popupBox.appendChild(dateInput);

    var confirmButton = document.createElement('button');
    confirmButton.textContent = 'Submit';
    confirmButton.style.borderRadius = "20px";
    confirmButton.style.fontSize = "20px";
    confirmButton.style.position = "absolute";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.width = "100px";
    confirmButton.style.height = "35px";
    confirmButton.style.top = "141px";
    confirmButton.style.left = "86px";
    confirmButton.style.border = "hidden";
    confirmButton.style.color = "white";
    confirmButton.style.fontFamily = "Neon";
    confirmButton.style.backgroundColor = "cyan";
    confirmButton.addEventListener('mouseover', function () {
        confirmButton.style.color = "black";
    });

    confirmButton.addEventListener('mouseout', function () {
        confirmButton.style.color = "white";
    });

    confirmButton.onclick = function () {
        var selectedDate = document.getElementById('dateInput').value;
        updateTaskDetails(taskName, selectedDate);
        document.body.removeChild(popupBox);
        document.body.removeChild(backdrop);
    };
    popupBox.appendChild(confirmButton);

    document.body.appendChild(popupBox);
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function updateTaskDetails(taskName, selectedDate) {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';

    var parsedDate = new Date(selectedDate);
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    var dayDifference = Math.floor((parsedDate - currentDate) / (24 * 60 * 60 * 1000));

    var taskRow = document.createElement('div');
    taskRow.className = 'task-row';
    taskRow.style.position = 'relative';

    var taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.textContent = taskName;
    taskRow.appendChild(taskDiv);

    var dateDiv = document.createElement('div');
    dateDiv.className = 'date';

    var day = parsedDate.getDate();
    var month = parsedDate.getMonth() + 1;
    var year = parsedDate.getFullYear().toString().slice(-2);

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    var formattedDate = day + '-' + month + '-' + year;
    dateDiv.textContent = formattedDate;

    taskRow.appendChild(dateDiv);

    var urgencyDivItem = document.createElement('div');
    urgencyDivItem.className = 'urgency';

    if (dayDifference < 0) {
        urgencyDivItem.innerHTML = '<p style="color: red; text-shadow: 0 0 7px black;">' + '\u{26AB}' + '</p>';
    } else if (dayDifference === 0) {
        urgencyDivItem.innerHTML = '<p style="color: red; text-shadow: 0 0 7px black;">' + '\u{1F534}' + '</p>'; 
    } else if (dayDifference === 1 || dayDifference === 2) {
        urgencyDivItem.innerHTML = '<p style="color: yellow; text-shadow: 0 0 7px black;">' + '\u{1F7E1}' + '</p>'; 
    } else if (dayDifference === 3) {
        urgencyDivItem.innerHTML = '<p style="color: green; text-shadow: 0 0 7px black;">' + '\u{1F7E2}' + '</p>'; 
    } else {
        urgencyDivItem.innerHTML = '<p style="color: red; text-shadow: 0 0 7px black;">' + '\u{26AA}' + '</p>'; 
    }

    taskRow.appendChild(urgencyDivItem);

    taskRow.appendChild(urgencyDivItem);

    var tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.appendChild(taskRow);
    taskCount++;

    if (taskCount % 5 === 0) {
        var box = document.getElementById('tasksBox');
        var currentHeight = box.offsetHeight;
        var newHeight = currentHeight * 2;
        box.style.height = newHeight + 'px';
    }
    document.getElementById('taskInput').value = '';

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.borderRadius = '20px';
    deleteButton.style.fontSize = '16px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.width = '80px';
    deleteButton.style.height = '25px';
    deleteButton.style.marginRight = '10px';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.border = 'hidden';
    deleteButton.style.color = 'white';
    deleteButton.style.position = 'absolute';
    deleteButton.style.top = '40px';
    deleteButton.style.right = '10px';
    deleteButton.style.zIndex = '3';
    deleteButton.style.fontFamily = 'Neon';
    deleteButton.addEventListener('mouseover', function () {
        deleteButton.style.color = 'black';
    });
    deleteButton.addEventListener('mouseout', function () {
        deleteButton.style.color = 'white';
    });
    deleteButton.onclick = function () {
        deleteTask(taskRow);
    };

    taskRow.appendChild(deleteButton);

    function deleteTask(taskRow) {
        var tasksContainer = document.getElementById('tasksContainer');
        tasksContainer.removeChild(taskRow);

        taskCount--;

        if (taskCount % 5 === 4) {
            var box = document.getElementById('tasksBox');
            var currentHeight = box.offsetHeight;
            var newHeight = currentHeight / 2;
            box.style.height = newHeight + 'px';
        }
    }
    var completedDiv = document.createElement('div');
    completedDiv.className = 'completed';

    var checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'completed-checkbox';
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskRow.classList.add('completed');
        } else {
            taskRow.classList.remove('completed');
        }
    });

    checkboxContainer.appendChild(checkbox);
    completedDiv.appendChild(checkboxContainer);

    taskRow.appendChild(completedDiv);
}
function showCompletedTasks() {
    const allTaskRows = document.querySelectorAll('.task-row');

    allTaskRows.forEach(taskRow => {
        const checkbox = taskRow.querySelector('.completed-checkbox');

        if (checkbox.checked) {
            taskRow.style.display = 'flex';
        } else {
            taskRow.style.display = 'none';
        }
    });
}
function showTasks() {
    const allTaskRows = document.querySelectorAll('.task-row');

    allTaskRows.forEach(taskRow => {
        const checkbox = taskRow.querySelector('.completed-checkbox');

        if (checkbox.checked === true) {
            taskRow.style.display = 'none';
        } else {
            taskRow.style.display = 'flex';
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const showCompletedButton = document.getElementById('showCompletedButton');

    if (showCompletedButton) {
        showCompletedButton.addEventListener('click', showCompletedTasks);
    }
});

function deleteTask(taskRow) {
    var tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.removeChild(taskRow);

    taskCount--;

    if (taskCount % 5 === 4) {
        var box = document.getElementById('tasksBox');
        var currentHeight = box.offsetHeight;
        var newHeight = currentHeight / 2;
        box.style.height = newHeight + 'px';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const quoteWrapper = document.getElementById('quoteWrapper');
    const quoteAuthorElement = document.getElementById('quoteAuthor');

    function fetchQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                const quote = `"${data.content}"`;
                const author = `- ${data.author}`;

                adjustFontSize(quoteWrapper, quote);
                adjustFontSize(quoteAuthorElement, author);

                quoteWrapper.innerHTML = quote;
                quoteAuthorElement.innerHTML = author;

            })
            .catch(error => console.error('Error fetching quote:', error));
    }

    function adjustFontSize(element, text) {
        const maxWidth = 500;
        let fontSize = 21;

        const tempSpan = document.createElement('span');
        tempSpan.style.fontSize = fontSize + 'px';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.innerHTML = text;

        document.body.appendChild(tempSpan);

        while (tempSpan.offsetWidth > maxWidth) {
            fontSize -= 1;
            tempSpan.style.fontSize = fontSize + 'px';
        }

        document.body.removeChild(tempSpan);

        element.style.fontSize = fontSize + 'px';
    }

    function changeQuote() {
        fetchQuote();
    }

    fetchQuote();

    setInterval(changeQuote, 60000);
});
function filterTasksByUrgency(urgency) {
    var tasksContainer = document.getElementById('tasksContainer');
    var taskRows = tasksContainer.getElementsByClassName('task-row');

    for (var i = 0; i < taskRows.length; i++) {
        var taskRow = taskRows[i];
        var urgencyDiv = taskRow.querySelector('.urgency');
        var checkbox = taskRow.querySelector('.completed input');

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        var taskDate = new Date(taskRow.querySelector('.date').textContent);
        taskDate.setHours(0, 0, 0, 0);

        switch (urgency) {
            case 'today':
                taskRow.style.display = (checkbox.checked || urgencyDiv.innerHTML.includes('\u{1F534}')) ? '' : 'none'; 
                break;
            case 'urgent':
                taskRow.style.display = (checkbox.checked || (urgencyDiv.innerHTML.includes('\u{1F534}') || urgencyDiv.innerHTML.includes('\u{1F7E1}'))) ? '' : 'none'; 
                break;
            case 'upcoming':
                taskRow.style.display = (checkbox.checked || (urgencyDiv.innerHTML.includes('\u{26AA}') || urgencyDiv.innerHTML.includes('\u{1F7E2}'))) ? '' : 'none';  
                break;
        }
    }
}
