/*
========================================================

TakeoffPro V2.3 Stable

wind.js

========================================================
*/

"use strict";

/*
========================================================
Helper
========================================================
*/

function normalizeAngle(angle){

    angle=Number(angle)||0;

    while(angle<0){

        angle+=360;

    }

    while(angle>=360){

        angle-=360;

    }

    return angle;

}

/*
========================================================
Wind Components
========================================================
*/

function calculateWindComponents(

    windDirection,

    runwayHeading,

    windSpeed

){

    windDirection=normalizeAngle(

        windDirection

    );

    runwayHeading=normalizeAngle(

        runwayHeading

    );

    windSpeed=Number(windSpeed)||0;

    let difference=

        windDirection-

        runwayHeading;

    if(difference>180){

        difference-=360;

    }

    if(difference<-180){

        difference+=360;

    }

    const radians=

        difference*

        Math.PI/

        180;

    const longitudinal=

        Math.cos(

            radians

        )*

        windSpeed;

    const lateral=

        Math.sin(

            radians

        )*

        windSpeed;

    return{

        headwind:

            longitudinal>0

            ?Math.round(longitudinal)

            :0,

        tailwind:

            longitudinal<0

            ?Math.round(

                Math.abs(

                    longitudinal

                )

            )

            :0,

        crosswind:

            Math.round(

                Math.abs(

                    lateral

                )

            )

    };

}
/*
========================================================

Update Wind

========================================================
*/

function updateWind(){

    const windDirection=Number(

        document.getElementById(

            "windDirection"

        ).value

    )||0;

    const windSpeed=Number(

        document.getElementById(

            "windSpeed"

        ).value

    )||0;

    const runwayHeading=Number(

        document.getElementById(

            "runwayHeading"

        ).value

    )||0;

    const wind=

        calculateWindComponents(

            windDirection,

            runwayHeading,

            windSpeed

        );

    const headwindField=document.getElementById(

        "headwind"

    );

    const tailwindField=document.getElementById(

        "tailwind"

    );

    const crosswindField=document.getElementById(

        "crosswind"

    );

    const warningField=document.getElementById(

        "windWarning"

    );

    if(headwindField){

        headwindField.innerHTML=

            wind.headwind+" kt";

    }

    if(tailwindField){

        tailwindField.innerHTML=

            wind.tailwind+" kt";

    }

    if(crosswindField){

        crosswindField.innerHTML=

            wind.crosswind+" kt";

    }

    if(warningField){

        warningField.innerHTML="";

    }

    /*
    ====================================================
    Tailwind Warning
    ====================================================
    */

    if(

        wind.tailwind>0 &&

        warningField

    ){

        warningField.innerHTML=

            "⚠ Tailwind "+

            wind.tailwind+

            " kt";

    }

    /*
    ====================================================
    Crosswind Warning
    ====================================================
    */

    if(

        wind.crosswind>15 &&

        warningField

    ){

        warningField.innerHTML=

            "⚠ Crosswind "+

            wind.crosswind+

            " kt";

    }

    return wind;

}
/*
========================================================

Wind Warning

========================================================
*/

function getWindStatus(wind){

    if(wind.tailwind>0){

        return{

            level:"warning",

            message:

                "Tailwind " +

                wind.tailwind +

                " kt"

        };

    }

    if(wind.crosswind>15){

        return{

            level:"warning",

            message:

                "Crosswind " +

                wind.crosswind +

                " kt"

        };

    }

    return{

        level:"safe",

        message:"Wind OK"

    };

}



/*
========================================================

Refresh Wind Display

========================================================
*/

function refreshWind(){

    const wind=

        updateWind();

    const status=

        getWindStatus(

            wind

        );

    const warningField=

        document.getElementById(

            "windWarning"

        );

    if(

        warningField

    ){

        warningField.innerHTML=

            status.message;

        warningField.className=

            status.level;

    }

    return wind;

}



/*
========================================================

Public API

========================================================
*/

window.calculateWindComponents=

    calculateWindComponents;

window.updateWind=

    updateWind;

window.refreshWind=

    refreshWind;

window.getWindStatus=

    getWindStatus;
