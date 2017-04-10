import React from 'react'
import CountyTableData from './CountyTableData.jsx'
import CountyGraphData from './CountyGraphData.jsx'
 
/*
 * Display the information about county, including table and graph
 */	
export default class CountyInfo extends React.Component {


	/*
	 * Life cycle method
	 */

	shouldComponentUpdate(nextProps, nextState){
		
		//Initial case
		if(!this.props.county ){
			return true;
		}

		//Future cases
		if(this.props.county.id != nextProps.county.id){
			return true;
		}
		return false;
	}

	/*
	 * Reder
	 */
	
	render() {
			
		if(this.props.county){			

			return (
				<div className="county-info">
					<h1>{this.props.county.name}</h1>
					<h2>{this.props.county.state.name}</h2>
					<CountyTableData county={this.props.county} />
					<CountyGraphData county={this.props.county} />
				</div>

			);
		} else {

			return (
				<p>Please select an element from menu</p>
			);

		}

	}	
}