var gblvar = '1990';        //Declaring global variables and setting default value. These variable are used for refreshing thr bar colour
var gblvar2 = '1990';       //Declaring global variables and setting default value. These variable are used for refreshing thr bar colour
$(document).ready(function () {

    var myJSON = JSON.stringify(refugees);
    var refs = refugees;        // Storing all the refugees in variabe refs
    var total = [];
    console.log("Values of refs are");
    console.log(refs);
    var frefs = refs.filter(function (ref) {        // Filtering values from 1990 to 2017 inclusive
        debugger;
        console.log("Value of ref is");
        console.log(ref);
        return ref.Year >= 1989;
    });

    console.log("The collected value is");
    console.log(frefs);
    getTotals(refs);                //call the function getTotals by passing refugees to it.

    barChart(total);                // call for creating a barchart dynamically

    function getTotals(refs) {
        frefs.reduce(getSum);       //Getting the sum of refugees year wise
        console.log(total);

    }

    function getSum(t1, fref) {             // t1 is the accumulator and fref is the filtered variable
        t1 = fref.Africa + fref.Asia + fref.Europe + fref["Former Soviet Union"] + fref.Kosovo + fref["Latin America/Caribbean"] + fref["Near East/South Asia"];
        total.push(t1);             // Pushing all the values after summing into total array
    }



    function makeElt(name, attrs, appendTo) {           //function for creating an element dynamically through js
        var element = document.createElementNS("http://www.w3.org/2000/svg", name);
        if (attrs === undefined) attrs = {};
        for (var key in attrs) {
            element.setAttributeNS(null, key, attrs[key]);
        }
        if (appendTo) {
            appendTo.appendChild(element);
        }


        return element;
    }


    function barChart(totalValue) {         //Function for creating a bar chart dynamically in js


        var div = document.getElementById("barchart");        // Getting the Element div by its id: barchart
        var svg = makeElt("svg", { x: '100', y: '500', width: '600', height: '400' }, div); // Making an SVG element and appending it to the div tag
        var g = makeElt("g", { height: '100%', width: '100%', transform: '  rotate(-180) scale(-1,1) translate(50 -318)' }, svg); // making a g element and appending it to SVG



        var xaxis = makeElt("line", { x1: 60, x2: 1550, y1: 300, y2: 300, stroke: "black", strokewidth: 5 }, svg);  // Creating x and y axis
        var yaxis = makeElt("line", { x1: 10, x2: 10, y1: 20, y2: 300, stroke: "black", strokewidth: 5 }, g);

        var yrtoadd = 1990;
        var yr = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]

        var yarray = ["137500", "110000", "82500", "55000", "27500"];

        var yaxisvar = 290;
        var xaxisvar = 26;
        for (var j = 1; j <= 5; j++) {          //Creating Horizontal lines 
            makeElt("line", { x1: 10, x2: 1550, y1: yaxisvar, y2: yaxisvar, strokewidth: 2, stroke: "black" }, g);
            yaxisvar -= 53.7;

        }

        for (var k = 1; j <= 33; j++) {          //Creating Vertical lines 
            makeElt("line", { x1: xaxisvar, x2: xaxisvar, y1: 8, y2: 20, strokewidth: 2, stroke: "black", 'font-weight': 20 }, g);
            xaxisvar += 19;

        }


        total.forEach(function (d, i) {     //Loop for creating bars using rectangles


            makeElt("rect", { x: (19 * (i + 1)), y: 20, width: 14, height: (d / 500), id: (yrtoadd + i) }, g); //Creating rectangles as bars and appending it to g 

            var labels = makeElt("text", { x: (19 * (i + 1)), y: 7, transform: '  rotate(-180) scale(-1,1) ', 'font-size': 8 }, g);      //Creating labels for X-axis
            labels.appendChild(document.createTextNode(yr[i]));

            if (i < 5)      //Creating labels for Y-axis
            {
                var ylabel = makeElt("text", { x: -40, y: 53 * i, transform: 'scale(1,-1) translate(13 -280)', 'font-size': 12 }, g);
                ylabel.appendChild(document.createTextNode(yarray[i]));
            }
        })

        var XAxisname = makeElt("text", { x: 250, y: 320, transform: 'scale(1,-1) translate(-10 -280)' }, g);  // X axis name 
        XAxisname.appendChild(document.createTextNode("Years"));

        var YAxisname = makeElt("text", { x: -120, y: 320, transform: 'scale(1,-1) translate(-355 -270) rotate(-90)' }, g);// Y axis name
        YAxisname.appendChild(document.createTextNode("Refugees"));
    }
});


function highlightYear(val) {           //Function for highlighting a year based on sliding the slider


    othercolor(gblvar2);        //Function for clearing the value of previous highligted bar by entering values in textbox
    othercolor(gblvar);         //Function for clearing the value of previous highligted bar by slider
    gblvar = val;
    var len = document.getElementsByTagName("rect");

    var element = document.getElementById(val);
    element.setAttributeNS(null, "fill", "blue");       //Setting the bar corresponding to selected year to blue
    document.getElementsByTagName("rect").style.color = "black";
}

function othercolor(clr) {              //Function for clearing previous selection of bar
    var element = document.getElementById(clr);
    element.setAttributeNS(null, "fill", "black");
}


$('#Submit').click(function () {                // Function for highlighting the bar based on value entered in the text box.

    var yearValue = $("#textYear").val();

    if (yearValue >= 1990 && yearValue <= 2017) {       //Checking the condition if the value entered in the textbox is withinn valid range
        othercolor(gblvar);
        othercolor(gblvar2);
        gblvar2 = yearValue;
        var len = document.getElementsByTagName("rect");
        var element = document.getElementById(yearValue);
        element.setAttributeNS(null, "fill", "red");
    }

    else {                  // If the value entered in the textbox is Invalid display invalid selection
        alert("Invalid selection [Selection range 1990-2017]");
        debugger;
        othercolor(gblvar);     // Clearing the previous selection
        othercolor(gblvar2);
    }

});