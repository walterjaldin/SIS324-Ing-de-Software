class User {
    constructor(id, firstName, lastName, birthdate, idCard, phone, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.idCard = idCard;
        this.phone = phone;
        this.email = email;
        this.password = password; 
    }

    validPassword(inputPassword) {
        return this.password === inputPassword;
    }
}

class UserControl {
    constructor() {
        this.users = [];
        this.loadUsers();
        this.loginAttempts = 0;
    }

    addUser(firstName, lastName, birthdate, idCard, phone, email, password) {
        const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
        const user = new User(id, firstName, lastName, birthdate, idCard, phone, email, password);
        this.users.push(user);
        this.saveUsers();
    }

    validUser(email) {
        return this.users.find(user => user.email === email);
    }

    login(email, password) {
        const user = this.validUser(email);
        if (user && user.validPassword(password)) {
            alert('Inicio de sesión exitoso');
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            this.loginAttempts = 0;
            return true;
        } else {
            this.loginAttempts++;
            if (this.loginAttempts >= 3) {
                alert('Has excedido el número máximo de intentos');
                return false;
            }
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
        this.renderUsers();
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        this.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.firstName} ${user.lastName} - CI: ${user.idCard} - Tel: ${user.phone} - Email: ${user.email}`;
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => this.editUser(user.id);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => this.deleteUser(user.id);
            
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    editUser(id) {
        const user = this.users.find(user => user.id === id);
        if (user) {
            user.firstName = prompt('Nuevo nombre:', user.firstName) || user.firstName;
            user.lastName = prompt('Nuevos apellidos:', user.lastName) || user.lastName;
            user.birthdate = prompt('Nueva fecha de nacimiento:', user.birthdate) || user.birthdate;
            user.idCard = prompt('Nuevo carnet de identidad:', user.idCard) || user.idCard;
            user.phone = prompt('Nuevo teléfono:', user.phone) || user.phone;
            user.email = prompt('Nuevo correo:', user.email) || user.email;
            this.saveUsers();
        }
    }

    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id);
        this.saveUsers();
    }
}

const userControl = new UserControl();

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    userControl.login(email, password);
};

document.getElementById('addUserForm').onsubmit = function(event) {
    event.preventDefault();
    const firstName = document.getElementById('userFirstName').value;
    const lastName = document.getElementById('userLastName').value;
    const birthdate = document.getElementById('userBirthdate').value;
    const idCard = document.getElementById('userIdCard').value;
    const phone = document.getElementById('userPhone').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    userControl.addUser(firstName, lastName, birthdate, idCard, phone, email, password);
    document.getElementById('addUserForm').reset();
};
