// Copyright 2022-2023 the Chili authors. All rights reserved. MPL-2.0 license.

import { Binding } from "./binding";
import { Localize } from "./localize";

/**
 * The setting parameters for HTMLElement, where each key corresponds to a key in the HTMLElement.
 */
export interface Options {
    id?: string | Binding;
    textContent?: string | Binding | Localize;
    className?: string | Binding;
    onclick?: (e: MouseEvent) => void;
}

export interface ImgOptions extends Options {
    src?: string | Binding;
}

export interface AOptions extends Options {
    href?: string | Binding;
}

export interface SelectOptions extends Options {
    onchange?: (e: Event) => void;
}

export type ChildDom = string | Node;
type Tags = keyof HTMLElementTagNameMap;

function createFunction<K extends Tags, O extends Options = Options>(tag: K) {
    return function (options?: O | ChildDom, ...children: readonly ChildDom[]) {
        let dom: HTMLElementTagNameMap[K] = document.createElement(tag);
        if (options) {
            if (typeof options === "string" || options instanceof Node) {
                dom.append(options);
            } else if (typeof options === "object") {
                setOptions(options, dom);
            } else {
                throw new Error("Invalid options");
            }
        }
        dom.append(...children);
        return dom;
    };
}

function setOptions<O extends Options, K extends Tags>(
    options: O,
    dom: HTMLElementTagNameMap[K] | SVGElement
) {
    for (const key of Object.keys(options)) {
        const value = (options as any)[key];
        if (value instanceof Binding) {
            value.add(dom, key as any);
        } else if (value instanceof Localize && dom instanceof HTMLElement && key === "textContent") {
            value.set(dom);
        } else if (key in dom) {
            (dom as any)[key] = value;
        }
    }
}

export const div = createFunction("div");
export const span = createFunction("span");
export const button = createFunction("button");
export const input = createFunction("input");
export const textarea = createFunction("textarea");
export const select = createFunction<"select", SelectOptions>("select");
export const option = createFunction("option");
export const label = createFunction("label");
export const img = createFunction<"img", ImgOptions>("img");
export const a = createFunction<"a", AOptions>("a");
export const br = createFunction("br");
export const hr = createFunction("hr");
export const pre = createFunction("pre");
export const code = createFunction("code");
export const h1 = createFunction("h1");
export const h2 = createFunction("h2");
export const h3 = createFunction("h3");
export const h4 = createFunction("h4");
export const h5 = createFunction("h5");
export const h6 = createFunction("h6");
export const p = createFunction("p");
export const ul = createFunction("ul");
export const li = createFunction("li");

export interface SvgOptions extends Options {
    icon: string;
}

export function svg(option: SvgOptions) {
    const ns = "http://www.w3.org/2000/svg";
    const childNS = "http://www.w3.org/1999/xlink";
    const child = document.createElementNS(ns, "use");
    child.setAttributeNS(childNS, "xlink:href", `#${option.icon}`);
    let svg = document.createElementNS(ns, "svg");
    svg.append(child);
    setOptions(option, svg);

    return svg;
}
