import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
    id: '1',
    name: 'Apple',
    price: 0.5,
    image: 'apple.png',
    reviews: [
        {
            author: 'Ken',
            comment: 'Great',
            date: '2026-01-10T00:00:00.000Z'
        }
    ],
    inStock: true
};

describe('ReviewModal', () => {
    it('renders nothing when no product is selected', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders existing reviews when present', () => {
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={vi.fn()} />);

        expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();
        expect(screen.getByText('Ken')).toBeInTheDocument();
    });

    it('shows empty review message when there are no reviews', () => {
        render(
            <ReviewModal
                product={{ ...product, reviews: [] }}
                onClose={vi.fn()}
                onSubmit={vi.fn()}
            />
        );

        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    it('submits a review from form input', () => {
        const onSubmit = vi.fn();
        render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

        fireEvent.change(screen.getByPlaceholderText('Your name'), {
            target: { value: 'Alex' }
        });
        fireEvent.change(screen.getByPlaceholderText('Your review'), {
            target: { value: 'Amazing fruit' }
        });
        fireEvent.click(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                author: 'Alex',
                comment: 'Amazing fruit',
                date: expect.any(String)
            })
        );
    });

    it('closes when backdrop or close button are clicked', () => {
        const onClose = vi.fn();
        render(<ReviewModal product={product} onClose={onClose} onSubmit={vi.fn()} />);

        fireEvent.click(screen.getByText('Close'));
        fireEvent.click(screen.getByText('Reviews for Apple').closest('.modal-content')!.parentElement as HTMLElement);

        expect(onClose).toHaveBeenCalled();
    });
});
