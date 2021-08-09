function getCGPA(totalComSub){
  let collectorSgpa=document.querySelectorAll(".sem-sgpa")
  const arrSGPA = [];
  let flag = true;
  for (let i = 0; i < totalComSub; i++) {
    let val = collectorSgpa[i].value;
    console.log(`datatype=>${typeof(val)}`)
    var letters = /^[0-9.]*$/;
    if (val == '') {
      showAlertInvalid('Every field must to be filled');
      flag = false;
      break;
    } 
    else if (!(letters.test(val))) {
        showAlertInvalid('please check the entered values');
        flag = false;
        break;
      } else if (val < 0.0 || val > 10.0) {
        showAlertInvalid('SGPA must between 0.0 to 10.0');
        flag = false;
        break;
      } else {
        arrSGPA.push(Number(val));
      }
    }
  
  if (flag) {
    let totalSGPA = 0;
    arrSGPA.forEach((x) => {
      totalSGPA += x;
    });
    let CGPA = roundToTwo(totalSGPA / totalComSub);

    const result = document.getElementById('result1');
    result.innerHTML = `<div class="alert alert-primary" role="alert" id="result">
    Cumulative Grade Point Average (CGPA) is
      <span class="alert-link">${CGPA}</span>
    </div>`;
    document.getElementById('downloadcgpa').innerHTML=`<button type="button" id="download3" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Download as PDF</button>`
    let dd=document.getElementById("download3")
    console.log(dd)
    dd.addEventListener("click", () => {
            const tempelate2 = this.document.getElementById("tempelate2");
            //console.log(tempelate1);
            //console.log(window);
            var opt = {
                margin: 0.5,
                filename: 'SGPA-Result.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(tempelate2).set(opt).save();
        })
    
  }
}
function showAlertInvalid(str) {
  let html = `<div class="alert alert-danger">
  <strong>${str}</strong>
</div>`;
  document.getElementById('alert-own-1').innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(() => {
    document.getElementById('alert-own-1').innerHTML = '';
  }, 4000);
}
function localStore() {
  console.log("rakita rakita")
  const sgpaBox = document.querySelectorAll('.sem-sgpa');
  console.log(localStorage.getItem(2))
  for (let i = 0; i < sgpaBox.length; i++) {
    console.log(`the local store value =>${sgpaBox[i]}`)
    sgpaBox[i].value = localStorage.getItem(i + 1);
  }
}
  

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
    <div class="col-8"><input class="form-control " type="text" value="" inputmode="text"  /></div>
    <div class="col-2 ">
      
      <select class="form-control sub-sgpac" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="0">0</option>
                
              </select>
    </div>`
    html+=`<div class="col-2">
      <select class="form-control sub-sgpag " id="grade">
        <option value = 10 >O</option>
        <option value = 9 >A+</option>
        <option value = 8 >A</option> 
        <option value = 7 >B+</option>
        <option value = 6 >B</option>
        <option value = 0 >RA</option>
        <option value = 0>AB</option>
        <option value = 0>P</option>
      </select>
    </div>
  </div>`;
    }
    html +=
      '<div id="alert-own"></div><button type="button" id="second" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Calculate SGPA</button><div><div id="result-1"></div> ';
    html += `</div>`;
    window.scrollTo(0, document.body.scrollHeight/5 );
    document.getElementById('box1').innerHTML = html;
  }
  function renderSub2(data){
    box1.innerHTML=""
    let html = `
    <div class="row">
      <div class="col-8 head">Subject</div>
      <div class="col-2 head">Credits</div>
      <div class="col-2 head">Grade</div>
    </div>`;
    for(let i=0;i<data.subject.length;i++){
        
        html+= `<div class="row">
      <div class="col-8"><input type="text" class="form-control" value="${data.subject[i].subject}" disabled/></div>
      <div class="col-2 ">
        
        <select class="form-control sub-sgpac" value="${data.subject[i].credit}" disabled>
                  <option value="${data.subject[i].credit}">${data.subject[i].credit}</option>
                  
                  
                </select>
      </div>`
      html+=`<div class="col-2">
        <select class="form-control sub-sgpag " id="grade">
          <option value = 10 >O</option>
          <option value = 9 >A+</option>
          <option value = 8 >A</option> 
          <option value = 7 >B+</option>
          <option value = 6 >B</option>
          <option value = 0 >RA</option>
          <option value = 0>AB</option>
          <option value = 0>P</option>
        </select>
      </div>
    </div>`;
      }
      html +=
        '<div id="alert-own"></div><button type="button" id="sixButton" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Calculate SGPA</button><div><div id="result-2"></div>';
      html += `</div>`;
      window.scrollTo(0, document.body.scrollHeight/5 );
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
     let sem=document.getElementById("semester").value
     console.log(sem)
     console.log(typeof(sem))
     localStorage.setItem(sem,resSgpa)
     localStore()
     const result = document.getElementById('result-1');
      result.innerHTML = `<div class="alert alert-primary" role="alert" id="result">
      Semester Grade Point Average (SGPA) is
      <span class="alert-link">${resSgpa}</span>
    </div>`;
    const download = document.getElementById('download')
    download.innerHTML=`<button type="button" id="download1" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Download as PDF</button>`
    let dd=document.getElementById("download1")
    console.log(dd)
    dd.addEventListener("click", () => {
            const tempelate1 = this.document.getElementById("tempelate1");
            //console.log(tempelate1);
            //console.log(window);
            var opt = {
                margin: 0.5,
                filename: 'SGPA-Result.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(tempelate1).set(opt).save();
        })
    window.scrollTo(0, document.body.scrollHeight /5);
}
function getSGPA2(data){
  totalSemesters=data.subject.length
  let SGPAC = document.querySelectorAll('.sub-sgpac');
    let SGPAG = document.querySelectorAll('.sub-sgpag');
    

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
     let sem=document.getElementById("semester").value
     console.log(sem)
     console.log(typeof(sem))
     localStorage.setItem(sem,resSgpa)
     localStore()
     const result = document.getElementById('result-2');
      result.innerHTML = `<div class="alert alert-primary" role="alert" id="result">
      Semester Grade Point Average (SGPA) is
      <span class="alert-link">${resSgpa}</span>
    </div>`;
    const download = document.getElementById('download')
    download.innerHTML=`<button type="button" id="download2" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Download as PDF</button>`
    let dd=document.getElementById("download2")
    console.log(dd)
    dd.addEventListener("click", () => {
            const tempelate1 = this.document.getElementById("tempelate1");
            //console.log(tempelate1);
            //console.log(window);
            var opt = {
                margin: 0.5,
                filename: 'SGPA-Result.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(tempelate1).set(opt).save();
        })
    window.scrollTo(0, document.body.scrollHeight /5);

}

  var fb=document.getElementById("firstButtton");
  console.log(fb)
  fb.addEventListener('click',()=>{
    document.getElementById('download').innerHTML = "";
    document.getElementById('downloadcgpa').innerHTML = "";
     if(document.getElementById("dept").value==="other"){
       console.log("nadakatum nadakattum")
       document.getElementById('box1').innerHTML = "";
       let html=`<div class="row">
       <div class="col-8"><label for="noofSub">Number of subjects</label></div>
       <div class="col-4" >
         <select class="form-control "  id="noofSub">
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
         </select>
       </div>
     </div>`
     html +=
     '<div id="alert-own"></div><button type="button" id="fifthButton" class="btn btn-secondary btn-sm btn-block all-button mb-4" >Calculate </button><div><div id="result"></div>';
   html += `</div>`;
      let cct=document.getElementById("box3")
      cct.innerHTML=html
      let fob=document.getElementById("fifthButton")
      fob.addEventListener('click',()=>{
      let NoofSub=document.getElementById("noofSub").value;
      document.getElementById('box1').innerHTML = "";
      document.getElementById('box3').innerHTML = "";
      renderSub(NoofSub);
      var sb=document.getElementById("second");
      console.log(sb)
      sb.addEventListener('click',()=>{

      getSGPA(NoofSub)
      console.log("HEYY")


      })

      })

      

      

     } 
     else{
      document.getElementById('box1').innerHTML = "";
      document.getElementById('box3').innerHTML = "";
      let deptTrial=document.getElementById('dept').value
      let regulation=document.getElementById('regulation').value
      let semester=document.getElementById('semester').value
      const data=json[regulation][deptTrial][semester]
      renderSub2(data)
      let sib=document.getElementById("sixButton")
      sib.addEventListener('click',()=>{
        getSGPA2(data)

      })

     }
     
     

  })
  var tb=document.getElementById("thirdButtton");
  console.log(tb)
  tb.addEventListener('click',()=>{
    document.getElementById('download').innerHTML = "";
    document.getElementById('downloadcgpa').innerHTML = "";
    let html=`<div class="row">
    <div class="col-8">Semester</div>
    <div class="col-4">SGPA</div>
    </div>`
    let comSem=document.getElementById("semcompleted").value
    console.log(comSem)
    for(let i=1;i<=comSem;i++){
      html += `
      <div class="row">
        <div class="col-8"><label>Semester ${i}</label></div>
        <div class="col-4">
          <input class="form-control sem-sgpa" type="text" value="" inputmode="decimal"  />
        </div>
      </div>`;
  }
  html +=
    '<div id="alert-own-1"></div><button type="button" class="btn btn-secondary btn-sm btn-block all-button mb-4" id="fourthButton">Calculate CGPA</button><div><div id="result1"></div>';
  html += `</div>`;
  document.getElementById('box2').innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight );
  localStore()
  document.getElementById("fourthButton").addEventListener('click',()=>{
    let compSem=document.getElementById("semcompleted").value
    getCGPA(compSem)

    window.scrollTo(0, document.body.scrollHeight );
    
  })

})

for(let i=0;i<8;i++){
  localStorage.removeItem(i);
}
