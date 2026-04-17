import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';

const productsByFile: Record<string, Product> = {
    'apple.json': {
        id: '1',
        name: 'Apple',
        price: 0.5,
        image: 'apple.png',
        description: 'A juicy red apple',
        reviews: [],
        inStock: true
    },
    'grapes.json': {
        id: '2',
        name: 'Grapes',
        price: 1.5,
        image: 'grapes.png',
        description: 'Fresh grapes',
        reviews: [],
        inStock: false
    },
    'orange.json': {
        id: '3',
        name: 'Orange',
        price: 0.75,
        image: 'orange.png',
        description: 'Citrus',
        reviews: [],
        inStock: true
    },
    'pear.json': {
        id: '4',
        name: 'Pear',
        price: 0.9,
        image: 'pear.png',
        description: 'Sweet pear',
        reviews: [],
        inStock: true
    }
};

const addToCart = vi.fn();

const renderWithContext = () => {
    return render(
        <MemoryRouter>
            <CartContext.Provider value={{ cartItems: [], addToCart, clearCart: vi.fn() }}>
                <ProductsPage />
            </CartContext.Provider>
        </MemoryRouter>
    );
};

describe('ProductsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('throws if cart context is missing', () => {
        expect(() => render(<ProductsPage />)).toThrow('CartContext must be used within a CartProvider');
    });

    it('loads and renders products from json files', async () => {
        vi.stubGlobal('fetch', vi.fn((input: string) => {
            const filename = input.split('/').pop() || '';
            return Promise.resolve({
                ok: true,
                json: async () => productsByFile[filename]
            } as Response);
        }));

        renderWithContext();

        expect(screen.getByText('Loading products...')).toBeInTheDocument();
        await screen.findByText('Our Products');

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Grapes')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Out of Stock' })).toBeDisabled();
    });

    it('adds in-stock item to cart and opens review modal from image click', async () => {
        vi.stubGlobal('fetch', vi.fn((input: string) => {
            const filename = input.split('/').pop() || '';
            return Promise.resolve({
                ok: true,
                json: async () => productsByFile[filename]
            } as Response);
        }));

        renderWithContext();
        await screen.findByText('Our Products');

        fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
        expect(addToCart).toHaveBeenCalled();

        fireEvent.click(screen.getByAltText('Apple'));
        expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText('Your name'), {
            target: { value: 'Tester' }
        });
        fireEvent.change(screen.getByPlaceholderText('Your review'), {
            target: { value: 'Nice one' }
        });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('Tester')).toBeInTheDocument();
        });
    });

    it('handles fetch failure and exits loading state', async () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        vi.stubGlobal('fetch', vi.fn(() => {
            return Promise.resolve({ ok: false } as Response);
        }));

        renderWithContext();
        await screen.findByText('Our Products');

        expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
        expect(errorSpy).toHaveBeenCalled();

        errorSpy.mockRestore();
    });
});
