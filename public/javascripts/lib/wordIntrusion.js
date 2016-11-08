define(function () {
    return{
        selected: -1,
        next: function (event){
            var self = event.data.wordIntrusion;
            if(self.selected == -1){
                self.selected = 99;
            }
            $.post( "/dataWordIntrusion", {"currentLine": currentLine, "selected": self.selected}, function(data) {
                if(currentLine < originalData.length){
                    currentLine++;
                    self.populateData();
                    self.selected = -1;
                }else if(currentLine == originalData.length){
                    $('#thanks').text("You have finished the annotation. Thanks.");
                    $('#label0').html("");
                    $('#label1').html("");
                    $('#label2').html("");
                    $('#label3').html("");
                    $('#label4').html("");
                }
            });
        },
        
        populateData: function(){
            var self = this;
            var terms = originalData[currentLine][1].split(" ")
            var option0Content = '<a id="0"><h4 class="">Option 1: ' + terms[0].replace(/_/g, " ") + '</h4></a>';
            var option1Content = '<a id="1"><h4 class="">Option 2: ' + terms[1].replace(/_/g, " ") + '</h4></a>';
            var option2Content = '<a id="2"><h4 class="">Option 3: ' + terms[2].replace(/_/g, " ") + '</h4></a>';
            var option3Content = '<a id="3"><h4 class="">Option 4: ' + terms[3].replace(/_/g, " ") + '</h4></a>';
            var option4Content = '<a id="4"><h4 class="">Option 5: ' + terms[4].replace(/_/g, " ") + '</h4></a>';
            $('#label0').html(option0Content);
            $('#label1').html(option1Content);
            $('#label2').html(option2Content);
            $('#label3').html(option3Content);
            $('#label4').html(option4Content);
            $('a').click(function(event){
                console.log(terms[event.currentTarget.id]);
                if(self.selected == event.currentTarget.id){
                    self.selected = -1;
                    event.target.style.color = '#000000'
                }else{
                    event.target.style.color = '#0d87e9';
                    if(self.selected != -1){
                        $('#' + self.selected).find("h4").attr("style", "color:#000000");
                    }
                    self.selected = event.currentTarget.id;
                }
            });
        }
    }
});