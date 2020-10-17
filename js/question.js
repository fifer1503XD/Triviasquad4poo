export default class Question 
    {
    
    
    constructor(qn,qc,dif,typ) {
        this.questionsQuantity=document.getElementById(`${qn}`).value; 
        this.questionsCategory=document.getElementById(`${qc}`).value
        this.questionsDifficulty=document.getElementById(`${dif}`).value;
        this.questionType=document.getElementById(`${typ}`).value;
        this.corr=[];
        this.arrayTypeQuestion=[]; 
        let identificador=0;   
         }
    set(qn,qc,dif,typ) 
        {
            this.questionsQuantity=document.getElementById(`${qn}`).value; 
            this.questionsCategory=document.getElementById(`${qc}`).value
            this.questionsDifficulty=document.getElementById(`${dif}`).value;
            this.questionType=document.getElementById(`${typ}`).value;
            this.corr=[];
            this.arrayTypeQuestion=[]; 
            let identificador=0;   
        }
getQuestion()
  {
      console.log(this.questionsQuantity);
      fetch(`https://opentdb.com/api.php?amount=${this.questionsQuantity}&category=${this.questionsCategory}&difficulty=${this.questionsDifficulty}&type=${this.questionType}`)    
      .then(response => response.json())
          .then(data => {this.typequestion(data.results),this.printCards(data.results)})
   
     
    
  }
    
typequestion(questions){
    this.arrayTypeQuestion=new Array;     
         questions.forEach((question,ind)=>{
         this.arrayTypeQuestion.push(question.type)   
         })
     }
     returnCardHTML(q,index) {
        const card = `<div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${q.category}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                            ${this.returnAnswersHTML(q.correct_answer, q.incorrect_answers,index)}           
                        </div>
                    </div>`
        return card;
    }
      
    
    printCards(questions) {
         const container = document.getElementById('container-cards');
     container.innerHTML = '';
     questions.forEach((question,index) => {
         const card = this.returnCardHTML(question,index);
         container.innerHTML += card;
     });
     }



 returnAnswersHTML(correct, incorrects,ind) {
     this.corr.push(correct)
     incorrects.push(correct)
 
    
     for (var a=[],i=0;i<incorrects.length;++i)
     {
        a[i]=i;
     } 
 
 a = this.shuffle(a);

 let cont=0;
 let respuestas=[]
 printRespuestas(a,incorrects,cont)
 function printRespuestas(a,arr,index){   
 a.forEach(element => {
     console.log(arr)
     let c=a[index];
     respuestas.push(arr[c])  
     index++
     });
     console.log(respuestas)
    }
 
     let incorrectHTML = '';
     respuestas.forEach((incorrect,index) => {
         incorrectHTML += `  <div>
                             <div class="form-check" id"form${ind}">
                             <input class="form-check-input" type="radio" name="checkbox${ind}" id="answer-${index}${ind}" value="${incorrect}"required>
                             <label class="form-check-label" for="answer-${index}${ind}">
                             ${incorrect}
                             </label>
                         </div>
                         </div>`;
                       
                      
     })
     console.log(this.corr)
     return incorrectHTML;
    }
 shuffle(array) {
    let tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }
 
 validarRespuesta() 
 {

     let respchecked = false
     let respvalue = 0
     let sumaresult = 0
     let resultado = []
     let tresults = document.getElementById('t-resultados');
     let cant= document.getElementById('questions-number').value;
     console.log("cantidad  "+cant);
     let answ;

     for (let s = 0; s < cant; s++) {
         var k=0;
         if (this.arrayTypeQuestion[s]==='boolean')
         { 
             console.log("es de tipo boolean");
             while(k<2)
             {
             answ = document.getElementById(`answer-${k}${s}`);
             console.log(" valor del select en un boolean  "+ answ.checked);
             if(answ.checked==true)
             {
              resultado.push(answ.value);
             }

             k=k+1;
             }

         }
         else
                 {

          while(k<4)
             {
              answ = document.getElementById(`answer-${k}${s}`);
              console.log(" valor del select en un boolean  "+ answ.checked);
              if(answ.checked==true)
              {
               resultado.push(answ.value);
              }

              k=k+1;
             }
                 }
     }
         console.log("array de resultados   " +resultado);
         for( var j=0; j<resultado.length;j++)
                 { 

                     if(this.corr[j]==resultado[j])
                        {
                            console.log("entro "+j);
                            sumaresult=sumaresult+1;
                         }

                 } 



          console.log("el resultado es   "+sumaresult);


     tresults.innerHTML = `
     <h3>Estos son los resultados:</h3><br>
           <h3>Tiene ${sumaresult} respuestas correctas</h3><br>
           <h3>Tiene ${cant - sumaresult} respuestas incorrectas</h3><br>`}
     


 
 }