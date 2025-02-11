// Copyright 2022-2023 the Chili authors. All rights reserved. AGPL-3.0 license.

import { IDocument } from "../document";
import { Id, Logger, NodeAction, NodeRecord } from "../foundation";
import { Serializer } from "../serialize";
import { INode, INodeLinkedList, Node } from "./node";

@Serializer.register(["document", "name", "id"])
export class FolderNode extends Node implements INodeLinkedList {
    private _count: number = 0;

    private _firstChild: INode | undefined;
    get firstChild(): INode | undefined {
        return this._firstChild;
    }

    private _lastChild: INode | undefined;
    get lastChild(): INode | undefined {
        return this._lastChild;
    }

    constructor(document: IDocument, name: string, id: string = Id.generate()) {
        super(document, name, id);
    }

    get count() {
        return this._count;
    }

    size(): number {
        return this._count;
    }

    add(...items: INode[]): void {
        let records: NodeRecord[] = [];
        items.forEach((item) => {
            records.push({
                action: NodeAction.add,
                node: item,
                oldParent: undefined,
                oldPrevious: undefined,
                newParent: this,
                newPrevious: this._lastChild,
            });
            if (this.initParentAndAssertNotFirst(item)) {
                this.addToLast(item);
            }
            this._count++;
        });

        this.document.notifyNodeChanged(records);
    }

    private ensureIsChild(item: INode) {
        if (item.parent !== this) {
            Logger.warn(`${item.name} is not a child node of the ${this.name} node`);
            return false;
        }
        return true;
    }

    private initParentAndAssertNotFirst(node: INode) {
        if (node.parent !== this) {
            node.parent = this;
        }
        if (this._firstChild === undefined) {
            this._firstChild = node;
            this._lastChild = node;
            node.previousSibling = undefined;
            node.nextSibling = undefined;
            return false;
        }
        return true;
    }

    private addToLast(item: INode) {
        this._lastChild!.nextSibling = item;
        item.previousSibling = this._lastChild;
        item.nextSibling = undefined;
        this._lastChild = item;
    }

    remove(...items: INode[]): void {
        let records: NodeRecord[] = [];
        items.forEach((item) => {
            if (!this.ensureIsChild(item)) return;
            records.push({
                action: NodeAction.remove,
                node: item,
                newParent: undefined,
                newPrevious: undefined,
                oldParent: this,
                oldPrevious: item.previousSibling,
            });
            this.removeNode(item, true);
        });
        this.document.notifyNodeChanged(records);
    }

    private removeNode(node: INode, nullifyParent: boolean) {
        if (nullifyParent) {
            node.parent = undefined;
        }
        if (this._firstChild === node) {
            if (this._lastChild === node) {
                this._firstChild = undefined;
                this._lastChild = undefined;
            } else {
                this._firstChild = node.nextSibling;
                this._firstChild!.previousSibling = undefined;
                node.nextSibling = undefined;
            }
        } else if (this._lastChild === node) {
            this._lastChild = node.previousSibling;
            this._lastChild!.nextSibling = undefined;
            node.previousSibling = undefined;
        } else {
            node.previousSibling!.nextSibling = node.nextSibling;
            node.nextSibling!.previousSibling = node.previousSibling;
            node.previousSibling = undefined;
            node.nextSibling = undefined;
        }
        this._count--;
    }

    insertBefore(target: INode | undefined, node: INode): void {
        if (target !== undefined && !this.ensureIsChild(target)) return;
        let record: NodeRecord = {
            action: NodeAction.insertBefore,
            node,
            oldParent: undefined,
            oldPrevious: undefined,
            newParent: this,
            newPrevious: target?.previousSibling,
        };
        if (this.initParentAndAssertNotFirst(node)) {
            if (target === undefined || target === this._firstChild) {
                this._firstChild!.previousSibling = node;
                node.nextSibling = this._firstChild;
                this._firstChild = node;
            } else {
                target.previousSibling!.nextSibling = node;
                node.previousSibling = target.previousSibling;
                node.nextSibling = target;
                target.previousSibling = node;
            }
        }
        this._count++;
        this.document.notifyNodeChanged([record]);
    }

    insertAfter(target: INode | undefined, node: INode): void {
        if (target !== undefined && !this.ensureIsChild(target)) return;
        let record: NodeRecord = {
            action: NodeAction.insertAfter,
            oldParent: undefined,
            oldPrevious: undefined,
            newParent: this,
            newPrevious: target,
            node,
        };
        FolderNode.insertNodeAfter(this, target, node);
        this.document.notifyNodeChanged([record]);
    }

    private static insertNodeAfter(parent: FolderNode, target: INode | undefined, node: INode) {
        if (parent.initParentAndAssertNotFirst(node)) {
            if (target === undefined) {
                parent._firstChild!.previousSibling = node;
                node.nextSibling = parent._firstChild;
                parent._firstChild = node;
            } else if (target === parent._lastChild) {
                parent.addToLast(node);
            } else {
                target.nextSibling!.previousSibling = node;
                node.nextSibling = target.nextSibling;
                node.previousSibling = target;
                target.nextSibling = node;
            }
        }
        parent._count++;
    }

    move(child: INode, newParent: FolderNode, previousSibling?: INode): void {
        if (previousSibling !== undefined && previousSibling.parent !== newParent) {
            Logger.warn(`${previousSibling.name} is not a child node of the ${newParent.name} node`);
            return;
        }
        let record: NodeRecord = {
            action: NodeAction.move,
            oldParent: child.parent,
            oldPrevious: child.previousSibling,
            newParent: newParent,
            newPrevious: previousSibling,
            node: child,
        };
        this.removeNode(child, false);
        FolderNode.insertNodeAfter(newParent, previousSibling, child);

        this.document.notifyNodeChanged([record]);
    }

    protected onVisibleChanged() {
        this.setChildrenParentVisible();
    }

    protected onParentVisibleChanged() {
        this.setChildrenParentVisible();
    }

    private setChildrenParentVisible() {
        let child = this._firstChild;
        while (child !== undefined) {
            child.parentVisible = this.visible && this.parentVisible;
            child = child.nextSibling;
        }
    }
}
