import React from 'react'
 
/*
 * Display the county data in a table
 */
export default class CountyDataTable extends React.Component {

	/*
	 * Constructor
	 */

	constructor(props) {
		super(props);

		// Set the table data
		this.state = { 	
			lastIndicators: []
		}
	}


	/*
	 * Life-Cycle Methods
	 */

	// Load data from api, after load component
	componentWillMount() {
    	this.loadIndicatorData(this.props.county.id);
	}

	// If props changes, update de graph data
	componentWillReceiveProps(nextProps){			
		if(this.props.county.id != nextProps.county.id){	
			this.loadIndicatorData(nextProps.county.id);			
		}
	}


	/*
	 * Obtain data from api and format to display in table
	 */		
	loadIndicatorData(countyId){		
		fetch('/api/v1/datasets/counties/' + countyId + '/indicators/summary/lasts')
		.then((response) => {
			return response.json();
		}).then((indicators) => {
			this.setState({
    			lastIndicators: indicators
    		});		
    	});
	}

	

	/*
	 * Render
	 */	
	render() {		
		if(this.state.lastIndicators.length > 0){

			var rows = [];
			this.state.lastIndicators.forEach((summary) => {
				rows.push(
					<tr key={summary.indicator_id}>
						<td className="indicator-name">{summary.indicator.name}</td>
						<td>{summary.number}</td>
						<td>{summary.year}</td>
					</tr>
					);
			})


			return (
				<table className="county-data-table">
					<thead>
						<tr>
							<th>Indicator</th>
							<th>Number of cases</th>
							<th>Year</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			);
		} else {

			return (
				<p>Loading...</p>
			);

		}

	}	
}