import React from 'react'  

/*
 * Search component
 */	
export default class SearchBar extends React.Component {

	/*
	 * Constructor
	 */	
	constructor(props) {
		super(props);
		this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);		
	}

	/*
	 * Method handled when input changes
	 */	
	handleFilterTextInputChange(e) {
		this.props.onFilterTextInput(e.target.value);
	}

	/*
	 * Render
	 */	
	render() {
		return (
			<div className="search">
				<form>
					<input 
						className="search-bar"
						placeholder="Search..." 
						value={this.props.filterText}
						onChange={this.handleFilterTextInputChange}
						/>
				</form>
			</div>
		);
	}	
}