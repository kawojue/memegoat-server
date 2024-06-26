import { JwtService } from '@nestjs/jwt'
import {
    Injectable, CanActivate, ExecutionContext
} from '@nestjs/common'

@Injectable()
export class CookieAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest()

        const token = request.cookies?.token
        if (!token) return false

        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET!
            })
            request.user = decoded
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}
