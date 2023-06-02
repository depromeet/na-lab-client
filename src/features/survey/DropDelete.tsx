import { useCallback, useRef, useState } from 'react';
import { css } from '@emotion/react';

const DropDelete = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  console.log('isDragging: ', isDragging);

  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDragIn: ');
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    console.log('handleDragOut: ');
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDragOver: ');

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDrop: ');

    // onChangeFiles(e);
    setIsDragging(false);
  }, []);

  // const initDragEvents = useCallback((): void => {
  //   // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

  //   if (dragRef.current !== null) {
  //     dragRef.current.addEventListener('dragenter', handleDragIn);
  //     dragRef.current.addEventListener('dragleave', handleDragOut);
  //     dragRef.current.addEventListener('dragover', handleDragOver);
  //     dragRef.current.addEventListener('drop', handleDrop);
  //   }
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // const resetDragEvents = useCallback((): void => {
  //   // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

  //   if (dragRef.current !== null) {
  //     dragRef.current.removeEventListener('dragenter', handleDragIn);
  //     dragRef.current.removeEventListener('dragleave', handleDragOut);
  //     dragRef.current.removeEventListener('mouseover', handleDragOver);
  //     dragRef.current.removeEventListener('drop', handleDrop);
  //   }
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  // useEffect(() => {
  //   initDragEvents();

  //   return () => resetDragEvents();
  // }, [initDragEvents, resetDragEvents]);

  return (
    <div
      css={css`
        width: 100px;
        height: 100px;
        background-color: red;
      `}
      ref={dragRef}
      onMouseEnter={() => {
        console.log('onMouseEnter: ');
      }}
      onPointerUp={() => {
        console.log('onPointerUp: ');
      }}
    >
      DropDelete
    </div>
  );
};

export default DropDelete;
