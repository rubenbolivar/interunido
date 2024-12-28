import { writable } from 'svelte/store';

export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: Date;
    read: boolean;
}

function createNotificationsStore() {
    const { subscribe, update } = writable<Notification[]>([]);

    return {
        subscribe,
        add: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
            update(notifications => [
                {
                    ...notification,
                    id: crypto.randomUUID(),
                    timestamp: new Date(),
                    read: false
                },
                ...notifications
            ]);
        },
        markAsRead: (id: string) => {
            update(notifications =>
                notifications.map(n =>
                    n.id === id ? { ...n, read: true } : n
                )
            );
        },
        remove: (id: string) => {
            update(notifications =>
                notifications.filter(n => n.id !== id)
            );
        },
        clear: () => {
            update(() => []);
        }
    };
}

export const notifications = createNotificationsStore();