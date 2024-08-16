import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor
} from '@nestjs/common'
import { type Observable, map } from 'rxjs'

@Injectable()
export class WrapperDataInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body) => {
        return !body || 'accessToken' in body || 'meta' in body
          ? body
          : { data: body }
      })
    )
  }
}
