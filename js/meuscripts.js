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

const imcTabela = document.querySelector("#resultado__tabela");

//capturando elementos do form
const inputAltura = document.querySelector("#altura");
const inputPeso = document.querySelector("#peso");
const botaoCalculo = document.querySelector("#calculadora__botao-calcular");
const botaoLimpar = document.querySelector("#calculadora__botao-limpar");

const imcResultado = document.querySelector('#imc__resultado span');
const imcSituacao = document.querySelector('#imc__situacao span');

const btnVoltar = document.querySelector('#resultado__table__botao-voltar');

const calcContainer = document.querySelector('.calculadora__container');
const resultContainer = document.querySelector('#resultado__container');

//funções

//criar tabela recebendo o array data definido no começo.
function criarTabela(data) {
    data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("resultado__tabela-data");

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
    imcResultado.classList = "";
    imcSituacao.classList = "";
};

//função para validação por regex nos inputs
function validarDigitos(text) {
    return text.replace(/[^0-9,]/g, "")
}

function calculoImc(altura, peso) {
  const imc = (peso / (altura * altura)).toFixed(1);
  return imc;
}

function mostrarOuEsconderResultados() {
  calcContainer.classList.toggle("resultado__hide")
  resultContainer.classList.toggle("resultado__hide")
}




//inicialização

criarTabela(data);


//eventos

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


  if (!info) return;
  
  imcResultado.innerText = imc
  imcSituacao.innerText = info

  switch (info) {
    case "Magreza":
      imcResultado.classList.add("alerta");
      imcSituacao.classList.add("alerta");
      break;
    case "Normal":
      imcResultado.classList.add("bom");
      imcSituacao.classList.add("bom");
      break;
    case "Sobrepeso":
      imcResultado.classList.add("alerta");
      imcSituacao.classList.add("alerta");
      break;
    case "Obesidade":
      imcResultado.classList.add("obesidade");
      imcSituacao.classList.add("obesidade");
      break;
    case "Obesidade grave":
      imcResultado.classList.add("obesidade__grave");
      imcSituacao.classList.add("obesidade__grave");
      break;
  }
  
  mostrarOuEsconderResultados()
})

//evento limpar o botao
botaoLimpar.addEventListener("click", (e) => {
    e.preventDefault();
    limparInputs()
})

btnVoltar.addEventListener("click", () => {
  limparInputs()
  mostrarOuEsconderResultados()
});

