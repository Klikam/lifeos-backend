import { prisma } from "./src/lib/prisma";

async function main() {
    // Create a new user with a post
    // const user = await prisma.user.create({
    //     data: {
    //         name: "Frank",
    //         email: "frank@prisma.io",
    //         posts: {
    //             create: {
    //                 title: "Hello World",
    //                 content: "This is my first post!",
    //                 published: true,
    //             },
    //         },
    //     },
    //     include: {
    //         posts: true,
    //     },
    // });

    // const user = await prisma.user.create({
    //     data: {
    //         name: "Tester",
    //         email: "tester@test.com"
    //     }
    // })
    // console.log("Created user:", user);

    // const post = await prisma.post.create({
    //     data:{
    //         title: "Test title",
    //         content: "Test content",
    //         published: false,
    //         author: {
    //             create: {
    //                 name: "test2",
    //                 email: "test2@text.com"
    //             }
    //         }
    //     }
    // })

    const allUsers = await prisma.user.findMany({
        where: {
            name: "Eduard"
        },
        include: {
            posts: true
        }
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));

    // const posts = await prisma.post.findMany();
    // console.log(posts)
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });