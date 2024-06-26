function main(){
    var myData= d3.csv('../data/mock_stock_data.csv').then( function(d) {
        for (let index = 0; index < d.length; index ++) {
            const element = d[index];
            d3.select('body').selectAll('p')
            .data(d)
            .enter()
            .append('p')
            .text(function(d){
                return d.Date + ',' +d.Stock + ',' + d.Price
            });
        }
    });}

function main1(){  var svg= d3.select('svg')
   margin= 200
   width= svg.attr("width")-margin
   height = svg.attr("height")-margin;

    var xScale = d3.scaleband().range([0,width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
    var g = svg.append('g'). attr('transform','translate('+100+","+100+")")
var g=d3.csv("../data/mock_stock_data.csv").then(function(data){
            xScale.domain(data.map(function(d){ return d.Date;}));
            yScale.domain([0, d3.max(data, function(d){return d.Price})])

            g.append("g").attr('transform','translate(0,'+height +'0)')
                .call(d3.axisBottom(xScale))
            g.append('g').call(d3.axisLeft(yScale)).tickFormat(function(d){return "$" + d}).ticks(10)
    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class","bar")
    .attr("x", function(d){return xScale(d.Date);})
    .attr("y", function(d){return yScale(d.Price)})
    .attr("width", xScale.bandwidth())
    .attr("height",function(d){return height - yScale(d.value);});


    })}    
