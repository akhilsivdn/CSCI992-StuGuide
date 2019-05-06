import React from 'react';
import { Link, withRouter } from "react-router-dom";

import { Divider, Paper, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DirectionIcon from "@material-ui/icons/Directions";
import TransitIcon from "@material-ui/icons/DirectionsTransit";
import HomeIcon from "@material-ui/icons/Map";
import ShopIcon from "@material-ui/icons/LocalDining";
import GroceryIcon from "@material-ui/icons/LocalGroceryStore";
import LocalStoreIcon from "@material-ui/icons/LocalConvenienceStore";
import MedicalIcon from "@material-ui/icons/LocalHospital";
import LegalIcon from "@material-ui/icons/Book";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";

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
		document.body.style.overflow = 'visible';
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
				<Paper>
					<div className={'drawer ' + drawer}>

						<List>
							<ListItem button>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/home">Home</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<DirectionIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/things-to-do">Things to do</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<DirectionIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/news-headlines">News Headlines</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<DirectionIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/plan-for-the-day">Plan for the day</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<TransitIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/transit">Transport</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<ShopIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/restaurants">Restaurants</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<GroceryIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/groceries">Groceries</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<LocalStoreIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/stores">Covenient Stores</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<MedicalIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/medical">Medical Aid</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<LegalIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/lawyers">Legal</Link>
								</ListItemText>
							</ListItem>
						
							<ListItem button>
								<ListItemIcon>
									<LegalIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/weather-forecast">Weather Forecast</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/settings">Account Settings</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/">Logout</Link>
								</ListItemText>
							</ListItem>
						</List>
					</div>
				</Paper>
			</div>


			// <div>
			// 	{backdrop}
			// 	<div className={'drawer ' + drawer}>
			// 		<div className="drawer-head"></div>
			// 		<ul className="drawer-menu">
			// 			<li>
			// 				<Link to="/home">Home</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/restaurants">Restaurants &amp; Cafes</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/transit">Transit</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/tripplanner">Trip Planner</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/groceries">Groceries</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/stores">Covenient Stores</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/medical">Medical Aid</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/lawyers">Lawyers</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/settings">Account Settings</Link>
			// 			</li>

			// 			<li>
			// 				<Link to="/logout">Logout</Link>
			// 			</li>

			// 		</ul>
			// 	</div>
			// </div>
		);
	}
}

export default withRouter(DrawerComponent);