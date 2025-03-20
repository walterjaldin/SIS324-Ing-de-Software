class User {
    constructor(id, username, firstName, lastName, birthdate, idCard, phone, email, password, role = "user") {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.idCard = idCard;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    validPassword(inputPassword) {
        return this.password === inputPassword;
    }
}

class UserControl {
    constructor() {
        this.users = [];
        this.loadUsers();
        this.currentUser = null;

        // Agregar usuario admin si no existe
        if (!this.users.some(user => user.username === "admin")) {
            this.addUser("admin", "Admin", "User", "2000-01-01", "00000000", "0000000000", "admin@admin.com", "admin", "admin");
        }
    }

    addUser(username, firstName, lastName, birthdate, idCard, phone, email, password, role = "user") {
        const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
        const user = new User(id, username, firstName, lastName, birthdate, idCard, phone, email, password, role);
        this.users.push(user);
        this.saveUsers();
    }

    validUser(username) {
        return this.users.find(user => user.username === username);
    }

    login(username, password) {
        const user = this.validUser(username);
        if (user && user.validPassword(password)) {
            alert(`Bienvenido, ${user.username}`);
            this.currentUser = user;
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            document.getElementById('welcomeMessage').textContent = `Bienvenido, ${user.username}`;

            if (user.role === "admin") {
                document.getElementById('adminControls').style.display = 'block';
            } else {
                document.getElementById('adminControls').style.display = 'none';
            }

            this.renderUsers();
            return true;
        } else {
            alert('Usuario o contraseña incorrectos');
            return false;
        }
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
        this.renderUsers();
    }

    loadUsers() {
        const usersData = localStorage.getItem('users');
        this.users = usersData ? JSON.parse(usersData) : [];
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        this.users.forEach(user => {
            if (this.currentUser.role === "admin" || this.currentUser.username === user.username) {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.firstName} ${user.lastName} - CI: ${user.idCard}`;

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => this.editUser(user.id);

                li.appendChild(editButton);

                if (this.currentUser.role === "admin") {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.onclick = () => this.deleteUser(user.id);
                    li.appendChild(deleteButton);
                }

                userList.appendChild(li);
            }
        });
    }

    editUser(id) {
        const user = this.users.find(user => user.id === id);
        if (user && (this.currentUser.role === "admin" || this.currentUser.username === user.username)) {
            user.firstName = prompt('Nuevo nombre:', user.firstName) || user.firstName;
            user.lastName = prompt('Nuevos apellidos:', user.lastName) || user.lastName;
            this.saveUsers();
        }
    }

    deleteUser(id) {
        if (this.currentUser.role === "admin") {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        }
    }
}

const userControl = new UserControl();

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    userControl.login(username, password);
};
