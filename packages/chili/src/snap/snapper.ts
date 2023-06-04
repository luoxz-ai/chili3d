// Copyright 2022-2023 the Chili authors. All rights reserved. MPL-2.0 license.

import { TaskToken, CursorType, I18n, IDocument, PubSub, Logger } from "chili-core";

import {
    SnapEventHandler,
    SnapLengthAtAxisData,
    SnapLengthAtAxisHandler,
    SnapLengthAtPlaneData,
    SnapLengthAtPlaneHandler,
    SnapPointData,
    SnapPointEventHandler,
} from "./snapEventHandler";
import { SnapedData } from "./interfaces";

export abstract class Snapper {
    protected abstract getEventHandler(token: TaskToken): SnapEventHandler;

    async snap(document: IDocument, tip: keyof I18n): Promise<SnapedData | undefined> {
        let taskToken: TaskToken = new TaskToken();
        let eventHandler = this.getEventHandler(taskToken);
        document.visual.viewer.setCursor(CursorType.Drawing);
        PubSub.default.pub("statusBarTip", tip);
        await this.waitEventHandlerFinished(document, eventHandler);
        document.visual.viewer.setCursor(CursorType.Default);
        PubSub.default.pub("clearStatusBarTip");
        return eventHandler.snaped;
    }

    protected async waitEventHandlerFinished(document: IDocument, eventHandler: SnapEventHandler) {
        let handler = document.visual.eventHandler;
        document.visual.eventHandler = eventHandler!;
        await new Promise((resolve, reject) => {
            eventHandler.taskToken.onCompletedRequested(resolve);
            eventHandler.taskToken.onCancellationRequested(reject);
        })
            .then((r) => {
                Logger.info("complete snap");
            })
            .catch((r) => {
                Logger.info("cancel snap");
            })
            .finally(() => {
                document.visual.eventHandler = handler;
            });
    }
}

export class PointSnapper extends Snapper {
    constructor(readonly data: SnapPointData) {
        super();
    }

    protected getEventHandler(token: TaskToken): SnapEventHandler {
        return new SnapPointEventHandler(token, this.data);
    }
}

export class LengthAtAxisSnapper extends Snapper {
    constructor(readonly data: SnapLengthAtAxisData) {
        super();
    }

    protected getEventHandler(token: TaskToken): SnapEventHandler {
        return new SnapLengthAtAxisHandler(token, this.data);
    }
}

export class LengthAtPlaneSnapper extends Snapper {
    constructor(readonly data: SnapLengthAtPlaneData) {
        super();
    }

    protected getEventHandler(token: TaskToken): SnapEventHandler {
        return new SnapLengthAtPlaneHandler(token, this.data);
    }
}
