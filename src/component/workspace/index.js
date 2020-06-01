import React from "react"
import PropTypes from "prop-types"

import { ProjectContext } from "component/projectcontext"

import "./workspace.scss"
import styled from "styled-components"

const S = {
  Workspace: styled.div``
}

const Workspace = ({ children }) => (
  <ProjectContext.Consumer>
    {({ project_path }) => (
      <S.Workspace className={`c-workspace ${project_path ? "" : "hidden"}`}>
        <div className="inner">{children}</div>
      </S.Workspace>
    )}
  </ProjectContext.Consumer>
)

Workspace.propTypes = {
  children: PropTypes.node
}

Workspace.defaultProps = {
  children: null
}

export default Workspace
