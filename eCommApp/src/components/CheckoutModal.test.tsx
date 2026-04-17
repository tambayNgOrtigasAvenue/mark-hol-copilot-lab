import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    it('renders modal content', () => {
        render(<CheckoutModal onConfirm={vi.fn()} onCancel={vi.fn()} />);
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();
    });

    it('calls onConfirm when continue checkout is clicked', () => {
        const onConfirm = vi.fn();
        render(<CheckoutModal onConfirm={onConfirm} onCancel={vi.fn()} />);

        fireEvent.click(screen.getByText('Continue Checkout'));
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when return to cart is clicked', () => {
        const onCancel = vi.fn();
        render(<CheckoutModal onConfirm={vi.fn()} onCancel={onCancel} />);

        fireEvent.click(screen.getByText('Return to cart'));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
