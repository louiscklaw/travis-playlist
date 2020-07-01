import React from 'react';

let default_theme = {
  is_dark: false
}

export const ThemeContext = React.createContext(default_theme)

class ThemeContextProvider extends React.Component{
  constructor(props){
    super(props)
    this.state=default_theme
  }

  toggleTheme=() => {
    this.setState({...this.state, is_dark: !this.state.is_dark})
  }

  render(){
    return(
      <ThemeContext.Provider value={{
        ...this.state,
        toggleTheme:this.toggleTheme
      }}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContextProvider