# 자바스크립트 연습 - 계산기

## - html/css
- 계산기의 모양은 `table`을 사용했다.
- css는 크게 건드리지 않았고, 계산기 모양만 잡아주는 방식이다. js를 하면서 추가되는 것들이 있을 것이다.
- hover시 `bold`체로 바꿔 시각적 효과를 주었다.
- 복잡한 계산은 불가하고 사칙연산만 가능하다.
- 입력된 값을 하나씩 지울 수 없고 전체 지우기만 가능하다.

## - js
``` js
const tbody = document.querySelector('tbody');
const th = document.querySelector('th');
```
- `th`를 이용해서 입력과 결과값을 보여주는 역할을 했다.
- `tbody`에는 버튼이 있다. (실제로 버튼으로 구현한 것은 아니다.)

#### 이벤트리스너

```js
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
```
- 이벤트리스너는 `tbody`에만 걸어두었고, 모든 버튼인 `td`혹은 `tr`의 경우는 모두 `tbody`안에 있으므로 각각에 걸지 않았다.
- 처음 조건문의 경우 `td`에만 `btn`이라는 클래스가 설정되어 있어서 다른 곳을 클릭했을 때 함수가 종료되도록 했다.

``` js
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
```
- 특별한 것은 없으나, 결과값을 `eval()`을 사용해 문제가 발생할 수 있다.
- 만약 식이 완성되지 않았는 enter를 누른 경우, ERROR가 화면에 나오도록 했다.
- 연산자가 입력되었을 때를 따로 처리했다.