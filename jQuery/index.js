// $("h1").css("color","red");

// $("button").text("don't click me");

$("body").keypress(function(event){
    $("h1").text(event.key);
});

$("button").click(function(){
    $("h1").css("color","purple");
});

$("h1").on("mouseover",function(){
    $("h1").css("color","purple");
})