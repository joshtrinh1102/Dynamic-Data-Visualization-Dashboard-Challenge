function main() {
    d3.csv("data/mock_stock_data").then(data => {
        data.forEach(d=> { d. price= +d.price})
    })
}