/*
========================================================

TakeoffPro V2.2 Stable

interpolation.js

Universal AFM Interpolation

Weight
Density Altitude
Temperature

========================================================
*/

"use strict";

/*
========================================================
Linear interpolation

Works for interpolation and extrapolation

========================================================
*/

function linearInterpolation(

    x,
    x1,
    y1,
    x2,
    y2

){

    if(x1===x2){

        return y1;

    }

    return y1+

        (

            (x-x1)/(x2-x1)

        )*

        (

            y2-y1

        );

}

/*
========================================================
Density Altitude

Negative values are not allowed

========================================================
*/

function normalizeDensityAltitude(

    densityAltitude

){

    return Math.max(

        0,

        Number(densityAltitude)

    );

}

/*
========================================================
Weight interpolation

1111
1134
1157

========================================================
*/

function interpolateWeight(

    table,

    weight,

    densityAltitude,

    temperature

){

    densityAltitude=

        normalizeDensityAltitude(

            densityAltitude

        );

    /*
    ----------------------------------------------------
    Below 1111 kg

    Linear extrapolation

    ----------------------------------------------------
    */

    if(weight<1111){

        const value1111=

            interpolateAltitudeTemperature(

                table[1111],

                densityAltitude,

                temperature

            );

        const value1134=

            interpolateAltitudeTemperature(

                table[1134],

                densityAltitude,

                temperature

            );

        return linearInterpolation(

            weight,

            1111,

            value1111,

            1134,

            value1134

        );

    }
        /*
    ----------------------------------------------------
    AFM 1111 kg

    ----------------------------------------------------
    */

    if(weight===1111){

        return interpolateAltitudeTemperature(

            table[1111],

            densityAltitude,

            temperature

        );

    }

    /*
    ----------------------------------------------------
    Between 1111 and 1134 kg

    ----------------------------------------------------
    */

    if(

        weight>1111 &&

        weight<1134

    ){

        const value1111=

            interpolateAltitudeTemperature(

                table[1111],

                densityAltitude,

                temperature

            );

        const value1134=

            interpolateAltitudeTemperature(

                table[1134],

                densityAltitude,

                temperature

            );

        return linearInterpolation(

            weight,

            1111,

            value1111,

            1134,

            value1134

        );

    }

    /*
    ----------------------------------------------------
    AFM 1134 kg

    ----------------------------------------------------
    */

    if(weight===1134){

        return interpolateAltitudeTemperature(

            table[1134],

            densityAltitude,

            temperature

        );

    }

    /*
    ----------------------------------------------------
    Between 1134 and 1157 kg

    ----------------------------------------------------
    */

    if(

        weight>1134 &&

        weight<1157

    ){

        const value1134=

            interpolateAltitudeTemperature(

                table[1134],

                densityAltitude,

                temperature

            );

        const value1157=

            interpolateAltitudeTemperature(

                table[1157],

                densityAltitude,

                temperature

            );

        return linearInterpolation(

            weight,

            1134,

            value1134,

            1157,

            value1157

        );

    }

    /*
    ----------------------------------------------------
    AFM 1157 kg

    ----------------------------------------------------
    */

    return interpolateAltitudeTemperature(

        table[1157],

        densityAltitude,

        temperature

    );

}



/*
========================================================
Altitude / Temperature interpolation

========================================================
*/

function interpolateAltitudeTemperature(

    table,

    densityAltitude,

    temperature

){

    densityAltitude=Math.max(

        0,

        densityAltitude

    );

    const altitudes=

        Object.keys(table)

        .map(Number)

        .sort(

            function(a,b){

                return a-b;

            }

        );

    /*
    unter Minimum

    */

    if(

        densityAltitude<=altitudes[0]

    ){

        return interpolateTemperature(

            table[altitudes[0]],

            temperature

        );

    }
        /*
    ----------------------------------------------------
    Between altitude levels

    ----------------------------------------------------
    */

    for(

        let i=0;

        i<altitudes.length-1;

        i++

    ){

        const lower=altitudes[i];

        const upper=altitudes[i+1];

        if(

            densityAltitude>=lower &&

            densityAltitude<=upper

        ){

            const lowerValue=

                interpolateTemperature(

                    table[lower],

                    temperature

                );

            const upperValue=

                interpolateTemperature(

                    table[upper],

                    temperature

                );

            return linearInterpolation(

                densityAltitude,

                lower,

                lowerValue,

                upper,

                upperValue

            );

        }

    }

    /*
    ----------------------------------------------------
    Above highest altitude

    ----------------------------------------------------
    */

    return interpolateTemperature(

        table[

            altitudes[

                altitudes.length-1

            ]

        ],

        temperature

    );

}



/*
========================================================
Temperature interpolation

========================================================
*/

function interpolateTemperature(

    table,

    temperature

){

    const temperatures=

        Object.keys(table)

        .map(Number)

        .sort(function(a,b){

            return a-b;

        });

    /*
    below minimum

    */

    if(

        temperature<=temperatures[0]

    ){

        return table[

            temperatures[0]

        ];

    }

    /*
    above maximum

    */

    if(

        temperature>=

        temperatures[

            temperatures.length-1

        ]

    ){

        return table[

            temperatures[

                temperatures.length-1

            ]

        ];

    }

    /*
    interpolation

    */

    for(

        let i=0;

        i<temperatures.length-1;

        i++

    ){

        const lower=

            temperatures[i];

        const upper=

            temperatures[i+1];

        if(

            temperature>=lower &&

            temperature<=upper

        ){

            return linearInterpolation(

                temperature,

                lower,

                table[lower],

                upper,

                table[upper]

            );

        }

    }

    return table[

        temperatures[0]

    ];

}



/*
========================================================
Exports

========================================================
*/

window.linearInterpolation=

    linearInterpolation;

window.normalizeDensityAltitude=

    normalizeDensityAltitude;

window.interpolateWeight=

    interpolateWeight;

window.interpolateAltitudeTemperature=

    interpolateAltitudeTemperature;

window.interpolateTemperature=

    interpolateTemperature;
