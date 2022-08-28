import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import '@common/firebase/app';
import Modal from '../Modal';
import { isEmpty } from 'lodash';

export interface ImageProps {
    name?: string;
    type?: string;
    data?: string;
}

export interface ImageCropperProps {
    id?: string;
    imageSource?: string;
    boxWidth?: number;
    boxHeight?: number;
    zoom?: number;
    visible?: boolean;
    onCancel: React.MouseEventHandler<HTMLButtonElement>;
    onDone: (image: ImageProps) => void;
}

const ImageCropper: React.FunctionComponent<ImageCropperProps> = ({
    id = 'imageCropper',
    imageSource = '',
    boxWidth = 280,
    boxHeight = 280,
    zoom = 0.5,
    visible,
    onCancel,
    onDone
}) => {
    const [imageProps, setImageProps] = React.useState<ImageProps>({});
    const [originalImage, setOriginalImage] = React.useState<string>(imageSource);
    const cropperRef = useRef<HTMLImageElement | ReactCropperElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);


    const handleCrop = () => {
        const rce = cropperRef?.current as ReactCropperElement;
        const cropper = rce.cropper;
        if (typeof cropper.getCroppedCanvas === 'function') {
            if (cropper.getCroppedCanvas().toDataURL() !== null) {
                setImageProps((prev) => {
                    return {
                        ...prev,
                        data: cropper.getCroppedCanvas().toDataURL()
                    };
                });
            }
        }
    };

    const handleDone = () => onDone(imageProps);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files![0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const baseURL = reader.result as string;
                setOriginalImage(baseURL);
                setImageProps({
                    name: file.name,
                    type: file.type
                });
            };
        }
    };

    const handleSelectFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Modal
            visible={visible}
            className="image-cropper-modal"
            title="Profile Picture"
            okText="Done"
            onOk={handleDone}
            onCancel={onCancel}
        >
            <div>
                <div className="row">
                    <div className="col-12" style={{ position: 'relative', height: 300 }}>
                        <Cropper
                            style={{ height: 280 }}
                            id={id}
                            src={originalImage}
                            // minContainerWidth={250}
                            // minContainerHeight={250}
                            // minCropBoxWidth={boxWidth}
                            // minCropBoxHeight={boxHeight}
                            toggleDragModeOnDblclick={false}
                            // cropBoxResizable={false}
                            //cropBoxMovable={false}
                            dragMode="move"
                            // zoomTo={1}
                            guides={false}
                            initialAspectRatio={4 / 4}
                            crop={handleCrop}
                            ref={cropperRef}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <input
                            ref={inputFileRef}
                            className="image-cropper-input-file"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/png,image/jpg,image/jpeg"
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSelectFile}
                        >
                            {isEmpty(imageSource) ? 'Select Photo' : 'Change Photo'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ImageCropper;
