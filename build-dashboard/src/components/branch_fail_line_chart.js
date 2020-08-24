import React from 'react';
import {Line} from 'react-chartjs-2';
import {getBranchFailStatistics} from '../endpoints/jsons'

const basic_config = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

function BranchFailLineChart(props){
  let [branch_fail_stat_json, setBranchFailStatJson] = React.useState(null)
  React.useEffect(()=>{
    getBranchFailStatistics()
      .then(r => r.json())
      .then(r_json => {
        setBranchFailStatJson(r_json)
      })
  },[])

  return (
    <div>
      <h2>branch fail line chart</h2>
      <Line data={basic_config} />
    </div>
  );

}

export default BranchFailLineChart