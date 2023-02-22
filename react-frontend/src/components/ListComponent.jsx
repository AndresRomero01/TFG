import React, { Component } from 'react';
import APIService from '../APIServices/APIService';
import '../css/CustomCss/CustomListCss.css';

class ListComponent extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            books: [],
            result: []
        }
    }

    componentDidMount(){
        APIService.getBooks().then((data) => {
            // this.setState({ books: data })
            this.setState({result: data})
            //console.log(this.state.data)
        })
        .catch(function (ex) {
              console.log('Response parsing failed. Error: ', ex);
        });;



        APIService.getBooks2().then((data) => {
            this.setState({ books: data })
            // this.setState({result: data})
            // console.log(this.state.data)
        })
        .catch(function (ex) {
               console.log('Response parsing failed. Error: ', ex);
        });;
    }


    render() {
        return (
            <div>
                <h2 className='text-center'>Lista Libros</h2>
                <div className='row'>
                    
                    <div className='row'> {this.state.result["isok"]}</div>
                    {
                        this.state.books.map(book =>
                            <div className='col item'>
                                <p>id: {book.id}</p>
                                <p>name: {book.bookName}</p>
                            </div>
                        
                        )
                    }
                       
                </div>
                
            </div>
        );
    }
}

export default ListComponent;