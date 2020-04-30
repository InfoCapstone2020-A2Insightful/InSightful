import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Table, Button} from 'reactstrap';
// import {MetricCalculationRow} from './test';


import './index.js';
import './css/DashBoard.css';

import firebase from 'firebase/app';

export class DashBoard extends Component {

    constructor(props) {
        super(props)
        let year = new Date()
        year = year.getFullYear().toString()

        this.state = {
            // Calculations should have the same array lengths...
            // Work on centralizing the data so we aren't hoping
            // everything is operating on the same index of the array
            metricAreaCalculationsMonth: [],
            metricAreaCalculationsQuarter: [],
            metricAreaCalculationsAnnual: [],
            currentCalculation: 0, // Will always default to the first value in an array
            currentYear: year
        }
    }

    // Do any information retrieval here
    componentDidMount() {
        // Retrieve monthly information for a metric calculation
        this.renderMetricMonthly()
        this.renderMetricQuarterly()  
        this.renderMetricAnnually()  
    }

    // componentDidUpdate() {
    //     console.log(this.state)
    // }

    // Convert map to an array in the state
    arrayMonthCalculations(map) {
        this.setState((state) => {
            let monthArray = Array.from(map.entries()).map((key) => {
                return key
            })
            state.metricAreaCalculationsMonth = monthArray
            return state
        })
    }
    
    // Convert a map to an array in the state
    arrayQuarterCalculations(map) {
        this.setState((state) => {
            let quarterArray = Array.from(map.entries()).map((key) => {
                return key
            })
            state.metricAreaCalculationsQuarter = quarterArray
            return state
        })
    }

    // Convert a map to an array in the state
    arrayAnnualCalculations(map) {
        this.setState((state) => {
            let yearArray = Array.from(map.entries()).map((key) => {
                return key
            })
            state.metricAreaCalculationsAnnual = yearArray
            return state
        })
    }

    // Retrieve data for monthly calculations
    renderMetricMonthly = () => {
        let rootPath = firebase.database().ref('metricGoalsMonths')
        let monthMap = new Map()

        rootPath.once('value', (snapshot) => {
            let info = snapshot.val();
            let keys = Object.keys(info);
            keys.map((key) => {
                // If the our prop of metric calculation IDs contains the ID, add it to the month map.
                Array.from(this.props.metricAreaCalculations.entries()).map((key2) => {
                    if (key2[0] == key) {
                        monthMap.set(key, info[key])
                    }
                }) 
            })
            this.arrayMonthCalculations(monthMap)
        })
    }

    // Retrieve data for quarterly calculations
    renderMetricQuarterly = () => {
        let rootPath = firebase.database().ref('metricGoalsQuarters')
        let quarterMap = new Map()

        rootPath.once('value', (snapshot) => {
            let info = snapshot.val();
            let keys = Object.keys(info);
            keys.map((key) => {
                let intKey = parseInt(key, 10)
                // if (this.props.metricAreaCalculations.includes(intKey)) {
                //     quarterMap.set(key, info[key])
                // }
            })
            this.arrayQuarterCalculations(quarterMap)
        })
    }

    // Retrieve data for annually calculations
    renderMetricAnnually = () => {
        let rootPath = firebase.database().ref('metricGoalsAnnuals')
        let annualMap = new Map()

        rootPath.once('value', (snapshot) => {
            let info = snapshot.val();
            let keys = Object.keys(info);
            keys.map((key) => {
                let intKey = parseInt(key, 10)
                // if (this.props.metricAreaCalculationIDs.includes(intKey)) {
                //     console.log(info[key])
                //     annualMap.set(key, info[key])
                // }
            })
            this.arrayAnnualCalculations(annualMap)
        })
    }

    leftButtonClick() {
        // let checkIfNullOrUnDef = this.state.metricAreaCalculationsQuarter.length
        // console.log(checkIfNullOrUnDef)
        // // if (checkIfNullOrUnDef) {
        // //     console.log(this.state.metricAreaCalculationsMonth.length)
        // // }
    }

    rightButtonClick() {
        // let checkIfNullOrUnDef = this.state.metricAreaCalculationsQuarter
        // if (checkIfNullOrUnDef) {
        //     console.log(this.state.metricAreaCalculationsMonth.length)
        // }
    }

    arrayElements() {
        const test = Array.from(this.props.metricAreaCalculations.entries()).map((key) => {
            //Pass metricName, metricID into metricAreaCard as props then also pass in a list of props containing information about that specific metric
            return <MetricCalculationRow
                    metrics={key[1].calcMetric}
                    metricCalc={key[1].calcName}
                    />
        })
        return test
    }

    // monthArrayElements(numValue) {
    //     // Metrics for monthly information
    //     // let currentMonthCalc = this.state.metricAreaCalculationsMonth
    //     // let calculationInfo = currentMonthCalc[numValue]
    //     let monthArrayInfo = []
    //     let currentMonthCalc = this.state.metricareaCalculationsMonth
    //     console.log(this.state)

    //     // console.log(currentMonthCalc)
    //     // console.log(calculationInfo)

    //     for (var testtest in currentMonthCalc) {
    //         console.log(testtest)
    //     }

    //     // Render if not undefined/null for month information
    //     // if (calculationInfo) {
    //     //     let calculationKeys = calculationInfo[1]
    //     //     let keys = Object.keys(calculationKeys)
    //     //     monthArrayInfo = keys.map((key) => {
    //     //         let monthInfo = calculationKeys[key]
    //     //         if (monthInfo.year = this.state.currentYear) {
    //     //             return <MetricMonthly
    //     //             actual={monthInfo.actual}
    //     //             target={monthInfo.target}
    //     //             month={monthInfo.month}
    //     //             highlight={monthInfo.highlights}
    //     //             lowlight={monthInfo.lowlights}
    //     //             coe={monthInfo.coe}
    //     //         />
    //     //         }
    //     //     })
    //     // }
    //     return monthArrayInfo
    // }

    monthArrayElements() {
        let currentMonth = this.state.metricAreaCalculationsMonth
        let monthArrayInfo = []
        var monthArray

        for (var test in currentMonth) {
            if (currentMonth[test][0] == this.state.currentCalc) {
                monthArray = currentMonth[test][1]
            }
        }

        if (monthArray) {
            let keys = Object.keys(monthArray)
            monthArrayInfo = keys.map((key) => {
                let monthInfo = monthArray[key]
                return <MetricMonthly
                    actual={monthInfo.actual}
                    target={monthInfo.target}
                    month={monthInfo.month}
                    highlight={monthInfo.highlights}
                    lowlight={monthInfo.lowlights}
                    coe={monthInfo.coe}
                />
            })
        }
        return monthArrayInfo
    }

    quarterArrayElements(numValue) {
        
        // Metrics for quarterly information
        let currentQuarterCalc = this.state.metricAreaCalculationsQuarter
        let calculationInfoQuarter = currentQuarterCalc[numValue]
        let quarterArrayInfo = []

        if (calculationInfoQuarter) {
            let calculationKeys = calculationInfoQuarter[1]
            let keys = Object.keys(calculationKeys)
            quarterArrayInfo = keys.map((key) => {
                let quarterInfo = calculationKeys[key]
                if (quarterInfo.year = this.state.currentYear) {
                    return <MetricQuarterly
                    actual={quarterInfo.actual}
                    target={quarterInfo.target}
                    quarter={quarterInfo.quarter}
                    highlight={quarterInfo.highlights}
                    lowlight={quarterInfo.lowlights}
                    coe={quarterInfo.coe}
                />
                }
            })
        }
        return quarterArrayInfo
    }

    annualArrayElements(numValue) {
        // Metrics for annual information
        let currentAnnualCalc = this.state.metricAreaCalculationsAnnual
        let calculationInfoAnnual = currentAnnualCalc[numValue]
        let annualArrayInfo = []

        if (calculationInfoAnnual) {
            let calculationKeys = calculationInfoAnnual[1]
            let keys = Object.keys(calculationKeys)
            annualArrayInfo = keys.map((key) => {
                let annualInfo = calculationKeys[key]
                if (annualInfo.year = this.state.currentYear) {
                    return <MetricAnnuals
                    actual={annualInfo.actual}
                    target={annualInfo.target}
                    annual={annualInfo.quarter}
                    highlight={annualInfo.highlights}
                    lowlight={annualInfo.lowlights}
                    coe={annualInfo.coe}
                />
                }
            })
        }
        return annualArrayInfo
    }

    handleChange = (event) => {
        let area = event.target.value
        this.setState((state) => {
            state.currentCalc = area
        })
    }

    render() {
        const metricElements = this.arrayElements()

        let leftButtonString = "<"
        let rightButtonString = ">"

        let currentNumCalc = this.state.currentCalculation
        let monthElements = this.monthArrayElements(currentNumCalc)
        let quarterElements = this.quarterArrayElements(currentNumCalc)
        let annualElements = this.annualArrayElements(currentNumCalc)

        return(        
            <div className = "body">
            <h1> {this.props.metricAreaInfo} </h1>
            <h2> Metric Area Summary </h2>
            {/* <h3> Owner: {this.props.metricAreaOwner} </h3> */}

            <select id="select-dropdown"
                onChange={(e) => this.handleChange(e)}>
                <option value="None">None</option>
                {metricElements}
            </select>

            {/* <Table bordered align="center">
                <thead>
                    <tr>
                    <th> Metric Calculations </th>
                    <th> Metric Calculations </th>
                    </tr>
                </thead>


                Table representing metric and metric caluclation
                <tbody>
                    {metricElements}
                </tbody>
            </Table> */}

            {/* Container for current  */}
            <div>
                {/* Monthly Information */}
                {monthElements}
            
                {/* Quarterly Information */}
                {quarterElements}

                {/* Yearly Information */}
                {annualElements}
            </div>
        </div>
        )
    }
}

// Represents a single row in the metric/metric calculations table
// Contains all metric name and metric calculation names for a metric area
class MetricCalculationRow extends Component {
    render() {
        return (
            // <tr>
            //     <th>
            //         {this.props.metrics}
            //     </th>
            //     {/* <th>
            //         {this.props.metricCalc}
            //     </th> */}
            // </tr>
            <option value={this.props.metrics}
                name={this.props.metrics}>
                {this.props.metrics}
            </option>
        )
    }
}

class MetricMonthly extends Component {
    componentDidMount() {
    }

    month(num) {
        switch(num) {
            case 1:
                return "January"
            case 2:
                return "February"
            case 3: 
                return "March"
            case 4:
                return "April"
            case 5:
                return "May"
            case 6: 
                return "June"
            case 7:
                return "July"
            case 8:
                return "August"
            case 9:
                return "September"
            case 10:
                return "October"
            case 11:
                return "November"
            case 12:
                return "December"
        }
    }

    // Determines the color of the actual field.
    // If the actual is greater or equal to the target
    // change color to green.
    // If the actual is within 5% of the target, 
    // change color to orange.
    // If the actual is neither of the above,
    // change color to red. 
    actualColor(actual, target) {
        if (actual >= target ) {
            console.log("Green to go!")
        } else {
            console.log("Actuals not met and not within 5%")
        }
    }

    

    render() {

        let actualValue = this.props.actual
        let monthValue = this.month(this.props.month)

        // If there is no value existing for the actual yet
        if (!actualValue) {
            actualValue = "N/A"
        }

        return (
            <div>
                <h2>{monthValue}</h2>
                <Table responsive>
                    <tbody>
                        <tr>
                        <th>Actual</th>
                            <th>Target</th>
                            <th>Highlights</th>
                            <th>Lowlights</th>
                            <th>Correction of Error</th>
                        </tr>
                        <tr>
                            <th>{actualValue}</th>
                            <th>{this.props.target}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

class MetricQuarterly extends Component {
    render() {

        let actualValue = this.props.actual
        let quarterValue = "Q" + this.props.quarter

        // If there is no value existing for the actual yet
        if (!actualValue) {
            actualValue = "N/A"
        }

        return (
            <div>
                <h2>{quarterValue}</h2>
                <Table responsive>
                    <tbody>
                        <tr>
                            <th>Actual</th>
                            <th>Target</th>
                            <th>Highlights</th> 
                            <th>Lowlights</th>
                            <th>Correction of Error</th>
                        </tr>
                        <tr>
                            {/* This should be auto-calculated based upon month values */}
                            <th>{actualValue}</th>
                            <th>{this.props.target}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

class MetricAnnuals extends Component {
    render() {
        return (
            <div>
                <h2>Annual</h2>
                <Table>
                    <tbody>
                        <tr>
                            <th>Actual</th>
                            <th>Target</th>
                            <th>Highlights</th>
                            <th>Lowlights</th>
                            <th>Correction of Error</th>
                        </tr>
                        <tr>
                            <th>{this.props.actual}</th>
                            <th>{this.props.target}</th>
                            <th>{this.props.highlight}</th>
                            <th>{this.props.lowlight}</th>
                            <th>{this.props.correction}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}