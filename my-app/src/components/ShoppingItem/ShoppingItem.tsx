import { Button, Card, Rate } from 'antd';
import React from 'react';
import './ShopingItem.scss';

interface Props {
  id: number;
  type: string;
  image: string;
  description: string;
  price: string;
  rating: string;
  url: string;
  shopType: string;
  onSave?: any;
}

const SearchShoppingItem = ({
  id,
  type,
  image,
  description,
  price,
  rating,
  url,
  shopType,
  onSave,
}: Props) => {
  return (
    <React.Fragment key={id}>
      {' '}
      {type === shopType && (
        <Card className='shopping-item u__mb--lg' key={id}>
          <h2 className='shopping-item__type'> {type}</h2>
          <h3>{description} </h3>{' '}
          <div className='shopping-item__content'>
            <img
              className='shopping-item--img'
              src={image}
              width='100'
              height='100'
              alt={description}
            />{' '}
          </div>
          <div className='shopping-item__footer'>
            {' '}
            {price !== 'N/A' && (
              <span className='shopping-item__footer--price'>
                Price {price}
              </span>
            )}
            {rating !== 'N/A' && (
              <span className='shopping-item__footer--rating'>
                <Rate
                  allowHalf
                  disabled={true}
                  value={Number(rating?.slice(0, 3))}
                ></Rate>
              </span>
            )}
            <a href={url} target='_'>
              Visit
            </a>{' '}
          </div>
          <Button onClick={onSave}>Save</Button>
        </Card>
      )}{' '}
    </React.Fragment>
  );
};

export default SearchShoppingItem;
