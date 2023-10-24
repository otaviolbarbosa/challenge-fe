import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import SearchBar from 'components/SearchBar';
import { api } from 'services/api';
import { currencyFormat, fractionNumber } from 'utils/number';
import { Product } from 'types';

function ProductDetails({ ...props }) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const params = useParams();


  const fetchProductData = async () => {
    setLoading(true);

    try {
      const productResponse = await api.get(`/api/items/${params.id}`);

      setProduct(productResponse.data as Product);
    } catch (error) {
      // TODO: handle this error
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => await fetchProductData())();
  }, [params.id])

  const defaultDescription = (
    <>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut consectetur dolor. Donec ac magna at nulla mattis posuere. Cras consequat porttitor ligula, sed vulputate diam tristique vel. Nullam nunc dui, elementum id commodo nec, sollicitudin blandit turpis. Quisque eu elit sit amet nunc porttitor molestie at nec enim. Suspendisse id facilisis tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque vel ultrices ligula, a dignissim felis. Fusce eu fermentum turpis, eu aliquet felis.</p>
      <p>Nullam dictum dui at commodo placerat. Nullam in finibus lorem. Donec porttitor, justo ut fringilla ornare, mi mauris finibus odio, eget dictum eros mauris nec felis. Aenean in est neque. Suspendisse potenti. Vivamus vel scelerisque lectus. Aenean lacus ante, tristique mattis libero ac, gravida fermentum dui. Nullam porta sapien fermentum, convallis enim id, dapibus orci. Vivamus nec elit ut ex luctus convallis rhoncus nec nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean fermentum, nulla nec aliquet feugiat, lorem lectus vulputate neque, sed vulputate risus velit facilisis nibh. Etiam in nunc tincidunt, pellentesque odio ut, scelerisque felis. Donec ultrices sagittis semper. In est dui, bibendum id turpis eleifend, suscipit ullamcorper mauris. In purus mauris, lacinia at turpis laoreet, vehicula bibendum ante. Sed rutrum eros vitae tortor tristique tincidunt.</p>
      <p>Duis fringilla elit vitae molestie imperdiet. Pellentesque facilisis aliquet ipsum, sed fermentum nunc placerat volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tincidunt ligula dapibus felis scelerisque, at finibus purus dignissim. Sed pretium turpis nec erat viverra, eu maximus enim lacinia. Etiam nec arcu blandit, luctus dolor quis, porttitor arcu. Aenean non ligula ac justo imperdiet sollicitudin volutpat nec metus. Sed in ligula ut libero mollis pulvinar. Fusce quis augue ipsum.</p>
      <p>Praesent quis eros velit. Quisque et fermentum tortor, sit amet venenatis tellus. Vivamus aliquet ornare sapien quis pharetra. Nam fermentum porttitor nibh nec lobortis. In varius sapien vitae lectus cursus, ac condimentum felis pulvinar. Nunc risus odio, vulputate ut enim quis, porta consequat nisi. Suspendisse ante justo, vestibulum a iaculis eu, iaculis et velit.</p>
      <p>Praesent vel quam eu tellus ornare consectetur. Sed convallis arcu nec nibh condimentum tincidunt. Donec eget urna et ex tincidunt pellentesque eu ut risus. Suspendisse fringilla, dolor sit amet scelerisque accumsan, erat massa lobortis mi, vitae sodales magna enim id dolor. Nam diam massa, tincidunt quis fermentum id, varius et ante. Nam vitae elit vestibulum diam iaculis tincidunt at sit amet diam. Aenean non dignissim mi.</p>
    </>
  );

  const conditionLabel = () => {
    return product?.item.condition ?? '';
  }

  const soldLabel = () => {
    const soldQuantity = product?.item.sold_qty ?? 0;
    const soldWord = soldQuantity <= 1 ? 'vendido' : 'vendidos';

    return `${soldQuantity} ${soldWord}`;
  }

  const productDescription = () => {
    return product?.item.description.length
      ? product.item.description
      : defaultDescription;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('buying');
  }

  return (
    <>
      <SearchBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumbs items={product?.categories} />
          <div {...props}>
            <div className="limiter">
              <div className="product">
                <div className="main-content">
                  <img src={product?.item.picture_url} alt={product?.item.title} />
                  <div className="description-container">
                    <div className="description-title">Descrição do produto</div>
                    {productDescription()}
                  </div>
                </div>
                <div className="right-content">
                  <div className="product-info">{conditionLabel()} | {soldLabel()}</div>
                  <div className="product-title">{product?.item.title}</div>
                  <div className="product-price">
                    <span className="value">{currencyFormat(product?.item.price.amount, product?.item.price.currency, 0)}</span>
                    <span className="fraction">{fractionNumber(product?.item.price.decimals)}</span>
                  </div>
                  <div className="buy-container">
                    <form onSubmit={handleSubmit}></form>
                    <button type="submit">Comprar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default styled(ProductDetails)`
  .product {
    display: flex;
    gap: 2rem;
    background-color: #fff;
    border-radius: 0.25rem;
    padding: 2rem;

    .main-content {
      flex: 1;

      .description-title {
        font-size: 32px;
        margin-bottom: 2rem;
      }
    }

    .right-content {
      padding: 1rem;
      width: 100%;
      max-width: 360px;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: 0.5rem;

      .product-info {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: rgba(0,0,0,.55);
      }
      .product-title {
        font-size: 22px;
        font-weight: bold;
      }
      .product-price {
        display: flex;
        align-items: flex-start;
        margin-top: 1.5rem;

        .value {
          font-size: 2.5rem;
        }

        .fraction {
          margin-top: 0.375rem;
          font-size:1.25rem;
        }
      }

      .buy-container {
        margin-top: 40px;

        button {
          width: 100%;
          border: none;
          color: #fff;
          background-color: #3483fa;
          border-radius: 0.375rem;
          height: 48px;
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
  }
`;