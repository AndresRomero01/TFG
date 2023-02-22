package es.ucm.fdi.iw.model;

public class book {
    private int id;
    private String bookName;

    public book(int id, String bookName) {
        super();
        this.id = id;
        this.bookName = bookName;
    }

    public int getId() {
        return id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }
}
