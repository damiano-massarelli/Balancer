
export default class GenericApiStub {
    static async request(uri, method, dataToSend) {
        let result = { data: null, errors: { "generic": "The service is temporarily unavailable" } };

        let response = null;
        let data = null;
        try {
            response = await fetch(uri, {
                method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
        }
        catch (_) {
            return result;
        }

        try {
            data = await response.json();
        }
        catch(_) {}

        if (response.ok) {
            result = {
                data,
                errors: null
            };
        }
        else if (response.status === 400) {
            result = { data: null, errors: data };
        }

        return result;
    }
}