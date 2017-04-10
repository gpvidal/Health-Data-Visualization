import React from 'react'
import Graph from 'react-chartjs2'
 
/*
 * Display the county data in graph format
 */
export default class CountyDataGraph extends React.Component {

	/*
	 * Constructor
	 */	
	constructor(props) {
		super(props);

		//Set the graph data
		this.state = { 	
			indicatorsProgression: {}
		}
	}


	/*
	 * Life-Cycle Methods
	 */	

	// Load data from api, after load component
	componentWillMount() {
		this.loadProgressionData(this.props.county.id);
	}

	// If props changes, update de graph data
	componentWillReceiveProps(nextProps){
		if(this.props.county.id != nextProps.county.id){				
			this.loadProgressionData(nextProps.county.id);
		}
	}


	/*
	 * Obtain data from api and format to display in graph
	 */	
	loadProgressionData(countyId){		
		fetch('/api/v1/datasets/counties/' + countyId + '/indicators/progression')
		.then((response) => {
			return response.json();
		})
		.then((progression) => {


			//Presets Colors
			var backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ]
            
            var borderColor = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]

			// Creating  vars to store information
			var labels = [];
			var datasets = [];
			
			// Obtain labels
			progression[0].data.forEach((dataValue) => {
				labels.push(dataValue.year);
			})

			// Obtain datasets
			var index = 0;
			progression.forEach((indicatorProgression) => {

				var actualDataset = {};
				
				// Set de colors
				actualDataset.backgroundColor = backgroundColor[index];
				actualDataset.borderColor = borderColor[index];
				
				// Set de label from graph
				actualDataset.label = indicatorProgression.indicator.name;
				actualDataset.data = [];

				// Obtain data for graph
				indicatorProgression.data.forEach((progressionData) => {
					if(progressionData.percent){						
						actualDataset.data.push(progressionData.percent)
					} else {
						actualDataset.data.push(0);
					}
				});


				// Set the style 
				actualDataset.borderWidth = 1,
				datasets.push(actualDataset);
				
				index++;
			});


			//Changing state
			this.setState({
				indicatorsProgression: {
					labels: labels,
					datasets: datasets					
				}
			});


		});
	}


	/*
	 * Render Method
	 */
	render() {		

		// Graph options
		var options = {
			scales: {
				yAxes: [{
					ticks: {
						max: 100,
						min: 0,							
					}
				}]
			}			
		}


		return (
				<div className="county-graph-container">
					<Graph className="county-graph-data" data={this.state.indicatorsProgression} options={options} type="bar" />
				</div>
		);		

	}	
}