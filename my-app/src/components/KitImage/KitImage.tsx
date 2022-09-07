import './KitImage.style.scss';

import { Image } from 'antd';
import { useState } from 'react';

interface KitButtonProps {
  src?: string;
  preview?: any;
  className?: string;
  setIsVisible?: any;
}

const KitImage = ({
  src,
  preview,
  setIsVisible,
}: KitButtonProps): JSX.Element => {
  return (
    <div>
      <Image
        width={200}
        preview={{
          visible: preview,
          src,
          onVisibleChange: value => {
            setIsVisible(value);
          },
        }}
      />
    </div>
  );
};

export default KitImage;
