import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
    it('renders the contact form with Name, Email, and Details fields', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Details')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('shows a success message after form submission', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Details'), { target: { value: 'I have a question.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('Thank you! Your message has been submitted.')).toBeInTheDocument();
    });

    it('clears the form fields after submission', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Details'), { target: { value: 'I have a question.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect((screen.getByPlaceholderText('Name') as HTMLInputElement).value).toBe('');
        expect((screen.getByPlaceholderText('Email') as HTMLInputElement).value).toBe('');
        expect((screen.getByPlaceholderText('Details') as HTMLTextAreaElement).value).toBe('');
    });
});
