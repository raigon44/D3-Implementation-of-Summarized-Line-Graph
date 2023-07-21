var width = 1500,
    height = 1000,
    margin = 50;

var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1500 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var months_string = []
var months = []
var listOfIncomeFromAllStores = []


d3.csv("store_data.csv").then(function (data) {

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var g = svg.append("g")
        .attr("transform", "translate(100,50)");

    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("opacity", 0);

    
    months = data.columns.slice(1,13)
    

    months.forEach(function(d) {
        var date = new Date(d)
        months_string.push(date.getMonth())
    })

    var processedValues = createStoreData(data);   //returns store-monthly income, monthly-average income, store-co-ordinates
    
    var storeData = processedValues[0]
    var medianData = processedValues[1]
    var store_cordinates = processedValues[2]
    

    xScale = d3.scaleTime()
        //.domain([new Date().setMonth(0),new Date().setMonth(11)])
        .domain([1,12])
        .range([0,width])

    yScale = d3.scaleLinear()
        .domain(d3.extent(listOfIncomeFromAllStores))
        .range([height, 0])


    var axisX = d3.axisBottom(xScale);
    var axisY = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0,"+ height +")")
        .call(axisX);
    svg.append("g").call(axisY);

    var area = d3.area()
        .x(function (d) {return xScale(d.month)})
        .y0(function (d) {return yScale(medianData[d.month].income)})
        .y1(function(d) { return yScale(d.income)});

    storeData.forEach(function(data){               //plots the light blue bands
        store_data = data.value
        store_name = data.store
        svg.append("path")
            .datum(store_data)
            .attr("transform", "translate(130,0)")
            .attr("fill", d3.schemeBlues[6][2])
            .attr("fill-opacity", .2)
            .attr("stroke", "none")
            .attr("class", "area_"+store_name)
            .attr("d", area)
            .on('mouseover', function (event, d) {                       //All the interactions
                var matches = event.target.className.baseVal.match(/\d+/)[0]
                const[x, y] = d3.pointer(event);
                d3.select(this).transition()
                    .attr('fill-opacity', .8)
                d3.selectAll(".reds" + matches).transition()
                    .style("stroke-width", 14)
                d3.selectAll(".blues" + matches).transition()
                    .style("stroke-width", 14)
                div.transition()
                    .style("opacity",1)
                let msg = "Store name: s"+matches+", Lattitude: "+store_cordinates["s"+matches].lat+" Longitude: "+store_cordinates["s"+matches].long
                div.html(msg)
                    .style("left", (x) + "px")
                    .style("top", (y) + "px");
            })
            .on('mouseout', function (event, d) {
                var matches = event.target.className.baseVal.match(/\d+/)[0]
                d3.select(this).transition()
                    .attr('fill-opacity', .2)
                d3.selectAll(".reds" + matches).transition()
                    .style("stroke-width", 1)
                d3.selectAll(".blues" + matches).transition()
                    .style("stroke-width", 1)
                div.transition()
                    .style("opacity",0)
            })

    })

    svg.append("path")              //plots the average curve
      .datum(medianData)
      .attr("fill", "none")
      .attr("stroke", "brown")
      .attr("stroke-width", 1.5)
      .attr("transform", "translate(130,0)")
      .attr("class", "median_line")
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.month) })
        .y(function(d) { return yScale(d.income) })
    )

    storeData.forEach(function(data) {
        store_data = data.value
        store_name = data.store
        income_array = []

        store_data.forEach(function(d){
            income_array.push(d.income)
        })

        min_income = d3.min(income_array)
        max_income = d3.max(income_array)
        min_index = d3.minIndex(income_array)
        max_index = d3.maxIndex(income_array)
        

        svg.append("line")                              //plots the keymoments
            .style("stroke", "blue")
            .style("stroke-width", 2)
            .style("stroke-dasharray", "5,5")
            .attr("class", "maxLine_"+store_name)
            .attr("x1", xScale(max_index+1))
            .attr("y1", yScale(max_income))
            .attr("x2", xScale(max_index+1))
            .attr("y2", yScale((medianData[max_index].income)))
            .attr("transform", "translate(0,0)")

        svg.append("line")
            .style("stroke", "red")
            .style("stroke-width", 2)
            .style("stroke-dasharray", "5,5")
            .attr("class", "minLine_"+store_name)
            .attr("x1", xScale(min_index+1))
            .attr("y1", yScale(min_income))
            .attr("x2", xScale(min_index+1))
            .attr("y2", yScale(medianData[min_index].income))
            .attr("transform", "translate(0,0)")

        svg.append("polygon")
            .style("fill","blue")
            .style("stroke", "blue")
            .style("stroke-width",1)
            .attr("class", "blue"+store_name)
            .attr("points", ""+(xScale(max_index+1) - 8)+","+(yScale(max_income) - 8)+" "+(xScale(max_index+1) + 8)+","+(yScale(max_income) - 8)+" "+xScale(max_index+1)+","+yScale(max_income)+"")
            //.attr("transform", "translate(130,0)")

        svg.append("polygon")
            .style("fill","red")
            .style("stroke", "red")
            .style("stroke-width",1)
            .attr("class", "red"+store_name)
            .attr("points", ""+xScale(min_index+1)+","+yScale(min_income)+" "+(xScale(min_index+1) - 8)+","+(yScale(min_income) + 8)+" "+(xScale(min_index+1) + 8)+","+(yScale(min_income) + 8)+"")
            //.attr("transform", "translate(130,0)")

        svg.append("text")
            .attr("x",(xScale(max_index+1) + 12))
            .attr("y", yScale(max_income))
            .attr("fill", "black")
            .text(store_name)
            //.attr("transform", "translate(130,0)")

        svg.append("text")
            .attr("x",(xScale(min_index+1) + 12))
            .attr("y", yScale(min_income))
            .attr("fill", "black")
            .text(store_name)
            //.attr("transform", "translate(130,0)")
    })


});

var createStoreData = function(data) {  //creates all the needed datastructure

    store_cordinates = []
    incomeOfAllStores = []
    median = []

    medianData = []

    months_string.forEach(function(month) {
        median[month] = 0;
    })

    data.forEach(function(d) {

        incomeOfAllStores[d.store_name] = {};

        store_cordinates[d.store_name] = {}

        months.forEach(function(month) {
            var date = new Date(month)

            median[date.getMonth()] = median[date.getMonth()] + parseInt(d[month]);
            incomeOfAllStores[d.store_name][date.getMonth()] = parseInt(d[month])
            listOfIncomeFromAllStores.push(parseInt(d[month]))
        })

        store_cordinates[d.store_name]["lat"] = d[" lat"]
        store_cordinates[d.store_name]["long"] = d[" long"]
        
    })

    for (const key of Object.keys(median)) {
        median[key] = median[key]/12
    }

    for (var [mnth, income] of Object.entries(median)) {
        medianData.push({
            month: mnth,
            income: income
        })
    }

    storeData = []


    for (var [store, d] of Object.entries(incomeOfAllStores)) {
        individualStore = []
        for (var [mnth, incomePerMonth] of Object.entries(d)) {
            
            individualStore.push({
                month: mnth,
                income: incomePerMonth
            })
        }
        storeData.push({
            store: store,
            value: individualStore
        })
    }

    return [storeData, medianData, store_cordinates]
}
