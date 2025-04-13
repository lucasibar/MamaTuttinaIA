"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let JwtInterceptor = class JwtInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(error => {
            if (error.name === 'TokenExpiredError') {
                return (0, rxjs_1.throwError)(() => new common_1.UnauthorizedException('Token expirado. Por favor, inicie sesión nuevamente.'));
            }
            if (error.name === 'JsonWebTokenError') {
                return (0, rxjs_1.throwError)(() => new common_1.UnauthorizedException('Token inválido. Por favor, inicie sesión nuevamente.'));
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.JwtInterceptor = JwtInterceptor;
exports.JwtInterceptor = JwtInterceptor = __decorate([
    (0, common_1.Injectable)()
], JwtInterceptor);
//# sourceMappingURL=jwt.interceptor.js.map