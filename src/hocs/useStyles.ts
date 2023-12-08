export type WithStylesImportType = {
  globalStyles?: Record<any, any>;
  styles?: Record<any, any>;
};

export function useStyles({
  clientImportCallback
}: {
  clientImportCallback?: () => Record<any, any>;
}) {
  return {
    globalStyles: require('assets/sass/main.scss').default,
    styles: clientImportCallback?.()
  };
}
