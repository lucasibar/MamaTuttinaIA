"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMember = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let FamilyMember = class FamilyMember {
};
exports.FamilyMember = FamilyMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FamilyMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], FamilyMember.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['masculino', 'femenino', 'otro'] }),
    __metadata("design:type", String)
], FamilyMember.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FamilyMember.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FamilyMember.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FamilyMember.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['muy_activo', 'activo', 'poco_activo', 'sedentario'] }),
    __metadata("design:type", String)
], FamilyMember.prototype, "actividad_fisica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], FamilyMember.prototype, "horario_laboral", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FamilyMember.prototype, "comidas_dia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.familiares),
    __metadata("design:type", user_entity_1.User)
], FamilyMember.prototype, "user", void 0);
exports.FamilyMember = FamilyMember = __decorate([
    (0, typeorm_1.Entity)('family_members')
], FamilyMember);
//# sourceMappingURL=family-member.entity.js.map