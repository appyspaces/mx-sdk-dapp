import React from 'react';
import globalStyles from 'assets/sass/main.scss';
import { Denominate } from 'UI/Denominate';
import { getAccountBalance } from 'utils';

interface AddressRowType {
  selectedAddress?: string;
  index: number;
  address: string;
  onSelectAddress: (address: { address: string; index: number } | null) => void;
}

// TODO: why not use Trim component?
const trimHash = (hash: string, keep = 10) => {
  const start = hash.substring(0, keep);
  const end = hash.substring(hash.length - keep);
  return `${start}...${end}`;
};

const noBalance = '...';

export const AddressRow = ({
  address,
  index,
  selectedAddress,
  onSelectAddress
}: AddressRowType) => {
  const [balance, setBalance] = React.useState(noBalance);

  const handleChange = (e: React.SyntheticEvent) => {
    const { checked } = e.target as HTMLInputElement;
    if (checked) {
      onSelectAddress({ address, index });
    }
  };

  const fetchBalance = async () => {
    try {
      const balance = await getAccountBalance(address);
      setBalance(balance);
    } catch (err) {
      console.error('error fetching balance', err, balance);
    }
  };

  React.useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <tr>
      <td className={globalStyles.textLeft}>
        <div
          className={`
            ${globalStyles.flexRow}
            ${globalStyles.alignItemsStart}
            ${globalStyles.textLeft}
            ${globalStyles.formCheck}
          `}
        >
          <input
            type='radio'
            id={`check_${index}`}
            data-testid={`check_${index}`}
            onChange={handleChange}
            role='button'
            checked={selectedAddress === address}
            className={`${globalStyles.formCheckInput} ${globalStyles.mr1}`}
          />
          <label
            htmlFor={`check_${index}`}
            role='button'
            data-testid={`label_${index}`}
            className={`
              ${globalStyles.formCheckLabel}
              ${globalStyles.textNowrap}
              ${globalStyles.m0}
            `}
          >
            <div
              className={`
                ${globalStyles.flexRow}
                ${globalStyles.alignItemsCenter}
                ${globalStyles.textNowrap}
                ${globalStyles.trim}
              `}
            >
              <span>{trimHash(address)}</span>
            </div>
          </label>
        </div>
      </td>
      <td className={globalStyles.textLeft}>
        <Denominate value={balance} />
      </td>
      <td className={globalStyles.textLeft}>{index}</td>
    </tr>
  );
};

export default AddressRow;
