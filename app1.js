var metadata;
var names;
var samples;
var newarr = 0;

console.log("test1");

//load the data from local json file 
d3.json("data.json").then(function(data){
    console.log(data);
metadata = data.metadata;
names = data.names;
samples = data.samples;


// initilize the dropdown with "names" data - somehow because of the js asymetry i have to run this before the function 
//   in order for it to work 
init();

});

function init() {
    console.log('hello');
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    selector.html("");
        names.forEach(element => {
            selector.append("option").text(element)
        })
        renderInformation();

        
      
    };

// Initialize the dashboard
function populateBubbleChart(){
    // https://plot.ly/javascript/bubble-charts/
    // let samples = data.samples.filter(function(d){
    //     return d.id == name;
    // })

    let trace1 = {
        x: samples[newarr].otu_ids,
        y: samples[newarr].sample_values,
        text: samples[newarr].otu_labels,
        mode: 'markers',
        marker: {
          color: samples[newarr].otu_ids,
          size: samples[newarr].sample_values
        }
      };
    
    var data = [trace1];

    var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot('bubble', data, layout);
}

function populatePieChart(){
    // let samples = myJsonObj.samples.filter(function(d){
    //     return d.id == name;
    // })
    
    // let count=0;
    // https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array
    let values = samples[newarr].sample_values.slice(0, 9);
    let labels = samples[newarr].otu_ids.slice(0, 9);
    console.log(labels)

    var data = [{
        values: values,
        labels: labels,
        hole: .4,
        type: 'pie'
      }];

    var layout = {
        height: 400,
        width: 500
      };

    Plotly.newPlot('bar', data, layout);
}//populatePieChart

function populateDemographicInfo(){
    
    let myPanel = d3.select("#sample-metadata");
    myPanel.selectAll("table").remove("table");
    //add table data
    // https://stackoverflow.com/questions/46782827/d3-adding-style-and-class-to-div-results-in-styles-discarded
    let myTbl = myPanel.append("table").style("font-weight","bold");
    
    // let demographInfo = myJsonObj.metadata.filter(function(d){
    //     return d.id == name;
    // })
    
    let Tage = myTbl.append("tr");
        Tage.append("td").text("Age: ")
        Tage.append("td").text(metadata[newarr].age);
    let Tbbtype = myTbl.append("tr");
        Tbbtype.append("td").text("Bbtype: ")
        Tbbtype.append("td").text(metadata[newarr].bbtype);
    let Tethi = myTbl.append("tr");
        Tethi.append("td").text("Ethnicity: ")
        Tethi.append("td").text(metadata[newarr].ethnicity);
    let TGender = myTbl.append("tr");
        TGender.append("td").text("Gender: ")
        TGender.append("td").text(metadata[newarr].gender);
    let Tloc = myTbl.append("tr");
        Tloc.append("td").text("Location: ")
        Tloc.append("td").text(metadata[newarr].location);
    let Twfreq = myTbl.append("tr");
        Twfreq.append("td").text("Wfreq: ")
        Twfreq.append("td").text(metadata[newarr].wfreq);
    let Tsample = myTbl.append("tr");
        Tsample.append("td").text("Sample: ")
        Tsample.append("td").text(metadata[newarr].id);
}//populateDemographicInfo

function renderInformation(){
    // let selectedName = d3.select("#selDataset").property("value")
    populateDemographicInfo();
    populatePieChart();
    populateBubbleChart();
    populateGaugeChart();
}

function populateGaugeChart(){
    // let metadataInfo = myJsonObj.metadata.filter(function(d){
    //     return d.id == name;
    // })

            //Enter a level between 1 and 5
        var level = metadata[newarr].wfreq;

        // Trig to calc meter point
        // var degrees = 180-(level-1)*45;
        // 165 - 1 !! 142 -2 !! 120-3 !! 105 - 4 !! 90 - 5 !! 75 - 6 !! 57 - 7 !! 40 - 8
        var degrees;

        switch(level){
            case 1:
                degrees = 165;
                break;
            case 2:
                degrees = 142;
                break;
            case 3:
                degrees = 120;
                break;
            case 4:
                degrees = 105;
                break;
            case 5:
                degrees = 90;
                break;
            case 6:
                degrees = 75;
                break;
            case 7:
                degrees = 57;
                break;
            case 7:
                degrees = 40;
                break;
            default:
                degrees = 360;
        }
        
        var radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
        console.log("Degree is -->" + degrees);
        console.log("X val is  -->" + x);
        console.log("Y val is  -->" + y);
        console.log("Path val is -->" + path)

        var data = [{ type: 'category',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'},
        { values: [1,1,1,1,1,1,1,1,1,9],
        rotation: 90,
        
        text: ['9','8','7','6','5','4','3','2','1'],
        textinfo: 'text',
        textposition:'inside',      
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                'rgba(210, 206, 145, .5)', 'rgba(210, 106, 245, .5)', 
                                'rgba(210, 106, 105, .5)', 'rgba(110, 206, 245, .5)', 
                                'rgba(225, 225, 155, 10)', 'rgba(205, 155, 155, 0)'
                            ]},
        // labels: ['4.5-5', '3.5-4.49', '2.5-3.49', '1.5-2.49', '1-1.49'],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: 'Belly Button Washing Frequency 1-9 Scrubs per Week',
        height: 500,
        width: 600,
        xaxis: {type:'category',zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {type:'category',zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);
}

// on change of selection - populate new data based on names id 

function optionChanged() {
    let newName = d3.select("#selDataset").property("value");
    console.log(newName);

    console.log(names.findIndex(input => (newName == input) ))
    newarr = names.findIndex(input =>(newName == input) )
        
    renderInformation();
    

};






