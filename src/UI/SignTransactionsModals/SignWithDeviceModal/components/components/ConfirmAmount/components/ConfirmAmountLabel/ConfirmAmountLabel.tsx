import React from 'react';
import BigNumber from 'bignumber.js';

import { withStyles } from 'hocs/withStyles';
import { NftEnumType } from 'types/tokens.types';

import { WithStylesImportType } from '../../../../../../../../hocs/useStyles';

interface ConfirmAmountLabelPropsType extends WithStylesImportType {
  type?: NftEnumType;
  amount: string;
}

const ConfirmAmountLabelComponent = ({
  amount,
  styles,
  type
}: ConfirmAmountLabelPropsType) => {
  const amountBigNumber = new BigNumber(amount);
  const isAmountZero = amountBigNumber.isZero();
  const sftLabel = amountBigNumber.isEqualTo(1) ? 'SFT' : 'SFTs';
  const amountToLocaleString = amountBigNumber.toNumber().toLocaleString('en');

  if (isAmountZero) {
    return <div className={styles?.confirmAmountLabel}>You are using</div>;
  }

  if (type === NftEnumType.NonFungibleESDT) {
    return (
      <div className={styles?.confirmAmountLabel}>You are sending an NFT</div>
    );
  }

  if (type === NftEnumType.SemiFungibleESDT) {
    return (
      <div className={styles?.confirmAmountLabel}>
        <span className={styles?.confirmAmountLabelText}>You are sending</span>
        <span className={styles?.confirmAmountLabelValue}>
          {amountToLocaleString} {sftLabel}
        </span>
      </div>
    );
  }

  return <div className={styles?.confirmAmountLabel}>You are sending</div>;
};

export const ConfirmAmountLabel = withStyles(ConfirmAmountLabelComponent, {
  ssrStyles: () =>
    import(
      'UI/SignTransactionsModals/SignWithDeviceModal/components/components/ConfirmAmount/components/ConfirmAmountLabel/confirmAmountLabelStyles.scss'
    ),
  clientStyles: () =>
    require('UI/SignTransactionsModals/SignWithDeviceModal/components/components/ConfirmAmount/components/ConfirmAmountLabel/confirmAmountLabelStyles.scss')
      .default
});
