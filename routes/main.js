const express = require("express")
const router = express.Router()
const createPost = require('../models/post')

router.get("/", async(req, res) => {
    const locals = {
        title: "Nodejs Essential work",
        description: "The node js is good with mongodb."
    }
    try{
        const Data = await createPost.find();
        res.render('index', {locals,Data})
    }catch(error){
        console.log(error)
    }
})


router.get("/about", (req, res) => {
    res.render('about')
})

module.exports = router

// function insertPostData(){
//     createPost.insertMany([
//         {
//             title: "Spiderman",
//             body: `Spider-Man has the secret identity of Peter Benjamin Parker. Initially, Peter was depicted as a teenage high-school student and an orphan raised by his Aunt May and Uncle Ben in New York City after his parents, Richard and Mary Parker, died in a plane crash. Lee, Ditko, and later creators had the character deal with the struggles of adolescence and young adulthood and gave him many supporting characters, such as Flash Thompson, J. Jonah Jameson, and Harry Osborn; romantic interests Gwen Stacy, Mary Jane Watson, and the Black Cat; and enemies such as Doctor Octopus, the Green Goblin, and Venom. In his origin story, Peter gets his superhuman spider powers and abilities after being bitten by a radioactive spider. These powers include superhuman strength, speed, agility, reflexes, stamina, durability, coordination, and balance; clinging to surfaces and ceilings like a spider; and detecting danger with his precognition ability called "spider-sense". He builds wrist-mounted "web-shooter" devices that shoot artificial spider-webs of his own design, which he uses both for fighting and travel, or "web swinging" across the city. Peter Parker initially used his powers for personal gain, but after his Uncle Ben was killed by a thief that he could have stopped but did not, Peter began to use his powers to fight crime as Spider-Man.`
//         },
//         {
//             title: "Hulk",
//             body: `The Hulk is a superhero appearing in American comic books published by Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, the character first appeared in the debut issue of The Incredible Hulk (May 1962). In his comic book appearances, the character, who has dissociative identity disorder (DID), is primarily represented by the alter ego Hulk, a green-skinned, hulking, and muscular humanoid possessing a limitless degree of physical strength, and the alter ego Dr. Robert Bruce Banner, a physically weak, socially withdrawn, and emotionally reserved physicist, both of whom typically resent each other.Following his accidental exposure to gamma rays while saving the life of Rick Jones during the detonation of an experimental bomb, Banner is physically transformed into the Hulk when subjected to emotional stress, at or against his will. This transformation often leads to destructive rampages and conflicts that complicate Banner's civilian life. The Hulk's level of strength is usually conveyed proportionate to his anger level. Commonly portrayed as a raging savage, the Hulk has been represented with other alter egos, from a mindless, destructive force (War) to a brilliant warrior (World-Breaker), a self-hating protector (the Devil Hulk), a genius scientist in his own right (Doc Green), and a gangster (Joe Fixit).`
//         },
//         {
//             title: "Iron man",
//             body: `Iron Man is a superhero appearing in American comic books published by Marvel Comics. Co-created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby, the character first appeared in Tales of Suspense #39 in 1962 (cover dated March 1963) and received his own title with Iron Man #1 in 1968. Shortly after his creation, Iron Man became a founding member of the superhero team, the Avengers, alongside Thor, Ant-Man, the Wasp, and the Hulk. Iron Man stories, individually and with the Avengers, have been published consistently since the character's creation.Iron Man is the superhero persona of Anthony Edward "Tony" Stark, a businessman and engineer who runs the weapons manufacturing company Stark Industries. When Stark was captured in a war zone and sustained a severe heart wound, he built his Iron Man armor and escaped his captors. Iron Man's suits of armor grant him superhuman strength, flight, energy projection, and other abilities. The character was created in response to the Vietnam War as Lee's attempt to create a likeable pro-war character. Since his creation, Iron Man has been used to explore political themes, with early Iron Man stories being set in the Cold War. The character's role as a weapons manufacturer proved controversial, and Marvel moved away from geopolitics by the 1970s. Instead, the stories began exploring themes such as civil unrest, technological advancement, corporate espionage, alcoholism, and governmental authority.`
//         }
//     ])
    
// }

// insertPostData()