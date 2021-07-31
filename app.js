function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }
  
function getResult(credit, grade, totalCredit) {
    var result = 0.0,
      points = 0;
    for (let i = 0; i < credit.length; i++) {
      points += credit[i] * grade[i];
    }
  
    result = roundToTwo(points / totalCredit);
    if (isNaN(result)) {
      result = 0;
    }
    return result;
  }
function renderSub(sem) {
    let html = `
    <div class="row">
      <div class="col-8 head">Subject</div>
      <div class="col-2 head">Credits</div>
      <div class="col-2 head">Grade</div>
    </div>`;
    for (let i = 1; i <= sem; i++) {
      html += `<div class="row">
    <div class="col-8"><input class="form-control sem-sgpa" type="text" value="" inputmode="text"  /></div>
    <div class="col-2">
      
      <select class="form-control sub-sgpac" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                
              </select>
    </div>
    <div class="col-2">
      <select class="form-control sub-sgpag" id="grade">
        <option value = 10 >O</option>
        <option value = 9 >A+</option>
        <option value = 8 >A</option> 
        <option value = 7 >B+</option>
        <option value = 6 >B</option>
        <option value = 0 >RA</option>
        <option value = 0>AB</option>
      </select>
    </div>
  </div>`;
    }
    html +=
      '<div id="alert-own"></div><button type="button" id="second" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Calculate SGPA</button><div><div id="result"></div>';
    html += `</div>`;
    document.getElementById('box1').innerHTML = html;
  }
  function getSGPA(totalSemesters) {
    let SGPAC = document.querySelectorAll('.sub-sgpac');
    console.log(SGPAC)
    let SGPAG = document.querySelectorAll('.sub-sgpag');
    console.log(SGPAG)

    const arSGPAC=[]
    const arSGPAG=[]
    for (let i = 0; i < totalSemesters; i++) {
        let cred = SGPAC[i].value;
        let grad = SGPAG[i].value;
        
        arSGPAC.push(Number(cred));
        arSGPAG.push(Number(grad));


    }
    console.log(`credits=>${arSGPAC}`)
    console.log(`Grade=>${arSGPAG}`)
     let tc=arSGPAC.reduce((a, b) => a + b, 0)
     let resSgpa=getResult(arSGPAC,arSGPAG,tc)
     const result = document.getElementById('result');
      result.innerHTML = `<div class="alert alert-primary" role="alert" id="result">
      Semester Grade Point Average (SGPA) is
      <span class="alert-link">${resSgpa}</span>
    </div>`;


    /*const arrSGPA = [];
    let flag = true;
    for (let i = 0; i < totalSemesters; i++) {
      let val = SGPA[i].value;
      if (val == '') {
        showAlertInvalid('Every field must to be filled');
        flag = false;
        break;
      } else {
        if (val < 0.0 || val > 10.0) {
          showAlertInvalid('SGPA must between 0.0 to 10.0');
          flag = false;
          break;
        } else {
          arrSGPA.push(Number(val));
        }
      }
    }*/
}
  var fb=document.getElementById("firstButtton");
  console.log(fb)
  fb.addEventListener('click',()=>{
     let NoofSub=document.getElementById("noofSub").value;
     console.log(NoofSub)
      console.log("hello")
      renderSub(NoofSub);
      var sb=document.getElementById("second");
        console.log(sb)
        sb.addEventListener('click',()=>{
    
        getSGPA(NoofSub)
        console.log("HEYY")
     

  })
     

  })
  

