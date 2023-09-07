import React from 'react';
import './NewsItem.css';

const NewsItem = (props) => {
    // Destructuring props for easy access
    let { title, description, imgUrl, newsUrl, author, date, category } = props;

    return (
        <div className='card-container'>

            {/* Display the news image */}
            <img src={imgUrl} className="card-image" alt="" />

            {/* Ribbon */}
            {category &&
            <div className="ribbon">{category}</div>
            }
            <div className="card-body">
                {/* Display the news title */}
                <h5>{title}</h5>
                {/* Display the news description */}
                <p>{description}</p>
                {/* Display the author's name */}
                <p><small>Author: {author}</small></p>
                {/* Display the publication date */}
                <p><small>Published: {date}</small></p>
                {/* Provide a link to read more about the news */}
                <a href={newsUrl} rel="noreferrer" target="_blank" className="read-more-link">Read More</a>
            </div>
        </div>
    )
}

export default NewsItem;
