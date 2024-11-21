// Seleciona o visor e todos os botões
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons .button');
let posfixa = "";

// Função para atualizar o visor
function updateDisplay(value) {
   let temp = display.value + value;
   temp = temp.replace(/\s+/g, '');

    display.value = temp;

}
function infixaParaPosfixa() {
  posfixa = "";
  let pilha = [];
  const expression = display.value
    .replace(/,/g, '.')  // Substitui vírgula por ponto decimal
    .replace(/×/g, '*')  // Substitui símbolo de multiplicação por *
    .replace(/÷/g, '/'); // Substitui símbolo de divisão por /

  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    if (!isNaN(char) && char !== " ") {

      posfixa += char;
    } else if (char === '(') {

      pilha.push(char);
    } else if (char === '+' || char === '-') {

      while (pilha.length > 0 && pilha[pilha.length - 1] !== '(') {
        posfixa += pilha.pop();
      }
      pilha.push(char);
    } else if (char === '*' || char === '/') {

      while ( pilha.length > 0 && (pilha[pilha.length - 1] === '*' || pilha[pilha.length - 1] === '/')) {
        posfixa += pilha.pop();
      }
      pilha.push(char);
    } else if (char === ')') {

      let retira = pilha.pop();
      while (retira !== '(') {
        posfixa += retira;
        retira = pilha.pop();
      }
    }
  }


  while (pilha.length > 0) {
    const operador = pilha.pop();
    posfixa += operador;
  }
}

// Função para realizar o cálculo
function calculate() {

  infixaParaPosfixa();
  let stack =[];

  for(i=0;i<posfixa.length;i++){
    if(posfixa.charAt(i) == "+" || posfixa.charAt(i) == "-" || posfixa.charAt(i) == "*" || posfixa.charAt(i) == "/"){
      let aux1 =parseInt( stack.pop());
      let aux2 =parseInt( stack.pop());

      if(posfixa.charAt(i) == "+"){
        stack.push(parseInt(aux1+aux2));
      } else if(posfixa.charAt(i) == "-"){
        stack.push(parseInt(aux1-aux2));
      }else if(posfixa.charAt(i) == "*"){
        stack.push(parseInt(aux1*aux2));
      }else if(posfixa.charAt(i) == "/"){
        stack.push(parseInt(aux1/aux2));
      }
    }else{
      stack.push(posfixa.charAt(i))
    }
  }
    
    let result = stack.pop();
    
   // Converte o ponto decimal do resultado para vírgula
    display.value = result.toString().replace('.', ',');
     
  

}

// Função para limpar o visor
function clearDisplay() {
  display.value = '';
}

// Adiciona o evento de clique a cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (button.dataset.number) {
      // Se o botão for um número, adiciona o número ao visor
      // "truthy" ou "falsy" = undefined***,null,false,0, NaN
      if(display.value.charAt(display.value.length-1)==')'){
        updateDisplay('× '+buttonValue);
      }else{
      updateDisplay(buttonValue);
      }

    } else if (button.dataset.operation) {
      // Se for uma operação, adiciona a operação ao visor
   
      updateDisplay(`${buttonValue}`); //Interpolação de String

    } else if (button.dataset.clear) {
      // Se for o botão de limpar, limpa o visor
   
      clearDisplay();

    } else if (button.dataset.equal) {
      
      // Se for o botão de igual, realiza o cálculo

      calculate();

    }  else if (button.dataset.hp) {

      infixaParaPosfixa();

    }
    else if (button.dataset.decimal) {
      // Se for o botão de vírgula, adiciona a vírgula para decimais
      updateDisplay(',');
    }else if(button.dataset.parentheses){

        if(display.value.charAt(display.value.length-1)=='('||display.value.charAt(display.value.length-1)==""||display.value.charAt(display.value.length-1)=="+"||display.value.charAt(display.value.length-1)=="-"||display.value.charAt(display.value.length-1)=="÷"||display.value.charAt(display.value.length-1)=="×"){
            console.log("teste");
            updateDisplay('(');
        }else{
            let stackBrackets = [];
            for(i=0; i<display.value.length ; i++){
                if(display.value.charAt(i)=='('){
                    stackBrackets.push(display.value.charAt(i));
                    
                }else if(display.value.charAt(i)==')'){
                    if(stackBrackets[stackBrackets.length-1] == '('){
                        stackBrackets.pop();
                        console.log(stackBrackets);
                    }
                }
            }
    
        if(stackBrackets.length!=0){
            updateDisplay(')');
        }else{
            updateDisplay('× (');
        }
    }
    }else if ( button.dataset.percentage){
        alert("Feature ainda não implementada! Sorry :/");
    }
  });  
});


document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); //previne o efeito padrão, a.k.a. apertar o botão novamente
        calculate();
    } 
  });