const BOOKS_REST_API = 'http://localhost:8080/books';
const BOOKS_REST_API2 = 'http://localhost:8080/books2';

class APIService {    
    getBooks(){
        return fetch(BOOKS_REST_API,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }

    getBooks2(){
        return fetch(BOOKS_REST_API2,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }

}

export default new APIService();