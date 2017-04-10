import React from 'react'  


/*
 * Represent a county list item
 */
export default class CountyListItem extends React.Component {

	/*
	 * Constructor
	 */
	constructor(props) {
		super(props);
		this.handleCountySelection = this.handleCountySelection.bind(this);		
		this.handleCountyFavorite = this.handleCountyFavorite.bind(this);	

		// Define state
		this.state = {
			favorite: props.county.favorite,
			active: props.county.active
		}	
	}


	/*
	 * Method handled when county is selected
	 */	

	handleCountySelection(e){		
		this.props.onCountySelect(this.props.county);		
	}

	/*
	 * Method handled when county is favorite or not
	 */	

	handleCountyFavorite(e){		
		
		if(this.state.favorite){			
			this.setState({
				favorite: false
			})

		} else {			
			this.setState({
				favorite: true
			})			
		}

		this.props.onCountyFavorite(this.props.county);	 
		
	}

	/*
	 * Render
	 */	

	render() {

		// Setting CSS active class
		var activeClassName = "";
		if(this.props.county.active){
			activeClassName = " item-active";
		}

		// Setting image for favorite
		var favoriteImage = "empty_star.png";
		if(this.state.favorite){
			favoriteImage = "full_star.png";
		}

		return (
			<li className={"county-list-item" + activeClassName}>
				<a className="county-link" href="#" onClick={this.handleCountySelection}>
					<span className="county-name">{this.props.county.name}</span>
					<span className="county-state-name">{this.props.county.state.name}</span>
				</a>
				<a className="favorite-link" href="#" onClick={this.handleCountyFavorite}>
					<img alt="favorite" src={"/images/" + favoriteImage} width="24"/>
				</a>
			</li>
		);
	}	
}