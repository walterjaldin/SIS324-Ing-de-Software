import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Crear una instancia de UserControl
        UserControl userControl = new UserControl(1);

        // Crear algunos usuarios iniciales
        //User user1 = new User(1, "john_doe", "password123", "John Doe", "2025-03-06 10:00", true);
        //User user2 = new User(2, "jane_smith", "password456", "Jane Smith", "2025-03-06 11:00", false);

        // Añadir usuarios iniciales
        //userControl.addUser(user1);
        //userControl.addUser(user2);

        // Crear el objeto Scanner para leer entradas del usuario
        Scanner scanner = new Scanner(System.in);

        while (true) {
            // Mostrar el menú de opciones
            System.out.println("\n--- Menú de Usuario ---");
            System.out.println("1. Añadir Usuario");
            System.out.println("2. Eliminar Usuario");
            System.out.println("3. Editar Usuario");
            System.out.println("4. Mostrar Todos los Usuarios");
            System.out.println("5. Salir");
            System.out.print("Elige una opción (1-5): ");

            // Leer la opción seleccionada
            int opcion = scanner.nextInt();
            scanner.nextLine();  // Limpiar el buffer del scanner

            switch (opcion) {
                case 1:
                    // Añadir un nuevo usuario
                    System.out.println("\n--- Añadir Usuario ---");
                    System.out.print("Ingresa el ID del usuario: ");
                    int addId = scanner.nextInt();
                    scanner.nextLine();  // Limpiar buffer
                    System.out.print("Ingresa el nombre de usuario: ");
                    String addUsername = scanner.nextLine();
                    System.out.print("Ingresa la contraseña: ");
                    String addPassword = scanner.nextLine();
                    System.out.print("Ingresa el nombre completo: ");
                    String addName = scanner.nextLine();
                    System.out.print("Ingresa la última entrada (formato YYYY-MM-DD HH:MM): ");
                    String addLastEntry = scanner.nextLine();
                    System.out.print("¿Está activo? (true/false): ");
                    boolean addStatus = scanner.nextBoolean();
                    scanner.nextLine();  // Limpiar buffer
                    
                    User newUser = new User(addId, addUsername, addPassword, addName, addLastEntry, addStatus);
                    userControl.addUser(newUser);
                    break;

                case 2:
                    // Eliminar un usuario
                    System.out.println("\n--- Eliminar Usuario ---");
                    System.out.print("Ingresa el ID del usuario a eliminar: ");
                    int removeId = scanner.nextInt();
                    scanner.nextLine();  // Limpiar buffer
                    userControl.remUser(removeId);
                    break;

                case 3:
                    // Editar un usuario
                    System.out.println("\n--- Editar Usuario ---");
                    System.out.print("Ingresa el ID del usuario a editar: ");
                    int editId = scanner.nextInt();
                    scanner.nextLine();  // Limpiar buffer
                    System.out.print("Ingresa el nuevo nombre de usuario: ");
                    String editUsername = scanner.nextLine();
                    System.out.print("Ingresa la nueva contraseña: ");
                    String editPassword = scanner.nextLine();
                    System.out.print("Ingresa el nuevo nombre completo: ");
                    String editName = scanner.nextLine();
                    System.out.print("Ingresa la nueva última entrada (formato YYYY-MM-DD HH:MM): ");
                    String editLastEntry = scanner.nextLine();
                    System.out.print("¿Está activo? (true/false): ");
                    boolean editStatus = scanner.nextBoolean();
                    scanner.nextLine();  // Limpiar buffer

                    userControl.editUser(editId, editUsername, editPassword, editName, editLastEntry, editStatus);
                    break;

                case 4:
                    // Mostrar todos los usuarios
                    System.out.println("\n--- Mostrar Todos los Usuarios ---");
                    userControl.showUsers();
                    break;

                case 5:
                    // Salir
                    System.out.println("¡Hasta luego!");
                    scanner.close();  // Cerrar el scanner
                    return;  // Salir del bucle y finalizar el programa

                default:
                    System.out.println("Opción no válida, por favor elige una opción entre 1 y 5.");
                    break;
            }
        }
    }
}
