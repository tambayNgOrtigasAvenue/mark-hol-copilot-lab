import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
    it('shows no sale active by default', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('applies sale percent when input is valid', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Set Sale Percent/i), {
            target: { value: '25' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('All products are 25% off!')).toBeInTheDocument();
    });

    it('shows error for invalid input', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Set Sale Percent/i), {
            target: { value: 'bad' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
    });

    it('ends sale and resets values', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Set Sale Percent/i), {
            target: { value: '10' }
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        fireEvent.click(screen.getByRole('button', { name: 'End Sale' }));

        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        expect(screen.getByLabelText(/Set Sale Percent/i)).toHaveValue('0');
    });

    it('renders link back to storefront', () => {
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Back to Storefront' })).toHaveAttribute('href', '/');
    });
});
