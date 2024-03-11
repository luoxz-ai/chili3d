// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import { AsyncController, IDisposable } from "./foundation";
import { ShapeType } from "./geometry";
import { I18nKeys } from "./i18n";
import { IModel, INode } from "./model";
import { IShapeFilter } from "./selectionFilter";
import { CursorType, IEventHandler, VisualShapeData } from "./visual";

export interface ISelection extends IDisposable {
    pickShape(prompt: I18nKeys, controller: AsyncController, multiMode: boolean): Promise<VisualShapeData[]>;
    pickModel(prompt: I18nKeys, controller: AsyncController, multiMode: boolean): Promise<IModel[]>;
    pickAsync(
        handler: IEventHandler,
        prompt: I18nKeys,
        controller: AsyncController,
        showControl: boolean,
        cursor: CursorType,
    ): Promise<void>;
    shapeType: ShapeType;
    nodeType: "model" | "node";
    filter?: IShapeFilter;
    setSelection(nodes: INode[], toggle: boolean): number;
    clearSelection(): void;
    getSelectedNodes(): INode[];
}
