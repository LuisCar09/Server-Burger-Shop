import express from 'express'
import axios from 'axios';
import cors from 'cors';
// import routes from './routes';
const app = express();
const port = 3001;

const API_URL = 'https://burgers-hub.p.rapidapi.com'
let burgersAdded = []

//Only accept request from this corsOptions
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// // Configura Axios para incluir la cabecera CORS
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//middleware to analize JSON data
app.use(express.json());
app.use(cors());
// app.use('/',routes)
const options = {
    method: 'GET',
    url: 'https://burgers-hub.p.rapidapi.com/burgers',
    headers: {
        'X-RapidAPI-Key': '627b75f1bbmshae1da91acaeb892p176257jsn21a401f47a21',
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
    }
};


//Data send to render burgers
app.get('/burgers', async (req, res) => {

    try {
        res.json(data)
    } catch (error) {
        console.error('Error sending data', error);
        res.status(500).json({ error: 'Server error', message: error.message })
    }
})
app.get('/add', (req, res) => {
    res.json(burgersAdded)
})

app.get('/add/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = data.findIndex(burger => burger.id === id)

    const result = data[index]
    

    res.sendStatus(200)
})
app.post('/add', (req, res) => {
    const { name, picture, price, id } = req.body

    try {
        let counter = ''
        let item = {
            name: name,
            picture: picture,
            price: price,
            id: id,
            quantity: 1,
            total: null
        }

        const itemExist = burgersAdded.find(burger => burger.id === item.id)

        //Here I check if itemExist isn't tru add to array, else add 1 more to itemExist.quantity: 1;
        !itemExist ? burgersAdded.push(item) : itemExist.quantity += 1;

        //If itemExist total will be burger's amount * quantity, the I will use this result to send to client side and rendering it
        if (itemExist) {
            itemExist.total = () => {
                
                return (Number(itemExist.price) * itemExist.quantity)
            }
        }
       
        res.status(200).send('Data received correctly')
    } catch (error) {
        console.error('Error sending data to client side', error.message);
        res.status(500).json({ error: 'Server error', message: error.message })
    }


})

app.patch('/add', (req, res) => {
    const { id, value } = req.body
    //We search if id number exist in burgersAdd array, if exist return object with this ID 
    burgersAdded.map(burger => console.log(`${burger.id}`))
    
   
    const itemExist = burgersAdded.find(burger => burger.id === id)
    
    itemExist.quantity = value

   



    res.status(200).send('Good')
})
app.delete('/add/:id', (req, res) => {
    
    //recibimos los params y luego buscamos si existe ese id en el array de burgers y luego eliminamos ese item con .splice
    try {
        const data= req.params
        const index = burgersAdded.findIndex(burger => burger.id === Number(data.id))
        burgersAdded.splice(index,1)
       
        res.status(200).send('Deleted data')
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message })
    }
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('-----------------------------------');
})

const data = [
    {
        id: 1,
        name: 'Bacon,Egg & Cheese Biscuit',
        images: [{
            sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:1-4-product-tile-desktop"
        },
        {
            lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit-1:product-header-desktop?wid=829&hei=455&dpr=off"
        }],
        desc: "The McDonald's Bacon, Egg & Cheese Biscuit breakfast sandwich features a warm, buttermilk biscuit brushed with real butter, thick cut Applewood smoked bacon, a fluffy folded egg, and a slice of melty American cheese. There are 460 calories in a Bacon, Egg & Cheese Biscuit at McDonald's. ",
        ingredients: [
            {
                id: 1,
                name: "Biscuit",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/biscuit"
            },
            {
                id: 2,
                name: "Folded Egg",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/folded_egg"
            },
            {
                id: 3,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 4,
                name: "Thick Cut Applewood Smoked Bacon",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/applewood_bacon"
            },
            {
                id: 5,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            },
            {
                id: 6,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 3.23,
        veg: false
    },
    {
        id: 2,
        name: 'Egg McMuffin',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Egg-McMuffin-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Egg-McMuffin-1:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: 'Our Egg McMuffin® breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. There are 310 calories in an Egg McMuffin®.',
        ingredients: [
            {
                id: 1,
                name: "English Muffin",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/english_muffin"
            },
            {
                id: 2,
                name: "Egg",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/round_egg"
            },
            {
                id: 3,
                name: "Canadian Bacon",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/canadian_bacon"
            },
            {
                id: 4,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 5,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            },
            {
                id: 6,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 5,
        veg: false
    },
    {
        id: 3,
        name: 'Sausage McMuffin',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin:product-header-mobile?wid=768&hei=441&dpr=off"
            }
        ],
        desc: "McDonald's Sausage McMuffin® recipe features a warm, freshly toasted English muffin, topped with a savory hot sausage patty and a slice of melty American cheese. There are 400 calories in a Sausage McMuffin® at McDonald's. ",
        ingredients: [
            {
                id: 1,
                name: "English Muffin",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/english_muffin"
            },
            {
                id: 2,
                name: "Sausage Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/sausage"
            },
            {
                id: 3,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            },
            {
                id: 4,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 12,
        veg: false
    },
    {
        id: 4,
        name: 'Sausage McMuffin® with Egg',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin-with-Egg:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin-with-Egg:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: "McDonald’s Sausage McMuffin® with Egg features a savory hot sausage, a slice of melty American cheese, and a delicious freshly cracked egg all on a freshly toasted English muffin. There are 480 calories in Sausage McMuffin® with Egg at McDonald's.",
        ingredients: [
            {
                id: 1,
                name: "English Muffin",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/english_muffin"
            },
            {
                id: 2,
                name: "Sausage Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/sausage"
            },
            {
                id: 3,
                name: "Egg",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/round_egg"
            },
            {
                id: 4,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 5,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            },
            {
                id: 6,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 5.6,
        veg: false
    },
    {
        id: 5,
        name: 'Sausage Biscuit',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Biscuit-Regular-Size-Biscuit-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Biscuit-Regular-Size-Biscuit-1:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: "McDonald’s Sausage Biscuit is the perfect sausage breakfast sandwich, made with sizzling hot sausage on a warm buttermilk biscuit that’s topped with real butter and baked to perfection. There are 460 calories in a McDonald's Sausage Biscuit.",
        ingredients: [
            {
                id: 1,
                name: "Biscuit",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/biscuit"
            },
            {
                id: 2,
                name: "Sausage Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/sausage"
            },
            {
                id: 5,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            }
        ],
        price: 12,
        veg: false
    },
    {
        id: 6,
        name: 'Sausage Biscuit with Egg',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Biscuit-with-Egg-Regular-Size-Biscuit-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Biscuit-with-Egg-Regular-Size-Biscuit-1:product-header-mobile?wid=768&hei=441&dpr=off"
            }
        ],
        desc: "McDonald's Sausage and Egg Biscuit features a warm, flaky biscuit brushed with real butter, a sizzling hot pork sausage patty, and a classic McDonald's folded egg. It's the perfect savory breakfast sandwich when you're looking for a quick, easy breakfast.",
        ingredients: [
            {
                id: 1,
                name: "Biscuit",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/biscuit"
            },
            {
                id: 2,
                name: "Folded Egg",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/folded_egg"
            },
            {
                id: 3,
                name: "Sausage Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/sausage"
            },
            {
                id: 4,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            },
            {
                id: 5,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 4.6,
        veg: false
    },
    {
        id: 7,
        name: 'Bacon, Egg & Cheese McGriddles®',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Egg-Cheese-McGriddles-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-Egg-Cheese-McGriddles:product-header-mobile?wid=768&hei=441&dpr=off"
            }
        ],
        desc: 'Sausage, Egg & Cheese McGriddles® feature soft, warm griddle cakes—with the sweet taste of maple—that hold a fluffy folded egg, savory sausage, and melty American cheese. McGriddles® cakes have no artificial preservatives or flavors and no colors from artificial sources. There are 550 calories in a Sausage, Egg, and Cheese McGriddles®.',
        ingredients: [
            {
                id: 1,
                name: "Griddle Cakes",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/McGriddles_top"
            },
            {
                id: 2,
                name: "Sausage Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/sausage"
            },
            {
                id: 3,
                name: "Folded Egg",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/folded_egg"
            },
            {
                id: 4,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 5,
                name: "Clarified Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/clarified_butter"
            }
        ],
        price: 12,
        veg: false
    },
    {
        id: 8,
        name: 'Crispy Chicken Sandwich',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-crispy-chicken-sandwich:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-crispy-chicken-sandwich:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: "McDonald's Crispy Chicken Sandwich is a southern style fried chicken sandwich that's crispy, juicy and tender perfection. It’s topped with crinkle-cut pickles and served on a toasted, buttered potato roll. The Crispy Chicken sandwich has 470 calories.",
        ingredients: [
            {
                id: 1,
                name: "Crispy Chicken Fillet",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crispy-chicken-fillet"
            },
            {
                id: 2,
                name: "Potato Roll",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-potato-roll"
            },
            {
                id: 3,
                name: "Crinkle Cut Pickle",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crinkle-cut-pickle"
            },
            {
                id: 4,
                name: "Salted Butter",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/butter_salted"
            }
        ],
        price: 8,
        veg: false
    },
    {
        id: 9,
        name: 'Deluxe Crispy Chicken Sandwich',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-deluxe-crispy-chicken-sandwich:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-deluxe-crispy-chicken-sandwich:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: 'Get a little extra with toppings. Go deluxe with shredded lettuce, Roma tomatoes and mayo to take crispy, juicy and tender to the next level. The Deluxe Crispy Chicken sandwich has 530 calories.',
        ingredients: [
            {
                id: 1,
                name: "Crispy Chicken Fillet",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crispy-chicken-fillet"
            },
            {
                id: 2,
                name: "Potato Roll",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-potato-roll"
            },
            {
                id: 3,
                name: "Roma Tomato",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/Ingredients_Tomato_180x180"
            },
            {
                id: 4,
                name: "Shredded Lettuce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/shredded_lettuce"
            },
            {
                id: 5,
                name: "Mayonnaise",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/mayonnaise"
            }
        ],
        price: 10,
        veg: false
    },
    {
        id: 10,
        name: 'Spicy Crispy Chicken Sandwich',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:product-header-mobile?product-header-desktop&wid=768&hei=443&dpr=off"
            }
        ],
        desc: 'With our Spicy Pepper Sauce topping the southern style fried chicken fillet on a toasted potato roll, this sandwich was made for those who like it crispy, juicy, tender and hot. The Spicy Crispy Chicken sandwich has 530 calories.',
        ingredients: [
            {
                id: 1,
                name: "Crispy Chicken Fillet",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crispy-chicken-fillet"
            },
            {
                id: 2,
                name: "Potato Roll",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-potato-roll"
            },
            {
                id: 3,
                name: "Spicy Pepper Sauce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-original-spicy-sauce"
            },
            {
                id: 4,
                name: "Crinkle Cut Pickle",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crinkle-cut-pickle"
            }
        ],
        price: 9.6,
        veg: false
    },
    {
        id: 11,
        name: 'Spicy Deluxe Crispy Chicken Sandwich',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-deluxe-crispy-chicken-sandwich:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-deluxe-crispy-chicken-sandwich:product-header-mobile?wid=768&hei=441&dpr=off"
            }
        ],
        desc: 'The Spicy Deluxe Crispy Chicken is big on everything, including heat. Our southern-style fried chicken fillet on a potato roll, topped with shredded lettuce, Roma tomatoes and Spicy Pepper Sauce kicks crispy, juicy and tender up to the highest level. The Spicy Deluxe Crispy Chicken sandwich has 540 calories.',
        ingredients: [
            {
                id: 1,
                name: "Crispy Chicken Fillet",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-crispy-chicken-fillet"
            },
            {
                id: 2,
                name: "Potato Roll",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-potato-roll"
            },
            {
                id: 3,
                name: "Roma Tomato",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/Ingredients_Tomato_180x180"
            },
            {
                id: 4,
                name: "Spicy Pepper Sauce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/t-original-spicy-sauce"
            },
            {
                id: 5,
                name: "Shredded Lettuce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/shredded_lettuce"
            }
        ],
        price: 15,
        veg: false
    },
    {
        id: 12,
        name: 'Filet-O-Fish®',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Filet-O-Fish-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Filet-O-Fish-1:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: "Dive into our wild-caught Filet-O-Fish®! This McDonald’s fish sandwich has fish sourced from sustainably managed fisheries, on melty American cheese and topped with creamy McDonald’s tartar sauce, all served on a soft, steamed bun. There are 390 calories in McDonald's Filet-O-Fish.",
        ingredients: [
            {
                id: 1,
                name: "Fish Filet Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/fish"
            },
            {
                id: 2,
                name: "Regular Bun",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/regular_bun"
            },
            {
                id: 3,
                name: "Tartar Sauce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/default_logo"
            },
            {
                id: 4,
                name: "Pasteurized Process American Cheese Half Slice",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/american_cheese_half"
            },
            {
                id: 5,
                name: "Shredded Lettuce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/shredded_lettuce"
            }
        ],
        price: 7,
        veg: false
    },
    {
        id: 13,
        name: 'McChicken®',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-McChicken-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-McChicken-1:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: 'It’s a classic for a reason. Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun.* The McChicken® has 400 calories.',
        ingredients: [
            {
                id: 1,
                name: "McChicken Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/mcchicken"
            },
            {
                id: 2,
                name: "Regular Bun",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/regular_bun"
            },
            {
                id: 3,
                name: "Shredded Lettuce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/shredded_lettuce"
            },
            {
                id: 4,
                name: "Mayonnaisee",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/mayonnaisef"
            }
        ],
        price: 8,
        veg: false
    },
    {
        id: 14,
        name: 'Big Mac®',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:product-header-mobile?wid=768&hei=441&dpr=off"
            }
        ],
        desc: "Ever wondered what's on a Big Mac®? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It’s topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese. It contains no artificial flavors, preservatives, or added colors from artificial sources. Our pickle contains an artificial preservative, so skip it if you like. There are 550 calories in a Big Mac® from McDonald's. Pair it with any of our beverages or grab a Big Mac® Combo Meal with our World Famous Fries® and Coca-Cola® or any of your favorite fountain drinks.",
        ingredients: [
            {
                id: 1,
                name: "Big Mac Bun",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/big_mac_bun"
            },
            {
                id: 2,
                name: "100% Beef Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/10_1_patty"
            },
            {
                id: 3,
                name: "Shredded Lettuce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/shredded_lettuce"
            },
            {
                id: 4,
                name: "Big Mac Sauce",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/big_mac_sauce"
            },
            {
                id: 5,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 6,
                name: "Pickle Slices",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/pickles"
            },
            {
                id: 7,
                name: "Onions",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/reconstituted_onions"
            }
        ],
        price: 10.45,
        veg: false
    },
    {
        id: 15,
        name: 'Quarter Pounder®* with Cheese',
        images: [
            {
                sm: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Quarter-Pounder-with-Cheese-1:1-4-product-tile-desktop"
            },
            {
                lg: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Quarter-Pounder-with-Cheese-1:product-header-mobile?wid=768&hei=443&dpr=off"
            }
        ],
        desc: 'Each Quarter Pounder® with Cheese burger features a ¼ lb.* of 100% fresh beef that’s hot, deliciously juicy and cooked whenconsole.log(burgers); you order. It’s seasoned with just a pinch of salt and pepper, sizzled on a flat iron grill, then topped with slivered onions, tangy pickles and two slices of melty American cheese on a sesame seed bun. Our QPC® contains no artificial flavors, preservatives or added colors from artificial sources. **Our pickle contains an artificial preservative, so skip it if you like. A Quarter Pounder® with Cheese has 520 Calories. ',
        ingredients: [
            {
                id: 1,
                name: "Quarter Pound 100% Beef Patty",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/default_logo"
            },
            {
                id: 2,
                name: "Quarter Pound Bun",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/quarter_pounder_bun"
            },
            {
                id: 3,
                name: "Pasteurized Process American Cheese",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ingredient_american_cheese_180x180"
            },
            {
                id: 4,
                name: "Ketchup",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/ketchup"
            },
            {
                id: 5,
                name: "Pickle Slices",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/pickles"
            },
            {
                id: 6,
                name: "Onions",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/slivered_onions"
            },
            {
                id: 7,
                name: "Mustard",
                img: "https://s7d1.scene7.com/is/image/mcdonalds/mustard"
            }
        ],
        price: 6,
        veg: false
    }
]
// QUede en get total para obtener los totales y luego renderizars
