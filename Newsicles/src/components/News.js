import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    async componentDidMount() {
        this.setState({ Loading: true })
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b241237ff14a228d9ed11bc2f9d61d`);
        let parsedData = await data.json();
        let totalResults = parsedData.totalResults;
        this.setState({ articles: parsedData.articles, MaxPage: Math.ceil(totalResults / this.props.pageSize), Loading: false });

    }

    constructor() {
        super();
        this.state = {
            articles: [], description: '', Index: 0, Page: 1, MaxPage: 0
        }
    }

    HandleButtonChangeOnNewNews() {
        let ActiveButton = document.getElementsByTagName('button');
        for (let i = 0; i < ActiveButton.length; i++) {
            if (ActiveButton[i].classList.contains('active'))
                ActiveButton[i].classList.remove('active');
        }
        console.log(ActiveButton[0].key);
    }

    render() {

        const MoreNews = async () => {
            this.setState({ Loading: true });
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b241237ff14a228d9ed11bc2f9d61d&page=${this.state.Page + 1}&pageSize=${this.props.pageSize}`);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles, Page: this.state.Page + 1, Loading: false });
        }
        const LessNews = async () => {
            this.setState({ Loading: true });
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7b241237ff14a228d9ed11bc2f9d61d&page=${this.state.Page - 1}&pageSize=${this.props.pageSize}`);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles, Page: this.state.Page - 1, Loading: false });
        }

        
        return (

            <div>
                <div className="container my-5 border border-dark" >
                    <h1 className='text-center my-2'>{this.props.MainTitle}</h1>

                    {this.state.Loading && <Spinner />}

                    <div id="carouselExampleCaptions" className="carousel slide m-3">

                        <div className="carousel-indicators">
                            {
                                this.state.articles.map((element) => {
                                    return <button type="button" key={this.state.articles.indexOf(element)} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={this.state.articles.indexOf(element)} className={element === this.state.articles[0] ? 'active' : ''} aria-current={element === this.state.articles[0] ? 'true' : ''} aria-label={(1 + this.state.articles.indexOf(element))}>
                                    </button>
                                }
                                )
                            }
                        </div>

                        <div className="carousel-inner">

                            {this.state.articles.map((element) => {

                                return (!this.state.Loading) && <div className={`carousel-item${element === this.state.articles[0] ? ' active' : ' '}`} key={element.url}>
                                    <NewsItem newsUrl={element.url} ImageUrl={element.urlToImage} ImageTitle={element.title} ImageDescription={element.description} />
                                </div>
                            })}


                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <h5>Description :</h5><br />
                    <p>{this.state.description}</p>
                </div >
                <div className='container d-flex justify-content-between'  >
                    <button disabled={this.state.Page <= 1} type="button" className='btn btn-secondary' onClick={LessNews}>&larr;  View Previous Headlines</button>
                    <button type="button" disabled={this.state.Page >= this.state.MaxPage} className='btn btn-secondary' onClick={MoreNews}>View More Headlines  &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
