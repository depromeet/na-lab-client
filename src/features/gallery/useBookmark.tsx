import CheckCircleIcon from '~/components/icons/CheckCircleIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { useAddBookmark, useCancelBookmark } from '~/hooks/api/gallery/usePostBookmark';

const useBookmark = ({ surveyId, refetch }: { surveyId: string; refetch?: () => void }) => {
  const { fireToast } = useToast();

  const { mutate: addBookmark } = useAddBookmark(surveyId, {
    onSuccess: () => {
      fireToast({
        content: (
          <>
            <CheckCircleIcon />
            <Toast.Text>명함을 저장했어요</Toast.Text>
          </>
        ),
      });

      refetch?.();
    },
  });

  const { mutate: cancelBookmark } = useCancelBookmark(surveyId, {
    onSuccess: () => {
      refetch?.();
    },
  });

  return {
    cancelBookmark,
    addBookmark,
  };
};

export default useBookmark;
