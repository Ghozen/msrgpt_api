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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userData, res) {
        if (!userData.email.includes('@gmail.com')) {
            console.log(userData.email);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: true,
                message: "Uniquement des emails de gmail"
            });
        }
        try {
            const verifyEmail = await this.userRepository.findOne({ where: {
                    email: userData.email
                } });
            console.log("user verify:", verifyEmail);
            if (verifyEmail) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    error: true,
                    message: "Email existe déja"
                });
            }
            const verifyPseudo = await this.userRepository.findOne({ where: {
                    pseudo: userData.pseudo
                } });
            console.log("user verify:", verifyPseudo);
            if (verifyPseudo) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    error: true,
                    message: "Pseudpo exite déjà"
                });
            }
            const saltOrRounds = 10;
            console.log('send password:', userData);
            const password = userData.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            userData.password = hash;
            console.log('password hash:', userData.password);
            const dataSave = await this.userRepository.save(userData);
            if (!dataSave) {
                console.log(dataSave);
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: "Erreur survenue lors de l'enregistrement dans la base de donnée"
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                error: false,
                message: "Valeur enregistrée avec succès",
                data: dataSave
            });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenu: ${error.message}`
            });
        }
    }
    async getAllUser(res) {
        const dataUsers = await this.userRepository.find();
        const countUser = await this.userRepository.count();
        return res.status(common_1.HttpStatus.OK).json({
            error: false,
            message: "Données engistrées avec succès !",
            data: dataUsers,
            nbreUser: countUser
        });
    }
    async UserInfo(userId, res) {
        const dataUsers = await this.userRepository.findOne({
            where: { id: userId }
        });
        console.log(dataUsers);
        if (!dataUsers) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: true,
                message: "Informations non trouvée"
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            error: false,
            message: "Données trouvées avec succès",
            data: dataUsers
        });
    }
    async updateProfile(userData, res) {
        const dataUsers = await this.userRepository.findBy({ id: userData.idUsers });
        if (!dataUsers)
            console.log('user non trouvé');
        if (userData.fullName) {
            dataUsers[0].fullName = userData.fullName;
        }
        if (userData.pseudo) {
            dataUsers[0].pseudo = userData.pseudo;
        }
        if (userData.email) {
            dataUsers[0].email = userData.email;
        }
        if (userData.telNumber) {
            dataUsers[0].telNumber = userData.telNumber;
        }
        const dataSave = await this.userRepository.save(dataUsers[0]);
        if (dataSave) {
            console.log(dataSave);
            return res.status(common_1.HttpStatus.OK).json({
                error: false,
                message: "Utilisateur mis à jour avec succès",
                data: dataSave
            });
        }
    }
    async deleteProfile(idUsers, res) {
        const deleteProfile = await this.userRepository.delete({ id: idUsers });
        if (!deleteProfile) {
            console.log("erreur sur l'utilisateur");
        }
        return res.status(common_1.HttpStatus.OK).json({
            error: false,
            message: "Utilisateur supprimé avec succès",
            data: deleteProfile
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map