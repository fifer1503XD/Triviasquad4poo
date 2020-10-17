import { getCategories} from './getCategorias.js'
import  Question    from './question.js'


getCategories()
//let quest=new Question ("questions-number","questions-category","difficulty","type");
let quest=new Question("questions-number","questions-category","difficulty","type");

function carga()
{
quest.set("questions-number","questions-category","difficulty","type");
console.log(quest);
quest.getQuestion();
quest.eraseResults()
}
function validarRespuesta()
{
quest.validarRespuesta();
}

window.carga=carga;
window.validarRespuesta=validarRespuesta;