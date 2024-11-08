// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

const I18N_KEYS = [
    "arc.angle",
    "arc.start",
    "axis.x",
    "axis.y",
    "axis.z",
    "body.arc",
    "body.bolean",
    "body.box",
    "body.circle",
    "body.face",
    "body.fuse",
    "body.imported",
    "body.line",
    "body.polygon",
    "body.prism",
    "body.rect",
    "body.revol",
    "body.sweep",
    "body.wire",
    "body.editableShape",
    "body.meshNode",
    "box.dx",
    "box.dy",
    "box.dz",
    "circle.center",
    "circle.radius",
    "command.arc",
    "command.array",
    "command.bezier",
    "command.boolean.common",
    "command.boolean.cut",
    "command.boolean.fuse",
    "command.box",
    "command.break",
    "command.circle",
    "command.copy",
    "command.delete",
    "command.document.new",
    "command.document.open",
    "command.document.save",
    "command.document.saveAs",
    "command.document.saveToFile",
    "command.export",
    "command.faceable.isFace",
    "command.fuse",
    "command.import",
    "command.line.isConnected",
    "command.line",
    "command.mirror",
    "command.mode.repeat",
    "command.move",
    "command.newFolder",
    "command.newGroup",
    "command.offset",
    "command.polygon",
    "command.prism",
    "command.rect",
    "command.redo",
    "command.revol",
    "command.rotate",
    "command.section",
    "command.split",
    "command.sweep",
    "command.thickSolid",
    "command.toFace",
    "command.toWire",
    "command.trim",
    "command.undo",
    "common.angle",
    "common.back",
    "common.cancel",
    "common.clone",
    "common.color",
    "common.confirm",
    "common.general",
    "common.length",
    "common.material",
    "common.matrix",
    "common.name",
    "common.normal",
    "common.opacity",
    "common.thickness",
    "common.type",
    "entity.editable",
    "entity.parameter",
    "error.default",
    "error.input.cannotInputANumber",
    "error.input.invalidNumber",
    "error.input.threeNumberCanBeInput",
    "error.input.unsupportedInputs",
    "file.format",
    "home.recent",
    "home.welcome",
    "items.header",
    "items.tool.delete",
    "items.tool.expandAll",
    "items.tool.newFolder",
    "items.tool.unexpandAll",
    "line.end",
    "line.start",
    "line.type.line",
    "line.type.xline",
    "material.repeatU",
    "material.repeatV",
    "material.texture",
    "model.visible",
    "operate.pickCircleCenter",
    "operate.pickFistPoint",
    "operate.pickNextPoint",
    "operate.pickRadius",
    "polygon.points",
    "prompt.default",
    "prompt.deleteDocument{0}",
    "prompt.polygon.close",
    "prompt.saveDocument{0}",
    "prompt.select.edges",
    "prompt.select.faces",
    "prompt.select.models",
    "prompt.select.noModelSelected",
    "prompt.select.shape",
    "prompt.select.vertexs",
    "prompt.select.wires",
    "properties.group.transform",
    "properties.header",
    "properties.multivalue",
    "rect.dx",
    "rect.dy",
    "ribbon.group.boolean",
    "ribbon.group.converter",
    "ribbon.group.draw",
    "ribbon.group.importExport",
    "ribbon.group.modify",
    "ribbon.group.selection",
    "ribbon.group.tools",
    "ribbon.group.workingPlane",
    "ribbon.tab.draw",
    "ribbon.tab.file",
    "ribbon.tab.startup",
    "snap.center",
    "snap.end",
    "snap.intersection",
    "snap.mid",
    "snap.perpendicular",
    "snap.nearest",
    "toast.command.{0}excuting",
    "toast.converter.error",
    "toast.converter.invalidColor",
    "toast.delete{0}Objects",
    "toast.document.noActived",
    "toast.document.saved",
    "toast.downloading",
    "toast.excuting{0}",
    "toast.fail",
    "toast.read.error",
    "toast.select.noSelected",
    "toast.success",
    "transform.rotation",
    "transform.scale",
    "transform.translation",
    "vertex.point",
    "workingPlane.alignToPlane",
    "workingPlane.set",
    "test.performace",
] as const;

export type I18nKeys = (typeof I18N_KEYS)[number];
