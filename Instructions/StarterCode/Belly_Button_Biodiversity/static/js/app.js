function buildMetadata(sample){
    console.log(sample);
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(data){
      console.log("newdata", data);

    // Use `.html("") to clear any existing metadata
    var empty = d3.select('.panel-body');
    empty.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel 
    var metaData = d3.select('.panel-body');


       Object.entries(data).forEach(function([key, value]){
         console.log(key,value);
        console.log(data);
      
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
     //append on tablerow (tr) for each object

     
    var row = metaData.append('tr');
  
    var cell = metaData.append('td');

        cell.text(key);

        var cell2 = metaData.append('td');

        cell2.text(value);
        

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
       });

  });
} 

function buildCharts(sample) {
  var url = `/samples/${sample}`;
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(function(data){
    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var markerSize = data.sample_values;
    var markerColor = data.otu_ids;
    var textValues = data.otu_labels;

  var trace1 = {
    x: xValues,
    y: yValues,
    text: textValues.map(String),
    mode: 'markers',
    marker: {
      size: markerSize,
      color: markerColor,
      opacity: markerColor,
      colorscale: "Earth"
    }
  };
  
  var data = [trace1];
  
  var layout = {
   x_axis: 'OTU ID'
    
  };
  
  Plotly.newPlot('bubble', data, layout);

});

  
  d3.json(url).then(function(data){
    console.log(data);

      // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    //otu_ids`, `otu_labels`,and `sample_values
    var pieValues = data.sample_values.slice(0,10);
    var pieIds = data.otu_ids.slice(0,10);
    var pieLables = data.otu_labels.slice(0,10);

    var data = [{
      values: pieValues,
      labels: pieIds,
      text: pieLables,
      type: 'pie'
    }];
    
    
    Plotly.newPlot('pie', data);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each). */
  });
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
