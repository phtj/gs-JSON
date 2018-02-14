/**
 * Corrects the angles in a circle
 * @param
 * @return
 */
export function checkCircleAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360  + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360  + angles[1];
    }
    // return the fixed angles
    return angles;
}
/**
 * Corrects the angles in an ellipse
 * @param
 * @return
 */
export function checkEllipseAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    // fix angle 0
    if (Math.abs(angles[0]) > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[0] < 0) {
        angles[0] = 360  + angles[0];
    }
    // fix angle 1
    if (Math.abs(angles[1]) > 360) {
        angles[1] = angles[1] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = 360  + angles[1];
    }
    // return the fixed angles
    return angles;
}
/**
 * Corrects the angles in a parabola
 * @param
 * @return
 */
export function checkParabolaAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    let angle0: number = ((angles[0] %360) + 360) %360;
    const angle1: number = ((angles[1] %360) + 360) %360;
    if(angle0>angle1) {angle0 = angle0 - 360;}
    if(angle0 < -90) {throw new Error ("Revise first angle");}
    if(angle1 > 270) {throw new Error ("Revise second angle");}
    return [angle0,angle1];
}
/**
 * Corrects the angles in a hyperbola
 * @param
 * @return
 */
export function checkHyperbolaAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    const angle_0: number = ((angles[0] % 360) + 360) % 360;
    const angle_1: number = ((angles[1] % 360) + 360) % 360;
    if (angle_0 > angle_1) {throw new Error("Check Hyperbola angles, those should in increasing order");}
    return [angle_0,angle_1];
}
