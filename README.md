# Perlin Noise Mouse Movements
Adapting p5.js's Perlin noise algorithm to generate random mouse movement patterns. Run [render.js](src/render.js) to start the website, which can be accessed at http://localhost:80. 3 new movement patterns will be generated upon each refresh of the website. 

If you would like to change the amount of movement patterns generated each time, you can add another trace object to the end of the script tag before the plot function in [site.html](src/site.html) and add the name of the new object to the array passed into Plotly.newPlot(). 
Trace objects should be formatted like this:
```js
const trace3 = {
            x: genMovement().x,
            y: genMovement().y,
            mode: 'markers',
            type: 'scatter',
        };
```