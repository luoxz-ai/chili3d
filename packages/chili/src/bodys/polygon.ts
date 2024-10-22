// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import { FacebaseNode, I18nKeys, IDocument, IShape, Property, Result, Serializer, XYZ } from "chili-core";

@Serializer.register(["document", "points"])
export class PolygonNode extends FacebaseNode {
    override display(): I18nKeys {
        return "body.polygon";
    }

    @Serializer.serialze()
    @Property.define("polygon.points")
    get points() {
        return this.getPrivateValue("points");
    }
    set points(value: XYZ[]) {
        this.setProperty("points", value);
    }

    constructor(document: IDocument, points: XYZ[]) {
        super(document);
        this.setPrivateValue("points", points);
    }

    generateShape(): Result<IShape, string> {
        let wire = this.document.application.shapeFactory.polygon(...this.points);
        if (!wire.isOk || !this.isFace) return wire;
        return wire.ok().toFace();
    }
}
