import { Prisma } from "@prisma/client";
import { limitOffset } from "utilities/queries";

export function getAllRooms(
    options: object = {
        limit: null,
        offset: null,
        desc: false
    }
): Prisma.Sql {
    return Prisma.sql`
      SELECT 
          room.id AS id,
          room.name AS name,
          room.capacity AS capacity,

          json_strip_nulls(
              json_build_object(
                  'id', u.id,
                  'username', u.username,
                  'email', u.email
              )
          ) AS user,
  
          room."createdAt" AS created_at
  
      FROM "Rooms" room
      LEFT JOIN "Bookings" booking 
          ON booking.room_id = room.id AND booking.is_delete = false
          AND NOW() BETWEEN booking.start_time AND booking.end_time
      LEFT JOIN "Users" u ON booking.user_id = u.id

      WHERE room.is_delete = false
  
      ${Prisma.raw(limitOffset(options))}
    `;
}

export function getAllRoomsCount(): Prisma.Sql {
    return Prisma.sql`SELECT COUNT(*) AS total_count FROM "Rooms" WHERE is_delete = false`;
}

export function getAllAvailableRooms(
    search_data,
    options: object = {
        limit: null,
        offset: null,
        desc: false
    }
): Prisma.Sql {
    const { start_time, end_time } = search_data
    return Prisma.sql`
      SELECT 
          room.id AS id,
          room.name AS name,
          room.capacity AS capacity,
  
          room."createdAt" AS created_at
  
      FROM "Rooms" room
      WHERE room.is_delete = false
      AND NOT EXISTS (
        SELECT 1
        FROM "Bookings" booking
        WHERE booking.room_id = room.id
          AND (
              -- Пересечение с временем бронирования
              (booking.start_time < ${end_time}::timestamp AND booking.end_time > ${start_time}::timestamp)
          )
          AND booking.is_delete = false
      )
  
      ${Prisma.raw(limitOffset(options))}
    `;
}

export function getAvailableRoomById(
    room_id,
    search_data
): Prisma.Sql {
    const { start_time, end_time } = search_data
    return Prisma.sql`
      SELECT 
      CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM "Bookings" booking 
            WHERE booking.room_id = room.id
            AND NOT (
              (booking.start_time <= ${end_time}::timestamp AND booking.end_time >= ${start_time}::timestamp)
            )
            AND booking.is_delete = false
          ) THEN false
          ELSE true
        END AS available
      FROM "Rooms" room
      WHERE room.id = ${room_id} AND room.is_delete = false
    `;
}


export function getAllAvaliableRoomsCount(search_data): Prisma.Sql {
    const { start_time, end_time } = search_data;
    // Запрос для получения общего количества доступных комнат
    return Prisma.sql`
        SELECT COUNT(*) AS total_count 
        FROM "Rooms" room
        WHERE room.is_delete = false
        AND NOT EXISTS (
            SELECT 1
            FROM "Bookings" booking
            WHERE booking.room_id = room.id
            AND (
                -- Проверка на пересечение времени бронирования
                (booking.start_time < ${end_time}::timestamp AND booking.end_time > ${start_time}::timestamp)
            )
            AND booking.is_delete = false
        )
    `;
}

export function getAllUserBookings(user_id: number): Prisma.Sql {
    return Prisma.sql`
          SELECT 
              room.id AS id,
              room.name AS name,
              room.capacity AS capacity,
    
              json_strip_nulls(
                  json_build_object(
                      'id', u.id,
                      'username', u.username,
                      'email', u.email
                  )
              ) AS user,
      
              room."createdAt" AS created_at
      
          FROM "Rooms" room
          LEFT JOIN "Bookings" booking 
              ON booking.room_id = room.id AND booking.is_delete = false
              AND NOW() BETWEEN booking.start_time AND booking.end_time
          LEFT JOIN "Users" u ON booking.user_id = u.id
    
          WHERE booking.user_id = ${user_id} AND room.is_delete = false AND booking.is_delete = false
    `;
}