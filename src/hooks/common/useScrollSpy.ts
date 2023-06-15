import { useEffect, useRef, useState } from 'react';

/**
 * spying의 대상이 되는 요소들의 id를 담은 ids배열을 전달합니다.
 * 스크롤에 따라 ids배열 중 현재 화면에 보여지고 있는 id를 반환하는 hook입니다.
 *
 */
export const useScrollSpy = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string | null>();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.querySelector(`#${CSS.escape(id)}`));

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) {
            setActiveId(entry.target.getAttribute('id'));
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' },
    );

    elements.forEach((element) => {
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [ids]);

  return activeId;
};
