import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
require( 'dotenv' ).config();

const App = () =>
{
  const [ value, setValue ] = useState( 3 );
  const [ country, setCountry ] = useState( "ae" );
  const [ api, setApi ] = useState( "ea54278051f84078a47ef170118fd2dc" );
  const [ progress, setProgress ] = useState( 0 );



  const handlePageSize = async ( e ) =>
  {
    const pageValue = await Number( e.target.value );
    setValue( pageValue );
  };
  const handleCountry = async ( e ) =>
  {
    const countryValue = await e.target.value;
    setCountry( countryValue );
  };
  const handleApi = async ( e ) =>
  {
    const apis = await e.target.value;
    setApi( apis );
  };

  return (
    <div>
      <Router>
        <div className="mb-3">
          <Navbar handlePageSize={ handlePageSize } pageValue={ value } handleCountry={ handleCountry } handleApi={ handleApi } />
          <LoadingBar
            color='#f11946'
            progress={ progress }
            onLoaderFinished={ () => setProgress( 0 ) }
          />
          <Switch>
            <Route exact path="/home">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="general" newsType="General" pageSize={ value } country={ country } category="general" />
            </Route>
            <Route exact path="/business">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="business" newsType="Business" pageSize={ value } country={ country } category="business" />
            </Route>
            <Route exact path="/entertainment">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="entertainment" newsType="Entertainment" pageSize={ value } country={ country } category="entertainment" />
            </Route>
            <Route exact path="/general">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="general" newsType="General" pageSize={ value } country={ country } category="general" />
            </Route>
            <Route exact path="/health">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="health" newsType="Health" pageSize={ value } country={ country } category="health" />
            </Route>
            <Route exact path="/science">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="science" newsType="Science" pageSize={ value } country={ country } category="science" />
            </Route>
            <Route exact path="/sports">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="sports" newsType="Sports" pageSize={ value } country={ country } category="sports" />
            </Route>
            <Route exact path="/technology">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="technology" newsType="Technology" pageSize={ value } country={ country } category="technology" />
            </Route>
            <Route exact path="/">
              <News
                // @ts-ignore
                setProgress={ setProgress } setApi={ api } key="general" newsType="General" pageSize={ value } country={ country } category="general" />
            </Route>
          </Switch>

        </div>
        <Footer />
      </Router>
    </div>
  );

};

export default App;
