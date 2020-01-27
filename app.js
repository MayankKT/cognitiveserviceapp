import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Reset: false,
      Reset1: false,
      checked: [],
      expanded: [],
      feedbackDtls: [],
      showFeedBackPanel: false,
      showIPKitPanel: false,
      currFeedbackTitle: 'Test',
      myInputData: '',
      resultData: [],
      resultIPKitData: [],
      srNo: -1
    }
  }



  render() {

    return (
      <>
      <div>This is react component</div>
      </>
    )
  }
}

export default App;