var originalData;
var currentLine;

requirejs.config({
    baseUrl: 'javascripts/lib'
});

requirejs(["wordIntrusion"], function(wordIntrusion) {
    if(window.location.pathname == "/"){
        $.getJSON( '/dataWordIntrusion', function(data){
            originalData = data;
            currentLine = 0;
            wordIntrusion.populateData();
        });
        $('#idNextWordIntrusion').click({"wordIntrusion": wordIntrusion}, wordIntrusion.next);
    }
});


function showPleaseWait(){
    var pleaseWaitDiv = $('#pleaseWaitDialog');
    pleaseWaitDiv.modal('show');
}

function hidePleaseWait() {
    var pleaseWaitDiv = $('#pleaseWaitDialog');
    pleaseWaitDiv.modal('hide');
}