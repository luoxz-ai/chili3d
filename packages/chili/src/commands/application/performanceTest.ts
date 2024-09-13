import {
    EdgeMeshData,
    EditableGeometryEntity,
    FaceMeshData,
    GeometryModel,
    IApplication,
    ICommand,
    IDocument,
    LineType,
    Material,
    Plane,
    XYZ,
    command,
} from "chili-core";

export abstract class PerformanceTestCommand implements ICommand {
    protected size = 10;
    protected gap = 1;
    protected rowCols = 20;

    async execute(app: IApplication): Promise<void> {
        let document = await app.newDocument("OCC Performace Test");
        let lightGray = new Material(document, "LightGray", 0xdedede);
        let deepGray = new Material(document, "DeepGray", 0x898989);
        document.materials.push(lightGray, deepGray);

        const start = performance.now();
        const distance = this.gap + this.size;
        for (let x = 0; x < this.rowCols; x++) {
            for (let y = 0; y < this.rowCols; y++) {
                for (let z = 0; z < this.rowCols; z++) {
                    let position = XYZ.zero
                        .add(XYZ.unitX.multiply(x * distance))
                        .add(XYZ.unitY.multiply(y * distance))
                        .add(XYZ.unitZ.multiply(z * distance));
                    this.createShape(document, lightGray, position);
                }
            }
        }
        alert(
            `Create ${this.rowCols * this.rowCols * this.rowCols} shapes, Time: ${performance.now() - start} ms`,
        );
    }

    protected abstract createShape(document: IDocument, material: Material, position: XYZ): void;
}

@command({
    name: "test.performace",
    display: "test.performace",
    icon: "",
})
export class OccPerformanceTestCommand extends PerformanceTestCommand {
    private index = 1;

    protected override createShape(document: IDocument, material: Material, position: XYZ): void {
        let plane = Plane.XY.translateTo(position);
        let box = document.application.shapeFactory
            .box(plane, this.size * Math.random(), this.size * Math.random(), this.size * Math.random())
            .ok();
        let f = box.mesh.faces;
        let e = box.mesh.edges;
        // let entity = new EditableGeometryEntity(document, box.ok(), material.id);
        // let model = new GeometryModel(document, `box ${this.index++}`, entity);
        // document.addNode(model);

        // let wasm = (document.application.shapeFactory as any).wasm;
        // let point1 = new wasm.gp_Pnt(position.x, position.y, position.z);
        // let direction = new wasm.gp_Dir(0, 0, 1);
        // let ax2 = new wasm.gp_Ax2(point1, direction);
        // let box = wasm.ShapeFactory.makeBox(ax2, 1, 1, 1);
        // let faces = new wasm.FaceMesher(box, 0.1);
        // let edges = new wasm.EdgeMesher(box, 0.1);
        // document.visual.context.displayMesh(
        //     {
        //         positions: edges.getPosition(),
        //         groups: [],
        //         color: 0xfff,
        //         lineType: LineType.Solid,
        //     } as any,
        //     {
        //         positions: faces.getPosition(),
        //         groups: [],
        //         color: 0xfff,
        //         indices: faces.getIndex(),
        //         normals: faces.getNormal(),
        //     } as any
        // )
    }
}

// export class ThreePerformanceTestCommand extends PerformanceTestCommand {

// }
