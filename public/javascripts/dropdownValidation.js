//Cache these as variables so we only have to select once
var $min = $("#moisMinDD");
var $max = $("#moisMaxDD");
var $msg = $("#message");
console.log('1');
//Apply a single change event to fire on either dropdown
    console.log('2');
    //Have some default text to display, an empty string
    var text = "";
        
    //Cache the vales as variables so we don't have to keep getting them
    //We will parse the numbers out of the string values
    var minVal = parseInt($min.val(),10);
    var maxVal = parseInt($max.val(),10);
    
    //Determine if both are numbers, if so then they both have values
    var bothHaveValues = !isNaN(minVal) && !isNaN(maxVal);
    console.log(document.getElementById("moisMaxDD").value);
    if(bothHaveValues){
        console.log('3');
        if(minVal > maxVal){
            alert('error');
            console.log('3');
        }else if(maxVal < minVal){
            alert('error');
        }
    }
    
    // //Display the text
    // $msg.html(text);