import {IParabola, IPolyline, IPoint, IModel, IGeom} from "../ifaces_gs";
import * as three from "three";

/*
*
* Function which creates a set of 50 points and polyline to the geometry from a 3D Parabola
*
*/
export function parabola_polyline(parabola: IParabola): IPolyline {
 	// To test
    const points: IPoint[] = [];
    const polyline: IPolyline[] =[];
    const model: IModel = parabola.getModel();
    const geometry: IGeom = model.getGeom();
    const p: number = new three.Vector3(parabola.getAxes()[0][0],
                                        parabola.getAxes()[0][1],
                                        parabola.getAxes()[0][2]).length();
    const param: number = p;
    const angle0: number = ((parabola.getAngles()[0] %360) + 360) %360;
    const angle1: number = ((parabola.getAngles()[1] %360) + 360) %360;
    if(angle0 > angle1) { throw new Error("Swap angles");}
    const U1: three.Vector3 = new three.Vector3(parabola.getAxes()[0][0],
                                                parabola.getAxes()[0][1],
                                                parabola.getAxes()[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(parabola.getAxes()[1][0],
                                                parabola.getAxes()[1][1],
                                                parabola.getAxes()[1][2]).normalize();
    const focal: three.Vector3 = new three.Vector3(parabola.getOrigin().getPosition()[0],
                                                   parabola.getOrigin().getPosition()[1],
                                                   parabola.getOrigin().getPosition()[2]);
    let theta: number = angle0 * (2*Math.PI)/360;
    let r: number;
    const N: number = 50;
    const d_theta: number = (((((angle1 - angle0) %360) + 360) %360) / (N-1)) * (2*Math.PI)/360;
    for(let k: number = 0;k<N;k++) {
        r = param / (1 + Math.cos(theta - (Math.PI/2)));
        const point: three.Vector3 = new three.Vector3(
            focal.x + r*Math.cos(theta)*U1.x + r*Math.sin(theta)*V1.x,
            focal.y + r*Math.cos(theta)*U1.y + r*Math.sin(theta)*V1.y,
            focal.z + r*Math.cos(theta)*U1.z + r*Math.sin(theta)*V1.z,
            );
        points.push(geometry.addPoint([point.x,point.y,point.z]));
        theta = theta + d_theta;
    }
    return geometry.addPolyline(points,false);
}