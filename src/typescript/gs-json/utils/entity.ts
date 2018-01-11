import {IEnt, IGeom, IModel, IEntAttrib, ITopoAttrib} from "./ifaces_gs";
import {Kernel} from "./kernel";
import {EGeomType} from "./enums";
import {Attrib} from "./attrib";
import {_castToAttribTypes} from "./attrib_cast";
/**
 * Class Ent.
 * An abstrcat class that is the superclass for all geometric entities, both Point and Obj.
 * An entity may be part of a group and may have attributes.
 */
export abstract class Ent implements IEnt{
    protected _kernel: Kernel;
    protected _id: number;
    /**
     * Creates an instance of one of the subclasses of Ent.
     * The entity must already exists in the geometry.
     * Do not use this constructor if you want to add a new entity to the geometry.
     * For that, you should use one of the 'add' methods in the geometry class.
     * @param geom The Geom object to which the point belongs.
     * @param id The ID of the entity. This ID must already exist in the geometry.
     * @return The Ent object.
     */
    constructor(kernel: Kernel, id: number) {
        this._kernel = kernel;
        this._id = id;
    }

    /**
     * Get the Model object that this entity belongs to.
     * @return A Model object.
     */
    public getModel(): IModel {
        return this._kernel.getModel();
    }

    /**
     * Get the Geom object
     * @return The Model object
     */
    public getGeom(): IGeom {
        return this._kernel.getGeom();
    }

    //  This Entity --------------------------------------------------------------------------------

    /**
     * Check if this entity exists in the model. (i.e has it been deleted?)
     * @return The entity ID number.
     */
    public exists(): boolean {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    /**
     * Get the ID number of this entity.
     * @return The entity ID number.
     */
    public getID(): number {
        return this._id;
    }

    /**
     * Get the geometry type for this entity.
     * This method mst be overridden by the sub-classes.
     * @return The geometry type.
     */
    public getGeomType(): EGeomType {
        // Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }

    //  Attributes ---------------------------------------------------------------------------------

    /**
     * Get the attribute names for this entity.
     * @return The array of attribute names.
     */
    public getAttribs(): IEntAttrib[]|ITopoAttrib[] {
        const geom_type: EGeomType = this.getGeomType();
        const names: string[] = this._kernel.attribGetNames(geom_type);
        return _castToAttribTypes(this._kernel, geom_type, names);
    }

    /**
     * Get an attribute value for this entity.
     * @param attrib The attribute.
     * @return The attribute value.
     */
    public getAttribValue(attrib: IEntAttrib): any {
        if (attrib.getGeomType() !== this.getGeomType()) {return null;}
        return this._kernel.entAttribGetValue(attrib.getName(), attrib.getGeomType(), this._id);
    }

    /**
     * Set an attribute value for this entity.
     * @param attrib The attribute.
     * @param value The new attribute value.
     * @return The old attribute value.
     */
    public setAttribValue(attrib: IEntAttrib, value: any): any {
        if (attrib.getGeomType() !== this.getGeomType()) {return null;}
        return this._kernel.entAttribSetValue(attrib.getName(), attrib.getGeomType(), this._id, value);
    }

}
