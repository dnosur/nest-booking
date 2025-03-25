"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRooms = getAllRooms;
exports.getAllRoomsCount = getAllRoomsCount;
exports.getAllAvailableRooms = getAllAvailableRooms;
exports.getAvailableRoomById = getAvailableRoomById;
exports.getAllAvaliableRoomsCount = getAllAvaliableRoomsCount;
exports.getAllUserBookings = getAllUserBookings;
const client_1 = require("@prisma/client");
const queries_1 = require("../../utilities/queries");
function getAllRooms(options = {
    limit: null,
    offset: null,
    desc: false
}) {
    return client_1.Prisma.sql `
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
  
      ${client_1.Prisma.raw((0, queries_1.limitOffset)(options))}
    `;
}
function getAllRoomsCount() {
    return client_1.Prisma.sql `SELECT COUNT(*) AS total_count FROM "Rooms" WHERE is_delete = false`;
}
function getAllAvailableRooms(search_data, options = {
    limit: null,
    offset: null,
    desc: false
}) {
    const { start_time, end_time } = search_data;
    return client_1.Prisma.sql `
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
  
      ${client_1.Prisma.raw((0, queries_1.limitOffset)(options))}
    `;
}
function getAvailableRoomById(room_id, search_data) {
    const { start_time, end_time } = search_data;
    return client_1.Prisma.sql `
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
function getAllAvaliableRoomsCount(search_data) {
    const { start_time, end_time } = search_data;
    return client_1.Prisma.sql `
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
function getAllUserBookings(user_id) {
    return client_1.Prisma.sql `
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
//# sourceMappingURL=rooms.js.map