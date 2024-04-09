import { RequestHandler } from 'express';
import { Channel } from '../../../db/models';
import { nanoid } from 'nanoid';

export const createMessage: RequestHandler = async (req, res) => {
  const { channelID } = req.params;
  const { content } = req.body;

  if (!channelID) {
    res.status(400).json({
      Result: 'Failed to Create Message',
      Status: 400,
      Reason: 'Invalid Channel ID',
    });
    return;
  }

  try {
    const channel = await Channel.findByPk(channelID);

    if (!channel) {
      res.status(400).json({
        Result: 'Failed to Create Message',
        Status: 400,
        Reason: 'Invalid Channel ID',
      });
      return;
    }

    const newMessage = await channel.createMessage({
      id: nanoid(),
      content,
      imageUrls: [],
    });

    res.status(201).json({
      Result: 'Message Created Successfully',
      Status: 201,
      Data: newMessage,
    });
  } catch (error) {
    console.error('Failed to Create Message: ', error);
    res.status(500).json({
      Result: 'Failed to Create Message',
      Status: 500,
      Reason: 'An Unknown Error Has Occurred',
    });
  }
};
