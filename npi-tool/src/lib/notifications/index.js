import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: null });


export function createNotification(content, recipient) {
    const read = 0;
    const stmnt = db.prepare(
        'INSERT INTO notifications (content, read, recipient) VALUES ($content, $read, $recipient)'
    );

    stmnt.run({ content, read, recipient});
}

export function blastNotification(content, recipients) {
    for(const recipient of recipients) {
        create_notification(content, recipient);
    }
}

export function markAsRead(notification_id) {

    const read = 1;

    const stmnt = db.prepare(
        'UPDATE notifications SET read = ? WHERE id = ?'
    );

    stmnt.run(read, notification_id);
}

export async function getNotifications(email) {

    const read = 0;

    const stmnt = db.prepare(
        'select id, content from notifications where recipient = $email and read = $read'
    )

    const result = stmnt.all({ email, read });
    
    return result;
}

export async function getAllNotifications(email) {

    const read = 0;

    const stmnt = db.prepare(
        'select * from notifications'
    )

    const result = stmnt.all();
    
    return result;
}