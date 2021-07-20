const tbody = document.querySelector('tbody');
const th = document.querySelector('th');

let express = '';
let caled = false;

const isOper = (value) =>{
  switch(value){
    case '+':
    case '-':
    case '*':
    case '/':
      return true;
    default:
      return false;
  }
}
const modifyExpress = (value) =>{
  express = express.slice(0,express.length-1);
  express+=value;
}
const isValid = (value, exp) =>{
  if(!isOper(value)){
    return true;
  }
  if(exp.length === 0 && value !== '-'){
    return false;
  }else if(isOper(exp[exp.length-1])){
    if(exp.length > 1){
      modifyExpress(value);
    }else if(exp[0] === '-' && value !== '-'){
      modifyExpress('');
    }
    return false;
  }else{
    return true;
  }
}
const calculate = (expression) =>{
  try{
    return eval(expression);
  }catch{
    return 'ERROR';
  }
}

tbody.addEventListener('click', (event)=>{
  let clicked = event.target;
  const val = clicked.innerText;
  if(clicked.className !== 'btn'){
    return false;
  }

  if(val === 'clear'){
    express ='';
    th.innerText='';
  }else if(val === 'Enter'){
    const result = calculate(express);
    th.innerText = result;
  }else{
    if(isValid(val,express)){
      express +=val;
    }
    th.innerText = express;
  }
})