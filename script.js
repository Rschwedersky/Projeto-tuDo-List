document.addEventListener('DOMContentLoaded', loadList)
document.getElementById("add").addEventListener('click', criaItem)
const tarefa = document.getElementById("tarefa")
const listaUl = document.getElementById('lista')
let tudoLista = new Array;
let tudoListaStorage = localStorage.getItem('tudoLista')

function loadList(){
    if (tudoListaStorage){
        let atualizaLista = JSON.parse(localStorage.getItem('tudoLista'));
        for(var i = 0; i < atualizaLista.length; i++) {
            let item = atualizaLista[i];
            const novoElemento = document.createElement('li')
            novoElemento.id = `item-${item.id}`
            novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${item.id}"
        onclick="marcaFeito(${item.id})"
      >
      <label for="chk-${item.id}">
        ${item.titulo}
      </label>
      <button onclick="removeItem(${item.id})">
        &times;
      </button>
    `
            listaUl.appendChild(novoElemento);
            tudoLista.push(item);            
}}}


function criaItem(){
   if (tarefa.value.length > 0) {
    const item = {
        id: tudoLista.length,
        titulo: tarefa.value,
        feito: false
  }  
  const novoElemento = document.createElement('li')
  novoElemento.id = `item-${item.id}`
  novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${item.id}"
        onclick="marcaFeito(${item.id})"
      >
      <label for="chk-${item.id}">
        ${item.titulo}
      </label>
      <button onclick="removeItem(${item.id})">
        &times;
      </button>
    `
  listaUl.appendChild(novoElemento);
  tudoLista.push(item);
  const listaJSON = JSON.stringify(tudoLista);
  localStorage.setItem('tudoLista', listaJSON);
  tarefa.value=""
  } 
  else {
    tarefa.className = "errado"
    tarefa.value="Entre com a tarefa antes de adicionar"
  }
  
}

function removeItem(index) {
    // cria lista vazia
    const novaLista = []
  
    // preenche a lista nova com todos itens menos o removido
    for (let i = 0; i < tudoLista.length; i++) {
      // se o item não for o removido, vai pra nova lista
      if (i !== index) {
        novaLista.push(tudoLista[i])
      }
    }
  
    // pega item a ser removido do html
    const itemParaRemocao = document.getElementById(`item-${index}`)
    // remove ele do pai
    listaUl.removeChild(itemParaRemocao)
  
    // atualiza a lista com a lista nova
    tudoLista = novaLista
    const listaJSON = JSON.stringify(tudoLista);
    localStorage.setItem('tudoLista', listaJSON);
}