import React from 'react'  
import CountyListItem from './CountyListItem.jsx'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


/*
 * Display county list
 */	

export default  class CountyList extends React.Component { 

	/*
	 * Constructor
	 */	

	constructor(props) {
		super(props);

		//Define state
		this.state = { 			
			allCounties: [],
			favoriteCounties: [],
			activeCounty: null		
		};

		this.handleCountyChange = this.handleCountyChange.bind(this);
		this.handleCountyFavoriteChange = this.handleCountyFavoriteChange.bind(this);
	}


	/*
	 * Life Cycle methods
	 */	
	
	componentWillMount() {
		fetch('/api/v1/counties')
		.then((response) => {
			return response.json();
		})
		.then((counties) => {
			this.setState({ allCounties: counties });			
		});
	}


	/*
	 * Method handled when county is selected
	 */	

	handleCountyChange(county){
		
		// Active county is unselected
		if(this.state.activeCounty){
			delete this.state.activeCounty.active;
		}

		// Mark the new county as active
		var countyModel =  this.state.allCounties.filter((c) => {
			return c.id == county.id;
		})[0];
		countyModel.active = true;

		// Raise the county changed
		this.props.onCountyChange(county);

		// Modify state
		this.setState({
			activeCounty: countyModel
		})

	}

	/*
	 * Method handled when county is favorited or not
	 */

	handleCountyFavoriteChange(county){
		
		var countyModel =  this.state.allCounties.filter((c) => {
			return c.id == county.id;
		})[0];

		if(countyModel.favorite){
			
			var favorites = this.state.favoriteCounties.filter((favorite) => {
				return favorite.id != county.id;
			});

			delete countyModel.favorite;

			this.setState({
				favoriteCounties: favorites
			});			
			

		} else {

			countyModel.favorite = true;

			var favorites = this.state.favoriteCounties;
			favorites.push(countyModel);
		
			this.setState({
				favoriteCounties: favorites
			});	

		}
	}

	render() {
		
		if(this.state.allCounties.length == 0){
			return <p className="loading">Loading data...</p>
		} else {
			
			var listItems = [];
			var favoriteItems = [];

			// For each county
			this.state.allCounties.forEach((county) => {

				// Filter the list from props 'filterText'
				if(county.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0){
					var countyItem = <CountyListItem key={county.id} county={county} onCountySelect={this.handleCountyChange} onCountyFavorite={this.handleCountyFavoriteChange}/>
					listItems.push(countyItem);

					//Add to favorite list 
					if(county.favorite){
						favoriteItems.push(countyItem);
					}
				}
			})

			return (
				<div className="county-menu">
					<Tabs>
						<TabList>
							<Tab>Counties</Tab>
							<Tab>Favorites</Tab>
						</TabList>
							
						<TabPanel>
							<ul>
								{listItems}
							</ul>
						</TabPanel>
						<TabPanel>
							<ul>
								{favoriteItems}
							</ul>
						</TabPanel>					
					</Tabs>
				</div>
			);

		}
		
	}
}