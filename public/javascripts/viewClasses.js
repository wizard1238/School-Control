fetch('/api/displayClasses')
    .then(response => response.json())
    .then(data => {
        for (let i in data) {
            document.getElementById('classDiv').innerHTML += `
            <div class='card border-0 pl-2 pr-2 pb-4'>
                <div class='card'>
                    <div class='card-body'>
                        <h3 class='card-title' href='#'>${data[i].name}</h3>
                        <p class='card-text'>Teacher: ${data[i].teacher}</p>
                        <a target='_blank' class='card-link' href='${data[i].myMittyURL}'>myMitty</a>
                        <a target='_blank' class='card-link' href='${data[i].canvasURL}'>Canvas</a>
                        <a target='_blank' class='card-link' href='${data[i].calendarURL}'>Calendar</a>
                    </div>
                    <div class='card-body'>
                        <a target='_blank' class='btn btn-primary float-left' href='${data[i].url}'>Open Zoom</a>
                        <button class='btn btn-primary float-left ml-2' id='recordButton${i}'>Record</button>
                        <button class='btn btn-danger float-right ml-2' id='deleteButton${i}'>Delete</button>
                        <button class='btn btn-primary float-right' id='editButton${i}'>Edit</button>
                    </div>
                    <div class='d-none'>
                        <form action='/editClassPage' method='post' id='editForm${i}'>
                            <input name='classNumber' value='${i}'>
                        </form>
                        <form action='/record' method='post' id='recordForm${i}'>
                            <input name=classNumber value='${i}'>
                        </form>
                    </div>
                </div>
            </div>
            `
        }
        
        document.addEventListener('click', function(e) {
            for (j in data) {
                if (e.target.id == `deleteButton${j}`) {
                    var d = confirm('Are you sure?')
                    if (d == true) {
                        fetch('/api/deleteClass', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                              },
                            body: JSON.stringify({toDelete: j})
                        })
                        .then(location.reload())
                    }
                }
                if(e.target.id == `editButton${j}`) {
                    document.getElementById(`editForm${j}`).submit()
                }
                if(e.target.id == `recordButton${j}`) {
                    document.getElementById(`recordForm${j}`).submit()
                }
            }
        })
    })