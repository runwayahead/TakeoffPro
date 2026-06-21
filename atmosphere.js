/*
========================================================

TakeoffPro V2.1 Stable

atmosphere.js

========================================================
*/

class Atmosphere {

    /*
    ----------------------------------------------------
    Pressure Altitude
    ----------------------------------------------------
    */

    static pressureAltitude(elevation, qnh) {

        return Math.round(

            elevation +

            (1013 - qnh) * 30

        );

    }

    /*
    ----------------------------------------------------
    ISA Temperature
    ----------------------------------------------------
    */

    static isaTemperature(pressureAltitude) {

        return Number(

            (

                15 -

                pressureAltitude / 500

            ).toFixed(1)

        );

    }

    /*
    ----------------------------------------------------
    Density Altitude
    ----------------------------------------------------
    */

    static densityAltitude(

        pressureAltitude,

        temperature

    ) {

        const isa =

            this.isaTemperature(

                pressureAltitude

            );

        let densityAltitude =

            pressureAltitude +

            120 *

            (

                temperature -

                isa

            );

        /*
        ----------------------------------------------

        AFM limitation

        Negative Density Altitude
        is always calculated as 0 ft.

        ----------------------------------------------
        */

        if (

            densityAltitude < 0

        ) {

            densityAltitude = 0;

        }

        return Math.round(

            densityAltitude

        );

    }

    /*
    ----------------------------------------------------
    Complete Calculation
    ----------------------------------------------------
    */

    static calculate(

        elevation,

        qnh,

        temperature

    ) {

        const pressureAltitude =

            this.pressureAltitude(

                elevation,

                qnh

            );

        const isaTemperature =

            this.isaTemperature(

                pressureAltitude

            );

        const densityAltitude =

            this.densityAltitude(

                pressureAltitude,

                temperature

            );

        return {

            pressureAltitude,

            densityAltitude,

            isaTemperature

        };

    }

}
