import React from "react";


export class NewsFeedComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            newsArticles: [],
        }

    }

    componentDidMount() {
        this.GetIt();
    }

    GetIt() {
        debugger
        fetch('https://newsapi.org/v2/top-headlines?sources=google-news-au&apiKey=178ef681a1984f65b66501a4791a6e5f')
            .then(res => res.json())
            .then(data => this.setState({
                newsArticles: data.articles
            }
            ));
    }

    render() {
        return (
            <div>
                <div className="title-news-page">News in and around you..</div>
                {
                    this.state.newsArticles.map(function (article, i) {
                        return (

                            <div className="content">
                                <img height='150px' width='150px' src={article.urlToImage} />
                                <div className="news-details"> 
                                    <div className="news-title">{article.title}</div>
                                    {/* <div className="news-pusblished">{article.publishedAt}</div> */}
                                    <div className="news-description">{article.description}</div>
                                    <div>
                                        <a target="_blank" href={article.url}>More..</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

