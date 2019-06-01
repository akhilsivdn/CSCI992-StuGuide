import React from 'react';
import { Link, withRouter } from "react-router-dom";

import { Paper, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/MapTwoTone";
import ThingsToDoIcon from "@material-ui/icons/Assignment";
import NewsIcon from "@material-ui/icons/Event";
import PlanIcon from "@material-ui/icons/Schedule"; //Commute
import TransitIcon from "@material-ui/icons/DirectionsTransit";
import ShopIcon from "@material-ui/icons/LocalDining";
import GroceryIcon from "@material-ui/icons/LocalGroceryStore";
import LocalStoreIcon from "@material-ui/icons/LocalConvenienceStore";
import MedicalIcon from "@material-ui/icons/LocalHospital";
import LegalIcon from "@material-ui/icons/Report"; // People // Person // QuestionAnswer
import ParkingIcon from "@material-ui/icons/LocalParkingRounded";
import WeatherIcon from "@material-ui/icons/Cloud";
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
									<ThingsToDoIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/things-to-do">Things to do</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<NewsIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/news-headlines">News Headlines</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<PlanIcon />
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
									<ParkingIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/parking-slots">Parking Slots</Link>
								</ListItemText>
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<WeatherIcon />
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
		);
	}
}

export default withRouter(DrawerComponent);