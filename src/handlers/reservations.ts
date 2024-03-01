import Elysia, { t } from 'elysia';
import { db } from '../utils/db';
import { ReservationSchema } from '../schema';

export const reservationsHandler = new Elysia({
    name: "reservations"
})
    .post("/reservations", async ({ set, body }: { set: any, body: any }) => {  
        if(!body){
            set.status = 401;
            return {
                success: false,
                message: "Did not receive data",
                data: null,
            };
        }

        const { userid, bookid } = body;
        const data = {
            id: Math.random().toString(36).substring(2, 2 + 10),
            userid: userid,
            bookid: bookid,
            reserved_at: new Date().toISOString(),
            due: new Date(Date.now() + 12096e5).toISOString(),
            past_due: 0 
        }

        const reservation = await db.insert(ReservationSchema).values({
            ...body,
            id: data.id,
            bookid: data.bookid,
            userid: data.userid,
            reserved_at: data.reserved_at,
            due: data.due,
            past_due: data.past_due
        });
                
        if (!reservation) {
            set.status = 401;
            return {
                success: false,
                message: "Could not create reservation",
                data: null,
            };
        }

        set.status = 200;
        return {
            success: true,
            message: "Reservation created",
            data: reservation,
        }
    },
    {
        body: t.Object({
            userid: t.String(),
            bookid: t.String(),
    }),
})
    