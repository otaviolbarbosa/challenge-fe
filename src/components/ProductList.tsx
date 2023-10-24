import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Products } from 'types';
import { currencyFormat } from 'utils/number';

interface ProductListProps {
  list: Products | undefined
}

function ProductList({ list, ...props }: ProductListProps) {
  const navigate = useNavigate();

  const handleClick = (product: any) => {
    navigate(`/items/${product.id}`)
  }
  return (
    <div {...props}>
      <div className="limiter">
        <div className="product-list-container">
          {list?.items.map((product) => {
            return (
              <div key={product.id} className="product-container" onClick={() => handleClick(product)}>
                <div className="image-container">
                  <img src={product.picture_url} alt={product.title} />
                </div>
                <div className="info">
                  <div className="row">
                    <div className="price">{currencyFormat(product.price.amount, product.price.currency, 0)}</div>
                    <div className="location-container">
                      {product.city_name}
                    </div>
                  </div>
                  <div className="name">{product.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default styled(ProductList)`
  .product-list-container {
    padding: 1rem;
    border-radius: 4px;
    background-color: #fff;
  }

  .product-container {
    display: flex;
    padding: 0.75rem 0;

    &:not(:first-child) {
      border-top: 1px solid #eee;
    }

    .image-container {
      height: 250px;

      img {
        width: 250px;
        height: 250px;
        object-fit: contain;
        border-radius: 4px;
      }
    }

    
    .info {
      flex: 1;
      padding: 1rem;

      .row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      
      .price {
        font-size: 32px;
        margin-bottom: 1.5rem;
      }

      .name {
        font-size: 22px;
      }
    }

    .location-container {
      padding: 1rem;
      color: #6e6e6e;
      font-weight: 500;
    }
  }
`;  