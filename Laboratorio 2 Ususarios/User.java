public class User {
    private int id;
    private String username;
    private String password;
    private String name;
    private String lastEntry;
    private boolean status;

    // Constructor
    public User(int id, String username, String password, String name, String lastEntry, boolean status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastEntry = lastEntry;
        this.status = status;
    }

    // Métodos getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastEntry() {
        return lastEntry;
    }

    public void setLastEntry(String lastEntry) {
        this.lastEntry = lastEntry;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    // Método para mostrar información del usuario
    @Override
    public String toString() {
        return "User [ID=" + id + ", Username=" + username + ", Name=" + name + ", Last Entry=" + lastEntry + ", Status=" + (status ? "active" : "inactive") + "]";
    }
}
