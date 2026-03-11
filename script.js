const tarefasInput = document.getElementById('tarefas');
const listaElement = document.getElementById('lista');

const STORAGE_KEY = 'tarefas-lista';

function salvarTarefas(tarefas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

function carregarTarefas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function criarItem(tarefa) {
  const li = document.createElement('li');
  const texto = document.createElement('span');
  texto.textContent = tarefa;

  const remover = document.createElement('button');
  remover.type = 'button';
  remover.textContent = 'Remover';
  remover.addEventListener('click', () => {
    removerTarefa(tarefa);
  });

  li.appendChild(texto);
  li.appendChild(remover);

  return li;
}

function atualizarLista() {
  const tarefas = carregarTarefas();
  listaElement.innerHTML = '';

  if (tarefas.length === 0) {
    const vazio = document.createElement('li');
    vazio.textContent = 'Nenhuma tarefa adicionada ainda.';
    vazio.style.opacity = '0.6';
    listaElement.appendChild(vazio);
    return;
  }

  tarefas.forEach((tarefa) => {
    listaElement.appendChild(criarItem(tarefa));
  });
}

function adicionarTarefas() {
  const valor = tarefasInput.value.trim();
  if (!valor) {
    tarefasInput.focus();
    return;
  }

  const tarefas = carregarTarefas();
  tarefas.push(valor);
  salvarTarefas(tarefas);
  tarefasInput.value = '';
  atualizarLista();
  tarefasInput.focus();
}

function removerTarefa(tarefa) {
  const tarefas = carregarTarefas().filter((item) => item !== tarefa);
  salvarTarefas(tarefas);
  atualizarLista();
}

// Inicialização
atualizarLista();

// Adiciona comportamento ao formulário (evita inline JS)
const form = document.getElementById('form-tarefas');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  adicionarTarefas();
});
