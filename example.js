// Function to parse CSV and update dropdowns
function main() {
        d3.csv("mock_stock_data.csv").then(data => {
            // Parse data
            data.forEach(d => {
                d.Date = new Date(d.Date);
                d.Price = +d.Price;
            });
    
            // Get unique dates and stocks for dropdowns
            const dates = [...new Set(data.map(d => d.Date))];
            const stocks = [...new Set(data.map(d => d.Stock))];
    
            // Populate date dropdown
            const dateSelect = d3.select("#date");
            dateSelect.selectAll("option")
                .data(dates)
                .enter()
                .append("option")
                .attr("value", d => d)
                .text(d => d.toISOString().split('T')[0]);
    
            // Populate stock dropdown
            const stockSelect = d3.select("#stock");
            stockSelect.selectAll("option")
                .data(stocks)
                .enter()
                .append("option")
                .attr("value", d => d)
                .text(d => d);
    
            // Add event listeners to update chart
            dateSelect.on("change", () => updateChart(data));
            stockSelect.on("change", () => updateChart(data));
    
            // Initial chart update
            updateChart(data);
        });
    }
    
    // Function to update chart based on selections
    function updateChart(data) {
        const selectedDate = new Date(d3.select("#date").property("value"));
        const selectedStock = d3.select("#stock").property("value");
    
        // Filter data
        const filteredData = data.filter(d => d.Date.getTime() === selectedDate.getTime() && d.Stock === selectedStock);
    
        // Clear previous chart
        d3.select("#chart").selectAll("*").remove();
    
        if (filteredData.length === 0) {
            d3.select("#chart").append("p").text("No data available for the selected date and stock.");
            return;
        }
    
        // Create SVG element
        const svg = d3.select("#chart").append("svg");
    
        // Define scales
        const x = d3.scaleBand().domain([selectedStock]).range([0, 600]).padding(0.4);
        const y = d3.scaleLinear().domain([0, d3.max(filteredData, d => d.Price)]).range([600, 0]);
    
        // Create bars
        svg.selectAll(".bar")
            .data(filteredData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.Stock))
            .attr("y", d => y(d.Price))
            .attr("width", x.bandwidth())
            .attr("height", d => 600 - y(d.Price))
            .attr("fill", "steelblue")
            .on("mouseover", function(event, d) {
                const [x, y] = d3.pointer(event);
                d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("left", `${x + 10}px`)
                    .style("top", `${y + 10}px`)
                    .html(`Stock: ${d.Stock}<br>Date: ${d.Date.toISOString().split('T')[0]}<br>Price: $${d.Price}`);
            })
            .on("mouseout", function() {
                d3.select(".tooltip").remove();
            });
    
        // Add axes
        svg.append("g")
            .attr("transform", "translate(0,600)")
            .call(d3.axisBottom(x));
    
        svg.append("g")
            .call(d3.axisLeft(y));
    }
    
    main();
    