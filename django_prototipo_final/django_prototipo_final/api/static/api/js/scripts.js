// URL base de la API
const API_URL = '/api/v1/programmers/';


// Elementos del DOM
const form = document.getElementById('programmer-form');
const tableBody = document.getElementById('programmers-table');
const loading = document.getElementById('loading');
const noProgrammers = document.getElementById('no-programmers');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');

// Cargar programadores al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadProgrammers();
});

// Manejar envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    saveProgrammer();
});

// Función para cargar todos los programadores
async function loadProgrammers() {
    showLoading(true);
    hideMessages();
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const programmers = await response.json();
        renderProgrammers(programmers);
    } catch (error) {
        showError('Error al cargar los programadores: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Función para renderizar la tabla de programadores
function renderProgrammers(programmers) {
    tableBody.innerHTML = '';
    
    if (programmers.length === 0) {
        noProgrammers.style.display = 'block';
        return;
    }
    
    noProgrammers.style.display = 'none';
    
    programmers.forEach(programmer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${programmer.id}</td>
            <td>${programmer.fullname}</td>
            <td>${programmer.nickname}</td>
            <td>${programmer.age}</td>
            <td>
                <span class="${programmer.is_active ? 'status-active' : 'status-inactive'}">
                    <i class="fas ${programmer.is_active ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${programmer.is_active ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button class="btn btn-warning btn-sm btn-action" onclick="editProgrammer(${programmer.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm btn-action" onclick="deleteProgrammer(${programmer.id}, '${programmer.fullname}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para guardar un programador (crear o actualizar)
async function saveProgrammer() {
    const id = document.getElementById('programmer-id').value;
    const programmer = {
        fullname: document.getElementById('fullname').value,
        nickname: document.getElementById('nickname').value,
        age: parseInt(document.getElementById('age').value),
        is_active: document.getElementById('is_active').value === 'true'
    };
    
    hideMessages();
    
    try {
        let method = id ? 'PUT' : 'POST';
        let url = API_URL + (id ? `${id}/` : '');
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(programmer)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || JSON.stringify(errorData));
        }
        
        resetForm();
        showSuccess(`Programador ${id ? 'actualizado' : 'creado'} correctamente`);
        loadProgrammers();
        
    } catch (error) {
        showError('Error al guardar: ' + error.message);
    }
}

// Función para editar un programador
async function editProgrammer(id) {
    hideMessages();
    
    try {
        const response = await fetch(API_URL + `${id}/`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const programmer = await response.json();
        
        document.getElementById('programmer-id').value = programmer.id;
        document.getElementById('fullname').value = programmer.fullname;
        document.getElementById('nickname').value = programmer.nickname;
        document.getElementById('age').value = programmer.age;
        document.getElementById('is_active').value = programmer.is_active.toString();
        
        formTitle.innerHTML = 'Editar Programador';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar';
        submitBtn.className = 'btn btn-warning w-100';
        
        document.querySelector('#programmer-form').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        showError('Error al cargar el programador: ' + error.message);
    }
}

// Función para eliminar un programador
async function deleteProgrammer(id, name) {
    if (!confirm(`¿Estás seguro de que deseas eliminar al programador "${name}"?`)) return;
    
    hideMessages();       
    try {
        const response = await fetch(API_URL + `${id}/`, {
            method: 'DELETE',
            headers: {'X-CSRFToken': getCookie('csrftoken')}
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        showSuccess('Programador eliminado correctamente');
        loadProgrammers();
        
    } catch (error) {
        showError('Error al eliminar: ' + error.message);
    }
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('programmer-id').value = '';
    document.getElementById('fullname').value = '';
    document.getElementById('nickname').value = '';
    document.getElementById('age').value = '';
    document.getElementById('is_active').value = 'true';
    
    formTitle.innerHTML = 'Agregar Nuevo Programador';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar';
    submitBtn.className = 'btn btn-primary w-100';
}

// Funciones para mostrar/ocultar loading y mensajes
function showLoading(show) { loading.style.display = show ? 'block' : 'none'; }
function showError(msg) { document.getElementById('error-text').textContent = msg; errorMessage.style.display = 'block'; }
function showSuccess(msg) { document.getElementById('success-text').textContent = msg; successMessage.style.display = 'block'; }
function hideError() { errorMessage.style.display = 'none'; }
function hideSuccess() { successMessage.style.display = 'none'; }
function hideMessages() { hideError(); hideSuccess(); }

// Obtener token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
