import { NotFoundError } from '@/domain/errors/not-found-error'
import { type ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common'
import { type FastifyReply } from 'fastify'

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  async catch (exception: NotFoundError, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    await response.status(404).send({
      statusCode: 404,
      error: 'NotFound',
      message: exception.message
    })
  }
}
