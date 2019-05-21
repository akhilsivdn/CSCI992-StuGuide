import React from "react";
import { Paper, Grid, ButtonBase, GridList, Typography, Button } from "@material-ui/core";

const styles = theme => ({
    paper: {
        margin: 'auto',
        padding: theme.spacing.unit * 2,
    },
    gridList: {
        width: 500
    },
    img: {
        objectFit: 'cover',
        flexDirection: 'column',
    },
});

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
                <div className="title_page">News Headlines</div>
                <GridList cellHeight='auto' className={styles.gridList} cols={1}>
                    {this.state.newsArticles.map(function (article, i) {
                        var published = article.publishedAt;
                        published = published.replace('T', ' ').concat(' UTC');
                        var date = new Date(published);
                        var day = date.toString().substring(4, 15);
                        var time = date.toString().substring(16, 24);
                        var dayTimeText = "Published: " + day + " " + time;
                        var description = article.content.split('[+')[0];

                        return (
                            <div>
                                <Paper className={styles.paper}>
                                    <Grid container wrap="nowrap" spacing={16}>
                                        <Grid item>
                                            <ButtonBase>
                                                <img className={styles.img} height='180px' width='180px' alt={article.urlToImage} src={article.urlToImage} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography class='news-title' gutterBottom variant="subtitle1">
                                                        {article.title}
                                                    </Typography>
                                                    <div className="published">{dayTimeText}</div>
                                                    <Typography gutterBottom class='news-description'>{description}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button size="small" color="primary">
                                                        <a target="_blank"
                                                            rel="noopener noreferrer">
                                                            Read more
                                                        </a>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <tr>&nbsp; &nbsp;</tr>
                            </div>
                        )
                    })
                    }
                </GridList>
            </div>
        );
    }
}