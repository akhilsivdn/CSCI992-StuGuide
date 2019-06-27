import React from 'react';
import { Link, withRouter } from "react-router-dom";

import { Paper, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/MapTwoTone";
import ThingsToDoIcon from "@material-ui/icons/Assignment";
import NewsIcon from "@material-ui/icons/Event";
import PlanIcon from "@material-ui/icons/Schedule"; //Commute
import TransitIcon from "@material-ui/icons/DirectionsTransit";
import RestaurantIcon from "@material-ui/icons/LocalPizza";
import ShopIcon from "@material-ui/icons/LocalDining";
import GroceryIcon from "@material-ui/icons/LocalGroceryStore";
import LocalStoreIcon from "@material-ui/icons/LocalConvenienceStore";
import MedicalIcon from "@material-ui/icons/LocalHospital";
import LegalIcon from "@material-ui/icons/Report"; // People // Person // QuestionAnswer
import ParkingIcon from "@material-ui/icons/LocalParkingRounded";
import WeatherIcon from "@material-ui/icons/Cloud";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class DrawerComponent extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false
		}
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


	onClicked(e) {
		e.preventDefault();
		this.setState({
			isOpen: true
		})
	}

	handleClose() {
		this.setState({
			isOpen: false
		})
	}

	handleLogout() {
		if (localStorage.getItem('key')) {
			localStorage.removeItem('key');
		}
		this.setState({
			isOpen: false
		})
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
				<Dialog
					open={this.state.isOpen}
					onClose={() => this.handleClose()}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">{"Are you sure to logout?"}</DialogTitle>
					<DialogActions>
						<Button color="primary" onClick={() => this.handleClose()}>
							No
         				 </Button>
						<Button color="primary" onClick={() => this.handleLogout()}>
							<Link to="/">Yes</Link>
						</Button>
					</DialogActions>
				</Dialog>
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
									<ShopIcon />
								</ListItemIcon>
								<ListItemText>
									<Link to="/recipes">Recipes</Link>
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
									<RestaurantIcon />
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

							<ListItem button onClick={(e) => this.onClicked(e)}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText>
									<Link>Logout</Link>
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