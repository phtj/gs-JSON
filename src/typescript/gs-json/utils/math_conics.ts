import * as gs from "./gs-json";
import * as threeu from "./three_utils";
import * as three from "three";

/**
 * Calculate the length of the conic curve.
 */
export function length(curve: gs.IConicCurve): number {
    // ypu need to get the a, b, p etc from the curve object.
    // return _length()
    throw new Error("Method not implemented.");
}
// this should not be exported, but I add it so that test can work
export function _length(curve: gs.IConicCurve): number {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2])
        >= threshold) { throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");}
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    // Radians, although input angles are expected in Degrees
    if( Math.abs(a-b) < threshold) { return a*Math.abs(angle_2 - angle_1);}
    // Range [x1,x2] for length calculation would provide 2 circle arcs,
    // Whereas Angle_1 / Angle_2 provide a unique circle arc.
    let eccentricity: number = null ;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    const K: number = 1000;
    let theta: number = null;
    const d_th: number  = (angle_2 - angle_1)/K ;
    let distance: number = 0;
    for(let k = 0; k < K ; k++ ) {
        theta = angle_1 + k*(angle_2 - angle_1)/K ;
        distance = distance + d_th * Math.sqrt(1 - eccentricity*Math.sin(theta)*eccentricity*Math.sin(theta));
        // distance along the curve assessed and updated at each timestep;
    }
    distance = Math.max(a,b) * distance ;
    return distance;
}
/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export function evaluate(curve: gs.IConicCurve, t: number): number[] {
   // return _evaluate()
   throw new Error("Method not implemented.");
}
export function _evaluate(curve: gs.IConicCurve, t: number): number[] {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: number[] = curve.getVectors()[0];
    const vector_y: number[] = curve.getVectors()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2])
        >= threshold) { throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");}
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const z_uv: number[] = [0,0,u[0]*v[1] - u[1]*v[0]]; // cross product
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    const l: number = _length(curve);
    let epsilon: number = 1 ;
    let theta: number = null ;
    const K: number = 1000 ;
    let x: number = null;
    let y: number = null;
    let r: number = null;
    let theta_t: number = null;
    const param: number = b*b/a;
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    let curve_theta: gs.IConicCurve = null ;
    for(let k = 0; k < K; k++) {
    while( epsilon >= 0) {
    theta = (angle_1 + k * (angle_2 - angle_1)/K);
    curve_theta = g.addConicCurve(curve.getOrigin(),curve.getVectors()[0],
    curve.getVectors()[1],[curve.getAngles()[0],theta]);
    epsilon = t*l - _length(curve_theta);
    if(epsilon < 0) {theta_t = theta;}
    }
    }
    let eccentricity: number = null;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    r = param / (1 + eccentricity*Math.cos(theta_t));
    x = r * Math.cos(theta_t); // expressed in the plan inferred by (u,v)
    y = r * Math.sin(theta_t); // expressed in the plan inferred by (u,v)
    const U1: three.Vector3 = new three.Vector3(curve.getVectors()[0][0],
    curve.getVectors()[0][1], curve.getVectors()[0][2]);
    const V1: three.Vector3 = new three.Vector3(curve.getVectors()[1][0],
    curve.getVectors()[1][1], curve.getVectors()[1][2]);
    U1.normalize();
    V1.normalize();
    const O1O2: three.Vector3 = new three.Vector3(curve.getOrigin()[0],curve.getOrigin()[1],curve.getOrigin()[2]);
    const O2P: three.Vector3 = threeu.addVectors(U1.multiplyScalar(x),V1.multiplyScalar(y));
    const O1P: three.Vector3 = threeu.addVectors(O1O2,O2P);
    return [O1P.x,O1P.y,O1P.z]; // Should work..
}
