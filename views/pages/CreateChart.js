function Date1(vstring) {
    var parts = vstring.split("-");
    vstring.split("-")
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    console.log(mydate.toDateString())
    return mydate;


}




function SearchData() {

    //Load Information 

    var Name = document.getElementById("namewell").value;
    var datedeb = document.getElementById("datedeb").value;
    var datefin = document.getElementById("datefin").value;
    console.log(Name);
    console.log(datedeb);
    console.log(datefin);





    if (Name == "") {
        alert("Name of Well");


    } else {


        //Send PAraméters


        //Receive  Csv Data




        //Create  Charte 

        var margin = { top: 10, right: 30, bottom: 90, left: 40 },
            width = 741 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        d3.csv("/ali1.csv", function(data) {

            let wellExiste = 0;
            var svg = d3.select("#svgsearch")
                .append("svg")
                .attr("id", "svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(function(data) { return data.DATE_hist; }))
                .padding(1);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.OIL_hist; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Lines
            svg.selectAll("myline")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", function(d) {
                    if (d.WELL_hist == Name) {

                        wellExiste = wellExiste + 1;
                        return x(d.DATE_hist);

                    }
                })
                .attr("x2", function(d) {
                    if (d.WELL_hist == Name) {
                        wellExiste = wellExiste + 1;
                        return x(d.DATE_hist);

                    }
                })
                .attr("y1", function(d) {
                    if (d.WELL_hist == Name) {
                        wellExiste = wellExiste + 1;
                        return y(d.OIL_hist);

                    };
                })
                .attr("y2", y(0))
                .attr("stroke", "grey")
                // Circles
            svg.selectAll("mycircle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    if (d.WELL_hist == Name) {
                        wellExiste = wellExiste + 1;
                        return x(d.DATE_hist);

                    }
                })
                .attr("cy", function(d) {
                    if (d.WELL_hist == Name) {
                        wellExiste = wellExiste + 1;
                        return y(d.OIL_hist);

                    }
                })
                .attr("r", "4")
                .style("fill", "#69b3a2")
                .attr("stroke", "black")

            //Create TAble 
            var dataSchemas = ["DATE_hist", "WELL_hist", "OIL_hist"]
            Create_table(dataSchemas, data, "tbody");

            // Line entre circle

            if (wellExiste == 0) {


                alert("Well Dosn't Existe")
                var s = document.getElementById("svg");
                s.remove();


            }

        });



    }

}




function Create_table(dataSchemas, data, id) {

    //=[ "DATE_hist" ,"WELL_hist","OIL_hist"]
    for (let i = 0; i < data.length; i++) {
        var tbody = document.getElementById(id);
        var tr = document.createElement("tr");
        console.log("aaaaa" + data[i].length)

        for (let j = 0; j < dataSchemas.length; j++) {
            var td = document.createElement("td");
            td.textContent = data[i][dataSchemas[j]];
            tr.append(td);

        }
        tbody.append(tr);


    }




}




//*------------------------------------------------------CreatePieChart()

function createPieChart() {

    var svgPieChart = document.getElementById("svgPiechart");

    var margin = { top: 100, right: 0, bottom: 0, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    var svg = d3.select("#svgPiechart")
        .append("svg")
        .attr("width", 500)
        .attr("height", 550)
        .append("g")
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2) + ")");

    d3.csv("/ali1.csv", function(data) {

        // X scale: common for 2 data series
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0) // This does nothing
            .domain(data.map(function(data) { return data.DATE_hist; })); // The domain of the X axis is the list of states.

        // Y scale outer variable
        var y = d3.scaleLinear()
            .range([innerRadius, outerRadius]) // Domain will be define later.
            .domain([0, d3.max(data, function(d) { return +d.OIL_hist; })]); // Domain of Y is from 0 to the max seen in the data

        // Second barplot Scales
        var ybis = d3.scaleLinear()
            .range([innerRadius, 5]) // Domain will be defined later.
            .domain([0, d3.max(data, function(d) { return +d.GAS_hist; })]);

        // Add the bars

        var oil = 0;
        var date = "a";
        var gas = "a";
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "#69b3a2")
            .attr("class", "yo")
            .attr("d", d3.arc() // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { oil = d['OIL_hist']; return y(d['OIL_hist']); })
                .startAngle(function(d) {; return x(d.DATE_hist); })
                .endAngle(function(d) { return x(d.DATE_hist) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))
            //    .attr("onmousemove","ali("+ oil+","+ date+","+gas+")")



        // Add the labels
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.DATE_hist) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.DATE_hist) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['OIL_hist']) + 10) + ",0)"; })
            .append("text")
            .text(function(d) { return (d.DATE_hist) })
            .attr("transform", function(d) { return (x(d.DATE_hist) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        // Add the second series
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "red")
            .attr("d", d3.arc() // imagine your doing a part of a donut plot
                .innerRadius(function(d) { return ybis(0) })
                .outerRadius(function(d) { return ybis(d['GAS_hist']); })
                .startAngle(function(d) { return x(d.DATE_hist); })
                .endAngle(function(d) { return x(d.DATE_hist) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))

    });








}



//-*-*---**-------------------------------- Create_Chart


function Create_Chart() {
    var chart = document.getElementById("PrincipalChart")


    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 1100 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#PrincipalChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("/ali1.csv", function(data) {

        // group the data: I want to draw one line per group
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.WELL_hist; })
            .entries(data);


        // Add X axis --> it is a date format
        var x = d3.scaleBand()
            .range([0, width]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            // This does nothing
            .domain(data.map(function(data) { return data.DATE_hist; })); // The domain of the X axis is the list of states.

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.OIL_hist; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // color palette
        var res = sumstat.map(function(d) { return d.key }) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

        // Draw the line
        svg.selectAll(".line")
            .data(sumstat)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d) { return color(d.key) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d) {
                return d3.line()
                    .x(function(d) { return x(d.DATE_hist); })
                    .y(function(d) { return y(+d.OIL_hist); })
                    (d.values)
            })

    })




}

function createMap() {



    const width = 300;
    const height = 400;



    const projection = d3.geoMercator()
        .center([2.5927734375, 28.729130483430154])
        .scale(1100)
        .translate([500, 190]);


    const path = d3.geoPath().projection(projection);

    d3.json("map2.json", function(error, data) {
        if (error) {
            throw error;
        }


        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1);

        const svg = d3.select("#aa");
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr("d", path)
            .attr("stroke", "black")
            .attr("fill", "transparent")
            .on('mousemove', function(d) {
                console.log("aliaali")
                tooltip.transition().duration(200).style("opacity", .9);
                //Any time the mouse moves, the tooltip should be at the same position

                tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px")
                    //The text inside should be State: rate%
                    .text(() => `${d.properties.NAME_1}`)
            })
            .on("mouseout", function(d, i) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 1);
            });

    })
}