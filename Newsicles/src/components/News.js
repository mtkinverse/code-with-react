import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [Page, setPage] = useState(1);
    const [MaxPage, setMaxPage] = useState(0);
    const [Loading, setLoading] = useState(true);

    const UpdateNews = async () => {
        setLoading(true);
        props.setProgress(0);
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${Page}&pageSize=${props.pageSize}`);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(60);
        let totalResults = parsedData.totalResults;
        setArticles(parsedData.articles);
        props.setProgress(80);
        setMaxPage(Math.ceil(totalResults / props.pageSize));
        props.setProgress(100);
        setLoading(false);

    }
    const fetchData = async () => {
        props.setProgress(20);
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${Page+1}&pageSize=${props.pageSize}`);
        props.setProgress(50);
        setPage(Page + 1);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(articles.concat(parsedData.articles));
        props.setProgress(100);
    }

    useEffect(() => {
        /* eslint-disable */
        UpdateNews();
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.substring(1, props.category.length)} with Newsicles`;
    }, [props.country]);


    const PrintCountry = () => {

        switch (props.country) {
            case 'us': return 'USA'; break;
            case 'ar': return 'Argentina'; break;
            case 'au': return 'Australia'; break;
            case 'br': return 'Brazil'; break;
            case 'ca': return 'Canada'; break;
            case 'cn': return 'China'; break;
            case 'de': return 'German'; break;
            case 'fr': return 'France'; break;
            case 'gb': return 'UK'; break;
            case 'jp': return 'Japan'; break;
            case 'in': return 'India'; break;
            default: return 'USA';
        }
    }

    const MoreNews = async () => {
        setPage(Page + 1);
        UpdateNews();
    }

    const LessNews = async () => {
        setPage(Page - 1);
        UpdateNews();
    }


    return (
        <>
            <div className='my-3 mb-5'>
                <div className="container my-5 mt-100 border border-dark" >
                    <h1 className='text-center my-2'>{props.MainTitle}{PrintCountry()}</h1>

                    {Loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchData}
                        hasMore={Page < MaxPage }
                        loader={<Spinner/>}
                    >
                        <div id="carouselExampleCaptions" className="carousel slide m-3">

                            <div className="carousel-indicators">
                                {
                                    articles.map((element) => {
                                        return <button type="button" key={articles.indexOf(element)} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={articles.indexOf(element)} className={element === articles[0] ? 'active' : ''} aria-current={element === articles[0] ? 'true' : ''} aria-label={(1 + articles.indexOf(element))}>
                                        </button>
                                    }
                                    )
                                }
                            </div>

                            <div className="carousel-inner">

                                {articles.map((element) => {

                                    return (!Loading) && <div className={`carousel-item${element === articles[0] ? ' active' : ' '}`} key={element.url}>
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
                    </InfiniteScroll>

                </div >
               
            </div>

        </>
    )

}

export default News
