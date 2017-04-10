import React from 'react'
import CountyList from './CountyList.jsx';
import SearchBar from './SearchBar.jsx';  
import CountyInfo from './CountyInfo.jsx';  

/*
 * Main component
 */	

export default class DataVisualizer extends React.Component {

	/*
	 * Constructor
	 */	
	constructor(props) {
		super(props);

		// Setting state
		this.state = { 			
			filterText: '',						
			selectedCounty: null
		};

		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
		this.handleCountyChange = this.handleCountyChange.bind(this);

	}

	/*
	 * Method handled when search bar changes
	 */	
	handleFilterTextInput(filterText) {
		this.setState({
			filterText: filterText
		});
	}


	/*
	 * Method handled where county changes
	 */	
	handleCountyChange(county){
		this.setState({
			selectedCounty: county
		});
	}



	/*
	 * Render
	 */	
	render() {
		return (
			<div className="data-visualizer-container">
				<div className="left-menu">					

					<SearchBar 
						filterText={this.state.filterText}
						onFilterTextInput={this.handleFilterTextInput}
					/>		

					<CountyList							
						filterText={this.state.filterText}
						onCountyChange={this.handleCountyChange}
					/>			

				</div>

				<div className="content">
					<CountyInfo county={this.state.selectedCounty}/>
				</div>
			</div>
		);

		
		
	}
	
}