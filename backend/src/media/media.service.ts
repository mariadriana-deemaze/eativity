import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { MediaType } from "./../../../app/types/media";

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  /**
   * Strategize on to best handle assets deletion when unused. Cron or callback?
   */
  /* async deleteOldAssets() {

  } */

  async findOrCreateOne(type: MediaType.IMAGE, path?: string) {
    if (!path) return undefined;

    const result = await this.prisma.media.findUnique({
      where: {
        path,
      },
    });

    if (result) {
      return result.id;
    } else {
      return await this.prisma.media
        .create({
          data: {
            type,
            path,
          },
        })
        .then((createdMedia) => createdMedia.id);
    }
  }
}
