import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import CheckCircleIcon from '~/components/icons/CheckCircleIcon';
import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import CardPublishBottomSheet from '~/features/gallery/PublishMyCard/CardPublishBottomSheet';
import InducePublishCard from '~/features/gallery/PublishMyCard/InducePublishCard';
import JobSelectModal from '~/features/gallery/PublishMyCard/JobSelectModal';
import usePostGallery from '~/hooks/api/gallery/usePostGallery';
import { type JobType } from '~/remotes/gallery';

type OpenStateType = 'job-select' | 'publish-card' | 'initial';

interface Props {
  onSubmit: () => void;
}

function PublishMyCard(props: Props) {
  const { fireToast } = useToast();

  const { isOpen, onClose } = useCardOpenState();
  const [openState, setOpenState] = useState<OpenStateType>('initial');
  const [selectJob, setSelectJob] = useState<JobType>('PM');

  const { mutate } = usePostGallery({
    onSuccess: () => {
      setOpenState('initial');

      fireToast({
        content: (
          <>
            <CheckCircleIcon />
            <Toast.Text>내 커리어 명함을 게시했어요</Toast.Text>
          </>
        ),
      });

      props.onSubmit();
    },
    onError: () => {
      // TODO: 에러 처리 (지금은 임시)
      fireToast({
        content: (
          <>
            <WarningIcon />
            <Toast.Text>오류가 발생했습니다. 다시 시도해주세요.</Toast.Text>
          </>
        ),
        higherThanCTA: true,
      });
    },
  });

  const onSubmit = () => {
    mutate({ job: selectJob });
  };

  return (
    <AnimatePresence>
      {isOpen ? <InducePublishCard onSubmit={() => setOpenState('job-select')} onClose={onClose} /> : null}
      <JobSelectModal
        isShowing={openState === 'job-select'}
        onClose={() => setOpenState('initial')}
        onSubmit={(job) => {
          setSelectJob(job);
          setOpenState('publish-card');
        }}
      />
      {selectJob && (
        <CardPublishBottomSheet
          isShowing={openState === 'publish-card'}
          onClose={() => setOpenState('initial')}
          job={selectJob}
          onSubmit={onSubmit}
        />
      )}
    </AnimatePresence>
  );
}

export default PublishMyCard;

const useCardOpenState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    localStorage.setItem(LOCAL_STORAGE_KEY.galleryCardLead, 'true');
  };

  useEffect(() => {
    const isGalleryCardLead = localStorage.getItem(LOCAL_STORAGE_KEY.galleryCardLead);
    if (!isGalleryCardLead) {
      setIsOpen(true);
    }
  }, []);

  return { isOpen, onClose };
};
