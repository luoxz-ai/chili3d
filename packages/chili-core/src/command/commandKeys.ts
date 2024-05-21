// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

export type CommandKeys =
    | "boolean.common"
    | "boolean.cut"
    | "boolean.fuse"
    | "doc.new"
    | "doc.save"
    | "doc.open"
    | "doc.saveToFile"
    | "special.last"
    | "edit.undo"
    | "edit.redo"
    | "file.import"
    | "file.export.iges"
    | "file.export.stp"
    | "create.arc"
    | "create.bezier"
    | "create.box"
    | "create.line"
    | "create.circle"
    | "create.rect"
    | "create.folder"
    | "create.group"
    | "create.polygon"
    | "create.offset"
    | "convert.toWire"
    | "convert.toFace"
    | "convert.prism"
    | "convert.revol"
    | "convert.sweep"
    | "convert.fuse"
    | "modify.array"
    | "modify.move"
    | "modify.rotate"
    | "modify.mirror"
    | "modify.delete"
    | "workingPlane.alignToPlane"
    | "workingPlane.set";
