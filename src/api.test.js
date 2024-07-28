import { getSettings, getStateInstance, sendMessage, sendFileByUrl } from './api';
import { REACT_APP_API_URL } from "./consts";


global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
    })
);

describe('API functions', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('getSettings', async () => {
        const idInstance = '123';
        const apiTokenInstance = 'abc';
        await getSettings(idInstance, apiTokenInstance);

        expect(fetch).toHaveBeenCalledWith(
            REACT_APP_API_URL + '/waInstance123/getSettings/abc',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );
    });

    test('getStateInstance', async () => {
        const idInstance = '123';
        const apiTokenInstance = 'abc';
        await getStateInstance(idInstance, apiTokenInstance);

        expect(fetch).toHaveBeenCalledWith(
            REACT_APP_API_URL + '/waInstance123/getStateInstance/abc',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );
    });

    test('sendMessage', async () => {
        const idInstance = '123';
        const apiTokenInstance = 'abc';
        const message = 'Hello';
        const messagePhone = '1234567890';
        await sendMessage(idInstance, apiTokenInstance, message, messagePhone);

        expect(fetch).toHaveBeenCalledWith(
            REACT_APP_API_URL + '/waInstance123/sendMessage/abc',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, chatId: '1234567890@c.us' }),
            }
        );
    });

    test('sendFileByUrl', async () => {
        const idInstance = '123';
        const apiTokenInstance = 'abc';
        const urlFile = 'http://example.com/file.jpg';
        const urlFilePhone = '1234567890';
        await sendFileByUrl(idInstance, apiTokenInstance, urlFile, urlFilePhone);

        expect(fetch).toHaveBeenCalledWith(
            REACT_APP_API_URL + '/waInstance123/sendFileByUrl/abc',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    urlFile,
                    chatId: '1234567890@c.us',
                    fileName: 'testFile',
                }),
            }
        );
    });
});