import React from 'react';
import { Link, withRouter } from "react-router-dom";

class DrawerComponent extends React.Component {
	constructor(props) {
		super();
	}

	componentDidMount() {
		this.props.history.listen(() => {
			this.close();
		});
	}

	close() {
		this.props.close();
	}

	render() {
		const drawer = (this.props.open) ? 'show-drawer' : 'hide-drawer';
		const backdrop = (this.props.open)
			? (
				<div className="backdrop container" onClick={() => this.close()}></div>
			)
			: '';

		return (
			<div>
				{backdrop}
				<div className={'drawer ' + drawer}>
					<div className="drawer-head"></div>
					<ul className="drawer-menu">
						<li>
							<Link to="/home">Home</Link>
						</li>

						<li>
							<Link to="/restaurants">Restaurants &amp; Cafes</Link>
						</li>

						<li>
							<Link to="/transport">Transport</Link>
						</li>

						{/* <li>
							<Link to="/event">Bus and Train Stations</Link>
						</li>
						<li>
							<Link to="/parkings">Parkings</Link>
						</li> */}
					</ul>
				</div>
			</div>
		);
	}
}

export default withRouter(DrawerComponent);