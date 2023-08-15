// Copyright 2022-2023 the Chili authors. All rights reserved. MPL-2.0 license.

import {
    Application,
    Constants,
    History,
    IDocument,
    IModel,
    INode,
    INodeLinkedList,
    ISerialize,
    IVisual,
    Id,
    Logger,
    NodeAction,
    NodeLinkedList,
    NodeRecord,
    Observable,
    PubSub,
    SelectionManager,
    Serialized,
    Serializer,
} from "chili-core";

export class Document extends Observable implements IDocument, ISerialize {
    readonly visual: IVisual;
    readonly history: History;
    readonly selection: SelectionManager;

    private _name: string;

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this.setProperty("name", name);
    }

    private _rootNode: INodeLinkedList | undefined;

    get rootNode(): INodeLinkedList {
        if (this._rootNode === undefined) {
            this._rootNode = new NodeLinkedList(this, this._name);
        }
        return this._rootNode;
    }

    private _currentNode?: INodeLinkedList;

    get currentNode(): INodeLinkedList | undefined {
        return this._currentNode;
    }

    set currentNode(value: INodeLinkedList | undefined) {
        this.setProperty("currentNode", value);
    }

    constructor(name: string, readonly id: string = Id.new()) {
        super();
        this._name = name;
        this.history = new History();
        this.visual = Application.instance.visualFactory.create(this);
        this.selection = new SelectionManager(this);
        PubSub.default.sub("nodeLinkedListChanged", this.handleModelChanged);
        Logger.info(`new document: ${name}`);
    }

    override serialize(): Serialized {
        return {
            className: Document.name,
            constructorParameters: {
                id: this.id,
                name: this.name,
            },
            properties: {
                rootNode: this.rootNode.serialize(),
            },
        };
    }

    override dispose(): void {
        super.dispose();
        this.visual.dispose();
        this.history.dispose();
        this.selection.dispose();
        this._rootNode?.dispose();
        this._rootNode = undefined;
        this._currentNode = undefined;
    }

    async save() {
        let data = this.serialize();
        await Application.instance.storage.put(Constants.DBName, Constants.DocumentTableName, this.id, data);
    }

    async close() {
        // await this.save();
        this.dispose();
        Logger.info(`document: ${this._name} closed`);
        PubSub.default.pub("documentClosed", this);
    }

    static async open(id: string) {
        let data = (await Application.instance.storage.get(
            Constants.DBName,
            Constants.DocumentTableName,
            id
        )) as Serialized;
        if (data === undefined) {
            Logger.warn(`document: ${id} not find`);
            return;
        }
        let document = this.load(data);
        Logger.info(`document: ${document.name} opened`);
        return document;
    }

    private static load(data: Serialized) {
        let document = new Document(data.constructorParameters["name"], data.constructorParameters["id"]);
        document.history.disabled = true;
        document._rootNode = Serializer.deserialize(document, data.properties["rootNode"]);
        document.history.disabled = false;
        return document;
    }

    private handleModelChanged = (records: NodeRecord[]) => {
        let adds: INode[] = [];
        let rms: INode[] = [];
        records.forEach((x) => {
            if (x.action === NodeAction.add) {
                INode.addNodeOrChildrenToNodes(adds, x.node);
            } else if (x.action === NodeAction.remove) {
                INode.addNodeOrChildrenToNodes(rms, x.node);
            }
        });
        this.visual.context.addModel(adds.filter((x) => !INode.isLinkedListNode(x)) as IModel[]);
        this.visual.context.removeModel(rms.filter((x) => !INode.isLinkedListNode(x)) as IModel[]);
    };

    addNode(...nodes: INode[]): void {
        (this.currentNode ?? this.rootNode).add(...nodes);
    }
}
