export const DEFAULT_STYLE = `:root {
  --color-icon-background: #1e2024;
  --color-icon-text: #f5f5f5;
  --color-ts-module: #e358ff;
  --color-ts-namespace: #e358ff;
  --color-ts-enum: #f4d93e;
  --color-ts-variable: #798dff;
  --color-ts-function: #a280ff;
  --color-ts-class: #8ac4ff;
  --color-ts-interface: #6cff87;
  --color-ts-constructor: #8ac4ff;
  --color-ts-property: #ff984d;
  --color-ts-method: #ff4db8;
  --color-ts-reference: #ff4d82;
  --color-ts-accessor: #ff6060;
  --color-ts-type-alias: #ff6492;
  --color-document: #ffffff;
}

.typedoc-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 32px 80px;
}

.typedoc-index {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

.typedoc-index > a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.typedoc-signature {
  overflow-x: auto;
  margin: 16px 0;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  background: #1e1e1e;
  font-family: var(--font-geist-mono), ui-monospace, monospace;
  font-size: 12px;
}

.typedoc-member-group {
  margin-top: 40px;
}

.typedoc-member-group > h2 {
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.typedoc-member {
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.typedoc-member h3 {
  font-family: var(--font-geist-mono), ui-monospace, monospace;
}

.typedoc-sources {
  margin-top: 14px;
  font-size: 11px;
  color: #71717a;
}
`;
