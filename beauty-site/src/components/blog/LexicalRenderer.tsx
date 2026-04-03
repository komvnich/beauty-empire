import type { ReactNode } from "react";

interface LexicalRootNode {
  type: "root";
  children: LexicalNode[];
}

interface LexicalParagraphNode {
  type: "paragraph";
  children: LexicalNode[];
}

interface LexicalHeadingNode {
  type: "heading";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: LexicalNode[];
}

interface LexicalListNode {
  type: "list";
  listType?: "bullet" | "number";
  children: LexicalNode[];
}

interface LexicalListItemNode {
  type: "listitem";
  children: LexicalNode[];
}

interface LexicalQuoteNode {
  type: "quote";
  children: LexicalNode[];
}

interface LexicalLinkNode {
  type: "link";
  url?: string;
  children: LexicalNode[];
}

interface LexicalLineBreakNode {
  type: "linebreak";
}

interface LexicalTextNode {
  type: "text";
  text?: string;
  format?: number;
}

interface LexicalUnknownNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
}

type LexicalNode =
  | LexicalRootNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListNode
  | LexicalListItemNode
  | LexicalQuoteNode
  | LexicalLinkNode
  | LexicalLineBreakNode
  | LexicalTextNode
  | LexicalUnknownNode;

interface LexicalDocument {
  root?: LexicalRootNode;
}

interface LexicalRendererProps {
  value: string;
}

function applyTextFormat(text: string, format: number): ReactNode {
  let content: ReactNode = text;
  if (format & 1) content = <strong>{content}</strong>;
  if (format & 2) content = <em>{content}</em>;
  if (format & 8) content = <span className="underline">{content}</span>;
  if (format & 16) content = <span className="line-through">{content}</span>;
  if (format & 64) content = <code className="bg-white/10 px-1.5 py-0.5 rounded">{content}</code>;
  return content;
}

function renderChildren(children: LexicalNode[] | undefined, keyPrefix: string): ReactNode {
  if (!children?.length) return null;
  return children.map((child, index) => renderNode(child, `${keyPrefix}-${index}`));
}

function renderNode(node: LexicalNode, key: string): ReactNode {
  if (node.type === "text") {
    const textNode = node as LexicalTextNode;
    const text = textNode.text ?? "";
    const format = textNode.format ?? 0;
    return <span key={key}>{applyTextFormat(text, format)}</span>;
  }
  if (node.type === "linebreak") {
    return <br key={key} />;
  }
  if (node.type === "paragraph") {
    return (
      <p key={key} className="text-white/85 text-xl leading-9 font-sans">
        {renderChildren(node.children, key)}
      </p>
    );
  }
  if (node.type === "heading") {
    const headingNode = node as LexicalHeadingNode;
    const tag = headingNode.tag ?? "h2";
    if (tag === "h1") return <h1 key={key} className="text-white text-5xl font-medium leading-tight">{renderChildren(headingNode.children, key)}</h1>;
    if (tag === "h2") return <h2 key={key} className="text-white text-4xl font-medium leading-tight mt-10">{renderChildren(headingNode.children, key)}</h2>;
    if (tag === "h3") return <h3 key={key} className="text-white text-3xl font-medium leading-tight mt-8">{renderChildren(headingNode.children, key)}</h3>;
    return <h4 key={key} className="text-white text-2xl font-medium leading-tight mt-6">{renderChildren(headingNode.children, key)}</h4>;
  }
  if (node.type === "list") {
    const listNode = node as LexicalListNode;
    if (listNode.listType === "number") {
      return <ol key={key} className="list-decimal pl-6 text-white/85 text-xl leading-9 space-y-2">{renderChildren(listNode.children, key)}</ol>;
    }
    return <ul key={key} className="list-disc pl-6 text-white/85 text-xl leading-9 space-y-2">{renderChildren(listNode.children, key)}</ul>;
  }
  if (node.type === "listitem") {
    const listItemNode = node as LexicalListItemNode;
    return <li key={key}>{renderChildren(listItemNode.children, key)}</li>;
  }
  if (node.type === "quote") {
    const quoteNode = node as LexicalQuoteNode;
    return <blockquote key={key} className="border-l-2 border-gold/60 pl-6 text-white/80 italic text-2xl leading-10">{renderChildren(quoteNode.children, key)}</blockquote>;
  }
  if (node.type === "link") {
    const linkNode = node as LexicalLinkNode;
    const href = linkNode.url ?? "#";
    return <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">{renderChildren(linkNode.children, key)}</a>;
  }
  if ("children" in node && Array.isArray(node.children)) {
    return <span key={key}>{renderChildren(node.children, key)}</span>;
  }
  const unknownNode = node as LexicalUnknownNode;
  return <span key={key}>{unknownNode.text ?? ""}</span>;
}

export function LexicalRenderer({ value }: LexicalRendererProps) {
  try {
    const parsed = JSON.parse(value) as LexicalDocument;
    const root = parsed.root;
    if (!root?.children?.length) return null;
    return <div className="flex flex-col gap-6">{renderChildren(root.children, "lexical")}</div>;
  } catch {
    return null;
  }
}
