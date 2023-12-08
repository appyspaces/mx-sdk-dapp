import React, { PropsWithChildren } from 'react';
import { withStyles, WithStylesImportType } from 'hocs/withStyles';

const SharedToastFooterComponent = ({
  children,
  styles
}: PropsWithChildren & WithStylesImportType) => {
  return <div className={styles?.footer}>{children}</div>;
};

export const SharedToastFooter = withStyles(SharedToastFooterComponent, {
  clientStyles: () =>
    require('UI/TransactionsToastList/components/TransactionToast/transactionToast.styles.scss')
      .default
});
