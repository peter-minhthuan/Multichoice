import React, { createRef, useEffect, useState } from 'react';
import { classNames } from '../../helper/classNames';
import Modal from '../Modal/Modal';
import './Polacode.scss';
interface IPolaCodeProps {
  content: string;
  className?: string;
}

const PolaCode: React.FC<IPolaCodeProps> = ({
  content = '',
  className = '',
}) => {
  const editorRef = createRef<HTMLDivElement>();
  const [srcZoomImage, setSrcZoomImage] = useState<string>('');

  const handleZoomImgae = () => {
    const imgsEditor = editorRef.current?.querySelectorAll('img');
    if (imgsEditor) {
      imgsEditor.forEach((imgElement) => {
        imgElement.addEventListener('click', function () {
          const src: string = this.getAttribute('src') || '';
          setSrcZoomImage(src);
        });
      });
    }
  };

  useEffect(() => {
    handleZoomImgae();
  }, [editorRef]);

  return (
    <>
      <Modal
        openModal={!!srcZoomImage}
        placement="CENTER"
        setOpenModal={setSrcZoomImage}
        size="full"
      >
        <div className="px-4 py-4 my-4 bg-white shadow-lg">
          <img
            src={srcZoomImage}
            alt=""
            className="inline-block max-h-[548px] w-full object-contain object-center"
          />

          <button
            className="create-test rounded-md flex justify-center items-center w-32 h-10 text-sm
            text-white font-bold bg-slate-800 mt-4 ml-auto"
            onClick={() => setSrcZoomImage('')}
          >
            Đóng
          </button>
        </div>
      </Modal>

      <div
        className={classNames(['rounded-sm', className])}
        ref={editorRef}
        dangerouslySetInnerHTML={{
          __html: `
          <div class='show-editor'>
            ${content}
          </div>`,
        }}
      ></div>
    </>
  );
};

export default PolaCode;
