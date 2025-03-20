// Clase User
class User {
    constructor(username, nombres, apellidos, fechaNacimiento, ci, celular, correo, password) {
        this.username = username;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.ci = ci;
        this.celular = celular;
        this.correo = correo;
        this.password = password; // Contraseña del usuario
    }

    // Método para validar la contraseña
    validPassword(password) {
        return this.password === password;
    }
}

// Clase UserController
class UserController {
    constructor() {
        this.users = [];
        this.attempts = 0; // Intentos de login
        this.isLoggedIn = false;
        this.loggedUser = null;

        // Usuario por defecto con privilegios de superusuario
        this.addUser("user", "Admin", "Super", "1990-01-01", "12345678", "987654321", "admin@admin.com", "admin"); // usuario admin por defecto
    }

    // Validar el usuario y la contraseña
    validUser(username, password) {
        const user = this.users.find(user => user.username === username);
        if (user && user.validPassword(password)) {
            this.loggedUser = user;
            this.isLoggedIn = true;
            return true;
        }
        return false;
    }

    // Método para agregar un nuevo usuario
    addUser(username, nombres, apellidos, fechaNacimiento, ci, celular, correo, password) {
        const user = new User(username, nombres, apellidos, fechaNacimiento, ci, celular, correo, password);
        this.users.push(user);
    }

    // Método para eliminar un usuario
    removeUser(index) {
        this.users.splice(index, 1);
    }

    // Método para modificar un usuario
    modifyUser(index, newData) {
        const user = this.users[index];
        if (user) {
            Object.assign(user, newData);
        }
    }

    // Método para controlar la lógica de intentos de login
    login(username, password) {
        if (this.attempts >= 3) {
            alert("Has superado el número de intentos permitidos.");
            return;
        }

        if (this.validUser(username, password)) {
            this.attempts = 0; // Resetear intentos al iniciar sesión correctamente
            alert("¡Bienvenido, " + username + "!");
            this.renderUserManagement(); // Mostrar la gestión de usuarios
        } else {
            this.attempts++;
            alert("Usuario o contraseña incorrectos. Intentos restantes: " + (3 - this.attempts));
        }
    }

    renderUserManagement() {
        // Mostrar los botones y la tabla de gestión de usuarios
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("userManagement").style.display = "block";
        
        // Mostrar lista de usuarios
        const userTable = document.getElementById("userTable").getElementsByTagName("tbody")[0];
        userTable.innerHTML = "";
        
        this.users.forEach((user, index) => {
            const row = userTable.insertRow();
            row.innerHTML = `<td>${user.username}</td><td>
                <button onclick="editUser(${index})">Editar</button>
                <button onclick="deleteUser(${index})">Eliminar</button>
            </td>`;
        });
    }
}

// Crear un controlador de usuarios
const userController = new UserController();

// Función para manejar el login
document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    userController.login(username, password);
});

// Función para agregar usuario
document.getElementById("addUserBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const ci = document.getElementById("ci").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value; // Capturamos la contraseña
    
    if (userController.loggedUser.username === "user") {
        // El superusuario puede agregar usuarios
        userController.addUser(username, nombres, apellidos, fechaNacimiento, ci, celular, correo, password);
        userController.renderUserManagement();
    } else {
        alert("Solo el superusuario puede agregar usuarios.");
    }
});

// Funciones de edición y eliminación
function editUser(index) {
    const user = userController.users[index];
    if (userController.loggedUser.username === user.username || userController.loggedUser.username === "user") {
        const newData = {
            nombres: prompt("Nuevo nombre:", user.nombres),
            apellidos: prompt("Nuevos apellidos:", user.apellidos),
            fechaNacimiento: prompt("Nueva fecha de nacimiento:", user.fechaNacimiento),
            ci: prompt("Nuevo CI:", user.ci),
            celular: prompt("Nuevo celular:", user.celular),
            correo: prompt("Nuevo correo:", user.correo),
        };

        // Solo permitir modificar la contraseña si el usuario común edita sus propios datos
        if (userController.loggedUser.username === user.username) {
            const newPassword = prompt("Nueva contraseña (dejar en blanco para no cambiar):");
            if (newPassword) {
                newData.password = newPassword;
            }
        }
        
        userController.modifyUser(index, newData);
        userController.renderUserManagement();
    } else {
        alert("No tienes permisos para editar este usuario.");
    }
}

function deleteUser(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        const user = userController.users[index];
        if (userController.loggedUser.username === "user" || userController.loggedUser.username === user.username) {
            userController.removeUser(index);
            userController.renderUserManagement();
        } else {
            alert("No tienes permisos para eliminar este usuario.");
        }
    }
}
