import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, "");

    // https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine
    switch (exception.code) {
      case "P2002": {
        const status = HttpStatus.CONFLICT;

        response.status(status).json({
          statusCode: status,
          message: {
            error: message,
            fields: exception.meta.target,
          },
        });

        break;
      }

      default:
        // Default 500 error
        super.catch(exception, host);
        break;
    }
  }
}
