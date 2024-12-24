import { render, screen, fireEvent } from '@testing-library/react';
import ProductDisplay from '../../components/ProductDisplay';
import '@testing-library/jest-dom';
import { AdvertisersDataSet } from '../../hooks/useAdvertisersDataSet';
import React from 'react';


describe('ProductDisplay Component', () => {
  const mockDataSets: AdvertisersDataSet[] = [
    {
      id: '1',
      brandId: 'test-brand',
      productDetails: {
        name: 'Product 1',
        originalPrice: 100,
        discountAmount: 20,
        description: 'Product 1 description',
        variants: ['Variant 1', 'Variant 2']
      },
      adContent: {
        imageUrl: 'test-image-1.jpg',
        callToAction: 'Chat Now',
        caption: 'Product 1',
        checkoutUrl: 'https://test-checkout-url-1.com'
      }
    },
    {
      id: '2',
      brandId: 'test-brand2',
      productDetails: {
        name: 'Product 2',
        originalPrice: 200,
        discountAmount: 30,
        description: 'Product 2 description',
        variants: ['Variant 3', 'Variant 4']
      },
      adContent: {
        imageUrl: 'test-image-2.jpg',
        callToAction: 'Start Chat',
        caption: 'Product 2',
        checkoutUrl: 'https://test-checkout-url-2.com'
      }
    }
  ];

  const defaultProps = {
    brandId: 'test-brand',
    imageUrl: 'test-image-1.jpg',
    originalPrice: 100,
    discountAmount: 20,
    dataSets: mockDataSets,
    activeDataSetId: '1',
    onDataSetChange: jest.fn(),
    onChatClick: jest.fn()
  };

  test('renders product image correctly', () => {
    render(<ProductDisplay {...defaultProps} />);
    const image = screen.getByRole('img', { name: /product/i });
    expect(image).toHaveAttribute('src', 'test-image-1.jpg');
  });

  test('renders product selector with correct options', () => {
    render(<ProductDisplay {...defaultProps} />);
    const selector = screen.getByRole('combobox');
    expect(selector).toHaveValue('1');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('Product 1');
    expect(options[1]).toHaveTextContent('Product 2');
  });

  test('calls onDataSetChange when selecting different product', () => {
    render(<ProductDisplay {...defaultProps} />);
    const selector = screen.getByRole('combobox');
    
    fireEvent.change(selector, { target: { value: '2' } });
    expect(defaultProps.onDataSetChange).toHaveBeenCalledWith('2');
  });

  test('renders call to action button and handles click', () => {
    render(<ProductDisplay {...defaultProps} />);
    const chatButton = screen.getByRole('button', { name: /chat now/i });
    
    fireEvent.click(chatButton);
    expect(defaultProps.onChatClick).toHaveBeenCalled();
  });
}); 