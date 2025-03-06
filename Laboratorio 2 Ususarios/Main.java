public class Main {
    public static void main(String[] args) {
        // Crear una instancia de UserControl
        UserControl userControl = new UserControl(1);

        // Crear usuarios con el atributo status como booleano
        User user1 = new User(1, "john_doe", "password123", "John Doe", "2025-03-06 10:00", true);
        User user2 = new User(2, "jane_smith", "password456", "Jane Smith", "2025-03-06 11:00", false);

        // Añadir usuarios
        userControl.addUser(user1);
        userControl.addUser(user2);

        // Mostrar todos los usuarios
        System.out.println("Usuarios:");
        userControl.showUsers();

        // Editar un usuario
        userControl.editUser(1, "johnny_doe", "newpassword123", "Johnnie Doe", "2025-03-06 12:00", true);

        // Eliminar un usuario
        userControl.remUser(2);

        // Mostrar usuarios después de modificaciones
        System.out.println("\nUsuarios después de modificaciones:");
        userControl.showUsers();
    }
}
