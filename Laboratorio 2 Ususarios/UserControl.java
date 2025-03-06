import java.util.ArrayList;

public class UserControl {
    private int id;
    private ArrayList<User> userList;

    // Constructor
    public UserControl(int id) {
        this.id = id;
        this.userList = new ArrayList<>();
    }

    // Métodos para añadir, eliminar y editar usuarios
    public void addUser(User user) {
        userList.add(user);
        System.out.println("Usuario añadido: " + user.getUsername());
    }

    public void remUser(int userId) {
        User userToRemove = null;
        for (User user : userList) {
            if (user.getId() == userId) {
                userToRemove = user;
                break;
            }
        }
        if (userToRemove != null) {
            userList.remove(userToRemove);
            System.out.println("Usuario eliminado con ID: " + userId);
        } else {
            System.out.println("No se encontró el usuario con ID: " + userId);
        }
    }

    public void editUser(int userId, String username, String password, String name, String lastEntry, boolean status) {
        for (User user : userList) {
            if (user.getId() == userId) {
                user.setUsername(username);
                user.setPassword(password);
                user.setName(name);
                user.setLastEntry(lastEntry);
                user.setStatus(status);
                System.out.println("Usuario editado: " + username);
                return;
            }
        }
        System.out.println("No se encontró el usuario con ID: " + userId);
    }

    public void showUsers() {
        if (userList.isEmpty()) {
            System.out.println("No hay usuarios.");
        } else {
            for (User user : userList) {
                System.out.println(user);
            }
        }
    }
}
