// Copyright 2022-2023 the Chili authors. All rights reserved. MPL-2.0 license.

export type Locale = {
    language: string;
    translation: Translation;
};

export type Translation = Record<I18nKeys, string>;

export type I18nKeys =
    | "common.name"
    | "common.matrix"
    | "common.normal"
    | "common.confirm"
    | "common.cancel"
    | "common.clone"
    | "common.type"
    | "home.welcome"
    | "home.recent"
    | "body.line"
    | "body.rect"
    | "body.circle"
    | "body.box"
    | "body.polygon"
    | "ribbon.tab.file"
    | "ribbon.tab.draw"
    | "ribbon.tab.startup"
    | "ribbon.group.draw"
    | "ribbon.group.modify"
    | "ribbon.group.selection"
    | "items.header"
    | "items.tool.newFolder"
    | "items.tool.expandAll"
    | "items.tool.unexpandAll"
    | "items.tool.delete"
    | "properties.header"
    | "properties.multivalue"
    | "properties.group.transform"
    | "model.translation"
    | "model.rotation"
    | "model.scale"
    | "model.visible"
    | "vertex.point"
    | "line.type.line"
    | "line.type.xline"
    | "line.start"
    | "line.end"
    | "circle.center"
    | "circle.radius"
    | "box.dx"
    | "box.dy"
    | "box.dz"
    | "rect.dx"
    | "rect.dy"
    | "polygon.points"
    | "command.document.save"
    | "command.document.saveAs"
    | "command.document.new"
    | "command.document.open"
    | "command.delete"
    | "command.redo"
    | "command.newGroup"
    | "command.newFolder"
    | "command.undo"
    | "command.line"
    | "command.line.isConnected"
    | "command.box"
    | "command.circle"
    | "command.rect"
    | "command.move"
    | "command.copy"
    | "command.mirror"
    | "command.array"
    | "command.rotate"
    | "command.polygon"
    | "command.mode.repeat"
    | "operate.pickFistPoint"
    | "operate.pickNextPoint"
    | "operate.pickCircleCenter"
    | "operate.pickRadius"
    | "snap.end"
    | "snap.mid"
    | "snap.center"
    | "snap.intersection"
    | "snap.perpendicular"
    | "axis.x"
    | "axis.y"
    | "axis.z"
    | "toast.command.{0}excuting"
    | "toast.document.saved"
    | "toast.document.noActived"
    | "prompt.default"
    | "prompt.select.models"
    | "prompt.polygon.close"
    | "prompt.select.noModelSelected"
    | "error.default"
    | "error.input.unsupportedInputs"
    | "error.input.invalidNumber"
    | "error.input.threeNumberCanBeInput"
    | "error.input.cannotInputANumber";
