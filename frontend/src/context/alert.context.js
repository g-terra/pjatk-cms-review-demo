import React from "react";

export const GlobalContext = new React.createContext();

export default class GlobalProvider extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the state
    this.state = {
      showFlash: false, // whether or not to return html or null
      message: "", // The message within the notification
      status: "", // Success or error notification type
      setMessage: this.setMessage // The function to update the state
    };
  }

  setMessage = (message, status) => {
    this.setState({
      ...this.state,
      showFlash: true,
      message,
      status
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        showFlash: false
      });
    }, 3000); 
  };

  render() {

    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}