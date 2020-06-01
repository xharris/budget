import React, { useState } from "react"

import ProjectComponent from "component/projectcontext"
import Header, { view } from "component/header"
import Workspace from "component/workspace"
import AccountList from "component/accountlist"
import TransactionView from "component/transactionview"

import "./App.scss"
import "./dark.scss"
import "./background.scss"
import styled from "styled-components"

const S = {
  Background: styled.div`
    // background-image: url(https://images.alphacoders.com/106/thumb-1920-1064301.jpg);
  `
}

const Background = () => <S.Background className="c-background" />

const App = () => {
  const [currentView, setCurrentView] = useState(view.transactions)

  return (
    <div className="App dark">
      <Background />
      <ProjectComponent>
        <div className="ide-container">
          <Header onViewSelect={setCurrentView} defaultView={currentView} />
          <Workspace>
            <AccountList />
            {currentView === view.home && <div> Home! </div>}
            {currentView === view.transactions && <TransactionView />}
          </Workspace>
        </div>
      </ProjectComponent>
    </div>
  )
}

export default App
