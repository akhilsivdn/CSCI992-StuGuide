import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ScrollToTop from "react-scroll-up";

export class RecipeComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            isLoading: false,
            recipeKeyword: '',
            noResults: false,
            noResultText: ''
        }
    }

    GetIt(keyword) {
        this.setState({
            isLoading: true
        });

        fetch('https://www.food2fork.com/api/search?key=c27b3e130ccf25fca38cf6b7b84ed23e&q=' + keyword)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        noResults: true,
                        isLoading: false,
                        noResultText: 'Oops ! You have reached daily limit. Please try again tomorrow'
                    })
                }
                else {
                    this.setState({
                        recipes: data.recipes,
                        noResults: data.recipes && data.recipes.length == 0,
                        isLoading: false,
                        noResultText: 'Oops ! No recipes found'
                    })
                }
            })
    }

    SetKeyword(e) {
        this.setState({
            recipeKeyword: e.target.value,
            noResultsAvailable: false,
            recipes: [],
            noResults: false
        });
    }


    OnKeyUp(e) {
        if (e.keyCode == 13 && this.state.recipeKeyword) {
            e.preventDefault();
            this.GetIt(this.state.recipeKeyword);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="loadingBar">
                    <Modal
                        open={this.state.isLoading}
                        style={{
                            transitionDuration: '800ms',
                            transitionDelay: '800ms'
                        }}>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                top: '45%',
                                left: '47%',
                                color: '#1f41fa',
                            }}
                            thickness={4}
                            size={70}
                        />
                    </Modal>
                </div>
            )
        }

        if (this.state.noResults) {
            return (
                <div>
                    <div className="title_page">Get your favourite recipes here</div>
                    <Paper style={{
                        padding: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <InputBase
                            style={{
                                marginLeft: 8,
                                flex: 1
                            }}
                            onKeyUp={(e) => this.OnKeyUp(e)}
                            value={this.state.recipeKeyword}
                            onChange={(e) => this.SetKeyword(e)}
                            placeholder="Search your recipe" />
                    </Paper>
                    <div className="searchResults" style={{ textAlign: "center" }}>
                        <span style={{
                            display: "block",
                            fontSize: "24px",
                            fontWeight: "500",
                            marginBottom: "20px"
                        }}>{this.state.noResultText}</span>
                        <img src="./noresults.png" width="250px" height="250px" />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="title_page">Get your favourite recipes here</div>
                <Paper style={{
                    padding: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <InputBase
                        style={{
                            marginLeft: 8,
                            flex: 1
                        }}
                        onKeyUp={(e) => this.OnKeyUp(e)}
                        value={this.state.recipeKeyword}
                        onChange={(e) => this.SetKeyword(e)}
                        placeholder="Search your recipe" />
                </Paper>

                <ScrollToTop showUnder={500} duration={1000}>
                    <img src="https://cdn2.iconfinder.com/data/icons/essential-web-1-1/50/arrow-circle-up-angle-top-256.png"
                        style={{ height: "50px", width: "50px" }} />
                </ScrollToTop>

                <div className="grid">
                    {
                        this.state.recipes && this.state.recipes.map(function (recipe, i) {
                            return (
                                <div>
                                    <Card
                                        style={{
                                            height: '300px',
                                            width: '250px',
                                            padding: 'inherit',
                                            marginInlineEnd: '10px',
                                            marginTop: '5px',
                                            marginBottom: '10px',
                                            borderRadius: '10px',
                                        }} >
                                        <CardActionArea
                                            style={{
                                                width: 'auto'
                                            }}>
                                            <CardMedia
                                                component="img"
                                                height="125px"
                                                src={recipe.image_url}
                                            />
                                            <CardContent style={{
                                                height: "65px"
                                            }}>
                                                <Typography variant="subheading" className="recipeTitle">
                                                    {recipe.title}
                                                </Typography>
                                            </CardContent>
                                            <CardContent
                                                style={{
                                                    height: "65px"
                                                }}>
                                                <Typography variant="subheading" className="recipePublisher">
                                                    Publisher: {recipe.publisher}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                <a href={recipe.source_url} target="_blank">Get Recipe</a>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            );
                        }
                        )
                    }
                </div>
            </div>
        );
    }
}