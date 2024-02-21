import Card from '~/features/gallery/Card';
import GalleryHeader from '~/pages/gallery/Header';

// src/pages/dna/[id].page.tsx 참고

const userInfoDummy = {
  target_id: 456757256080644900,
  nickname: '수미',
  position: '프론트엔드 개발자',
};

const dnaInfoDummy = {
  title: '활동적인 외교관 DNA',
  descriptions: [
    '팀의 분위기 메이커인 당신은 뛰어난 스피치 능력과 긍정적인 에너지로 팀에 사기를 불어넣어요.',
    '뛰어난 사회성으로 의견을 조율하며 팀을 하나로 모아주는 역할을 해요.',
  ],
  fitDna: {
    title: '철두철미한 설계자',
    subtitle: '작은 것도 놓치지 않는 장인정신',
  },
};

function Gallery() {
  return (
    <div>
      <GalleryHeader />
      <Card
        nickname={userInfoDummy.nickname}
        position={userInfoDummy.position}
        dnaTitle={dnaInfoDummy.title}
        projectCount={5}
        feedbackCount={3}
        savedCount={2}
      />
    </div>
  );
}

export default Gallery;
