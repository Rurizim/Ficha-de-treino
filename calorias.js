//obtendo dados
function calcular() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseFloat(document.getElementById('idade').value);
  const sexo = document.querySelector('input[name="sexo"]:checked').value;
  const atividade = parseFloat(document.getElementById('atividade').value);

  if (!peso || !altura || !idade) {
    window.alert("Preencha todos os dados!");
    return;
  }




  //calcular TMB - taxa de metabolismo basal
  let tmb;
  if (sexo === 'feminino') {
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
  }
  else {
    tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;

  }

  //adicionar fator de atividade fisica

  const tdee = tmb * atividade;


  //definir objetivo e fazer calculo dos macros em g/kg

  const deficit = tdee * 0.8;
  const manutencao = tdee;
  const superavit = tdee * 1.1;


  const prodef = 2.2, gordef = 0.8;
  const proman = 2.0, gorman = 1.0;
  const prosup = 2.0, gordsup = 1.0;

  function macros(calorias, prot, gord) {
    const protkcal = (peso * prot) * 4;
    const gordkcal = (peso * gord) * 9;
    const carbo = (calorias - protkcal - gordkcal) / 4;

    return {
      prot: (peso * prot).toFixed(0),
      gord: (peso * gord).toFixed(0),
      carb: carbo.toFixed(0),
      carboKg: (carbo / peso).toFixed(1),

    };//fim do return


  };//fim da função macro

  const a = macros(deficit, prodef, gordef);
  const b = macros(manutencao, proman, gorman);
  const c = macros(superavit, prosup, gordsup);




  //calcular quantidade de água

  let agua = (peso * 40) / 1000

  //retornando resultado
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
<!--quntidade de agua-->
<h3>Quantidade de água que deve ser consumida: </h3>
<p>Água: ${agua} litros por dia</p>

<div class ='resulkcal'>
  <!--info de ganho de massa-->
  <div class ='ganho'>
    <h3> Ganho de massa:</h3>
    <p> Caloria: ${superavit.toFixed(0)} kcal </p>
    <p> Proteina: ${c.prot} gramas </p>
    <p> Gordura: ${c.gord} gramas </p>
    <p> Carboidrato: ${c.carb} gramas </p>
  </div>


  <!--info de manutencao-->
  <div class = 'manutencao' >
    <h3> Manutenção: </h3>
    <p> Calorias: ${manutencao.toFixed(0)} kcal </p>
    <p> Proteina: ${b.prot} gramas </p>
    <p> Gordura: ${b.gord} gramas </p>
    <p> Carboidrato: ${b.carb} </p>
  </div>


  <!--info de perca de peso-->
  <div class = 'perca'>
    <h3> Perca de peso: </h3>
    <p> Calorias: ${deficit.toFixed(0)} kcal </p>
    <p> Proteina: ${a.prot} gramas </p>
    <p> Gordura: ${a.gord} gramas </p>
    <p> Carboidrato: ${a.carb} gramas </p>
  </div>

  

</div><!--fim de resulkcal-->
<p> Lembrando que são estimativas! os calculos levam em consideração médias populacionais, para um resultado exato busque um nutricionista. </p>

`;
}


