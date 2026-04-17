import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [details, setDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setName('');
        setEmail('');
        setDetails('');
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="contact-container">
                    <h2>Contact Us</h2>
                    <p>Submit your feedback, concerns, or other inquiries below.</p>
                    <div aria-live="polite">
                        {submitted && (
                            <p style={{ color: 'green', marginBottom: '1rem' }}>
                                Thank you! Your message has been submitted.
                            </p>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            style={{ marginBottom: '1rem', padding: '0.5rem' }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ marginBottom: '1rem', padding: '0.5rem' }}
                        />
                        <textarea
                            placeholder="Details"
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            required
                            rows={5}
                            style={{ marginBottom: '1rem', padding: '0.5rem' }}
                        />
                        <button type="submit" style={{ padding: '0.5rem' }}>Submit</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
