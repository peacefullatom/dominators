const ApplyCssStyle = (
  element: HTMLElement,
  style: Partial<CSSStyleDeclaration>
): void => {
  if (element && style) {
    Object.keys(style).forEach(
      s => ((element.style as any)[s] = (style as any)[s])
    );
  }
};

export default ApplyCssStyle;
