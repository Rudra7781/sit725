const socket = io();
const clickMe = () => {
    alert("button clicked")
}


const submitPost = () => {
    var title = $("#title").val()
    var desc = $("#desc").val()
    if (title == '') {
        alert("add title");
        return;
    }
    var date = new Date();

    var myObj = {
        title: title,
        desc: desc,
        date: `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()} , ${date.getHours()}:${date.getMinutes()}:00 `
    };
    console.log(myObj);
    $.ajax({
        url: '/api/todo',
        type: 'POST',
        data: myObj,
        success: (result) => {
            console.log(result)
            if (result.statusCode === 201) {
                $("#title").val('');
                $("#desc").val('');
            }
        }
    });

}

const addList = () => {

    $.get('/api/todo', (response) => {
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            data = response.data;
            addTasks(data);
        }
    });
}

var addTasks = (data) => {
    innerHtml = ''
    data.forEach(element => {
        str = `<div class="col s12 m4">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title">${element.title}</span>
                                    <hr>
                                    <p>${element.desc}</p>
                                    <hr>
                                    <p>Date : ${element.date}</p>
                                </div>
                            </div>
                        </div>`;
        innerHtml += str;
    });
    $('#list').html(innerHtml);
}

var addOneTask = (element) => {
    console.log(element)
    innerHtml = $('#list').html();
    str = `<div class="col s12 m4">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title">${element.title}</span>
                                    <hr>
                                    <p>${element.desc}</p>
                                    <hr>
                                    <p>Date : ${element.date}</p>
                                </div>
                            </div>
                        </div>`;
    innerHtml += str;
    $('#list').html(innerHtml);
}
// Listen for new tasks
socket.on('tasks', (tasks) => {
    addTasks(tasks.data);
});

socket.on('Task Added', (task) => {
    addOneTask(task.data);
});


$(document).ready(function () {
    $('#clickBtn').click(clickMe)
    $('#submit').click(submitPost)
    $("#btn").click(function () {
        var n1 = $("#first_name1").val()
        var n2 = $("#first_name2").val()
        $.ajax({
            url: `/add?a=${n1}&b=${n2}`,
            success: function (res) {
                $("#text").text(res.data)
            }
        })
    });
    addList();

    $('#index-banner a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

});

