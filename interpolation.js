/*
--------------------------------------------------------

Weight interpolation / extrapolation

--------------------------------------------------------
*/

static interpolateWeight(

    weight,

    lowerWeight,

    upperWeight,

    lowerValue,

    upperValue

) {

    /*
    Linear interpolation

    Works also for

    weight < lowerWeight

    */

    const factor =

        (

            weight -

            lowerWeight

        ) /

        (

            upperWeight -

            lowerWeight

        );

    return (

        lowerValue +

        factor *

        (

            upperValue -

            lowerValue

        )

    );

}
