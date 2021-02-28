import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingCircle: React.FC = () => {
  const icon = (
    <LoadingOutlined
      style={{ fontSize: 64, color: 'var(--primary-color)' }}
      spin
    />
  );

  return (
    <Spin indicator={icon} />
  );
}

export default LoadingCircle;
