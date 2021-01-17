//Find table rows with an indent, the indent means there are 6 things in the row as opposed to 5



let tableRows = document.getElementsByTagName("tr");


var gradeValue=0;
let numsum=0;
let densum=0;
let gpa = document.getElementById("gpa");
var removeArray = [];
var gradeNeeded;

for(let i = 0; i < tableRows.length; i++){
    if(tableRows[i].children.length == 6){
        removeArray.push(i);
    }
}
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
            if(removeArray.includes(i)){
                console.log("nothin");
            }else{
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);

        csv.push(row.join(","));        
    }
    }
        console.log(csv);
        return csv;
}


var csvFile = exportTableToCSV("useless");
var csvFileFirstRowSplit = csvFile[0].split(",");
var weightAchievedIndex = 0;
var assignmentNameIndex = 0;

for(var i = 0; i < csvFileFirstRowSplit.length; i++){
    if(csvFileFirstRowSplit[i]=="Weight Achieved"){
        weightAchievedIndex = i;
    }
}
for(var i = 0; i < csvFileFirstRowSplit.length; i++){
    if(csvFileFirstRowSplit[i]=="Grade Item"){
        assignmentNameIndex = i;
    }
}
var weightArrays = [];
var assignmentNames = [];
for(var i = 0; i < csvFile.length; i++){
      weightArrays.push(csvFile[i].split(",")[weightAchievedIndex]);
}

for(var i = 0; i < csvFile.length; i++){
    assignmentNames.push(csvFile[i].split(",")[assignmentNameIndex]);
}

var den;
var numerator;
var weightArraysNumbers = [];

for(var i = 1; i < weightArrays.length; i++)
{
    numerator = parseFloat(weightArrays[i].split("/")[0]);
    den = parseFloat(weightArrays[i].split("/")[1]);
    if(den>0){
        numsum+=numerator;
        densum+=den;
    }
    weightArraysNumbers.push([numerator,den]);
}


console.log(weightArraysNumbers);


if(densum>0){
    gradeValue = numsum/densum;
    
}


chrome.runtime.sendMessage({grade: gradeValue.toString(), gradeList:weightArraysNumbers, required: gradeNeeded, names : assignmentNames}, (response) => {
    console.log(response.message);
});