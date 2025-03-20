class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class UserControl {
  constructor() {
    this.users = [];
    this.loadUsers();
  }

  addUser(name, email) {
    const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    const user = new User(id, name, email);
    this.users.push(user);
    this.saveUsers();
  }

  editUser(id) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const newName = prompt("Nuevo nombre:", user.name);
      const newEmail = prompt("Nuevo email:", user.email);
      if (newName && newEmail) {
        user.name = newName;
        user.email = newEmail;
        this.saveUsers();
      }
    }
  }

  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.saveUsers();
  }

  saveUsers() {
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUsers();
  }

  loadUsers() {
    const usersData = localStorage.getItem("users");
    this.users = usersData ? JSON.parse(usersData) : [];
    this.renderUsers();
  }

  renderUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    this.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email})`;

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.onclick = () => this.editUser(user.id);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.onclick = () => this.deleteUser(user.id);

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      userList.appendChild(li);
    });
  }
}

const userControl = new UserControl();

document.getElementById("addUserForm").onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  userControl.addUser(name, email);
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
};
