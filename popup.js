let scanbutton = document.getElementById('ScanPage');
let grade = document.getElementById("grade");
let gradeTable = document.getElementById("gradeTable");
let final = document.getElementById("final");
let calculate = document.getElementById("calculate");
let gpaValue = document.getElementById("gpaSelect").value;
let gpa = document.getElementById("gpa");
var goalFinalMark = document.getElementById("final-mark");
var finalExamWorth = document.getElementById("final-worth");
var realFinalCurrentMark = document.getElementById("final-current-mark")
var form2 = document.getElementById("goal-mark");

scanbutton.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'embed.js'}); 
    });
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
          i = parseFloat(request.grade)*100;
          grade.innerText = i.toString();
          var goal = parseFloat(goalFinalMark.value);
          var exam = parseFloat(finalExamWorth.value);
          var mark = ((100*(goal-(i*((100-exam)/100)))/exam));
          console.log(mark);
          if(!(isNaN(mark))){
            realFinalCurrentMark.innerHTML = ((100*(goal-(i*((100-exam)/100)))/exam));
          }

          switch(gpaValue){
            case "4.3": 			//gpa is out of 4.33
              if(i>= 90 && i <= 100)
                gpa.innerText = "4.33";
              else if(i>= 85 && i <= 89)
                gpa.innerText = "4.00";
              else if(i>= 80 && i <= 84)
                gpa.innerText = "3.67";
              else if(i>= 77 && i <= 79)
                 gpa.innerText = "3.33";
              else if(i>= 73 && i <= 76)
                 gpa.innerText = "3.00";
              else if(i>= 70 && i <= 72)
                 gpa.innerText = "2.67";
              else if(i>= 67 && i <= 69)
                 gpa.innerText = "2.33";
              else if(i>= 63 && i <= 66)
                  gpa.innerText = "2.00";
              else if(i>= 60 && i <= 62)
                 gpa.innerText = "1.67";
              else if(i>= 57 && i <= 59)
                  gpa.innerText = "1.33";   
              else if(i>= 53 && i <= 56)
                 gpa.innerText = "1.00";
              else if(i>= 50 && i <= 52)
                 gpa.innerText = "0.67";
              else
                gpa.innerText = "0";
                 break;
          
            case "4.0": 			// gpa is out of 4.0
              if(i>= 85 && i <= 100)
                gpa.innerText = "4.00";
              else if(i>= 80 && i <= 84)
                gpa.innerText = "3.70";
              else if(i>= 77 && i <= 79)
                 gpa.innerText = "3.3";
              else if(i>= 73 && i <= 76)
                gpa.innerText = "3.0";
              else if(i>= 70 && i <= 72)
                gpa.innerText = "2.7";
              else if(i>= 67 && i <= 69)
                gpa.innerText = "2.3";
              else if(i>= 63 && i <= 66)
                gpa.innerText = "2.0";
              else if(i>= 60 && i <= 62)
                gpa.innerText = "1.7";
              else if(i>= 57 && i <= 59)
                 gpa.innerText = "1.3";
              else if(i>= 53 && i <= 56)
                gpa.innerText = "1.0";
              else if(i>= 50 && i <= 52)
                gpa.innerText = "0.7";
              else
                gpa.innerText = "0";
              break;
          
            default:
              console.log("N/a");
              break;
            }

            var head = document.createElement("tr");
            var head1 = document.createElement("th"); 
            var head2 = document.createElement("th"); 
            var aName = document.createTextNode("Assignment Name");
            var mAch = document.createTextNode("Mark Achieved");
           
            head1.appendChild(aName);
            head2.appendChild(mAch);
            head.appendChild(head1);
            head.appendChild(head2);
            gradeTable.appendChild(head);
            let r = 0;
          request.gradeList.forEach(item => {
            r+=1; 
            if(item[1]){
              scanbutton.style.display = "none";
              var node = document.createElement("tr");  
              var nodeb2 = document.createElement("td");
              var nodeb = document.createElement("td");
              var nodebText = document.createTextNode(request.names[r]);
              var numerator = document.createTextNode(item[0]);  
              var denominator = document.createTextNode(item[1]);  
              var slash = document.createTextNode("/");  
              nodeb.appendChild(nodebText);
              node.appendChild(nodeb);
              node.appendChild(nodeb2);
              nodeb2.style.display="flex";
              nodeb2.appendChild(numerator);
              nodeb2.appendChild(slash);
              nodeb2.appendChild(denominator);
              gradeTable.style.display = "block";

              gradeTable.appendChild(node);
              final.style.display="flex";
            }
          });
      });
};