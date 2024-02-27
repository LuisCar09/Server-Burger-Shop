import express from 'express'
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 3001;

const API_URL = 'https://burgers-hub.p.rapidapi.com'
let burgersAdded = []

//middleware to analize JSON data
app.use(express.json())
app.use(cors())

const options = {
    method: 'GET',
    url: 'https://burgers-hub.p.rapidapi.com/burgers',
    headers: {
        'X-RapidAPI-Key': '627b75f1bbmshae1da91acaeb892p176257jsn21a401f47a21',
        'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
    }
};


const addTotalAmoutOfMoney = () => {
    let add = 0
    let totalAmountOfMoney = 0
    console.log(burgersAdded);
    if (burgersAdded.length > 0) {
        burgersAdded.map((burger) => {
            add = Number(burger.price) * burger.quantity
            totalAmountOfMoney += add
            // console.log('---------------Line 30-------------------');
            // console.log('TotalAmoutOfMoney: ',totalAmountOfMoney);
        })
    }
    console.log('Line 35: ',totalAmountOfMoney );
}

//Data send to render burgers
app.get('/burgers', async (req, res) => {
    
    try {
        const response = await axios.get(API_URL + '/burgers', options)
        const burgers = response.data


        res.json(burgers)
    } catch (error) {
        console.error('Error sending data', error);
        res.status(500).send('Server error')
    }
})
app.get('/add',(req,res)=>{
    res.json(burgersAdded)
})
app.post('/add', (req, res) => {
    const { name, picture, price, id } = req.body
    
    try {
        let counter  = ''
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
            itemExist.total = () =>{
                console.log('Se ejecuto');
                return( Number(itemExist.price) * itemExist.quantity)
            }
        }
        console.log(burgersAdded);
        res.status(200).send('Data received correctly')
    } catch (error) {
        console.error('Error sending data to client side',error.message);
        res.status(500).send('Server Error')
    }

    
})

app.patch('/add', (req,res) => {
    const {id,value} = req.body
    //We search if id number exist in burgersAdd array, if exist return object with this ID 
    const itemExist = burgersAdded.find(burger => burger.id === id)
    itemExist.quantity = value
    
    console.log('-------------------------------------');
    console.log(itemExist,'Line 96');
    console.log('--------------FIN------------------------------');
    

    
    res.status(200).send('Good')
})
app.delete('/add', (req, res) => {
    try {
        const id = req.body
        console.log('Ejecutado cuando number es 0',id,'Line 100' );
        // burgersAdded.filter(burger => burger.id !== id)
    } catch (error) {
        console.error('Error receiving data from client side',error.message);
    }
})

app.get('/total',(req,res) => {
    
    console.log(addTotalAmoutOfMoney());
    
    try {
        // console.log(addTotalAmoutOfMoney());
        // res.json(totalAmountOfMoney)
    } catch (error) {
        
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
        images: [{}, [Object]],
        desc: "The McDonald's Bacon, Egg & Cheese Biscuit breakfast sandwich features a warm, buttermilk biscuit brushed with real butter, thick cut Applewood smoked bacon, a fluffy folded egg, and a slice of melty American cheese. There are 460 calories in a Bacon, Egg & Cheese Biscuit at McDonald's. ",
        ingredients: [[Object], [Object], [Object], [Object], [Object], [Object]],
        price: 3.23,
        veg: false
    },
    {
        id: 2,
        name: 'Egg McMuffin',
        images: [[Object], [Object]],
        desc: 'Our Egg McMuffin® breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. There are 310 calories in an Egg McMuffin®.',
        ingredients: [[Object], [Object], [Object], [Object], [Object], [Object]],
        price: 5,
        veg: false
    },
    {
        id: 3,
        name: 'Sausage McMuffin',
        images: [[Object], [Object]],
        desc: "McDonald's Sausage McMuffin® recipe features a warm, freshly toasted English muffin, topped with a savory hot sausage patty and a slice of melty American cheese. There are 400 calories in a Sausage McMuffin® at McDonald's. ",
        ingredients: [[Object], [Object], [Object], [Object]],
        price: 12,
        veg: false
    },
    {
        id: 4,
        name: 'Sausage McMuffin® with Egg',
        images: [[Object], [Object]],
        desc: "McDonald’s Sausage McMuffin® with Egg features a savory hot sausage, a slice of melty American cheese, and a delicious freshly cracked egg all on a freshly toasted English muffin. There are 480 calories in Sausage McMuffin® with Egg at McDonald's.",
        ingredients: [[Object], [Object], [Object], [Object], [Object], [Object]],
        price: 5.6,
        veg: false
    },
    {
        id: 5,
        name: 'Sausage Biscuit',
        images: [[Object], [Object]],
        desc: "McDonald’s Sausage Biscuit is the perfect sausage breakfast sandwich, made with sizzling hot sausage on a warm buttermilk biscuit that’s topped with real butter and baked to perfection. There are 460 calories in a McDonald's Sausage Biscuit.",
        ingredients: [[Object], [Object], [Object]],
        price: 12,
        veg: false
    },
    {
        id: 6,
        name: 'Sausage Biscuit with Egg',
        images: [[Object], [Object]],
        desc: "McDonald's Sausage and Egg Biscuit features a warm, flaky biscuit brushed with real butter, a sizzling hot pork sausage patty, and a classic McDonald's folded egg. It's the perfect savory breakfast sandwich when you're looking for a quick, easy breakfast.",
        ingredients: [[Object], [Object], [Object], [Object], [Object]],
        price: 4.6,
        veg: false
    },
    {
        id: 7,
        name: 'Bacon, Egg & Cheese McGriddles®',
        images: [[Object], [Object]],
        desc: 'Sausage, Egg & Cheese McGriddles® feature soft, warm griddle cakes—with the sweet taste of maple—that hold a fluffy folded egg, savory sausage, and melty American cheese. McGriddles® cakes have no artificial preservatives or flavors and no colors from artificial sources. There are 550 calories in a Sausage, Egg, and Cheese McGriddles®.',
        ingredients: [[Object], [Object], [Object], [Object], [Object]],
        price: 12,
        veg: false
    },
    {
        id: 8,
        name: 'Crispy Chicken Sandwich',
        images: [[Object], [Object]],
        desc: "McDonald's Crispy Chicken Sandwich is a southern style fried chicken sandwich that's crispy, juicy and tender perfection. It’s topped with crinkle-cut pickles and served on a toasted, buttered potato roll. The Crispy Chicken sandwich has 470 calories.",
        ingredients: [[Object], [Object], [Object], [Object]],
        price: 8,
        veg: false
    },
    {
        id: 9,
        name: 'Deluxe Crispy Chicken Sandwich',
        images: [[Object], [Object]],
        desc: 'Get a little extra with toppings. Go deluxe with shredded lettuce, Roma tomatoes and mayo to take crispy, juicy and tender to the next level. The Deluxe Crispy Chicken sandwich has 530 calories.',
        ingredients: [[Object], [Object], [Object], [Object], [Object]],
        price: 10,
        veg: false
    },
    {
        id: 10,
        name: 'Spicy Crispy Chicken Sandwich',
        images: [[Object], [Object]],
        desc: 'With our Spicy Pepper Sauce topping the southern style fried chicken fillet on a toasted potato roll, this sandwich was made for those who like it crispy, juicy, tender and hot. The Spicy Crispy Chicken sandwich has 530 calories.',
        ingredients: [[Object], [Object], [Object], [Object]],
        price: 9.6,
        veg: false
    },
    {
        id: 11,
        name: 'Spicy Deluxe Crispy Chicken Sandwich',
        images: [[Object], [Object]],
        desc: 'The Spicy Deluxe Crispy Chicken is big on everything, including heat. Our southern-style fried chicken fillet on a potato roll, topped with shredded lettuce, Roma tomatoes and Spicy Pepper Sauce kicks crispy, juicy and tender up to the highest level. The Spicy Deluxe Crispy Chicken sandwich has 540 calories.',
        ingredients: [[Object], [Object], [Object], [Object], [Object]],
        price: 15,
        veg: false
    },
    {
        id: 12,
        name: 'Filet-O-Fish®',
        images: [[Object], [Object]],
        desc: "Dive into our wild-caught Filet-O-Fish®! This McDonald’s fish sandwich has fish sourced from sustainably managed fisheries, on melty American cheese and topped with creamy McDonald’s tartar sauce, all served on a soft, steamed bun. There are 390 calories in McDonald's Filet-O-Fish.",
        ingredients: [[Object], [Object], [Object], [Object], [Object]],
        price: 7,
        veg: false
    },
    {
        id: 13,
        name: 'McChicken®',
        images: [[Object], [Object]],
        desc: 'It’s a classic for a reason. Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun.* The McChicken® has 400 calories.',
        ingredients: [[Object], [Object], [Object], [Object]],
        price: 8,
        veg: false
    },
    {
        id: 14,
        name: 'Big Mac®',
        images: [[Object], [Object]],
        desc: "Ever wondered what's on a Big Mac®? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It’s topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese. It contains no artificial flavors, preservatives, or added colors from artificial sources. Our pickle contains an artificial preservative, so skip it if you like. There are 550 calories in a Big Mac® from McDonald's. Pair it with any of our beverages or grab a Big Mac® Combo Meal with our World Famous Fries® and Coca-Cola® or any of your favorite fountain drinks.",
        ingredients: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object]
        ],
        price: 10.45,
        veg: false
    },
    {
        id: 15,
        name: 'Quarter Pounder®* with Cheese',
        images: [[Object], [Object]],
        desc: 'Each Quarter Pounder® with Cheese burger features a ¼ lb.* of 100% fresh beef that’s hot, deliciously juicy and cooked whenconsole.log(burgers); you order. It’s seasoned with just a pinch of salt and pepper, sizzled on a flat iron grill, then topped with slivered onions, tangy pickles and two slices of melty American cheese on a sesame seed bun. Our QPC® contains no artificial flavors, preservatives or added colors from artificial sources. **Our pickle contains an artificial preservative, so skip it if you like. A Quarter Pounder® with Cheese has 520 Calories. ',
        ingredients: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object]
        ],
        price: 6,
        veg: false
    }
]
// QUede en get total para obtener los totales y luego renderizars