import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#dbd6d6"
    foregroundColor="#ecebeb">
    <circle cx="141" cy="133" r="125" />
    <rect x="20" y="275" rx="13" ry="13" width="240" height="43" />
    <rect x="19" y="341" rx="13" ry="13" width="240" height="77" />
    <rect x="22" y="441" rx="13" ry="13" width="83" height="28" />
    <rect x="120" y="436" rx="22" ry="22" width="141" height="42" />
  </ContentLoader>
);

export default PizzaSkeleton;
