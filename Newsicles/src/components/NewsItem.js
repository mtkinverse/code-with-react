import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {

        let { ImageUrl, ImageTitle, ImageDescription, newsUrl } = this.props;

        return (
            <>
                <a rel="noreferrer" href={newsUrl} target='_blank'>
                    <img src={ImageUrl === null ? process.env.PUBLIC_URL + '/Unavailable Image.jpg' : ImageUrl} className="d-block w-100" alt={ImageDescription} style={{ height: '500px', width: '1000px' }} />
                    <div className="carousel-caption d-none d-md-block">
                        <h4>{ImageTitle}</h4>
                        <p>{ImageDescription > 60 ? ImageDescription.substring(0,60).concat(' . . . . ') : ImageDescription}</p>
                    </div>
                </a>

            </>

        )
    }
}

export default NewsItem
