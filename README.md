# Perlin Noise Mouse Movements
### Adapting p5.js's Perlin noise algorithm to generate and plot random mouse movement patterns ###
Run [render.js](src/render.js) to start the website, which can be accessed at http://localhost:80. 3 new movement patterns will be generated upon each refresh of the website. 

An object called 'use' is created at the end of the script tag in [site.html](src/site.html). This object contains a property 'str' for each trace, and the value of the 'str' property is formatted in the Akamai mouse action string format. If you would like to use this string without rendering the movement patterns, [movement.js](src/movement.js) will export a function to create a formatted mouse action string.

If you would like to change the amount of movement patterns generated each time, you can add another trace object to the traces object before the plot function in [site.html](src/site.html) and add the name of the new object to the array passed into Plotly.newPlot(). 
Trace objects should be formatted like this:
```js
trace3: {
    x: genMovement().x,
    y: genMovement().y,
    mode: 'markers',
    type: 'scatter',
}
```

Trace objects should be passed into Plotly.newPlot like this:
```js
Plotly.newPlot('myDiv', [traces.trace0, traces.trace1, traces.trace2, traces.trace3]);
```