import { useState, useImperativeHandle } from "react";
import { FC } from "react";
import { Slider, Modal } from "antd";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";
import type { uploadPropsType } from "./index";
import type { Area } from "react-easy-crop";

/**
 * 弹窗以及图片剪裁
 */
const Modal_: FC<uploadPropsType & { onChange?: (base: string) => void }> = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  /** 缩放度数*/
  const [zoom, setZoom] = useState(1);
  /** 旋转度数*/
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  async function handleOk() {
    try {
      const croppedImage = await getCroppedImg(
        props.imgURL as string,
        croppedAreaPixels as Area,
        rotation
      );
      // 保存的base64
      props.onChange && croppedImage && props.onChange(croppedImage);
    } catch (e) {
      console.error(e);
      props.onError && props.onError("图片处理错误");
    }
  }
  useImperativeHandle(props.event, () => ({
    open: () => {
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
    },
  }));

  return (
    <>
      <Modal
        title="图片剪裁"
        okText="完成"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          (document.getElementById(`file-upload-${props.target}`) as HTMLInputElement).value = "";
        }}
        zIndex={2000}
        {...props.ModalProps}
      >
        <div className="w-full h-96 relative">
          <Cropper
            image={props.imgURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={props.aspect || 1}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onZoomChange={setZoom}
            onCropComplete={(croppedArea, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
          />
        </div>
        <div>
          <span>缩放:</span>
          <Slider value={zoom} onChange={v => setZoom(v)} min={-0.2} max={5} step={0.01} />
        </div>
        <div>
          <span>旋转:</span>
          <Slider value={rotation} onChange={v => setRotation(v)} min={0} max={360} />
        </div>
      </Modal>
    </>
  );
};
export default Modal_;
