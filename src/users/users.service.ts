import { HttpStatus, Injectable,} from '@nestjs/common';
import { createUserDto } from './Dto/create_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { updateUserDto } from './Dto/update_user.dto';
import { Response } from "express";

@Injectable()
export class UsersService {

   constructor(@InjectRepository(User)
   private readonly userRepository: Repository<User>){}

   async createUser(userData: createUserDto, res: Response) {

    if(!userData.email.includes('@gmail.com')){
      console.log(userData.email);
      return res.status(HttpStatus.BAD_REQUEST).json({
         error: true,
         message: "Uniquement des emails de gmail"
      })
    }

     try{

      const verifyEmail = await this.userRepository.findOne({where:{
         email: userData.email
       }})
   
       console.log("user verify:", verifyEmail)
   
       if(verifyEmail) {
         return res.status(HttpStatus.CONFLICT).json({
            error: true,
            message: "Email existe déja"
         })
       }
   
       const verifyPseudo = await this.userRepository.findOne({where:{
         pseudo: userData.pseudo
       }})
   
       console.log("user verify:", verifyPseudo)
   
       if(verifyPseudo) {
         return res.status(HttpStatus.CONFLICT).json({
            error: true,
            message: "Pseudpo exite déjà"
         })
       }
   
   
         const saltOrRounds = 10;
   
         console.log('send password:', userData)
   
   const password = userData.password
   const hash = await bcrypt.hash(password, saltOrRounds);
   userData.password = hash;
   
   console.log('password hash:',userData.password);
   
      const dataSave = await this.userRepository.save(userData);
   
         if(!dataSave) {
            console.log(dataSave);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: true,
              message: "Erreur survenue lors de l'enregistrement dans la base de donnée"
            })
         }
   
         return res.status(HttpStatus.OK).json({
               error: false,
               message: "Valeur enregistrée avec succès",
               data: dataSave
         })
      } catch(error) {
         console.log(error);
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: `Erreur survenu: ${error.message}`
         })
     }


   } 

   async getAllUser(res: Response){

   const dataUsers = await this.userRepository.find();
   const countUser = await this.userRepository.count();

      return res.status(HttpStatus.OK).json({

         error: false,
        message: "Données engistrées avec succès !",
        data: dataUsers,
        nbreUser: countUser

      })
        
      
   }

   async UserInfo(userId: string , res: Response){
      const dataUsers = await this.userRepository.findOne({
         where:{id: userId}});

         console.log(dataUsers);

         if(!dataUsers){
            return res.status(HttpStatus.BAD_REQUEST).json({
               error: true,
               message:"Informations non trouvée"
            })
         }

            return res.status(HttpStatus.OK).json({
               error: false,
               message: "Données trouvées avec succès",
               data: dataUsers

      })
   }

   async updateProfile(userData: updateUserDto, res: Response){
      
      // rechercher l'utilisateur à mettre à jour

      const dataUsers = await this.userRepository.findBy({id: userData.idUsers});

      if(!dataUsers)
      /*const dataUsers = await this.userRepository.findOneBy({id: userData.idUsers});

       console.log(dataUsers);*/

      console.log('user non trouvé'); 

      //appliqué la mise à jour à chaque propriété

        if(userData.fullName){
            dataUsers[0].fullName = userData.fullName;
        }

        if(userData.pseudo){
         dataUsers[0].pseudo = userData.pseudo;
        }

        if(userData.email){
         dataUsers[0].email = userData.email
        }

        if(userData.telNumber){
         dataUsers[0].telNumber = userData.telNumber
        }


    /*  dataUsers[0].fullName = userData.fullName ?? dataUsers[0].fullName;
      dataUsers[0].pseudo = userData.pseudo ?? dataUsers[0].pseudo;
      dataUsers[0].email = userData.email ?? dataUsers[0].email;
      dataUsers[0].telNumber = userData.telNumber ?? dataUsers[0].telNumber; */


      // Sauvegarde de la mise à jour

      const dataSave = await this.userRepository.save(dataUsers[0]);
              
       if(dataSave){

            console.log(dataSave); 
               return res.status(HttpStatus.OK).json({
                  error: false,
                  message: "Utilisateur mis à jour avec succès",
                  data: dataSave
               
            })
       }


     /* return{

         error: false,
         message: "Utilisateur mis à jour avec succès",
         data: dataSave
      } */
      
      
   }

   async deleteProfile(idUsers: string, res: Response){
      const deleteProfile = await this.userRepository.delete({id: idUsers});

      if(!deleteProfile){
         console.log("erreur sur l'utilisateur");
      }

      //console.log("user supprimé:"); //deleteProfile);

      return res.status(HttpStatus.OK).json({

         error: false,
         message: "Utilisateur supprimé avec succès",
         data: deleteProfile

      })
         
      }

   }




