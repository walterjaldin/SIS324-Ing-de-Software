import java.util.ArrayList;
import java.util.List;

public class UserControl {
    // Atributos de la clase UserControl
    private int id;
    private List<User> userList;

    // Constructor de la clase UserControl
    public UserControl(int id) {
        this.id = id;
        this.userList = new ArrayList<>();
    }

    // Métodos para agregar, eliminar y editar usuarios
    public void addUser(User user) {
        userList.add(user);
        System.out.println("Usuario añadido: " + user.getUsername());
    }

    public void remUser(int userId) {
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getId() == userId) {
                userList.remove(i);
                System.out.println("Usuario eliminado con ID: " + userId);
                return;
            }
        }
        System.out.println("Usuario no encontrado con ID: " + userId);
    }

    public void editUser(int userId, String newUsername, String newPassword, String newName, String newLastEntry, boolean newStatus) {
        for (User user : userList) {
            if (user.getId() == userId) {
                user.setUsername(newUsername);
                user.setPassword(newPassword);
                user.setName(newName);
                user.setLastEntry(newLastEntry);
                user.setStatus(newStatus);
                System.out.println("Usuario editado: " + user.getUsername());
                return;
            }
        }
        System.out.println("Usuario no encontrado con ID: " + userId);
    }

    // Método para mostrar la lista de usuarios
    public void showUsers() {
        for (User user : userList) {
            System.out.println(user);
        }
    }
}
