import React from 'react';
import axios from 'axios';
import './App.css';
import Card from './components/Card/Card';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            search: '',
            countPages: 0,
            totalResults: 0,
            rowsPerPage: 10,
            movies: [],
            error: null
        }

        this.setSearch = this.setSearch.bind(this);
        this.searchEnter = this.searchEnter.bind(this);
    }

    componentDidMount() {
        //this.getData();
    }

    getData() {
        const { search, page } = this.state;
        axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=db90f973&s=${search}&page=${page}`)
            .then(resp => {
                if (resp.data && resp.data.Search) {
                    this.setState({ ...this.state, movies: resp.data.Search, totalResults: resp.data.totalResults });
                    this.processPaging();
                } else {
                    this.setState({ ...this.state, error: resp.data.Error });
                }
            });
    }

    processPaging() {
        this.setState({ 
            ...this.state,
            countPages: Math.ceil(this.state.totalResults / this.state.rowsPerPage)
        });
    }

    setPage(page) {
        this.setState({
            ...this.state,
            page,
            totalResults: 0,
            countPages: 0,
            movies: [],
            error: null
        }, () => {
            this.getData();
        });
    }

    setSearch(e) {
        this.setState({ ...this.state, search: e.target.value });
    }

    searchEnter(e) {
        if (e.key === 'Enter') {
            this.setPage(1);
        }
    }

    render() {
        const { search, movies, countPages, page, error } = this.state;

        let pagination = '';
        let errorMessage = '';
        if (countPages) {
            pagination = (<ul className="Pagination">
            {Object.keys( [].fill.call({length: countPages - 1}, '' ) ).map((p, k) => (
                <li key={k} className={k+1 === page ? 'active' : 'regular'}>
                    <button disabled={k+1 === page ? true : false} onClick={() => { this.setPage(k+1) }}>{k+1}</button>
                </li>
            ))}
        </ul>)
        }

        if (error) {
            errorMessage  = (<p>{error}</p>);
        }

        return (
            <div className="App">
                <div className="Search">
                    <input type="text" placeholder="Digite o nome do filme..." value={search} onChange={this.setSearch} onKeyUp={this.searchEnter} />
                </div>

                {movies.map((m, k) => (
                    <Card key={k} title={m.Title}>
                        <img src={m.Poster} alt="Poster" />
                        <div>
                            Ano: {m.Year}
                        </div>
                    </Card>
                ))}

                {errorMessage}

                {pagination}
            </div>
        );
    }
}

export default App;