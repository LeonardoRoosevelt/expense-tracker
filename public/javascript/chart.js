let ctx = document.getElementById('chart').getContext('2d')
let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3]
      }
    ]
  }
})

axios
  .get('http://localhost:3000/chart/json')
  .then(function(response) {
    chart.destroy()
    return (chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: response.data.category,
        datasets: [
          {
            label: 'amount',
            data: response.data.record
          }
        ]
      }
    }))
  })
  .catch(function(error) {
    console.log(error)
  })

function chartStick() {
  chart.destroy()
  axios
    .get('http://localhost:3000/chart/json')
    .then(function(response) {
      return (chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: response.data.category,
          datasets: [
            {
              label: 'amount',
              data: response.data.record
            }
          ]
        }
      }))
    })
    .catch(function(error) {
      console.log(error)
    })
}

function chartPie() {
  chart.destroy()
  axios
    .get('http://localhost:3000/chart/json')
    .then(function(response) {
      return (chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: response.data.category,
          datasets: [
            {
              data: response.data.record
            }
          ]
        }
      }))
    })
    .catch(function(error) {
      console.log(error)
    })
}
