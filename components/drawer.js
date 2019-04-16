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
							<Link to="/transit">Transit</Link>
						</li>

						<li>
							<Link to="/groceries">Groceries</Link>
						</li>

						<li>
							<Link to="/stores">Covenient Stores</Link>
						</li>

						<li>
							<Link to="/medical">Medical Aid</Link>
						</li>

						<li>
							<Link to="/lawyers">Lawyers</Link>
						</li>

						<li>
							<Link to="/settings">Account Settings</Link>
						</li>

						<li>
							<Link to="/logout">Logout</Link>
						</li>

					</ul>
				</div>
			</div>
		);
	}
}

export default withRouter(DrawerComponent);