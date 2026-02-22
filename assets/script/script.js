let tareas = [
  { id: 1, descripcion: "Estudiar JavaScript", completado: false },
  { id: 2, descripcion: "Hacer ejercicio", completado: false },
  { id: 3, descripcion: "Leer 20 minutos", completado: false },
];

let contadorId = 4;

const lista = document.getElementById("listaTareas");
const totalSpan = document.getElementById("total");
const realizadasSpan = document.getElementById("realizadas");
const input = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");

function renderTareas() {
  lista.innerHTML = "";

  for (let tarea of tareas) {
    const fila = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = tarea.id;

    const tdDesc = document.createElement("td");
    tdDesc.textContent = tarea.descripcion;

    if (tarea.completado) {
      tdDesc.classList.add("completada");
    }

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completado;
    checkbox.addEventListener("click", () => cambiarEstado(tarea.id));
    tdCheck.appendChild(checkbox);

    const tdEliminar = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));
    tdEliminar.appendChild(btnEliminar);

    fila.appendChild(tdId);
    fila.appendChild(tdDesc);
    fila.appendChild(tdCheck);
    fila.appendChild(tdEliminar);

    lista.appendChild(fila);
  }

  actualizarResumen();
}

function agregarTarea() {
  const descripcion = input.value.trim();

  if (descripcion !== "") {
    tareas.push({
      id: contadorId++,
      descripcion: descripcion,
      completado: false,
    });

    input.value = "";
    renderTareas();
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  renderTareas();
}

function cambiarEstado(id) {
  const tarea = tareas.find((t) => t.id === id);
  tarea.completado = !tarea.completado;
  renderTareas();
}

function actualizarResumen() {
  totalSpan.textContent = tareas.length;
  realizadasSpan.textContent = tareas.filter((t) => t.completado).length;
}

btnAgregar.addEventListener("click", agregarTarea);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

renderTareas();
