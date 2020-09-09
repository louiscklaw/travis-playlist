import React from 'react';
import {Line} from 'react-chartjs-2';
import {getBranchFailStatistics} from '../endpoints/jsons'

const chart_options={
  tooltips: {
    mode: 'index',
    intersect: false
  },
  scales:{
    yAxes:[{
      ticks:{
        beginAtZero: true
      }
    }]
  }
}

const root_config = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'number of failed repo',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(192, 57, 43,0.4)',
      borderColor: 'rgba(192, 57, 43,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(192, 57, 43,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(192, 57, 43,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [ 1, 2, 3, 4, 5, 6, 7 ],
      pointRadius: 10,
      pointHoverRadius: 15
    },
    {
      label: 'number of branch',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(243, 156, 18,0.4)',
      borderColor: 'rgba(243, 156, 18,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(243, 156, 18,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(243, 156, 18,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1, 2, 3, 4, 5, 6, 7],
      pointRadius: 10,
      pointHoverRadius: 15
    },
    {
      label: 'total umber of repo',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(41,128,185 ,0.4)',
      borderColor: 'rgba(41,128,185 ,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(41,128,185 ,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(41,128,185 ,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1, 2, 3, 4, 5, 6, 7],
      pointRadius: 10,
      pointHoverRadius: 15
    }
  ]
};



function BranchFailLineChart(props){
  let [branch_fail_stat_json, setBranchFailStatJson] = React.useState(null)
  let [chart_data, setChartData] = React.useState(root_config)
  React.useEffect(()=>{
    getBranchFailStatistics()
      .then(r => r.json())
      .then(r_json => {
        setBranchFailStatJson(r_json)
        let record_times = r_json.map(x => x.t)
        let number_of_repo = r_json.map(x => x.n)
        let number_of_branch = r_json.map(x => x.f)
        let total_repo = r_json.map(x => x.tr)

        setChartData({
          ...root_config,
          labels: record_times,
          datasets:[
            {
              ...root_config.datasets[0],
              data: number_of_repo
            },
            {
              ...root_config.datasets[1],
              data: number_of_branch
            },
            {
              ...root_config.datasets[2],
              data: total_repo
            }
          ]
        })

      })


  },[])

  return (
    <div>
      <h2>branch fail line chart</h2>
      <Line data={chart_data} options={chart_options}/>
    </div>
  );

}

export default BranchFailLineChart