import React, { Component } from "react";
import NewsItems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";




export class News extends Component {
  //loading center

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  //funtion to capitalize first charactor of word
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      
    };
    

    //it will change title of an site based on catagory severy time you reload this component
    document.title = `newsApp - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
 



  //it will run after all render method
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    
  }


 

  //funtion to handle next button
  handlePrevButton= async () => {
    //scroll to top
    window.scrollTo(0, 0)

    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  
  }

  //funtion to handle previous button
  handleNextButton= async () => {
      //scroll to top
      window.scrollTo(0, 0)
    
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading: true})
      let data = await fetch(url)
      let parsedData = await data.json()

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      
    
    
  }

  
  render() {
    return (
      <div className="container">
        <h1 className="text-center " style={{ margin: "35px" }}>
         Category - {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        <div className="rounded mx-auto d-block">
          {this.state.loading && <Spinner />}
        </div>
       

       
        <div className="row ">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2 " key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  newsUrl={element.url}
                  imgUrl={element.urlToImage}
                  date={element.publishedAt}
                  author={element.author}
                />
              </div>
            );
          })}
        </div>
  
        
        {/* next previous buttons */}
        <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevButton} className="btn btn-dark">&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextButton} className="btn btn-dark">Next &rarr;</button>
        </div>
        



        
      </div>
    );
  }
}


export default News;
