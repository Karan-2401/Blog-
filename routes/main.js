const express = require("express")
const router = express.Router()
const createPost = require('../models/post')
const nodemailer = require('nodemailer')

router.get("/", async(req, res) => {
   
    let perPage = 10;
    let pageNumber=req.query.page || 1;
    try{
        
        const Data = await createPost.aggregate([
            {$sort:{_id:-1}},
            {$skip: perPage*pageNumber - perPage},
            {$limit:perPage}
        ]);
        const locals = {
            title: "Nodejs Essential work",
            description: "The node js is good with mongodb."
        }
        const count = await createPost.countDocuments();
        console.log(`number:`+count)

        const newPage = parseInt(pageNumber) +1;
        const cheack = newPage <= Math.ceil(count / perPage);
        console.log(newPage)
        console.log(cheack)


        res.render('index', {
            locals,
            Data,
            newPage:newPage,
            cheack :cheack ? null : 1,
            cookie:req.cookies.token
        })
    }catch(error){
        console.log(error)
    }
})

router.post('/search', async(req,res)=>{
   try{
    const locals = {
        title:"Search"
    }
    const id = req.body.search;
    const id2 = id.replace(/^[a-zA-Z0-9]/g,"")
    const data =await createPost.find({
        $or:[
            {title:{$regex : new RegExp(id2,"i")}},
            {body:{$regex : new RegExp(id2,"i")}},
            
        ]
    }
    )
    console.log("id data"+data)
    res.render('search',{Data:data,cookie:req.cookies.token})

   }catch(error){
    console.log(error)
   }
})

router.get('/post/:id', async(req,res)=>{
    const data = req.params.id;
    try{
       const data1 = await createPost.findOne({_id:data})
        res.render('post',{locals:data1,cookie:req.cookies.token})
    }catch(error){
        console.log(error)
    }
})

router.get("/about", (req, res) => {
    res.render('about')
})

router.get('/contact',async(req,res)=>{
    const locals = {
        title:"Contact"
    }
    try {
        res.render('contact',{locals:locals,cookie:req.cookies.token})
    } catch (error) {
        console.log(error)
    }
})

router.post('/send-message',async(req,res)=>{
try {
    const {email,message} = req.body;
    console.log(email,message)
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'karan342772@gmail.com',
            pass:"jnqk ctvn qacz mpau"
        }
    })

    const mail = {
        from:"karan342772@gmail.com",
        to:"karan342772@gmail.com",
        subject:"user message",
        text:`email : ${email}
        and message : ${message} `
    }
    try {
        await transporter.sendMail(mail)
    res.redirect('contact')
    } catch (error) {
        console.log(error)
    }
    
} catch (error) {
    
}
})

module.exports = router

//   function insertPostData(){
//      createPost.insertMany([
// //          {
// //              title: "Spiderman",
// //              body: `Spider-Man has the secret identity of Peter Benjamin Parker. Initially, Peter was depicted as a teenage high-school student and an orphan raised by his Aunt May and Uncle Ben in New York City after his parents, Richard and Mary Parker, died in a plane crash. Lee, Ditko, and later creators had the character deal with the struggles of adolescence and young adulthood and gave him many supporting characters, such as Flash Thompson, J. Jonah Jameson, and Harry Osborn; romantic interests Gwen Stacy, Mary Jane Watson, and the Black Cat; and enemies such as Doctor Octopus, the Green Goblin, and Venom. In his origin story, Peter gets his superhuman spider powers and abilities after being bitten by a radioactive spider. These powers include superhuman strength, speed, agility, reflexes, stamina, durability, coordination, and balance; clinging to surfaces and ceilings like a spider; and detecting danger with his precognition ability called "spider-sense". He builds wrist-mounted "web-shooter" devices that shoot artificial spider-webs of his own design, which he uses both for fighting and travel, or "web swinging" across the city. Peter Parker initially used his powers for personal gain, but after his Uncle Ben was killed by a thief that he could have stopped but did not, Peter began to use his powers to fight crime as Spider-Man.`
// //          },
// //          {
// //              title: "Hulk",
// //              body: `The Hulk is a superhero appearing in American comic books published by Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, the character first appeared in the debut issue of The Incredible Hulk (May 1962). In his comic book appearances, the character, who has dissociative identity disorder (DID), is primarily represented by the alter ego Hulk, a green-skinned, hulking, and muscular humanoid possessing a limitless degree of physical strength, and the alter ego Dr. Robert Bruce Banner, a physically weak, socially withdrawn, and emotionally reserved physicist, both of whom typically resent each other.Following his accidental exposure to gamma rays while saving the life of Rick Jones during the detonation of an experimental bomb, Banner is physically transformed into the Hulk when subjected to emotional stress, at or against his will. This transformation often leads to destructive rampages and conflicts that complicate Banner's civilian life. The Hulk's level of strength is usually conveyed proportionate to his anger level. Commonly portrayed as a raging savage, the Hulk has been represented with other alter egos, from a mindless, destructive force (War) to a brilliant warrior (World-Breaker), a self-hating protector (the Devil Hulk), a genius scientist in his own right (Doc Green), and a gangster (Joe Fixit).`
// //          },
// //          {
// //              title: "Iron man",
// //              body: `Iron Man is a superhero appearing in American comic books published by Marvel Comics. Co-created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby, the character first appeared in Tales of Suspense #39 in 1962 (cover dated March 1963) and received his own title with Iron Man #1 in 1968. Shortly after his creation, Iron Man became a founding member of the superhero team, the Avengers, alongside Thor, Ant-Man, the Wasp, and the Hulk. Iron Man stories, individually and with the Avengers, have been published consistently since the character's creation.Iron Man is the superhero persona of Anthony Edward "Tony" Stark, a businessman and engineer who runs the weapons manufacturing company Stark Industries. When Stark was captured in a war zone and sustained a severe heart wound, he built his Iron Man armor and escaped his captors. Iron Man's suits of armor grant him superhuman strength, flight, energy projection, and other abilities. The character was created in response to the Vietnam War as Lee's attempt to create a likeable pro-war character. Since his creation, Iron Man has been used to explore political themes, with early Iron Man stories being set in the Cold War. The character's role as a weapons manufacturer proved controversial, and Marvel moved away from geopolitics by the 1970s. Instead, the stories began exploring themes such as civil unrest, technological advancement, corporate espionage, alcoholism, and governmental authority.`
// //          }
// {
//     title: "The Rise of Female Superheroes: Empowering Women",
//     body: "In recent years, female superheroes have been taking center stage in comic books, movies, and TV shows. Characters like Wonder Woman, Captain Marvel, and Black Widow are challenging traditional gender roles and inspiring young girls and women everywhere. These superheroes show that strength, intelligence, and bravery are not bound by gender. They fight for justice, face adversity, and lead by example, proving that women can be just as powerful as their male counterparts. The increasing visibility of female superheroes is a step forward in achieving gender equality in the superhero genre."
//   },
//   {
//     title: "The Dark Side of Superheroes: The Psychological Struggles",
//     body: "While superheroes are often seen as symbols of hope and justice, they also face psychological struggles that make them more relatable. Batman’s trauma from witnessing his parents' murder, Spider-Man’s guilt over Uncle Ben’s death, and Iron Man’s battle with PTSD show that even heroes have emotional vulnerabilities. These inner conflicts add depth to their characters, highlighting the human side of being extraordinary. Superheroes are flawed, complex individuals who must navigate their personal demons while saving the world. Their stories remind us that even the strongest among us are not immune to struggle."
//   },
//   {
//     title: "The Evolution of Superheroes in Pop Culture",
//     body: "Superheroes have evolved dramatically over the years, shifting from comic books to movies, TV series, and video games. Originally, they were simple characters with clear-cut morals, but today’s superheroes are more complex, dealing with ethical dilemmas and deeper personal issues. The rise of cinematic universes like Marvel and DC has expanded superhero narratives, making them more accessible to a global audience. As society evolves, so do these characters, reflecting current social issues such as diversity, identity, and justice. Superheroes are not just entertainment; they are a mirror to the times we live in."
//   },
//   {
//     title: "How Superheroes Influence Modern Society",
//     body: "Superheroes have a significant impact on society, offering role models, inspiration, and hope. They teach valuable lessons about resilience, teamwork, and the importance of standing up for what’s right. Heroes like Superman, Spider-Man, and Black Panther have become symbols of justice, encouraging individuals to challenge inequality, fight against oppression, and protect those in need. Superheroes also inspire us to use our unique abilities to make a difference in the world. Their stories transcend the pages of comic books, influencing how we view power, responsibility, and heroism in our own lives."
//   },
//   {
//     title: "The Power of Teamwork: Lessons from Superhero Teams",
//     body: "One of the most enduring themes in superhero stories is teamwork. The Avengers, the Justice League, and the X-Men are just a few examples of superhero teams that demonstrate the power of collaboration. Each member brings a unique set of skills to the table, highlighting the importance of diversity in problem-solving and conflict resolution. Superhero teams show that individual talents, when combined, can create something greater than the sum of its parts. Whether it’s saving the world or navigating personal challenges, teamwork is a crucial element in overcoming obstacles and achieving success."
//   },
//   {
//     title: "What Makes a Superhero: Beyond the Powers",
//     body: "Superheroes are more than just people with extraordinary abilities. At their core, they are defined by their sense of justice, compassion, and willingness to fight for others. While powers like super strength, speed, or telepathy are essential for many superheroes, it is their character and moral compass that define them. Superheroes often wrestle with the responsibility their powers bring, struggling to find a balance between their alter egos and their heroic identities. What truly makes a superhero is their heart, dedication, and commitment to making the world a better place, regardless of their powers."
//   },
//   {
//     title: "The Most Iconic Superhero Costumes of All Time",
//     body: "A superhero's costume is an integral part of their identity, often symbolizing their powers, origin, and personal philosophy. From Superman’s iconic 'S' symbol to Spider-Man’s webbed suit, these outfits become synonymous with the characters themselves. Wonder Woman's armor reflects her Amazonian heritage, while Batman’s dark costume mirrors his own struggle with darkness. The superhero costume is not just about aesthetics; it's a powerful tool for communication. It can signal hope, strength, or even intimidation, depending on the hero's mission. These costumes are not only visually striking but also carry deep meaning for both the characters and their fans."
//   },
//   {
//     title: "Why We Love Anti-Heroes: The New Age of Superheroes",
//     body: "The rise of anti-heroes like Deadpool, The Punisher, and Wolverine has brought a new dimension to superhero storytelling. These characters operate in morally gray areas, challenging the traditional notion of what it means to be a hero. Anti-heroes often have complex motivations and backstories, making them more relatable and human than their traditional counterparts. Their actions may be violent or ruthless, but they still fight for a sense of justice. The popularity of anti-heroes reflects a shift in society's views on morality, as audiences seek characters who are more nuanced and imperfect."
//   },
//   {
//     title: "Superheroes vs. Villains: The Complex Relationship",
//     body: "The battle between superheroes and villains is at the heart of most superhero stories. However, this rivalry is often more complicated than good vs. evil. Many villains are motivated by personal pain, societal issues, or misguided ideologies, making them more relatable and tragic. Heroes like Batman and Spider-Man struggle with their own flaws, blurring the line between hero and villain. This complexity makes the dynamics between heroes and villains intriguing. Understanding a villain's backstory and motivations often challenges viewers to question the nature of heroism and justice, showing that these battles are rarely black and white."
//   },
//   {
//     title: "Superpowers: What If They Were Real?",
//     body: "Superpowers have long captivated the imagination of audiences, but what if they were real? If people had abilities like telekinesis, flight, or invisibility, how would the world change? On one hand, superpowers could solve global challenges like hunger, disease, or climate change. On the other, they might create a new set of problems, such as power imbalances, ethical dilemmas, and personal privacy issues. The question of how superpowers would impact society is not just theoretical but is explored in superhero narratives, where characters grapple with the responsibilities and consequences of their extraordinary abilities."
//   },
//   {
//     title: "The Importance of Origins: How Superheroes Become Heroes",
//     body: "A superhero's origin story is crucial in understanding their motivations, vulnerabilities, and the reasons behind their heroic journey. Whether it's Spider-Man being bitten by a radioactive spider, or Iron Man building a suit of armor to survive captivity, these origins shape their identities. They often come with great personal loss, responsibility, or a moral awakening, setting the foundation for their superhero journey. Origins not only explain how heroes acquire their powers but also provide insight into the inner struggles that define their mission. These backstories help fans connect with the heroes on a deeper emotional level."
//   },
//   {
//     title: "The Legacy of Classic Superheroes: From Golden to Silver Age",
//     body: "The history of superheroes can be traced back to the Golden Age of Comics, when characters like Superman, Batman, and Captain America first emerged. These early superheroes were symbols of hope, fighting villains like Nazis and criminals. As the Silver Age arrived, the genre became more imaginative, introducing characters like the Flash and the X-Men, who had complex personalities and powers. Over time, superheroes evolved to reflect changing societal norms and issues, leading to the more diverse and multifaceted characters we see today. The legacy of these early heroes continues to influence the genre’s modern incarnation."
//   },
//   {
//     title: "The Science Behind Superhero Powers: Fact or Fiction?",
//     body: "Superhero powers have always been a topic of intrigue and fascination. But could any of them exist in real life? While abilities like super strength or telepathy are purely fictional, many of the scientific principles behind superhero powers have real-world counterparts. For instance, characters like Iron Man and Batman use cutting-edge technology that parallels advancements in engineering and robotics. Meanwhile, scientific concepts like genetic mutation in X-Men raise questions about the future of human evolution. While we may never see someone fly like Superman, the science behind superhero powers opens up possibilities for future innovation in our world."
//   },
//   {
//     title: "The Role of Superheroes in Overcoming Personal Struggles",
//     body: "Superheroes are not only about saving the world—they also face deeply personal struggles that make them more relatable. Characters like Tony Stark (Iron Man), who battles alcoholism and PTSD, or Bruce Wayne (Batman), who grapples with the trauma of losing his parents, show that even the strongest heroes face their own demons. These challenges make their journeys more compelling and offer real-life lessons about resilience, coping with grief, and finding strength in adversity. Superheroes, in their vulnerability, show us that it's okay to struggle, and that perseverance in the face of hardship can lead to growth."
//   },
//   {
//     title: "The Role of Villains in Superhero Narratives",
//     body: "A compelling villain is just as important as the superhero they face. Great villains like The Joker, Thanos, and Magneto are not merely obstacles for heroes to overcome—they challenge heroes' values and question their beliefs. Villains often have complex motivations, and their backstories provide a deeper understanding of their actions. Their presence helps define the hero’s journey by forcing them to make difficult choices. Whether driven by revenge, power, or a twisted sense of justice, villains play a pivotal role in shaping the direction of superhero narratives, ultimately making the heroes' triumphs more meaningful."
//   },
//   {
//     title: "How Superheroes Promote Moral Lessons and Ethical Dilemmas",
//     body: "Superhero stories often go beyond action-packed battles and superpowers—they present complex moral and ethical dilemmas. From Superman’s decision to save people while keeping his true identity secret, to Spider-Man’s struggle with personal responsibility, these dilemmas make superheroes more than just crime fighters. They encourage readers and viewers to think about right and wrong in shades of gray. Superheroes are forced to make tough choices that affect their loved ones, their communities, and themselves. These stories offer valuable lessons on sacrifice, justice, and the consequences of actions, helping audiences reflect on their own ethical beliefs."
//   },
//   {
//     title: "The Popularity of Superhero Movies: What Makes Them So Captivating?",
//     body: "Superhero movies have become a cultural phenomenon, attracting millions of fans around the world. What makes them so captivating? For one, superhero films offer a sense of escapism, transporting audiences into worlds filled with action, adventure, and larger-than-life characters. They also reflect universal themes like justice, power, and identity, which resonate with people of all ages. The stunning visual effects, intricate plots, and emotional depth of these films keep viewers hooked. Additionally, the interconnected cinematic universes, like the Marvel and DC extended universes, create an ongoing sense of excitement and anticipation, drawing fans back for more."
//   },
//   {
//     title: "Superheroes and Social Justice: Fighting for Equality",
//     body: "Superheroes have often been used as symbols for social justice and equality. Characters like Black Panther, the X-Men, and Captain America have tackled issues such as racial discrimination, civil rights, and the fight against oppression. These heroes embody the struggle for justice, equality, and fairness, often representing marginalized communities in the face of adversity. By confronting societal issues head-on, superhero narratives help spark important conversations about power, privilege, and systemic inequality. Through their battles against injustice, superheroes remind us that the fight for equality is ongoing, and we must all stand up for what’s right."
//   },
//   {
//     title: "The Importance of Diversity in Superhero Stories",
//     body: "In recent years, superhero stories have become more diverse, reflecting a broader range of experiences, backgrounds, and cultures. Characters like Black Panther, Kamala Khan (Ms. Marvel), and Miles Morales (Spider-Man) are breaking new ground by representing underrepresented communities. This diversity is important because it allows audiences from different walks of life to see themselves reflected in the heroes they admire. By embracing diversity, superhero stories are able to address a wider range of social issues and challenges, enriching the narratives and making them more relatable to a global audience. Diversity in superheroes is essential for a more inclusive future."
//   },
//   {
//     title: "How Superheroes Shape Our Understanding of Power and Responsibility",
//     body: "One of the most enduring themes in superhero stories is the idea that 'with great power comes great responsibility.' This moral lesson, famously associated with Spider-Man, reminds us that having power is not just about the ability to control—it’s about using that power for the greater good. Superheroes often struggle with this concept, balancing their desire for personal fulfillment with their duty to protect others. This dynamic teaches us that power should never be used recklessly or selfishly. Whether through superhuman abilities or social influence, the responsibility that comes with power is a central lesson in superhero narratives."
//   },
//   {
//     title: "Superhero Movies vs. Comic Books: What's the Difference?",
//     body: "Superhero movies and comic books both tell compelling stories, but they differ significantly in their mediums and approach. Comic books have the advantage of being more visual and detailed, offering readers the chance to immerse themselves in a hero's world through art and words. Movies, on the other hand, bring these stories to life with special effects, live-action performances, and cinematic soundtracks. While both forms of media explore similar themes and characters, movies tend to simplify stories for a wider audience, while comic books have the freedom to dive deeper into complex plots and character development."
//   },
//   {
//     title: "The Future of Superheroes: Trends and Predictions",
//     body: "The future of superheroes looks incredibly exciting, with trends that suggest more diverse, complex, and interconnected stories on the horizon. We can expect an increase in female-led superhero films and stories that tackle contemporary social issues, from climate change to mental health. Technology will play a bigger role, with heroes using AI and advanced gadgets. Additionally, superhero movies will likely continue exploring darker, more complex themes, as evidenced by recent films like 'Joker' and 'The Dark Knight.' As audiences crave new perspectives and groundbreaking narratives, the superhero genre will continue to evolve, reflecting our ever-changing world."
//   },
//   {
//     title: "The Philosophy of Superheroes: What Can We Learn from Them?",
//     body: "Superheroes are often more than just characters—they embody philosophies and ideologies that reflect our deepest values. For example, Superman represents hope, justice, and the power of doing good, while characters like The Punisher question justice through violence. These philosophical elements within superhero stories force us to confront complex moral and existential questions. What is justice? Is it okay to break the law for a greater good? The decisions made by superheroes challenge viewers to think critically about their own beliefs and actions, making superhero stories not only entertaining but intellectually stimulating."
//   }
//       ])
    
//   }

//   insertPostData()