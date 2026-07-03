import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login ({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error)
            throw error
        }
    }

    async updateProfile({name, email, currentPassword, newPassword}) {
        try{
            if(name){
                await this.account.updateName(name)
            }
            if(email && currentPassword){
                await this.account.updateEmail(email, currentPassword)
            }
            if (currentPassword && newPassword){
                await this.account.updatePassword(newPassword, currentPassword)
            }

            return this.getCurrentUser()
        } catch(error) {
            console.log("Appwrite Service :: updateProfile :: error", error)
            throw error
        }
    }
        
}

const authService = new AuthService();
export default authService
