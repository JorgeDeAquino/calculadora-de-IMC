// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

//seleção de elementos

//vai aparecer depois que tiver os resultados de tabela
const imcTabela = document.querySelector("#resultado__tabela");



//capturando elementos do form
const inputAltura = document.querySelector("#altura");
const inputPeso = document.querySelector("#peso");
const botaoCalculo = document.querySelector("#calculadora__botao-calcular");
const botaoLimpar = document.querySelector("#calculadora__botao-limpar");

//funções

//criar tabela recebendo o array data definido no começo.
function criarTabela(data) {
    //foeEach percorrendo o array e transformando em cada um dos itens
    data.forEach(item => {

        //criando um elemento div com a classe resultado__tabela-data
        const div = document.createElement("div");
        div.classList.add("resultado__tabela-data");


        //criando os p para aparecer e recebe o item do array data e acessa pelo item que é cada elemento do array . classification que é o nome da chave de localização no array
        const classification = document.createElement("p");
        classification.innerText = item.classification;
        
        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTabela.appendChild(div);

    });
}

// limpar tabela de valores
function limparInputs() {
    inputAltura.value = "";
    inputPeso.value = "";
};

//função para validação por regex nos inputs
function validarDigitos(text) {
    return text.replace(/[^0-9,]/g, "")
}

function calculoImc(altura, peso) {
  //tofixed arredonda o volor recebido para o numero de casas informado
  const imc = (peso / (altura * altura)).toFixed(1);
  return imc;
}



//inicialização

criarTabela(data);


//eventos


//consegue percorrer as duas consts pois as duas tem exatamente as mesmas propriedades
[inputAltura, inputPeso].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validarDigitos(e.target.value);
        e.target.value = updatedValue;
    });
});


//evento botao calcular
botaoCalculo.addEventListener("click", (e) => {
  e.preventDefault();
  const peso = +inputPeso.value.replace(",", ".")
  const altura = +inputAltura.value.replace(",", ".")

  if (!altura || !peso) return;

  const imc = calculoImc(altura, peso);

  let info;

  data.forEach((item) => {
    if(imc >= item.min && imc <= item.max) {
    info = item.info;
    }
  })

  console.log(info);

  if (!info) return;
  

})



//evento limpar o botao
botaoLimpar.addEventListener("click", (e) => {
    e.preventDefault();
    limparInputs()
})



