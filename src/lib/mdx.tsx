"use client";

import React from "react";

// ---------------------------------------------------------------------------
// Inline markdown parser helpers
// ---------------------------------------------------------------------------

/** Escape HTML entities so raw content is safe to render via dangerouslySetInnerHTML. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Process inline markdown: bold, italic, inline code, and links. */
function processInline(text: string): string {
  let result = escapeHtml(text);

  // Inline code – must come before bold/italic so backtick content is preserved
  result = result.replace(
    /`([^`]+)`/g,
    '<code style="font-family:\'JetBrains Mono\',ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.875em;padding:0.15em 0.35em;border-radius:4px;background:var(--md-code-bg);color:var(--md-code-fg)">$1</code>'
  );

  // Bold + italic
  result = result.replace(
    /\*\*\*(.+?)\*\*\*/g,
    "<strong><em>$1</em></strong>"
  );

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links [text](url)
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--md-link);text-decoration:underline;text-underline-offset:2px">$1</a>'
  );

  return result;
}

// ---------------------------------------------------------------------------
// Block-level markdown → HTML
// ---------------------------------------------------------------------------

function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const htmlParts: string[] = [];

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Fenced code block ────────────────────────────────────────────────
    if (line.trimStart().startsWith("```")) {
      const lang = line.trimStart().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const code = escapeHtml(codeLines.join("\n"));
      htmlParts.push(
        `<div style="margin:1.5em 0;border-radius:8px;overflow:hidden;background:var(--md-pre-bg)">` +
          (lang
            ? `<div style="padding:0.4em 1em;font-size:0.75em;font-family:'JetBrains Mono',monospace;color:var(--md-pre-label);border-bottom:1px solid var(--md-border);text-transform:uppercase;letter-spacing:0.05em">${escapeHtml(lang)}</div>`
            : "") +
          `<pre style="margin:0;padding:1em;overflow-x:auto;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:0.875em;line-height:1.7;color:var(--md-pre-fg)"><code>${code}</code></pre></div>`
      );
      continue;
    }

    // ── Horizontal rule ──────────────────────────────────────────────────
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line.trim())) {
      htmlParts.push(
        '<hr style="border:none;border-top:1px solid var(--md-border);margin:2em 0" />'
      );
      i++;
      continue;
    }

    // ── Headings ─────────────────────────────────────────────────────────
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = processInline(headingMatch[2]);
      const sizes: Record<number, string> = {
        1: "2em",
        2: "1.65em",
        3: "1.35em",
        4: "1.15em",
        5: "1em",
        6: "0.9em",
      };
      const margins: Record<number, string> = {
        1: "1.2em 0 0.6em",
        2: "1.1em 0 0.5em",
        3: "1em 0 0.45em",
        4: "0.9em 0 0.4em",
        5: "0.8em 0 0.35em",
        6: "0.75em 0 0.3em",
      };
      htmlParts.push(
        `<h${level} style="font-size:${sizes[level]};font-weight:900;margin:${margins[level]};line-height:1.25;color:var(--md-heading)">${text}</h${level}>`
      );
      i++;
      continue;
    }

    // ── Blockquote ───────────────────────────────────────────────────────
    if (line.trimStart().startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("> ")) {
        quoteLines.push(lines[i].trimStart().slice(2));
        i++;
      }
      htmlParts.push(
        `<blockquote style="margin:1.25em 0;padding:0.75em 1.25em;border-left:3px solid var(--md-bq-border);color:var(--md-bq-fg);font-style:italic;background:var(--md-bq-bg);border-radius:0 6px 6px 0">${quoteLines.map((l) => `<p style="margin:0.4em 0">${processInline(l)}</p>`).join("")}</blockquote>`
      );
      continue;
    }

    // ── Unordered list ───────────────────────────────────────────────────
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(processInline(lines[i].replace(/^\s*[-*+]\s+/, "")));
        i++;
      }
      htmlParts.push(
        `<ul style="margin:1em 0;padding-left:1.5em;line-height:1.8;color:var(--md-body)">${items.map((it) => `<li style="margin:0.25em 0">${it}</li>`).join("")}</ul>`
      );
      continue;
    }

    // ── Ordered list ─────────────────────────────────────────────────────
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(processInline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      htmlParts.push(
        `<ol style="margin:1em 0;padding-left:1.5em;line-height:1.8;color:var(--md-body)">${items.map((it) => `<li style="margin:0.25em 0">${it}</li>`).join("")}</ol>`
      );
      continue;
    }

    // ── Blank line ───────────────────────────────────────────────────────
    if (line.trim() === "") {
      i++;
      continue;
    }

    // ── Paragraph (default) ──────────────────────────────────────────────
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trimStart().startsWith("```") &&
      !lines[i].match(/^#{1,6}\s+/) &&
      !lines[i].trimStart().startsWith("> ") &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(\*{3,}|-{3,}|_{3,})\s*$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      htmlParts.push(
        `<p style="margin:1em 0;line-height:1.8;color:var(--md-body)">${processInline(paraLines.join(" "))}</p>`
      );
    }
  }

  return htmlParts.join("\n");
}

// ---------------------------------------------------------------------------
// CSS custom properties for light / dark theming
// ---------------------------------------------------------------------------

const CSS_VARS = `
  :root {
    --md-heading: #18181b;
    --md-body: #3f3f46;
    --md-code-bg: #f4f4f5;
    --md-code-fg: #18181b;
    --md-pre-bg: #f4f4f5;
    --md-pre-fg: #27272a;
    --md-pre-label: #71717a;
    --md-border: #d4d4d8;
    --md-bq-border: #a1a1aa;
    --md-bq-fg: #52525b;
    --md-bq-bg: #fafafa;
    --md-link: #18181b;
  }

  .dark {
    --md-heading: #ffffff;
    --md-body: #d4d4d8;
    --md-code-bg: #18181b;
    --md-code-fg: #e4e4e7;
    --md-pre-bg: #18181b;
    --md-pre-fg: #d4d4d8;
    --md-pre-label: #71717a;
    --md-border: #3f3f46;
    --md-bq-border: #3f3f46;
    --md-bq-fg: #a1a1aa;
    --md-bq-bg: #09090b;
    --md-link: #e4e4e7;
  }

  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
      --md-heading: #ffffff;
      --md-body: #d4d4d8;
      --md-code-bg: #18181b;
      --md-code-fg: #e4e4e7;
      --md-pre-bg: #18181b;
      --md-pre-fg: #d4d4d8;
      --md-pre-label: #71717a;
      --md-border: #3f3f46;
      --md-bq-border: #3f3f46;
      --md-bq-fg: #a1a1aa;
      --md-bq-bg: #09090b;
      --md-link: #e4e4e7;
    }
  }
`;

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = React.useMemo(() => markdownToHtml(content), [content]);

  return (
    <>
      {/* Inject CSS custom properties once */}
      <style dangerouslySetInnerHTML={{ __html: CSS_VARS }} />

      <article
        className="markdown-body"
        style={{
          maxWidth: "72ch",
          margin: "0 auto",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
          fontSize: "1.0625rem",
          lineHeight: 1.8,
          color: "var(--md-body)",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Convenience helper – converts a markdown string to a JSX element
// ---------------------------------------------------------------------------

export function renderMarkdownToJSX(content: string): React.ReactElement {
  return <MarkdownRenderer content={content} />;
}

// Default export
export default MarkdownRenderer;
