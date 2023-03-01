const BOOKS_REST_API = 'http://localhost:8080/books';
const BOOKS_REST_API2 = 'http://localhost:8080/books2';

class APIService {    
    getBooks(){
        return fetch("api/books",{ 
            method: 'get'
        })
        .then(res => res.json());        
    }

    getBooks2(){
        return fetch("api/books2",{ 
            method: 'get'
        })
        .then(res => res.json());        
    }

}

export default new APIService();