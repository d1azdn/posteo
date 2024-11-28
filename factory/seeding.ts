import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    const role = [
        "user", "admin"
    ]

    for (const roles of role){
        await prisma.role.create({
            data:{
                role:roles
            }
        })
    }
    
    console.log("done seeding.")
}

main()