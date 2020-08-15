import { Rooms, Room } from '@app/server/fakedb/rooms';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request, Response } from 'express';
import {
  NewRoomRequest,
  NewRoomResponse
} from '@app/shared/validators/roomTypes';
import { IRoomsManager } from './roomsManager';

const handler = <RequestType, ResponseType>(
  fn: (
    req: Request<ParamsDictionary, ResponseType, RequestType>,
    res: Response<ResponseType>
  ) => void
) => (
  req: Request<ParamsDictionary, ResponseType, RequestType>,
  res: Response<ResponseType>
) => fn(req, res);

export class RoomsController {
  private roomsManager: IRoomsManager;

  constructor({ roomsManager }: { roomsManager: IRoomsManager }) {
    this.roomsManager = roomsManager;
  }

  joinRoom = handler<NewRoomRequest, NewRoomResponse>((req, res) => {
    const roomId = req.body.roomId;

    try {
      const result = this.roomsManager.joinRoom(roomId, 'test-player');
      if (result.new) {
        res.status(201).json({ roomId });
      } else {
        res.status(200).json({ roomId });
      }
    } catch (ex) {
      res.status(400).statusMessage = (ex as Error).message;
    }
  });
}
