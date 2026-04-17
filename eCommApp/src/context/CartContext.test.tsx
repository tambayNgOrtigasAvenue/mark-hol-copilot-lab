import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const sampleProduct: Product = {
    id: 'p1',
    name: 'Apple',
    price: 1.25,
    image: 'apple.png',
    reviews: [],
    inStock: true
};

const ContextConsumer = () => (
    <CartContext.Consumer>
        {(ctx) => {
            if (!ctx) return <div>No context</div>;

            return (
                <div>
                    <p data-testid="count">{ctx.cartItems.length}</p>
                    <p data-testid="quantity">{ctx.cartItems[0]?.quantity ?? 0}</p>
                    <button onClick={() => ctx.addToCart(sampleProduct)}>add</button>
                    <button onClick={() => ctx.clearCart()}>clear</button>
                </div>
            );
        }}
    </CartContext.Consumer>
);

describe('CartContext', () => {
    it('adds a new item to cart', () => {
        render(
            <CartProvider>
                <ContextConsumer />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));
        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('quantity')).toHaveTextContent('1');
    });

    it('increments quantity for existing item', () => {
        render(
            <CartProvider>
                <ContextConsumer />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));
        fireEvent.click(screen.getByText('add'));

        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    });

    it('clears the cart', () => {
        render(
            <CartProvider>
                <ContextConsumer />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));
        fireEvent.click(screen.getByText('clear'));

        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(screen.getByTestId('quantity')).toHaveTextContent('0');
    });
});
