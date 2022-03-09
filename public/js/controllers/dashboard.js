// var d3 = require('d3v4');
// var jsdom = require('jsdom');





var loadMarkers = (path) => {

}


var mapper1 = () => {

    $('#world-map-markers').mapael({
        map: {
            name: 'algeria',
            zoom: {
                enabled: true,
                maxLevel: 10
            }
        }
    })


    const width = 900;
    const height = 1080;



    const projection = d3.geoMercator()
        .center([2.5927734375, 28.729130483430154])
        .scale(1100)
        .translate([500, 190]);


    const path = d3.geoPath().projection(projection);

    d3.json("dzMap.json", function(error, data) {
        if (error) {
            throw error;
        }


        const tooltip = d3.select("body").append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        const svg = d3.select("svg");
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr("d", path)
            .attr("stroke", "black")
            .attr("fill", "rgb(162, 164, 119)")
            .on('mouseover', function(d) {
                Tooltip
                    .style("opacity", 1)
                    // d3.select(this)
                    // .style("fill", "blue")
                    // .style("opacity", 0.5)
            })
            .on('mousemove', function(d) {
                // console.log("aliaali")
                tooltip.html("The exact value of<br>this cell is: " + d.value)
                    .style("left", (d3.mouse(this)[0] + 70) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
                tooltip.transition().duration(200).style("opacity", 100);
                //Any time the mouse moves, the tooltip should be at the same position

                tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px")
                    //The text inside should be State: rate%
                    .text(() => `${d.properties.NAME_1}`)
            })
            .on("mouseout", function(d, i) {
                // tooltip.transition()
                //     .duration(500)
                //     .style("opacity", 100);
                tooltip
                    .style("opacity", 0)
                d3.select(this)
                    // .style("stroke", "none")
                    // .style("opacity", 0.8)
            })





    });

    // d3.json("wells.json", (error, data) => {

    // });
}

var selected_field = {}


grapher = () => {
    var width = 150,
        height = 400

    var margin = { top: 10, right: 30, bottom: 30, left: 100 }

    let node_ray = 20

    var svg = d3.select("#graph-nodes")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");






    //appending little triangles, path object, as arrowhead
    //The <defs> element is used to store graphical objects that will be used at a later time
    //The <marker> element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
    svg.append('defs').append('marker')
        .attr("id", 'arrowhead')
        .attr('viewBox', '-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
        .attr('refX', +node_ray + 4) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 15)
        .attr('markerHeight', 15)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', 'blue')
        .style('stroke', 'none');

    d3.json("json/graphFile.json", function(data) {


        // Initialize the links
        var linkgroup = svg
            .selectAll(".link")
            .data(data.links)
            .enter()
            .append("g")
        var link = linkgroup
            .append("path")
            .attr("class", "link")
            .style("fill", "none")
            .style("stroke", "blue")
            .style("opacity", "1")
            .style("stroke-width", "1")
            .attr("class", "links")
            .attr("id", function(d, i) { return 'edgepath' + i })
            .attr('marker-end', 'url(#arrowhead)') //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.

        // var link = svg.selectAll(".link")
        //     .data(bilinks)
        //     .enter()
        //     .append("path")
        //     .attr("class", "link")
        //     .style("fill", "none")
        //     .style("opacity", "0.5")
        //     .style("stroke-width", "2")
        //     .each(function(d) {
        //         var color = gradientColor(d[3]);
        //         d3.select(this).style("stroke", color).attr("marker-end", marker(color));
        //     });


        // Initialize the nodes
        var nodegroup = svg
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("g")
            .call(d3.drag() // call specific function when circle is dragged
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            ).on("click", clicked)

        var node = nodegroup.append("circle")
        node.attr("r", node_ray)
            .style("fill", "#00FFFF")
            .style("fill-opacity", 1)
            .attr("stroke", "#b3a2c8")

        var label = nodegroup.append("svg:text")
            .text(function(d) { return d.name; })
            .style("text-anchor", "middle")
            // .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 12);

        var edgelabels = svg.selectAll(".edgelabel")
            .data(data.links)
            .enter()
            .append('text')
        edgelabels.style("pointer-events", "none")
            .attr({
                'class': 'edgelabel',
                'id': function(d, i) { return 'edgelabel' + i },
                'dx': 80,
                'dy': 0,
                'font-size': 10,
                'fill': '#aaa'
            });

        edgelabels.append('textPath')
            .attr('xlink:href', function(d, i) { return '#edgepath' + i })
            .style("pointer-events", "none")
            .text(function(d, i) { return d.name })
            .style("font-size", "12");




        // Let's list the force we wanna apply on the network
        var simulation = d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink() // This force provides links between nodes
                .id(function(d) { return d.id; }) // This provide  the id of a node
                .links(data.links) // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-600)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(453 / 2, height / 2)) // This force attracts nodes to the center of the svg area
            .force('collide', d3.forceCollide().radius(60).iterations(1))

        .on("tick", ticked)


        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
            // link.attr("d", function(d) {
            //     return "M" + d.source.x + "," + d.source.y + "S" + ((d.target.x)) + "," + ((d.target.y)) + " " + d.target.x + "," + d.target.y;
            // });
            link.attr('d', function(d) {
                var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                //console.log(d)
                return path
            });

            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            label.attr("x", function(d) {
                    return d.x;
                })
                .attr("y", function(d) {
                    return d.y + 35;
                });
            // nodelabels.attr("x", function(d) { return d.x; })
            //     .attr("y", function(d) { return d.y; });


            edgelabels.attr('transform', function(d, i) {
                if (d.target.x < d.source.x) {
                    bbox = this.getBBox();
                    dx = (d.target.x + d.source.x) / 2
                    dy = (d.target.y + d.source.y) / 2
                    rx = bbox.x + bbox.width / 2;
                    ry = bbox.y + bbox.height / 2;
                    return `rotate(180 ` + rx + ' ' + ry + ')';
                } else {
                    return `rotate(0)`;
                }
            });

        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }

        function clicked(d) {
            if (selected_field[d.name]) {
                delete selected_field[d.name]
                    // console.log("deleted " + d.name)
                    // console.log("overaal" + selected_field)
                d3.select(this).style("fill", "#00FFFF")
                    .style("fill-opacity", 0.3)
                    .attr("opacity", 0.3)
                    .attr("opacity", 0.3)
            } else {
                selected_field[d.name] = []
                d.attributes.forEach(element => {
                    selected_field[d.name].push({ id: element.name, type: element.type, label: element.name })
                        // console.log(selected_field)
                    d3.select(this).style("fill", "#00FFFF")
                        .style("fill-opacity", 1)
                        .style("attr", "#00FFFF")
                        .attr("opacity", 1)
                });
            }
            updateQueryBuilder()
        }


    });
}

updateQueryBuilder = () => {

    let current_children = $("#queryStructure").children()
    let already_existing_fields = []

    // removing obsolete elements
    for (const element of current_children) {
        if (!Object.keys(selected_field).includes((element.id).slice(8))) {
            $(`#${element.id}`).remove()
        } else
            already_existing_fields.push((element.id).slice(8))
    }

    for (const key of Object.keys(selected_field)) {
        if (key in already_existing_fields)
            continue;

        var $newdiv2 = $(`<div id='structQ-${key}'></div>`)
        $newdiv2.append($(`<h3 class="text-uppercase text-muted ls-1 mb-1">${key}</div>`))
        var $newdiv = $(`<div id='structQ-${key}-fields'></div>`)
            // console.log("Hello there " + key)
        $newdiv.structFilter({
            fields: selected_field[key]
                // fields: [
                //     { id: "lastname", type: "text", label: "Lastname" },
                //     { id: "firstname", type: "text", label: "Firstname" },
                //     { id: "active", type: "boolean", label: "Is active" },
                //     { id: "age", tchangeype: "number", label: "Age" },
                //     { id: "bday", type: "date", label: "Birthday" },
                //     {
                //         id: "category",
                //         type: "list",
                //         label: "Category",
                //         list: [
                //             { id: "1", label: "Family" },
                //             { id: "2", label: "Friends" },
                //             { id: "3", label: "Business" },
                //             { id: "4", label: "Acquaintances" },
                //             { id: "5", label: "Other" }
                //         ]
                //     }
                // ]
        });

        if (!$(`#structQ-${key}`).length)
            $("#queryStructure").append($newdiv2.append($newdiv))

    }



}



// mapper1();
grapher();
// structQuery();


// console.log("finished")

//     return svg;

// }



// module.exports = {
//     mapBuilder
// }