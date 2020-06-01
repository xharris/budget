import React, { createContext } from "react"
import PropTypes from "prop-types"

import { id } from "component/util"

export const ProjectContext = createContext()

const traverseTree = (data, fn) => {
  data.forEach(d => {
    fn(d)
    if (d.children) traverseTree(d.children, fn)
  })
}

class ProjectComponent extends React.Component {
  constructor(props) {
    super(props)

    this.setProjectData = data => {
      this.setState(() => ({
        project_data: data
      }))
    }
    this.addElement = data => {
      const { type = "other" } = data
      if (!data.id) data.id = id()
      if (!data.value) {
        // give this new element a name based on it's type
        let num = 1
        const name_list = []
        const { project_data } = this.state
        traverseTree(project_data.elements, e => {
          if (e.type === data.type) {
            num += 1
            name_list.push(e.value)
          }
        })
        // avoid duplicate names
        while (name_list.includes(`${data.type.toLowerCase()}${num}`)) {
          num += 1
        }
        data.value = `${data.type.toLowerCase()}${num}`
      }

      let placed = false
      this.setState(state => ({
        project_data: {
          ...state.project_data,
          elements: state.project_data.elements.map(e => {
            if (
              e.children &&
              e.ide_made &&
              !placed &&
              e.value.toLowerCase() === type.toLowerCase()
            ) {
              placed = true
              e.children.push(data)
            }
            return e
          })
        }
      }))

      if (!placed) {
        // add the folder since it apparently doesn't exist
        this.setState(state => ({
          project_data: {
            ...state.project_data,
            elements: [
              ...state.project_data.elements,
              {
                id: id(),
                value: type.toUpperCase(),
                ide_made: true,
                children: [data]
              }
            ]
          }
        }))
      }
    }
    this.toggleFolder = folder_id => {
      this.setState(state => ({
        project_data: {
          ...state.project_data,
          folder_collapsed: {
            ...state.project_data.folder_collapsed,
            [folder_id]: !state.project_data.folder_collapsed[folder_id]
          }
        }
      }))
    }
    this.isCollapsed = folder_id => {
      const { project_data } = this.state
      return project_data.folder_collapsed[folder_id] === true
    }
    this.saveProject = () => {}

    this.state = {
      project_path: "wow",
      project_data: {
        folder_collapsed: {},
        elements: []
      },
      addElement: this.addElement,
      toggleFolder: this.toggleFolder,
      isCollapsed: this.isCollapsed
    }
  }

  componentDidUpdate() {
    // const { project_data } = this.state
    // console.log(project_data)
  }

  render() {
    const { children } = this.props
    return (
      <>
        <ProjectContext.Provider value={this.state}>
          {children}
        </ProjectContext.Provider>
      </>
    )
  }
}

ProjectComponent.propTypes = {
  children: PropTypes.node
}

ProjectComponent.defaultProps = {
  children: null
}

export default ProjectComponent
