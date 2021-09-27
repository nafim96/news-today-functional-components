import React, { useEffect, useState } from 'react';
import NewsItems from '../NewsItems/NewsItems';
import Spinner from '../Spinner/Spinner';
import propTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ( props ) =>
{

    const [ articles, setArticles ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ page, setPage ] = useState( 1 );
    const [ totalResults, setTotalResults ] = useState( 1 );

    const updateNews = async () =>
    {
        props.setProgress( 20 );
        const url = `https://newsapi.org/v2/top-headlines?country=${ props.country }&category=${ props.category }&apiKey=${ props.setApi }&page=${ page }&pageSize=${ props.pageSize }`;
        setLoading( true );
        const data = await fetch( url );
        props.setProgress( 40 );
        const parsed = await data.json();
        props.setProgress( 70 );
        setArticles( parsed.articles );
        setTotalResults( parsed.totalResults );
        setLoading( false );
        props.setProgress( 100 );
    };

    useEffect( () =>
    {
        document.title = props.newsType;
        updateNews();
    }, [] );


    const fetchMoreData = async () =>
    {
        setPage( page + 1 );

        const url = `https://newsapi.org/v2/top-headlines?country=${ props.country }&category=${ props.category }&apiKey=${ props.setApi }&page=${ page }&pageSize=${ props.pageSize }`;
        setLoading( true );

        const data = await fetch( url );
        const parsed = await data.json();
        setArticles( articles.concat( parsed.articles ) );
        setTotalResults( parsed.totalResults );
        setLoading( false );
    };

    return (
        <>
            <div style={ { marginTop: "98px" } }>
                <h1 className="text-center">News Today- { props.newsType } Top-Headlines-(Total News-{ !totalResults ? 0 : totalResults })</h1>
            </div>
            { !articles ? <h1 className="container text-center text-danger">Please change api key and don't reload full site just click on like(home or science) route</h1> : <InfiniteScroll
                dataLength={ articles.length }
                next={ fetchMoreData }
                hasMore={ articles.length !== totalResults }
                loader={ loading && <Spinner /> }
                endMessage={
                    <p style={ { textAlign: 'center' } }>
                        <b>WoW! You have seen it all { props.newsType } -News</b>
                    </p>
                }
            >
                <div className="container">
                    { articles.length && <div className="row">
                        {
                            articles.map( article => ( <div className="col-md-4" key={ article.url }>
                                <NewsItems title={ article.title ? article.title : "" } description={ article.description ? article.description : "" } url={ article.url } urlToImage={ article.urlToImage } author={ article.author } publishedAt={ article.publishedAt } source={ article.source.name } />
                            </div> ) )
                        }
                    </div> }
                </div>
            </InfiniteScroll> }
        </>
    );

};

News.defaultProps = {
    country: "bg",
    pageSize: 8,
    category: "general",
    newsType: "General",
};
News.propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
    newsType: propTypes.string,
};

export default News;
