import { Card } from 'antd';
import React from 'react';

interface Props {
  id: number;
  type: string;
  image: string;
  description: string;
  price: string;
  rating: string;
  url: string;
  shopType: string;
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
}: Props) => {
  return (
    <React.Fragment key={id}>
      <div className='amazon'>
        {' '}
        {type === shopType && (
          <Card className='search-shopping__card' key={id}>
            <h2> {type}</h2>
            <div className='search-shopping__card--content'>
              {' '}
              <img
                className='search-shopping__card--img'
                src={image}
                width='100'
                height='100'
                alt={description}
              />{' '}
              <p>{description} </p>
            </div>
            <div className='search-shopping__card__footer'>
              {price !== 'N/A' && (
                <span className='search-shopping__card--price'>
                  Price {price}
                </span>
              )}
              {rating !== 'N/A' && (
                <span className='search-shopping__card--rating'>
                  Rating {rating}
                </span>
              )}
              <a href={url} target='_'>
                Visit
              </a>{' '}
            </div>
          </Card>
        )}{' '}
      </div>
    </React.Fragment>
  );
};

export default SearchShoppingItem;
