import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'
import ViewerQuery from './ViewerQuery'
import { AppComponent } from '../components/App'
import { MovieList, Movie } from '../components/Movies'

export default (
  <Route path='/' component={AppComponent} >
    <IndexRoute component={MovieList} queries={ViewerQuery} />
    <Route path='students'>
      <IndexRoute component={MovieList} queries={ViewerQuery} />
      <Route path=':uuid' component={Movie} queries={ViewerQuery} />
    </Route>
    <Redirect from='*' to='/' />
  </Route>
)
