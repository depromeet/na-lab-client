import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import CheckCircleIcon from '~/components/icons/CheckCircleIcon';
import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
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

  const [step, setStep] = useState<OpenStateType>('initial');
  const [selectJob, setSelectJob] = useState<JobType>('PM');

  const { mutate } = usePostGallery({
    onSuccess: () => {
      setStep('initial');

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
      <InducePublishCard onSubmit={() => setStep('job-select')} />
      <JobSelectModal
        isShowing={step === 'job-select'}
        onClose={() => setStep('initial')}
        onSubmit={(job) => {
          setSelectJob(job);
          setStep('publish-card');
        }}
      />
      {selectJob && (
        <CardPublishBottomSheet
          isShowing={step === 'publish-card'}
          onClose={() => setStep('initial')}
          job={selectJob}
          onSubmit={onSubmit}
        />
      )}
    </AnimatePresence>
  );
}

export default PublishMyCard;
