import React from 'react';

export default class TopbarComponent extends React.Component {
	
	constructor() {
        super();
        this.state = {
            isClicked : false
        }
      }

  
    myFunction(x){
        // this.setState({
        //     isClicked: !this.state.isClicked
		// });
		
		this.props.onMenuClick();
    }
	
	
	
	render() {
		return (
			// <div className="barContainer">
			// 	<button type="button" onClick={this.props.onMenuClick}>
			// 		<i className="fa fa-bars"></i>
			// 	</button>
			// </div>


			<div className="left">
				<div className={"barContainer  " + (this.state.isClicked ? "change" : "")} onClick={this.myFunction.bind(this)}>
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</div>
			</div>
		);
	}
}