import { useState } from 'react';
import { SECOND_LOGIN_ATTEMPT_ERROR } from 'constants/index';
import { getIsNativeAuthSingingForbidden } from 'services/nativeAuth/helpers';
import { useDappModal } from 'UI/DappModal';
import { useGetIsLoggedIn } from '../account';

export interface UseGetModalLoginMethodsPropsType {
  hideButtonWhenModalOpens?: boolean;
  onModalCloses?: (props?: any) => void;
  onModalOpens?: (props?: any) => void;
  token: string | undefined;
  wrapContentInsideModal: boolean;
}

export const useGetModalLoginMethods = ({
  hideButtonWhenModalOpens,
  onModalCloses,
  onModalOpens,
  token,
  wrapContentInsideModal
}: UseGetModalLoginMethodsPropsType) => {
  const isLoggedIn = useGetIsLoggedIn();
  const [showContent, setShowContent] = useState(false);
  const { handleShowModal, handleHideModal } = useDappModal();
  const disabledConnectButton = getIsNativeAuthSingingForbidden(token);
  const shouldRenderButton = !hideButtonWhenModalOpens || !showContent;

  const handleOpenModal = () => {
    if (isLoggedIn) {
      throw new Error(SECOND_LOGIN_ATTEMPT_ERROR);
    }

    if (wrapContentInsideModal) {
      handleShowModal();
      onModalOpens?.();
    } else {
      setShowContent(true);
    }
  };

  const handleCloseModal = () => {
    if (wrapContentInsideModal) {
      handleHideModal();
      onModalCloses?.();
    } else {
      setShowContent(false);
    }
  };

  return {
    disabledConnectButton,
    handleCloseModal,
    handleOpenModal,
    shouldRenderButton,
    showContent
  };
};
