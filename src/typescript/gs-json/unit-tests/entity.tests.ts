import {} from "jasmine";
import * as entity_tests from "../utils/entity_tests";

describe("Tests for Entity class", () => {
    it("test_ent_constructor", () => {
        expect( entity_tests.test_ent_constructor() ).toBe(true);
    });
    it("test_ent_getGeom", () => {
        expect( entity_tests.test_ent_getGeom() ).toBe(true);
    });
    it("test_ent_getID", () => {
        expect( entity_tests.test_ent_getID() ).toBe(true);
    });
    it("test_ent_getModel", () => {
        expect( entity_tests.test_ent_getModel() ).toBe(true);
    });
    // it('test_ent_getGeomType', () => {
    //     expect( entities_tests.test_ent_getGeomType() ).toBe(true);
    // });
    it("test_ent_getAttribNames", () => {
        expect( entity_tests.test_ent_getAttribNames() ).toBe(true);
    });
    it("test_ent_getAttribValue", () => {
        expect( entity_tests.test_ent_getAttribValue() ).toBe(true);
    });
    it("test_ent_setAttribValue", () => {
        expect( entity_tests.test_ent_setAttribValue() ).toBe(true);
    });
    it("test_ent_getGroupNames", () => {
        expect( entity_tests.test_ent_getGroupNames() ).toBe(true);
    });
});
