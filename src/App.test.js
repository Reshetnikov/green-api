import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import App from './App';
import { getSettings, getStateInstance, sendMessage, sendFileByUrl } from './api';

// Mock the API functions
jest.mock('./api', () => ({
    getSettings: jest.fn(),
    getStateInstance: jest.fn(),
    sendMessage: jest.fn(),
    sendFileByUrl: jest.fn(),
}));

describe('App Component', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    test('renders the App component', () => {
        const { getByPlaceholderText, getByText } = render(<App />);

        expect(getByPlaceholderText('ID Instance')).toBeInTheDocument();
        expect(getByPlaceholderText('API Token Instance')).toBeInTheDocument();
        expect(getByText('getSettings')).toBeInTheDocument();
        expect(getByText('getStateInstance')).toBeInTheDocument();
        expect(getByPlaceholderText('Message Phone')).toBeInTheDocument();
        expect(getByPlaceholderText('Message')).toBeInTheDocument();
        expect(getByText('sendMessage')).toBeInTheDocument();
        expect(getByPlaceholderText('File Phone')).toBeInTheDocument();
        expect(getByPlaceholderText('File Url')).toBeInTheDocument();
        expect(getByText('sendFileByUrl')).toBeInTheDocument();
    });

    test('handles getSettings button click', async () => {
        getSettings.mockResolvedValueOnce('Settings data');

        const { getByText, getByPlaceholderText, getByDisplayValue, findByText } = render(<App />);

        fireEvent.change(getByPlaceholderText('ID Instance'), { target: { value: 'test-id' } });
        fireEvent.change(getByPlaceholderText('API Token Instance'), { target: { value: 'test-token' } });

        fireEvent.click(getByText('getSettings'));

        expect(getSettings).toHaveBeenCalledWith('test-id', 'test-token');

        const result = await findByText(/Settings data/);
        expect(result).toBeInTheDocument();
    });

    test('handles getStateInstance button click', async () => {
        getStateInstance.mockResolvedValueOnce('State data');

        const { getByText, getByPlaceholderText, findByText } = render(<App />);

        fireEvent.change(getByPlaceholderText('ID Instance'), { target: { value: 'test-id' } });
        fireEvent.change(getByPlaceholderText('API Token Instance'), { target: { value: 'test-token' } });

        fireEvent.click(getByText('getStateInstance'));

        expect(getStateInstance).toHaveBeenCalledWith('test-id', 'test-token');

        const result = await findByText(/State data/);
        expect(result).toBeInTheDocument();
    });

    test('handles sendMessage button click', async () => {
        sendMessage.mockResolvedValueOnce('Message sent');

        const { getByText, getByPlaceholderText, findByText } = render(<App />);

        fireEvent.change(getByPlaceholderText('ID Instance'), { target: { value: 'test-id' } });
        fireEvent.change(getByPlaceholderText('API Token Instance'), { target: { value: 'test-token' } });
        fireEvent.change(getByPlaceholderText('Message Phone'), { target: { value: '1234567890' } });
        fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Hello' } });

        fireEvent.click(getByText('sendMessage'));

        expect(sendMessage).toHaveBeenCalledWith('test-id', 'test-token', 'Hello', '1234567890');

        const result = await findByText(/Message sent/);
        expect(result).toBeInTheDocument();
    });

    test('handles sendFileByUrl button click', async () => {
        sendFileByUrl.mockResolvedValueOnce('File sent');

        const { getByText, getByPlaceholderText, findByText } = render(<App />);

        fireEvent.change(getByPlaceholderText('ID Instance'), { target: { value: 'test-id' } });
        fireEvent.change(getByPlaceholderText('API Token Instance'), { target: { value: 'test-token' } });
        fireEvent.change(getByPlaceholderText('File Phone'), { target: { value: '1234567890' } });
        fireEvent.change(getByPlaceholderText('File Url'), { target: { value: 'http://example.com/file.jpg' } });

        fireEvent.click(getByText('sendFileByUrl'));

        expect(sendFileByUrl).toHaveBeenCalledWith('test-id', 'test-token', 'http://example.com/file.jpg', '1234567890');

        const result = await findByText(/File sent/);
        expect(result).toBeInTheDocument();
    });
});
