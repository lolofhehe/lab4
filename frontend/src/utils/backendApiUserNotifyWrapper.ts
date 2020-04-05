import { growl } from '../index';

export async function backendApiUserNotifyWrapper(responsePromise: Promise<Response>, exclude: number[] = []): Promise<Response> {
    try {
        const response = await responsePromise;

        if (!response.ok && !exclude.includes(response.status)) {
            switch (response.status) {
                case 400:
                    growl.current?.show({
                        severity: 'warn',
                        summary: 'Ошибка запроса',
                        detail: 'Введено некоректное значение.'
                    });
                    break;

                case 401:
                    growl.current?.show({
                        severity: 'error',
                        summary: 'Ошибка сессии',
                        detail: 'Сессия недействительна. Перезагрузите страницу или войдите заново.'
                    });
                    break;
            }
        }

        return responsePromise;
    } catch (e) {
        growl.current?.show({
            severity: 'error',
            summary: 'Ошибка подключения',
            detail: 'Невозможно подключиться к серверу.'
        });

        throw e;
    }
}
