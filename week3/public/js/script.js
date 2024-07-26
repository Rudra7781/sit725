const clickMe = () => {
    alert("button clicked")
}

$('#clickBtn').click(clickMe)

$(document).ready(function(){
    $("#btn").click(function(){
        var n1 = $("#first_name1").val()
        var n2 = $("#first_name2").val()
      $.ajax({
        url:`/add?a=${n1}&b=${n2}`,
        success: function (res){
            alert(res.data)
        }
      })
    });
  });