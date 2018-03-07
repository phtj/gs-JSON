"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr = require("../libs/arr/arr");
const three = require("three");
function plane3D_parabola(parabola, plane) {
    const m = parabola.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the parabola and the plane");
    }
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    const C0 = parabola.getOrigin().getPosition();
    const CA = parabola.getAxes();
    const p = parabola.getRadii()[0];
    const U1 = new three.Vector3(...CA[0]).setLength(p);
    const V1 = new three.Vector3(...CA[1]).setLength(p / 2);
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * p * U1.normalize().x
        + n1[1] * p * U1.normalize().y
        + n1[2] * p * U1.normalize().z;
    const C = n1[0] * (C0[0] + p * V1.normalize().x - PO[0])
        + n1[1] * (C0[1] + p * V1.normalize().y - PO[1])
        + n1[2] * (C0[2] + p * V1.normalize().z - PO[2]);
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    for (const t of _t) {
        let r = p / (1 + Math.cos(t - (Math.PI / 2)));
        const point1 = new three.Vector3(C0[0] + r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x - PO[0], C0[1] + r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y - PO[1], C0[2] + r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x, r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y, r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            let ok_angle_point1 = false;
            angle_point1 = ((angle_point1 % 360) + 360) % 360;
            const angle_0 = ((parabola.getAngles()[0] % 360) + 360) % 360;
            const angle_1 = ((parabola.getAngles()[1] % 360) + 360) % 360;
            const cond1 = (angle_0 <= 360) &&
                (angle_0 > 270) &&
                (angle_1 < 270) &&
                ((angle_point1 <= angle_1)
                    ||
                        ((angle_point1 >= angle_0) &&
                            (angle_point1 <= 360)));
            const cond2 = (angle_0 <= angle_1) &&
                (angle_1 < 270) &&
                (angle_point1 <= angle_1) &&
                (angle_point1 >= angle_0);
            const cond3 = (angle_0 > 270) &&
                (angle_1 >= angle_0) &&
                (angle_1 <= 360) &&
                (angle_point1 >= angle_0) &&
                (angle_point1 <= angle_1);
            if (cond1) {
                ok_angle_point1 = true;
            }
            if (cond2) {
                ok_angle_point1 = true;
            }
            if (cond3) {
                ok_angle_point1 = true;
            }
            if (ok_angle_point1) {
                result.push(m.getGeom().addPoint([
                    C0[0] + r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x,
                    C0[1] + r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y,
                    C0[2] + r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z,
                ]));
            }
        }
        r = p / (1 + Math.cos((t + Math.PI) - (Math.PI / 2)));
        const point2 = new three.Vector3(C0[0] + r * Math.cos((t + Math.PI)) * U1.normalize().x + r * Math.sin((t + Math.PI)) * V1.normalize().x - PO[0], C0[1] + r * Math.cos((t + Math.PI)) * U1.normalize().y + r * Math.sin((t + Math.PI)) * V1.normalize().y - PO[1], C0[2] + r * Math.cos((t + Math.PI)) * U1.normalize().z + r * Math.sin((t + Math.PI)) * V1.normalize().z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(r * Math.cos((t + Math.PI)) * U1.normalize().x + r * Math.sin((t + Math.PI)) * V1.normalize().x, r * Math.cos((t + Math.PI)) * U1.normalize().y + r * Math.sin((t + Math.PI)) * V1.normalize().y, r * Math.cos((t + Math.PI)) * U1.normalize().z + r * Math.sin((t + Math.PI)) * V1.normalize().z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            let ok_angle_point2 = false;
            angle_point2 = ((angle_point2 % 360) + 360) % 360;
            const angle_0 = ((parabola.getAngles()[0] % 360) + 360) % 360;
            const angle_1 = ((parabola.getAngles()[1] % 360) + 360) % 360;
            const cond1 = (angle_0 <= 360) &&
                (angle_0 > 270) &&
                (angle_1 < 270) &&
                ((angle_point2 <= angle_1)
                    ||
                        ((angle_point2 >= angle_0) &&
                            (angle_point2 <= 360)));
            const cond2 = (angle_0 <= angle_1) &&
                (angle_1 < 270) &&
                (angle_point2 <= angle_1) &&
                (angle_point2 >= angle_0);
            const cond3 = (angle_0 > 270) &&
                (angle_1 >= angle_0) &&
                (angle_1 <= 360) &&
                (angle_point2 >= angle_0) &&
                (angle_point2 <= angle_1);
            if (cond1) {
                ok_angle_point2 = true;
            }
            if (cond2) {
                ok_angle_point2 = true;
            }
            if (cond3) {
                ok_angle_point2 = true;
            }
            if (ok_angle_point2) {
                result.push(m.getGeom().addPoint([
                    C0[0] + r * Math.cos(t + Math.PI) * U1.normalize().x + r * Math.sin(t + Math.PI) * V1.normalize().x,
                    C0[1] + r * Math.cos(t + Math.PI) * U1.normalize().y + r * Math.sin(t + Math.PI) * V1.normalize().y,
                    C0[2] + r * Math.cos(t + Math.PI) * U1.normalize().z + r * Math.sin(t + Math.PI) * V1.normalize().z
                ]));
            }
        }
    }
    if (result.length >= 1) {
        switch (result.length) {
            case 1:
                return result;
            case 2:
                if (vectorFromPointsAtoB(result[0], result[1]).length() < eps) {
                    result[0].getGeom().delPoint(result[1]);
                    return [result[0]];
                }
                else {
                    return result;
                }
            case 3:
                if (vectorFromPointsAtoB(result[0], result[1]).length() < eps) {
                    result[0].getGeom().delPoint(result[1]);
                    return [result[0], result[2]];
                }
                else {
                    result[0].getGeom().delPoint(result[2]);
                    return [result[0], result[1]];
                }
            case 4:
                if (vectorFromPointsAtoB(result[0], result[1]).length() > eps) {
                    result[0].getGeom().delPoint(result[2]);
                    result[0].getGeom().delPoint(result[3]);
                    return [result[0], result[1]];
                }
                else {
                    result[0].getGeom().delPoint(result[1]);
                    result[0].getGeom().delPoint(result[3]);
                    return [result[0], result[2]];
                }
            default: throw new Error("Error in parameters");
        }
    }
    return result;
}
exports.plane3D_parabola = plane3D_parabola;
function plane3D_hyperbola(hyperbola, plane) {
    const m = hyperbola.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the parabola and the plane");
    }
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    const C0 = hyperbola.getOrigin().getPosition();
    const CA = hyperbola.getAxes();
    const a = new three.Vector3(hyperbola.getAxes()[1][0], hyperbola.getAxes()[1][1], hyperbola.getAxes()[1][2]).length();
    const b = new three.Vector3(hyperbola.getAxes()[0][0], hyperbola.getAxes()[0][1], hyperbola.getAxes()[0][2]).length();
    const angle_max = Math.atan(b / a) * 360 / (2 * Math.PI) % 360;
    const angle0_max = (270 + angle_max) % 360;
    const angle1_max = (270 - angle_max) % 360;
    const e = Math.sqrt(1 + (b / a) * (b / a));
    const c = Math.sqrt(a * a - b * b);
    const param = (b * b) / Math.sqrt(a * a + b * b);
    const U1 = new three.Vector3(...CA[0]).normalize();
    const V1 = new three.Vector3(...CA[1]).normalize();
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * param * U1.normalize().x
        + n1[1] * param * U1.normalize().y
        + n1[2] * param * U1.normalize().z;
    const C = n1[0] * (C0[0] * e + param * V1.normalize().x - PO[0] * e)
        + n1[1] * (C0[1] * e + param * V1.normalize().y - PO[1] * e)
        + n1[2] * (C0[2] * e + param * V1.normalize().z - PO[2] * e);
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    for (const t of _t) {
        let r = param / (1 + e * Math.cos(t - (Math.PI / 2)));
        const point1 = new three.Vector3(C0[0] + r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x - PO[0], C0[1] + r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y - PO[1], C0[2] + r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x, r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y, r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            let ok_angle_point1 = false;
            angle_point1 = ((angle_point1 % 360) + 360) % 360;
            const angle_0 = ((hyperbola.getAngles()[0] % 360) + 360) % 360;
            const angle_1 = ((hyperbola.getAngles()[1] % 360) + 360) % 360;
            const cond1 = (angle_0 <= 360) &&
                (angle_0 > angle0_max) &&
                (angle_1 < angle1_max) &&
                ((angle_point1 <= angle_1)
                    ||
                        ((angle_point1 >= angle_0) &&
                            (angle_point1 <= 360)));
            const cond2 = (angle_0 <= angle_1) &&
                (angle_1 < angle1_max) &&
                (angle_point1 <= angle_1) &&
                (angle_point1 >= angle_0);
            const cond3 = (angle_0 > angle0_max) &&
                (angle_1 >= angle_0) &&
                (angle_1 <= 360) &&
                (angle_point1 >= angle_0) &&
                (angle_point1 <= angle_1);
            if (cond1) {
                ok_angle_point1 = true;
            }
            if (cond2) {
                ok_angle_point1 = true;
            }
            if (cond3) {
                ok_angle_point1 = true;
            }
            if (ok_angle_point1) {
                result.push(m.getGeom().addPoint([
                    C0[0] + r * Math.cos(t) * U1.normalize().x + r * Math.sin(t) * V1.normalize().x,
                    C0[1] + r * Math.cos(t) * U1.normalize().y + r * Math.sin(t) * V1.normalize().y,
                    C0[2] + r * Math.cos(t) * U1.normalize().z + r * Math.sin(t) * V1.normalize().z,
                ]));
            }
        }
        r = param / (1 + e * Math.cos((t + Math.PI) - (Math.PI / 2)));
        const point2 = new three.Vector3(C0[0] + r * Math.cos((t + Math.PI)) * U1.normalize().x + r * Math.sin((t + Math.PI)) * V1.normalize().x - PO[0], C0[1] + r * Math.cos((t + Math.PI)) * U1.normalize().y + r * Math.sin((t + Math.PI)) * V1.normalize().y - PO[1], C0[2] + r * Math.cos((t + Math.PI)) * U1.normalize().z + r * Math.sin((t + Math.PI)) * V1.normalize().z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(r * Math.cos((t + Math.PI)) * U1.normalize().x + r * Math.sin((t + Math.PI)) * V1.normalize().x, r * Math.cos((t + Math.PI)) * U1.normalize().y + r * Math.sin((t + Math.PI)) * V1.normalize().y, r * Math.cos((t + Math.PI)) * U1.normalize().z + r * Math.sin((t + Math.PI)) * V1.normalize().z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            let ok_angle_point2 = false;
            angle_point2 = ((angle_point2 % 360) + 360) % 360;
            const angle_0 = ((hyperbola.getAngles()[0] % 360) + 360) % 360;
            const angle_1 = ((hyperbola.getAngles()[1] % 360) + 360) % 360;
            const cond1 = (angle_0 <= 360) &&
                (angle_0 > 270) &&
                (angle_1 < 270) &&
                ((angle_point2 <= angle_1)
                    ||
                        ((angle_point2 >= angle_0) &&
                            (angle_point2 <= 360)));
            const cond2 = (angle_0 <= angle_1) &&
                (angle_1 < 270) &&
                (angle_point2 <= angle_1) &&
                (angle_point2 >= angle_0);
            const cond3 = (angle_0 > 270) &&
                (angle_1 >= angle_0) &&
                (angle_1 <= 360) &&
                (angle_point2 >= angle_0) &&
                (angle_point2 <= angle_1);
            if (cond1) {
                ok_angle_point2 = true;
            }
            if (cond2) {
                ok_angle_point2 = true;
            }
            if (cond3) {
                ok_angle_point2 = true;
            }
            if (ok_angle_point2) {
                result.push(m.getGeom().addPoint([
                    C0[0] + r * Math.cos(t + Math.PI) * U1.normalize().x + r * Math.sin(t + Math.PI) * V1.normalize().x,
                    C0[1] + r * Math.cos(t + Math.PI) * U1.normalize().y + r * Math.sin(t + Math.PI) * V1.normalize().y,
                    C0[2] + r * Math.cos(t + Math.PI) * U1.normalize().z + r * Math.sin(t + Math.PI) * V1.normalize().z
                ]));
            }
        }
    }
    if (result.length >= 1) {
        switch (result.length) {
            case 1:
                return result;
            case 2:
                if (vectorFromPointsAtoB(result[0], result[1]).length() < eps) {
                    result[0].getGeom().delPoint(result[1]);
                    return [result[0]];
                }
                else {
                    return result;
                }
            case 3:
                if (vectorFromPointsAtoB(result[0], result[1]).length() < eps) {
                    result[0].getGeom().delPoint(result[1]);
                    return [result[0], result[2]];
                }
                else {
                    result[0].getGeom().delPoint(result[2]);
                    return [result[0], result[1]];
                }
            case 4:
                if (vectorFromPointsAtoB(result[0], result[1]).length() > eps) {
                    result[0].getGeom().delPoint(result[2]);
                    result[0].getGeom().delPoint(result[3]);
                    return [result[0], result[1]];
                }
                else {
                    result[0].getGeom().delPoint(result[1]);
                    result[0].getGeom().delPoint(result[3]);
                    return [result[0], result[2]];
                }
            default: throw new Error("Error in parameters");
        }
    }
    return result;
}
exports.plane3D_hyperbola = plane3D_hyperbola;
function plane3D_ellipse2D(ellipse, plane) {
    const m = ellipse.getModel();
    const eps = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the ellipse and the plane");
    }
    const PO = plane.getOrigin().getPosition();
    const n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    const C0 = ellipse.getOrigin().getPosition();
    const CA = ellipse.getAxes();
    const U1 = new three.Vector3(...CA[0]).setLength(ellipse.getRadii()[0]);
    const V1 = new three.Vector3(...CA[1]).setLength(ellipse.getRadii()[1]);
    const _n1 = new three.Vector3(n1[0], n1[1], n1[2]);
    const A = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    const C = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    const _t = _solve_trigo(A, B, C);
    if (_t === null) {
        return [];
    }
    const result = [];
    const results_plane_ellipse = [];
    for (const t of _t) {
        const point1 = new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x - PO[0], C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y - PO[1], C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point1)) < eps) {
            const vec_point1 = new three.Vector3(Math.cos(t) * U1.x + Math.sin(t) * V1.x, Math.cos(t) * U1.y + Math.sin(t) * V1.y, Math.cos(t) * U1.z + Math.sin(t) * V1.z);
            let angle_point1 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
            angle_point1 = (angle_point1 + 10 * 360) % 360;
            results_plane_ellipse.push(new three.Vector3(C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x, C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y, C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z));
        }
        const point2 = new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x - PO[0], C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y - PO[1], C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z - PO[2]);
        if (Math.abs(_n1.dot(point2)) < eps) {
            const vec_point2 = new three.Vector3(Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z);
            let angle_point2 = Math.sign(crossVectors(U1, V1).dot(crossVectors(U1, vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
            angle_point2 = (angle_point2 + 10 * 360) % 360;
            results_plane_ellipse.push(new three.Vector3(C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x, C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y, C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z));
        }
    }
    const results_plane_ellipse_copy = [];
    for (let point of results_plane_ellipse) {
        const data = arr.Arr.deepCopy([point.x, point.y, point.z]);
        results_plane_ellipse_copy.push(new three.Vector3(data[0], data[1], data[2]));
    }
    const original_angles_1 = arr.Arr.deepCopy(ellipse.getAngles());
    const C1 = new three.Vector3(...ellipse.getOrigin().getPosition());
    let angles1 = ellipse.getAngles();
    if (angles1 === undefined) {
        angles1 = [0, 360];
    }
    for (const point of results_plane_ellipse_copy) {
        const c1_to_point = new three.Vector3(point.x - C1.x, point.y - C1.y, point.z - C1.z);
        let angle_1 = U1.angleTo(c1_to_point) * 180 / Math.PI;
        if (crossVectors(U1, c1_to_point).dot(crossVectors(U1, V1)) < 0) {
            angle_1 = 360 - angle_1;
        }
        angle_1 = ((angle_1 % 360) + 360) % 360;
        angles1[0] = ((angles1[0] % 360) + 360) % 360;
        angles1[1] = ((angles1[1] % 360) + 360) % 360;
        if (original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
            angles1[1] = angles1[1] + 360;
        }
        let ok = true;
        if (angles1[1] > angles1[0]) {
            if ((angle_1 < angles1[0] && angle_1 >= 0) || (angle_1 > angles1[1] && angle_1 <= 360)) {
                ok = false;
            }
        }
        if (angles1[0] > angles1[1]) {
            if (angle_1 > angles1[1] && angle_1 < angles1[0]) {
                ok = false;
            }
        }
        if (ok) {
            result.push(m.getGeom().addPoint([point.x, point.y, point.z]));
        }
    }
    return result;
}
exports.plane3D_ellipse2D = plane3D_ellipse2D;
function plane3D_circle2D(circle, plane) {
    const m = circle.getModel();
    if (plane.getModel() !== m) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    const CA = circle.getAxes();
    const U1 = new three.Vector3(...CA[0]).setLength(circle.getRadius());
    const V1 = new three.Vector3(...CA[1]).setLength(circle.getRadius());
    const ellipse = m.getGeom().addEllipse(circle.getOrigin(), [U1.x, U1.y, U1.z], [V1.x, V1.y, V1.z], circle.getAngles());
    const result = plane3D_ellipse2D(ellipse, plane);
    m.getGeom().delObj(ellipse, false);
    return result;
    // circle.getAxes();
    // const PO: number[] = plane.getOrigin().getPosition();
    // const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    // const C0: number[] = circle.getOrigin().getPosition();
    // const CA: [XYZ,XYZ,XYZ] = circle.getAxes();
    // const U1: three.Vector3 = new three.Vector3(...CA[0]).setLength(circle.getRadius());
    // const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(circle.getRadius());
    // const _n1: three.Vector3 = new three.Vector3(n1[0],n1[1],n1[2]);
    // const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    // const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    // const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    // const _t: number[] = _solve_trigo(A,B,C);
    // if (_t === null) {return [];}
    // const result: IPoint[] = [];
    // const results_plane_circle: three.Vector3[] = [];
    // for (const t of _t) {
    //             const point1: three.Vector3 = new three.Vector3(
    //                 C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x - PO[0],
    //                 C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y - PO[1],
    //                 C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z - PO[2],
    //                 );
    //             if( Math.abs(_n1.dot(point1)) < eps ) {
    //             const vec_point1: three.Vector3 = new three.Vector3(
    //                 Math.cos(t)*U1.x + Math.sin(t)*V1.x,
    //                 Math.cos(t)*U1.y + Math.sin(t)*V1.y,
    //                 Math.cos(t)*U1.z + Math.sin(t)*V1.z);
    //             let angle_point1: number = Math.sign(
    //             crossVectors(U1,V1).dot(
    //             crossVectors(U1,vec_point1))) * vec_point1.angleTo(U1) * 180 / Math.PI;
    //             angle_point1 = (angle_point1 + 10*360) %360;
    //             results_plane_circle.push(new three.Vector3(
    //                 C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
    //                 C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
    //                 C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z));
    //            }
    //             const point2: three.Vector3 = new three.Vector3(
    //                 C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x - PO[0],
    //                 C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y - PO[1],
    //                 C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z - PO[2],
    //                 );
    //             if( Math.abs(_n1.dot(point2)) < eps ) {
    //             const vec_point2: three.Vector3 = new three.Vector3(
    //                 Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
    //                 Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
    //                 Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z);
    //             let angle_point2: number = Math.sign(crossVectors(U1,V1).dot(
    //             crossVectors(U1,vec_point2))) * vec_point2.angleTo(U1) * 180 / Math.PI;
    //             angle_point2 = (angle_point2 + 10*360) %360;
    //             results_plane_circle.push(new three.Vector3(
    //                 C0[0] + Math.cos(t + Math.PI)*U1.x + Math.sin(t + Math.PI)*V1.x,
    //                 C0[1] + Math.cos(t + Math.PI)*U1.y + Math.sin(t + Math.PI)*V1.y,
    //                 C0[2] + Math.cos(t + Math.PI)*U1.z + Math.sin(t + Math.PI)*V1.z));
    //             }
    //     }
    // const results_plane_circle_copy: three.Vector3[] =[];
    // for (let point  of results_plane_circle) {
    //     const data: number[] = arr.Arr.deepCopy([point.x, point.y, point.z]);
    //     results_plane_circle_copy.push(new three.Vector3(data[0],data[1],data[2]));
    //     }
    // const original_angles_1: number[] = arr.Arr.deepCopy(circle.getAngles());
    // const C1: three.Vector3 = new three.Vector3(...circle.getOrigin().getPosition());
    // let angles1: [number, number] = circle.getAngles();
    // if (angles1 === undefined) {angles1 = [0,360];}
    // for(const point of results_plane_circle_copy) {
    //     const c1_to_point: three.Vector3 = new three.Vector3(point.x - C1.x,point.y - C1.y,point.z - C1.z);
    //     let angle_1: number = U1.angleTo(c1_to_point) * 180/Math.PI;
    //     if( crossVectors(U1, c1_to_point).dot(crossVectors(U1,V1)) < 0 ) {angle_1 = 360 - angle_1;}
    //     angle_1 =  ((angle_1 %360) + 360) %360;
    //     angles1[0] =  ((angles1[0] %360) + 360) %360;
    //     angles1[1] =  ((angles1[1] %360) + 360) %360;
    //     if(original_angles_1[0] !== original_angles_1[1] && angles1[1] === angles1[0]) {
    //     angles1[1] = angles1[1] + 360;}
    //     let ok: boolean = true;
    //     if(angles1[1] > angles1[0]) {
    //         if( (angle_1 < angles1[0] && angle_1 >= 0 ) || (angle_1 > angles1[1] && angle_1 <= 360)) {
    //             ok = false;
    //         }
    //     }
    //     if(angles1[0] > angles1[1]) {
    //         if( angle_1 > angles1[1] && angle_1 < angles1[0] ) {ok = false;
    //         }
    //     }
    //     if(ok) {
    //         result.push(m.getGeom().addPoint([point.x,point.y,point.z]));
    //     }
    //     }
    // return result;
}
exports.plane3D_circle2D = plane3D_circle2D;
function crossVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.crossVectors = crossVectors;
function _solve_trigo(A, B, C) {
    const num1 = -A;
    const den1 = Math.sqrt(B * B + C * C);
    const num2 = B;
    const den2 = C;
    if (C === 0) {
        if (B === 0) {
            return null;
        }
        if (Math.abs(A / B) > 1) {
            return null;
        }
        return [(-Math.acos(-A / B)) % (2 * Math.PI), (Math.acos(-A / B)) % (2 * Math.PI)];
    }
    if (Math.abs(num1 / den1) > 1) {
        return null;
    }
    const t1 = Math.asin(num1 / den1) - Math.atan(num2 / den2);
    const t2 = Math.PI - Math.atan(num2 / den2) - Math.asin(num1 / den1);
    return [t1 % (2 * Math.PI), t2 % (2 * Math.PI)];
}
exports._solve_trigo = _solve_trigo;
function vectorFromPointsAtoB(a, b, norm = false) {
    const v = subVectors(new three.Vector3(...b.getPosition()), new three.Vector3(...a.getPosition()));
    if (norm) {
        v.normalize();
    }
    return v;
}
exports.vectorFromPointsAtoB = vectorFromPointsAtoB;
function subVectors(v1, v2, norm = false) {
    const v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
exports.subVectors = subVectors;
//# sourceMappingURL=plane3D.js.map