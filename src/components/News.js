import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import './News.css'

const News = (props) => {
    // State for managing news articles, loading state, current page, and total results.
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Function to fetch and update articles.
    const updateArticles = async () => {
        // Initially setting Progress of article loading
        props.setProgress(0);
        // Setting spinner to run before articles are fetched
        setLoading(true);

            // Fetch articles from the API
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}${props.category === "Home" ? "" : `&category=${props.category}`}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pgsize}`);
            let fetcharticles = await data.json();
            setArticles(fetcharticles.articles);
            setTotalResults(fetcharticles.totalResults);
            setLoading(false);
        

        // Completing progress when initial articles are fetched
        props.setProgress(100);
    }

    // Function to fetch more data for Infinite Scroll
    const fetchMoreData =  () => {
        setTimeout(async () => {
            
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}${props.category === "Home" ? "" : `&category=${props.category}`}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pgsize}`);
            setPage(page + 1);
            let fetcharticles = await data.json();
            // Concatenate fetched articles data with previously fetched articles
            setArticles(articles.concat(fetcharticles.articles));
            setTotalResults(fetcharticles.totalResults);

        }, 6000);
    }

    useEffect(() => {
        // Set web page title as the currently active category page name with the first letter capitalized
        document.title = `News App - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
        // Initially load articles by calling updateArticles because fetchMoreData is called only when the screen is scrolled
        updateArticles();
    }, []);

    return (
        <div className='news-container'>
            <h2 className=''>Top Headlines</h2>

            {/* Infinite Scroll */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='news-items'>
                        {articles.map((element) => {
                            return <div key={element.url} className=''>
                                {/* Render each news item */}
                                <NewsItem title={element.title.slice(0, 50) + "...."} description={element.description !== null ? element.description.slice(0, 80) + "......" : "No Description Available"} imgUrl={!element.urlToImage ? "https://www.livemint.com/lm-img/img/2023/08/26/600x338/Ringed_Planet_1670326152353_1693026149708.webp" : element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} acategory={props.category === "Home" ? "" : `${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`}/>
                            </div>
                        })}
                    </div>
            </InfiniteScroll>
        </div>
    )
}

// Default props for News component
News.defaultProps = {
    country: 'in',
    pgsize: 6,
    category: "Home",
}

// Prop types for News component
News.propTypes = {
    country: PropTypes.string,
    pgsize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
