export const viewTransitionConfigData = (params: {
  cssSelector: string;
}): { viewTransitionWaitForCssSelector: string } => {
  return {
    viewTransitionWaitForCssSelector: params.cssSelector,
  };
};
