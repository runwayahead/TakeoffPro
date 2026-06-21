/*
========================================================

TakeoffPro V2.2 Stable

Application Controller

========================================================
*/

"use strict";

/*
========================================================
Version
========================================================
*/

const APP={

    version:"2.2 Stable",

    aircraft:"C172 TAE125-02-114"

};

/*
========================================================
DOM Cache
========================================================
*/

const DOM={};

function cacheDOM(){

    DOM.weight=document.getElementById("weight");

    DOM.temperature=document.getElementById("temperature");

    DOM.qnh=document.getElementById("qnh");

    DOM.elevation=document.getElementById("elevation");

    DOM.runwayHeading=document.getElementById("runwayHeading");

    DOM.runwayLength=document.getElementById("runwayLength");

    DOM.windDirection=document.getElementById("windDirection");

    DOM.windSpeed=document.getElementById("windSpeed");

    DOM.slope=document.getElementById("slope");

    DOM.surface=document.getElementById("surface");

    DOM.procedure=document.getElementById("procedure");

}

/*
========================================================
Input
========================================================
*/

function getInput(){

    return{

        weight:Number(DOM.weight.value),

        temperature:Number(DOM.temperature.value),

        qnh:Number(DOM.qnh.value),

        elevation:Number(DOM.elevation.value),

        runwayHeading:Number(DOM.runwayHeading.value),

        runwayLength:Number(DOM.runwayLength.value),

        windDirection:Number(DOM.windDirection.value),

        windSpeed:Number(DOM.windSpeed.value),

        slope:Number(DOM.slope.value),

        surface:DOM.surface.value,

        procedure:DOM.procedure.value

    };

}

/*
========================================================
Weight Validation

Pilot MTOW

========================================================
*/

function validateWeight(){

    const weight=Number(

        DOM.weight.value

    );

    DOM.weight.classList.remove(

        "error"

    );

    if(weight>1111){

        DOM.weight.classList.add(

            "error"

        );

        return false;

    }

    return true;

}
/*
========================================================

Refresh

========================================================
*/

function refreshApplication(){

    if(!validateWeight()){

        const groundRoll=document.getElementById("groundRoll");

        const takeoffDistance=document.getElementById("takeoffDistance");

        const finalDistance=document.getElementById("finalDistance");

        if(groundRoll){

            groundRoll.innerHTML="---";

        }

        if(takeoffDistance){

            takeoffDistance.innerHTML="---";

        }

        if(finalDistance){

            finalDistance.innerHTML="AFM LIMIT";

        }

        return;

    }

    /*
    ================================================
    Atmosphere
    ================================================
    */

    if(typeof updateAtmosphere==="function"){

        updateAtmosphere();

    }

    /*
    ================================================
    Wind
    ================================================
    */

    if(typeof updateWind==="function"){

        updateWind();

    }

    /*
    ================================================
    Performance
    ================================================
    */

    if(typeof updatePerformance==="function"){

        updatePerformance();

    }

    /*
    ================================================
    Mirror Safety Values
    ================================================
    */

    updateDisplayValues();

}

/*
========================================================

Display Values

========================================================
*/

function updateDisplayValues(){

    const finalValue=document.getElementById(

        "finalDistance"

    );

    const runwayLength=document.getElementById(

        "runwayLength"

    );

    const finalDisplay=document.getElementById(

        "finalRequiredDisplay"

    );

    const runwayDisplay=document.getElementById(

        "runwayAvailableDisplay"

    );

    if(

        finalValue&&

        finalDisplay

    ){

        finalDisplay.innerHTML=

            finalValue.innerHTML.replace(

                " m",

                ""

            );

    }

    if(

        runwayLength&&

        runwayDisplay

    ){

        runwayDisplay.innerHTML=

            runwayLength.value;

    }

}

/*
========================================================

Status

========================================================
*/

function updateStatus(){

    const remaining=document.getElementById(

        "remainingDistance"

    );

    const status=document.querySelector(

        ".statusBadge"

    );

    if(

        !remaining||

        !status

    ){

        return;

    }

    const value=parseFloat(

        remaining.innerText

    );

    status.classList.remove(

        "safe",

        "caution",

        "danger"

    );

    if(value>=300){

        status.classList.add("safe");

        status.innerHTML="SAFE";

        return;

    }

    if(value>=150){

        status.classList.add("caution");

        status.innerHTML="CAUTION";

        return;

    }

    status.classList.add("danger");

    status.innerHTML="NOT<br>RECOMMENDED";

}
/*
========================================================

Event Registration

========================================================
*/

function registerEvents(){

    const controls=[

        DOM.weight,
        DOM.temperature,
        DOM.qnh,
        DOM.elevation,

        DOM.windDirection,
        DOM.windSpeed,

        DOM.runwayHeading,
        DOM.runwayLength,

        DOM.slope,

        DOM.surface,
        DOM.procedure

    ];

    controls.forEach(function(control){

        if(!control){

            return;

        }

        control.addEventListener(

            "input",

            function(){

                refreshApplication();

                updateStatus();

            }

        );

        control.addEventListener(

            "change",

            function(){

                refreshApplication();

                updateStatus();

            }

        );

    });

}



/*
========================================================

Reset

========================================================
*/

function resetApplication(){

    DOM.weight.value=1111;

    DOM.temperature.value=15;

    DOM.qnh.value=1013;

    DOM.elevation.value=0;

    DOM.windDirection.value=0;

    DOM.windSpeed.value=0;

    DOM.runwayHeading.value=0;

    DOM.runwayLength.value=800;

    DOM.slope.value=0;

    DOM.surface.value="asphalt";

    DOM.procedure.value="normal";

    refreshApplication();

    updateStatus();

}



/*
========================================================

Refresh Button

========================================================
*/

function forceRefresh(){

    refreshApplication();

    updateStatus();

}



/*
========================================================

Keyboard Support

========================================================
*/

document.addEventListener(

    "keydown",

    function(event){

        if(

            event.key==="Enter"

        ){

            forceRefresh();

        }

    }

);
/*
========================================================

Initialisation

========================================================
*/

function initialiseApplication(){

    /*
    ----------------------------------------------------
    Cache DOM
    ----------------------------------------------------
    */

    cacheDOM();

    /*
    ----------------------------------------------------
    Register Events
    ----------------------------------------------------
    */

    registerEvents();

    /*
    ----------------------------------------------------
    Initial Calculation
    ----------------------------------------------------
    */

    refreshApplication();

    updateStatus();

    console.log(

        "TakeoffPro",

        APP.version,

        APP.aircraft,

        "ready"

    );

}



/*
========================================================

Service Worker

========================================================
*/

function registerServiceWorker(){

    if(

        !("serviceWorker" in navigator)

    ){

        return;

    }

    navigator.serviceWorker

        .register(

            "service-worker.js"

        )

        .then(function(){

            console.log(

                "Service Worker registered"

            );

        })

        .catch(function(error){

            console.log(

                error

            );

        });

}



/*
========================================================

Error Handler

========================================================
*/

window.addEventListener(

    "error",

    function(event){

        console.log(

            "TakeoffPro Error:",

            event.message

        );

    }

);



/*
========================================================

Startup

========================================================
*/

window.addEventListener(

    "DOMContentLoaded",

    function(){

        initialiseApplication();

        registerServiceWorker();

    }

);



/*
========================================================

Public API

========================================================
*/

window.TakeoffPro={

    refresh:function(){

        refreshApplication();

        updateStatus();

    },

    reset:function(){

        resetApplication();

    },

    getVersion:function(){

        return APP.version;

    },

    getAircraft:function(){

        return APP.aircraft;

    }

};
/*
========================================================

Final Startup

TakeoffPro V2.2 Stable

========================================================
*/

function startApplication(){

    /*
    Cache DOM
    */

    cacheDOM();

    /*
    Register Events
    */

    registerEvents();

    /*
    Initial validation
    */

    validateWeight();

    /*
    First calculation
    */

    refreshApplication();

    updateStatus();

    /*
    Version

    */

    console.log(

        "TakeoffPro",

        APP.version,

        APP.aircraft

    );

}



/*
========================================================

Service Worker

========================================================
*/

if(

    "serviceWorker"

    in

    navigator

){

    navigator.serviceWorker.register(

        "service-worker.js"

    );

}



/*
========================================================

DOM Ready

========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        startApplication();

    }

);



/*
========================================================

Public API

========================================================
*/

window.TakeoffPro={

    refresh(){

        refreshApplication();

        updateStatus();

    },

    reset(){

        resetApplication();

    },

    input(){

        return getInput();

    },

    version(){

        return APP.version;

    }

};
