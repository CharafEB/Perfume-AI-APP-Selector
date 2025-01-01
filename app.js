const app = require('express')();
app.use(require('express').json());
require('dotenv').config()
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey:process.env.GROQ_API_KEY });

app.post('/testAI', async (req, res) =>{
  const {Gender , Season , Preferred , Personality , Intended , Sensitivity } = req.body;
console.log(Gender , Season , Preferred , Personality , Intended , Sensitivity);

  try {
    const chatCompletion = await getGroqChatCompletion(Gender , Season , Preferred , Personality , Intended , Sensitivity);
    res.send(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const perfume_List =[
  "Dior Sauvage","Chanel Coco Mademoiselle","Tom Ford Oud Wood","Versace Eros","Gucci Bloom","Yves Saint Laurent Libre","Prada Luna Rossa Carbon","Giorgio Armani Acqua di Gio Profumo","Jo Malone Wood Sage & Sea Salt","Calvin Klein Euphoria","Lancôme La Vie Est Belle","Paco Rabanne 1 Million","Creed Aventus","Maison Francis Kurkdjian Baccarat Rouge 540","Dolce & Gabbana Light Blue","Hugo Boss Bottled Infinite","Byredo Gypsy Water","Hermès Terre d’Hermès","Montblanc Explorer","Carolina Herrera Good Girl","Emporio Armani Stronger With You","Jean Paul Gaultier Le Male","Tom Ford Noir Extreme","Gucci Guilty Pour Homme","Dior Homme Intense","Dolce & Gabbana The One","Versace Dylan Blue","Yves Saint Laurent L’Homme","Chanel Allure Homme Sport","Hugo Boss The Scent","Paco Rabanne Invictus","Bvlgari Man in Black","Jo Malone Peony & Blush Suede","Acqua di Parma Colonia","Issey Miyake L'Eau d'Issey Pour Homme","Mugler Alien","Narciso Rodriguez For Her","Le Labo Santal 33","Armani Code Profumo","Valentino Uomo Born in Roma"
];

function getPerfumeList(){
    perfume_List.forEach(perfume => {        
        console.log(perfume);
    });
};


 async function getGroqChatCompletion(GN , SEa , PRn , PE , INt , SE) {
  return groq.chat.completions.create({
   
    messages: [
      {
        role: "user", 
        content: `I  want to buy a perfume, and these are the details to guide your recommendation. Please suggest 5 perfumes that you consider the most suitable for me based on the following information: Gender: ${GN} / Season: ${SEa} / Preferred Notes: ${PRn} / Personality Type: ${PE} / Intended Use: ${INt} / Sensitivity (Allergies or Dislikes): ${SE} / Here is the list of available perfumes: ${getPerfumeList()}. Important:  Based on the provided details, please select 5 perfumes strictly suitable for the specified gender and requirements. Respond only in JSON format as shown below, without any additional explanations: { perfume : 'Tom Ford Oud Wood', 'Montblanc Explorer', 'Creed Aventus', 'Maison Francis Kurkdjian Baccarat Rouge 540', 'Giorgio Armani Acqua di Gio Profumo'}`,
      },
    ],
    model: "llama3-8b-8192",
    max_tokens: 1024,
    response_format: {
      "type": "json_object"
    },
  });
}


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});