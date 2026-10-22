import type { CodeLine } from "@/lib/projects";

interface Props {
  lines: CodeLine[];
  language?: string;
  caption?: string;
}

export function CodeBlock({ lines, language = "csharp", caption }: Props) {
  return (
    <figure className="code-block">
      <div className="code-block__head">
        <span className="code-block__lang mono mono--xs">{language}</span>
        {caption && (
          <span className="code-block__caption mono mono--xs">{caption}</span>
        )}
      </div>
      <pre className="code-block__pre">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="code-block__line">
              <span className="code-block__code">{line.code || "\u00A0"}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
