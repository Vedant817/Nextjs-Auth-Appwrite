import conf from "@/config/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type loginUserAccount = {
    email: string,
    password: string,
}

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService{
    //? Create a new Record of user inside the appwrite
    async createUserAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error: any) {
            throw error;
        }
    }
    async login({email, password}: loginUserAccount){
        try {
            return await account.createEmailSession(email, password);
        } catch (error: any) {
            throw error;
        }
    }
    async isLoggedIn(): Promise<boolean>{
        try {
            const data = await this.getCurrentUser();
            return Boolean(data) //! This will return true if the data is present else will return the false
        } catch (error) {
            
        }
        return false
    }
    async getCurrentUser(){
        try {
            return account.get()
        } catch (error: any) {
            console.log("Get Current User Error", error);
        }
        return null;
    }
    async logout(){}
}