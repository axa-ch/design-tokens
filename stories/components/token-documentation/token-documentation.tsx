import { type CSSProperties, useState } from "react";
import type { DocumentationCategory, DocumentationToken } from "../../../formats/storybook";

export const CodeExample = ({ label, code }: { label: string; code: string }) => {
  const [status, setStatus] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied.");
    } catch (error) {
      setStatus(`Copy failed: ${error instanceof Error ? error.message : String(error)}. Select and copy the code manually.`);
    }
  };
  return (
    <section className="token-code">
      <header>
        <strong>{label}</strong>
        <button type="button" onClick={copy} aria-label={`Copy ${label} example`}>Copy</button>
      </header>
      <pre><code>{code}</code></pre>
      <span role="status">{status}</span>
    </section>
  );
};

const Preview = ({ preview }: { preview: DocumentationToken["preview"] }) => {
  const style: CSSProperties = Object.fromEntries(
    Object.entries(preview.style).map(([key, value]) => [
      key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()), value,
    ]),
  );
  if (preview.kind === "value") {
    return null;
  }
  return (
    <div className={`token-preview token-preview-${preview.kind}`}>
      <div style={style}>
        {preview.kind === "typography" ? "The quick brown fox" :
          preview.kind === "blur" ? "AXA" :
          preview.kind === "spacing" ? <><span /><span /></> : null}
      </div>
    </div>
  );
};

export const TokenDocumentation = ({
  category,
  desktopBreakpoint,
}: {
  category: DocumentationCategory;
  desktopBreakpoint: string;
}) => {
  const groups = new Map<string, DocumentationToken[]>();
  for (const token of category.tokens) {
    const group = groups.get(token.group) ?? [];
    group.push(token);
    groups.set(token.group, group);
  }
  return (
    <main className="token-documentation">
      <style>{`@media (min-width: ${desktopBreakpoint}) {
        .token-documentation .token-preview-mobile { display: none; }
        .token-documentation .token-preview-desktop { display: block; }
      }`}</style>
      <h1>{category.name}</h1>
      <p>
        Generated from the token exports. Primitive-only collections are excluded;
        foundations explicitly included in this category remain documented.
      </p>
      <p>
        Responsive values use Mobile by default and Desktop from {desktopBreakpoint}.
        CSS requires a custom-media processor; the SCSS mixin emits native media queries.
        Tailwind includes native media queries; JavaScript exposes explicit <code>xs</code> and <code>lg</code> values.
      </p>
      <p>See <a href="./?path=/docs/platforms--docs" target="_top">Platforms</a> for installation and setup.</p>
      <nav aria-label="Token groups">
        {[...groups.keys()].map((group) => (
          <a key={group} href={`#${encodeURIComponent(group)}`}>{group}</a>
        ))}
      </nav>
      {[...groups].map(([group, tokens]) => (
        <section key={group} id={group}>
          <h2>{group}</h2>
          {tokens.map((token) => (
            <article key={token.path} className="token-card">
              <h3><code>{token.path}</code></h3>
              {token.description && <p>{token.description}</p>}
              <dl>
                <dt>{token.desktopValue === undefined ? "Value" : "Mobile"}</dt>
                <dd><code>{token.value}</code></dd>
                {token.desktopValue !== undefined && <>
                  <dt>Desktop (from {desktopBreakpoint})</dt>
                  <dd><code>{token.desktopValue}</code></dd>
                </>}
              </dl>
              {token.desktopPreview ? <>
                <div className="token-preview-mobile"><Preview preview={token.preview} /></div>
                <div className="token-preview-desktop"><Preview preview={token.desktopPreview} /></div>
              </> : <Preview preview={token.preview} />}
              <details>
                <summary>Usage examples</summary>
                <CodeExample label="CSS" code={token.usage.css} />
                <CodeExample label="SCSS" code={token.usage.scss} />
                <CodeExample label="JavaScript" code={token.usage.js} />
                <CodeExample label="Tailwind" code={token.usage.tailwind} />
              </details>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
};
