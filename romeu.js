// pega elementos do html
const campo = document.querySelector('input[name=campo]')
const botaoAdd = document.getElementById('btn-adicionar')
const botaoClear = document.getElementById('btn-limpar')
const ulAtividades = document.getElementById('ul-atividades')

// inicia um vetor vazio
let lista = []

// pega conteúdo do localStorage
let listaStorage = localStorage.getItem('lista-atividades')

// verifica se existe conteúdo
if (listaStorage) {
  // mostra no console se tiver
  console.log(listaStorage)
}

// apaga conteudo do campo
function limpaCampo() {
  campo.value = ''
}

// remove uma das atividades
function removeItem(index) {
  // cria lista vazia
  const novaLista = []

  // preenche a lista nova com todos itens menos o removido
  for (let i = 0; i < lista.length; i++) {
    // se o item não for o removido, vai pra nova lista
    if (i !== index) {
      novaLista.push(lista[i])
    }
  }

  // pega item a ser removido do html
  const itemParaRemocao = document.getElementById(`item-${index}`)
  // remove ele do pai
  ulAtividades.removeChild(itemParaRemocao)

  // atualiza a lista com a lista nova
  lista = novaLista
}

// marca ou desmarca atividade
function marcaFeito(index) {
  // verifica se existe esse índice na lista
  if (lista[index]) {
    // pega item da lista
    const item = lista[index]
  
    // inverte o valor de feito
    item.feito = !(item.feito)

    // pega o elemento do html
    const elemento = document.getElementById(`item-${index}`)

    // atualiza a classe para riscar ou não
    elemento.className = item.feito ? 'feito' : ''
  }
}

// adiciona itens a lista
function adiciona() {
  // verifica se o campo não está vazio
  if (campo.value.length > 0) {
    // define o objeto do item a ser adicionado
    const item = {
      id: lista.length,
      titulo: campo.value,
      feito: false
    }

    // cria um novo item de lista html
    const novoElemento = document.createElement('li')

    // adiciona atributo id ao item html
    novoElemento.id = `item-${item.id}`

    // preenche o conteúdo do item html
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

    // manda o item novo para o documento html
    ulAtividades.appendChild(novoElemento)

    // adiciona também no vetor da lista
    lista.push(item)

    console.log("LISTA->", { lista })

    // converte para string JSON
    const listaJSON = JSON.stringify(lista)

    // armazena do localStorage
    localStorage.setItem('lista-atividades', listaJSON)

    limpaCampo()
  } else {
    // avisa que o campo está vazio
    alert('É preciso informar um valor!')
  }
}

// vincula funções aos elementos html
botaoAdd.addEventListener('click', adiciona)