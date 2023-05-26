import Dialog from '~/components/dialog/Dialog';
import { HEAD_1 } from '~/styles/typo';

interface Props {
  isShowing: boolean;

  onAction: () => void;
  onClose: () => void;
}

const CreateStopDialog = ({ onClose, onAction, isShowing }: Props) => {
  return (
    <Dialog
      isShowing={isShowing}
      onClickOutside={onClose}
      title={<Dialog.Title titleCss={HEAD_1}>{`질문 폼 생성을\n그만두시겠어요?`}</Dialog.Title>}
      description={<Dialog.Description>이제까지 작성한 내용이 모두 사라져요.</Dialog.Description>}
      cancelButton={<Dialog.CancelButton onClick={onClose}>돌아갈래요</Dialog.CancelButton>}
      confirmButton={<Dialog.ConfirmButton onClick={onAction}>네</Dialog.ConfirmButton>}
    />
  );
};

export default CreateStopDialog;
