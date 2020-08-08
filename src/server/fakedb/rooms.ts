export interface Room {
  id: string;
}

export class Rooms {
  private rooms: { [key: string]: Room };
  private length: number;

  constructor({ rooms }: { rooms: Room[] } = { rooms: [] }) {
    const init: { [key: string]: Room } = {};
    this.rooms = rooms.reduce((rooms, room) => {
      rooms[room.id] = room;
      return rooms;
    }, init);

    this.length = rooms.length;
  }

  add(room: Room) {
    if (room.id in this.rooms) {
      throw new Error('Room already exists.');
    }

    this.rooms[room.id] = room;
    this.length++;
  }

  remove(room: Room) {
    if (room.id in this.rooms === false) {
      throw new Error("Room doens't exist.");
    }

    delete this.rooms[room.id];
    this.length--;
  }

  get Length() {
    return this.length;
  }

  clear() {
    this.rooms = {};
    this.length = 0;
  }
}

const _rooms = new Rooms();

export default _rooms;
