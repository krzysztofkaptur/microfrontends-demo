import React, { lazy, Suspense, useState } from 'react'
// import MarketingApp from './components/MarketingApp'
// import AuthApp from './components/AuthApp'
import Header from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const MarketingApp = lazy(() => import('./components/MarketingApp'))
const AuthApp = lazy(() => import('./components/AuthApp'))

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header
            signedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
}
