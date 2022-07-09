 
 




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
        .scale(1500)
        .translate([500, 250]);


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

           

        const svg = d3.select(".map svg")
              
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr("d", path)
            .attr("id",function(d){return d.properties.ID_1})
            .attr("stroke", "red")
            .attr("fill", "rgb(162, 164, 119)")
            .on('mouseover', function(d) {
                
                tooltip
                    .style("opacity", 1)
                     
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
                tooltip.transition()
                     .duration(100)
                     .style("opacity", 0);
                tooltip
                    .style("opacity", 1)
                d3.select(this)
                    // .style("stroke", "none")
                    // .style("opacity", 0.8)
            })








    });






    




    ////////////////////////////////////////////////////////////////
    // d3.json("wells.json", (error, data) => {

    // });
}

var selected_field = {}

var send_links = {}


grapher = (name ) => {
    var width = 350,
        height = 630

    document.getElementById("dropdownMenu1").textContent=name

    var margin = { top: 10, right: 30, bottom: 30, left: 100 }

    let node_ray = 30

    //Tooltip
    const tooltip_marker = d3.select("body").append("div")
         .attr("class", "tooltip")
         .style("opacity",   0);


    var svg = d3.select("#graph-nodes")
   sv=d3.selectAll("path")
   if (sv["_groups"][0].length!=0) {
       s=svg.select('svg')
       
      s.remove() 
   
   }
    

        svg=svg.append("svg")
        .attr("id","a")
        .attr("width", "100%")
        .attr("height", height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    svg.append("g").attr("class","links")
    svg.append("g").attr("class","nodes")

    const nodesG = svg.select("g.nodes")
    const linksG = svg.select("g.links")

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    strength=2
    collid=node_ray
    
        
     

    d3.json("json/"+name+".json", function(error, graphs) {
        
             
        send_links=graphs['links']
            svg.append('defs').append('marker')
                .attr('id', 'arrowhead')
                .attr('viewBox', '-0 -5 10 10')
                .attr('refX', 0)
                .attr('refY', 0)
                .attr('orient', 'auto')
                .attr('markerWidth', 13)
                .attr('markerHeight', 13)
                .attr('xoverflow', 'visible')
                .append('svg:path')
                .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
                .attr('fill', '#999')
                .style('stroke', 'none');
            
                var simulation = d3.forceSimulation()
                // pull nodes together based on the links between them
                .force("link", d3.forceLink().id(function(d) {
                    return d.id;
                })
                .strength(strength))
                // push nodes apart to space them out
                .force("charge", d3.forceManyBody().strength(strength))
                // add some collision detection so they don't overlap
               .force("collide", d3.forceCollide().radius(node_ray*3))
                // and draw them around the centre of the space
                .force("center", d3.forceCenter(width / 2, height / 2));
            
            /*simulation .force("link", d3.forceLink( ).distance(10) // This force provides links between nodes
                .id(function(d) { return d.id; }) // This provide  the id of a node
                .links(graphs.links) // and this the list of links
            );*/
            
            let linksData = graphs.links.map(link => {
                var obj = link;
                obj.source = link.source;
                obj.target = link.target;
                return obj;
            })
            
            const links = linksG
                .selectAll("g")
                .data(graphs.links)
                .enter().append("g")
                .attr("cursor", "pointer")
              
             
            
            const linkLines = links
                .append("path")
                .attr("id", function(_, i) {
                return "path" + i
                })
                .attr('stroke', 'black')
                .attr('opacity', 0.5)
                .attr("stroke-width", 1)
                .attr("fill", "transparent")
                .attr('marker-end', 'url(#arrowhead)')
                

                ;
            
            const linkText = links
                .append("text")
                .attr("dy", -4)
                .append("textPath")
                .attr("xlink:href", function(_, i) {
                return "#path" + i
                })
            
                .attr("startOffset", "50%")
                .attr('stroke',  'blue')
                .attr('opacity', 1)
                .attr("id",function(d){return d.name})
                .text((d ) => `${d.name}`)
                .on("click",clicked_link);
            
            const nodes = nodesG
                .selectAll("g")
                .data(graphs.nodes)
                .enter().append("g")
                .attr("cursor", "pointer")
                
                .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
               
                /*.on('mousemove', function (d) {
                    
                      tooltip_marker.transition()
                          .duration(200)
                          .style("opacity", .9);
                  //Any time the mouse moves, the tooltip should be at the same position
                    tooltip_marker.style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px")        
                  //The text inside should be State: rate%
                          .text(d.attributes[0].name)
                  })
                  .on("mouseout", function (d, i) {
                    tooltip_marker.transition()
                                  .duration(300)
                                  .style("opacity", 0);
                        })*/
                
             nodes.append("circle")
                .attr("r", function(d){ if (d.name=="USER22"){return 0} return node_ray})
                .attr("fill", function(d) { return color(d.id); } ) //function(d) { return color(d.id); }  *****"green"
                .on("mouseover", mouseOver(0.2))
                .on("mouseout", mouseOut)
                .on("click",clicked)
            
                nodes.append("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .text(function(d) { if (d.name=="USER22"){return ''}  return d.name; });
            
            simulation
                .nodes(graphs.nodes)
                .on("tick", ticked);
            
            simulation.force("link", d3.forceLink().links(linksData)
                .id((d, i) => d.id).distance(0.5)
                )
                ;
            
            function ticked() {
                linkLines.attr("d", function(d) {
                var dx = (d.target.x - d.source.x),
                    dy = (d.target.y - d.source.y),
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                });
            
                // recalculate and back off the distance
                linkLines.attr("d", function(d) {
            
                // length of current path
                var pl = this.getTotalLength(),
                    // radius of circle plus backoff
                    r = (node_ray*1.5)+5,
                    // position close to where path intercepts circle
                    m = this.getPointAtLength(pl - r);
            
                var dx = m.x - d.source.x,
                    dy = m.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
            
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
                });
                
            
                linkText
                .attr("x", function(d) {
                    return (d.source.x + (d.target.x - d.source.x) * 0.5);
                })
                .attr("y", function(d) {
                    return (d.source.y + (d.target.y - d.source.y) * 0.5);
                })
            
                nodes
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
            
            
            }

            function dragstarted(d) {
                 if (!d3.event.active) simulation.alphaTarget(0 ).restart();
                d.fx = d.x;
                d.fy = d.y;
                
            }
            
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
               
            }
            
            function dragended(d) {
               
                if (!d3.event.active) simulation.alphaTarget(1);
                d.fx = null;
                d.fy = null;
               
            }
            function mouseOver(opacity) {
                return function(d) {
                    linkText.opacity=0

                    linkLines.opacity=0
                    

                    // check all other nodes to see if they're connected
                    // to this one. if so, keep the opacity at 1, otherwise
                    // fade
                    nodes.style("stroke-opacity", function(o) {
                        thisOpacity = isConnected(d, o) ? 1 : opacity;
                        return thisOpacity;
                    });
                    nodes.style("fill-opacity", function(o) {
                        thisOpacity = isConnected(d, o) ? 1 : opacity;
                        return thisOpacity;
                    });

                    linkLines.style("stroke-opacity", function(o) {
                     
                        return o.source === d || o.target === d ? 1 : 0;
                    });
                    linkLines.style("opacity", function(o){
                        return o.source === d || o.target === d ? o.source.colour : "transparent";
                    });


                    linkText.attr("stroke", function(o){
                        return o.source === d || o.target === d ? o.source.colour : "transparent";
                    });

                   
                    linkText.attr("fill", function(o){
                        return o.source === d || o.target === d ? o.source.colour : "transparent";
                    });
                    linkText.style("stroke-opacity", function(o) {
                        
                        return o.source === d || o.target === d ? 1 : 0;
                     });
                     linkText.style.visibility = 'hidden'
                    
                    
                    // also style link accordingly
                   /* linkLines.style("stroke-opacity", function(o) {
                     
                        return o.source === d || o.target === d ? 1 : 0;
                    });
                    /*linkLines.style("opacity", function(o){
                        return o.source === d || o.target === d ? o.source.colour : "transparent";
                    });
*/
                 /*   linkText.style("stroke-opacity", function(o) {
                        
                        return o.source === d || o.target === d ? 1 : 0;
                     });
                    linkText.attr("fill", function(o){
                        return o.source === d || o.target === d ? o.source.colour : "red";
                    });
                    linkLines.opacity=0.5
                    console.log(linkLines._groups);
                    linkText.opacity=0;
                    linkText.color="transparent"*/
                    
                    
                };
            }
        
         
            var  linkedByIndex={}
             linksData.forEach(function(d) {
               linkedByIndex[d.source.index + "," + d.target.index] = 1;
                      });
            function isConnected(a, b) {
                return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
            }
            function mouseOut() {
                nodes.style("stroke-opacity", 1);
                nodes.style("fill-opacity", 1);
               linkLines.style("stroke-opacity", 1);
               linkLines.style("stroke", "black");
               linkText.style("stroke-opacity", 1);
               linkText.style("stroke", "blue");

              // linkText.style("fill", "blue");
            }
            function clicked(d) {
          
                if (selected_field[d.name]) {
                    delete selected_field[d.name]
                        // console.log("deleted " + d.name)
                        // console.log("overaal" + selected_field)
                    d3.select(this).style("fill", color(d.id))
                        .style("fill-opacity", 1)
                        .attr("opacity", 1)
                        .attr("opacity", 1)
                } else {
                    selected_field[d.name] = []
                    d.attributes.forEach(element => {
                        selected_field[d.name].push({ id: element.name, type: element.type, label: element.name,type:"node" })
                            // console.log(selected_field)
                        d3.select(this).style("fill", "gold")
                            .style("fill-opacity", 0.7)
                            .style("attr", "gold")
                            .attr("opacity", 0.7)
                    });
                }
                updateQueryBuilder()
            }

            function clicked_link(d) {
          
               
                if (selected_field[d.name]) {
                    delete selected_field[d.name]
                        // console.log("deleted " + d.name)
                        // console.log("overaal" + selected_field)
                    d3.select(this).style("fill", "bleu")
                    .attr('stroke',  'black')
                    .attr('opacity', 1)
                         
                } else {

                    selected_field[d.name] = []
                    
                    selected_field[d.name].push({ id: d.name,type:"link" })

                        
                        d3.select(this).style("fill", "gold")
                            .style("fill-opacity", 0.7)
                            .style("attr", "gold")
                            .attr("opacity", 0.7)
                            .style("storke","gold")
                            .style("stroke-opacity",0.7)
                           
                            
                
                }
                updateQueryBuilder()
            }
        
    
        
        
        
        })
    









 }

updateQueryBuilder = () => {

    let current_children = $("#queryStructure").children()
    let already_existing_fields = []

    // removing obsolete elements
    for (const element of current_children) {
        if (!Object.keys(selected_field).includes((element.id).slice(5))) {
            $(`#${element.id}`).remove()
        } else
            already_existing_fields.push((element.id).slice(5))
    }

    for (const key of Object.keys(selected_field)) {
        if (key in already_existing_fields)
            continue;

        var $newdiv2 = $(`<div id='structQ-${key}' ></div>`)
        

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
            
             $("#queryStructure").append( $newdiv2.append($newdiv))
         
        
        
    }

} 
//Add_transf()


 
function Send_Req(id)
{

   
   
    //const graphdetect = GenericGraphAdapter.create();

     json_req={"nodes":{},"links":{}}
     
  
  
    if (Object.keys(selected_field).length==0) {
        
        alert("-*-*-*-*-_Select Nodes or Edges_-*-*-*-*-")
    } else {
        
        
        for (const key of Object.keys(selected_field)) {
            
            console.log(selected_field[key][0]['type'])
            if (selected_field[key][0]['type']=='node') {
                var a=$("#structQ-"+key+'-fields').structFilter('val')
                console.log(a)
                json_req["nodes"][key]=a
                
                
            } else {
                var a=$("#structQ-"+key+'-fields').structFilter('val')
                link=get_source_target(key)
                //link={"source":key,"target":key,"name":key}
                console.log(link)
                
                json_req["links"][key]=link
                
            }
        

        
            
        }
        console.log(json_req)
      //  ali()

        var data_json={
            "target":"neo4j",
            "data":json_req
        }
        str_json=JSON.stringify(data_json)
      //Send to server
        connect_server(str_json)

         
        
      //  download (type_of = "text/plain", filename= "data.txt",json_req)

    }

}




//Function connect to server
function connect_server(str_json)

{

    let xhr = new XMLHttpRequest();
 
    xhr.open("POST", 'http://localhost:8088', true);
    xhr.setRequestHeader('Content-type', 'text/plain');

    xhr.send(str_json);
  ///  alert("oooo")

    xhr.onload = function() {
       // alert(xhr.response)
   console.log(JSON.parse(xhr.response));
    if (JSON.parse(str_json)['target']=='neo4j') {
      //  alert("neo4")
        download (type_of = "text/plain", filename= "data.txt",JSON.parse(xhr.response))
    
    }
    ///download (type_of = "text/plain", filename= "data.csv",xhr.response)

    
}; 

 

}


//Download file
 function download (type_of = "text/plain", filename= "data.json",data) {
     
        let body = document.body;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
            type: type_of
        }));
        a.setAttribute("download", filename);
        body.appendChild(a);
        a.click();
        body.removeChild(a);
    }
function get_source_target(key)
{
    console.log(send_links.length)
    for (let i = 0; i < send_links.length; i++) {
         if (send_links[i]['name']==key) {
             src=send_links[i]['source']
             trg=send_links[i]['target']
             data={"source":src,"target":trg,"name":key}
             return data
         }
        
    }

    
}

///////////////////////////////////////////////

var data_search={}
var data=[]

function Search_data()
{

    search_inf={"key_word":"","user_id":"","start_date":"","end_date":"","location":"","target":""}
 
    key_word=document.getElementById("search_data").value
    start_date=document.getElementById("Date").value
    end_date=document.getElementById("Date").value
    

    search_inf["key_word"]=key_word
    search_inf["start_date"]=start_date
    search_inf["end_date"]=start_date
    search_inf["location"]=location
  
   getResult(key_word)
    // Add_transf()

    //console.log(search_inf)

    data={
        "index_name":"g",
        "key":key_word,
        "attribute":"eee",
        "Attribute_searched":search_inf
    }



    var data_json={
        "target":"elasticsearch",
        "data":data
    }
   // str_json=JSON.stringify(data_json)
  //Send to server
    connect_server("str_json")
//Create table of result
    
 //   Display_result()
   // Add_transf()


}

 



function getResult(key)

{

    console.log(key)
    
   
    d3.csv("dataset.csv", function(data) {
 
 
        result=[]
       
        for (let j = 0; j < data.length; j++) {
            var punctuationless = data[j]["text"].replace(/[.1234567890,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

            var finalString = punctuationless.replace(/\s{2,}/g," ");
            //console.log(data[j])
            let textBool= finalString.includes(key);
            if (textBool==true) {
                 
                result.push(data[j])

            }
         

           
           
       }
       
      // console.log(result)
       Display_result(result)
        
      // return result
 
         
    });
     
   
}








///Display data from elastic search as table.

function Display_result(result)
{
   
    data_search=result
    var tab =result
    data=tab
    //Statistic 
    sleep(1600)
    document.getElementById("Statistics").innerHTML=data.length



        if (document.getElementsByTagName("table")['length']!=0) {
            
            el=document.getElementById("res")
            el.remove()
        }

      //console.log(document.getElementsByTagName("table")['length'])
        // get the reference for the body
        var body = document.getElementById("table");
      
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        tbl.setAttribute("id","tab")
        //tbl.style["width"]="20px"


        tbl.setAttribute("class","datatable table table-striped table-bordered")
        var thead=document.createElement("thead")
        var tr=document.createElement("tr")
        
        tab_att=["text"]//,"Api_type","Position"
        for (let j = 0; j < tab_att.length ; j++) {//Object.keys(tab[0] )
            
            var th=document.createElement("th")
            th.setAttribute("scope","col")
            var cellText = document.createTextNode(tab_att[j]);
            th.appendChild(cellText);
            tr.appendChild(th);


            
        }
        thead.appendChild(tr)
        var tblBody = document.createElement("tbody");
      
        // creating all cells
        for (var i = 0; i < tab.length; i++) {
          // creates a table row
          var row = document.createElement("tr");
          row.setAttribute("class","gradeA")
          tab_att=["text"] //,"Api_type","Position"
            
          for (var j = 0; j < tab_att.length; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if(tab_att[j]=="Position")
            {
                var cell = document.createElement("td");
                 
                var cellText = document.createTextNode(tab[i][tab_att[j]]);
                cell.appendChild(cellText);
               cell.setAttribute("onclick","Marker("+i+")")
                cell.setAttribute("class","center")

                row.appendChild(cell);

            }
            else{
                var cell = document.createElement("td");
            
                var txt=''
               
                
                for (let s = 0; s < tab[i][tab_att[j]].split(" ").length; s++) {
                    //console.log(tab[i][tab_att[j]])
                    txt=txt+tab[i][tab_att[j]].split(' ')[s]+' '
                    if (s==10) {
                        break
                        
                    }
                    
                }
             
                var cellText = document.createTextNode(txt);

                cell.appendChild(cellText);
 
                row.appendChild(cell);
            }
          }
      
          // add the row to the end of the table body
          tblBody.appendChild(row);
        }
      
        // put the <tbody> in the <table>
        tbl.appendChild(thead)
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tbl);
        // sets the border attribute of tbl to 2;
       // tbl.setAttribute("border", "2");


        for (let i = 0; i <  tab.length; i++) {
            
            max=get_max(tab,tab[i]["Position"])
            color_place(tab[i]["Position"],max,tab.length)




            
        }
        $(document).ready(function () {
            $('#tab').DataTable();
        });
      
      
      



}


//Add transformer function
function Add_transf()
{
    document.getElementById("miltiselecttrans").style.display = "block"
  //  alert("choose trans")
   
}

function Marker(i)
{
    alert(i)
    console.log(data[i])
    var markers = [{long: data[i]["long"], lat:data[i]["latitude"], text: data[i]["text"], api: data[i]["Api_type"],id:data[i]["Position"]}]
    const svg = d3.select(".map svg");
  
   // var markers =create_marker(i)
    console.log(markers)
    Add_marker(markers,svg)

}

function get_max(tab,id)
{
    j=0
    
    for (let i = 0; i < tab.length; i++) {
        console.log(id)
        
        if (tab[i]["Position"]==id) {
            j=j+1
            
        }

        
    }
   
    return j
}

///////////////////// MARKERS




function color_place(id,maxid,max)
{   
   
    if (id=="0") {
        id='1'
        
    }
    var col=document.getElementById(id);
    console.log(maxid/max)
    
        
        col.style.fill=  "rgb( "+155*(1-maxid/max)+","+  5*(maxid/max)+","+  33*(maxid/max)+")" 
        col.style.opacity=9*maxid/max
        col.style.stroke="black"
    

}


function Add_marker(markers,svg )
{

        console.log(markers.length)
    const projection = d3.geoMercator()
        .center([2.5927734375, 28.729130483430154])
        .scale(1100)
         .translate([500 , 190]);
  
  const tooltip_marker = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity",   0);
      
tooltip1_data={"nom":"ali","prenom":"lmr"}

          svg
          .selectAll("myCircles")
          .data(markers)
          .enter()
          .append("circle")
            .attr("cx", function(d){ return projection([d.lat,d.long])[0]-1 })
            .attr("cy", function(d){ return projection([d.long, d.lat])[1]-3 })
            .attr("id",function(d){ return "crc"+d.id})
            .attr("r",50)
            .style("fill", "red" )
            .attr("stroke", "black" )
            .attr("stroke-width", 6)
            .attr("fill-opacity", 1) 
            .on("click", function (d, i) {
                alert("aaaaaaaaa")
              tooltip_marker.transition()
                            .duration(5)
                            .style("opacity", );
                  })
             
            .on('mousemove', function (d) {
              console.log("zzzzz")
                tooltip_marker.transition()
                    .duration(5000)
                    .style("opacity", 1);
            //Any time the mouse moves, the tooltip should be at the same position
              tooltip_marker.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")        
            //The text inside should be State: rate%
                    .text(()=> `${tooltip1_data.nom+tooltip1_data.prenom}`)
            })
            alert('ok')
           
         

}

function ali()
        { 
        //alert( document.getElementsByClassName("search-choice")[0].getElementsByTagName('span')[0].innerHTML);

         // alert(document.getElementsByClassName("search-choice").length)
          transformation=[]
          alert("aaaaaaaaaaaaaaa")

          for (let index = 0; index < document.getElementsByClassName("search-choice").length; index++) {
         
          //  alert(document.getElementsByClassName("search-choice")[index].getElementsByTagName('span')[0].innerHTML)
            transformation.push(document.getElementsByClassName("search-choice")[index].getElementsByTagName('span')[0] .innerHTML)
         
            
          }
          //Do transformations and download file of data //send request
          alert("aaaaaaaaaaaaaaa")
          alert(transformation)

          


        }


function create_marker(id)
{
    console.log(id)

     

    d3.json("dzMap.json", function(data1) {

        
        d=data1
 
    });
       
        for (let k = 0; k < d["features"].length; k++) {
            if (data1["features"][k]["properties"]["ID_1"]==id) {

                var markers = [{long: data1["features"]["geometry"]["coordinates"][0][0][0], lat:data1["features"]["geometry"]["coordinates"][0][0][0], text: data[i]["text"], api: data[i]["Api_type"],id:data[i]["Position"]}]
                const svg = d3.select(".map svg");
               // Add_marker(markers,svg )
               console.log(markers)
               return markers
                
                
            }
            
        }


}




function get_transformation()
{
    preprocess=d=document.getElementById("choices-multiple-remove-buttonpretraitement").textContent
    process=d=document.getElementById("choices-multiple-remove-buttontraitement").textContent
    enraich=d=document.getElementById("choices-multiple-remove-buttonenraich").textContent
   // alert(enraich+process)

    
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
////////////////////////////////////////////////
mapper1()

