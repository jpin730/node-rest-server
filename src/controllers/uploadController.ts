import { RequestHandler } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { Document, Types } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import { IUser, User } from '../models/user';
import { createErrorResponse } from '../helpers/createErrorResponse';

type UserDocument = Document<unknown, unknown, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };

export const putAvatar: RequestHandler = async (req, res) => {
  const { file } = req.files as FileArray;
  const { id } = req.params;

  try {
    const updatedUser = (await User.findById(id)) as UserDocument;

    const folder = 'node-rest-server';

    if (updatedUser.avatar) {
      const regex = new RegExp(`.+(${folder}.+)\\..*`);
      const public_id = updatedUser?.avatar.replace(regex, '$1');
      await cloudinary.uploader.destroy(public_id as string);
    }

    const { tempFilePath } = file as UploadedFile;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder,
    });
    updatedUser.avatar = secure_url;
    await updatedUser.save();

    res.status(201).json({ updatedUser });
  } catch {
    res.status(500).json(createErrorResponse('Server error'));
  }
};
