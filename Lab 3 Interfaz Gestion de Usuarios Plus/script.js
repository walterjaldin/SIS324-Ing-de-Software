// Clase User
class User {
  constructor(name, password) {
      this.name = name;
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
      this.addUser("user", "admin"); // usuario admin por defecto
  }

  // Validar el usuario y la contraseña
  validUser(username, password) {
      const user = this.users.find(user => user.name === username);
      if (user && user.validPassword(password)) {
          this.loggedUser = user;
          this.isLoggedIn = true;
          return true;
      }
      return false;
  }

  // Método para agregar un nuevo usuario
  addUser(name, password) {
      const user = new User(name, password);
      this.users.push(user);
  }

  // Método para eliminar un usuario
  removeUser(index) {
      this.users.splice(index, 1);
  }

  // Método para modificar un usuario
  modifyUser(index, newName, newPassword) {
      const user = this.users[index];
      if (user) {
          user.name = newName;
          user.password = newPassword;
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
          row.innerHTML = `<td>${user.name}</td><td>
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
  const username = document.getElementById("userName").value;
  if (userController.loggedUser.name === "user") {
      // El superusuario puede agregar usuarios
      userController.addUser(username, "default");
      userController.renderUserManagement();
  } else {
      alert("Solo el superusuario puede agregar usuarios.");
  }
});

// Funciones de edición y eliminación
function editUser(index) {
  const newName = prompt("Nuevo nombre de usuario:");
  const newPassword = prompt("Nueva contraseña:");
  userController.modifyUser(index, newName, newPassword);
  userController.renderUserManagement();
}

function deleteUser(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      userController.removeUser(index);
      userController.renderUserManagement();
  }
}
