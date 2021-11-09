const db = connect('router:27017/lab3')

const COUNT = 100000

const INIT_DATE = new Date(2015, 1, 1)
const CURRENT_DATE = new Date()

const randNames = [
    'Zane', 'Norris', 'Ava-Mae', 'Rocha', 'Willow', 'Vega', 'Ayana', 'Whitehead', 'Jillian', 'Appleton', 'Idris', 'Cortez', 'Tayler', 'Keller', 'Mica', 'Harrison', 'Dahlia', 'Burns', 'Jethro', 'Preece', 'Braden', 'Little', 'Breanna', 'Davila', 'Henrietta', 'Mosley', 'Faisal', 'Beaumont', 'Faiz', 'Humphries', 'Justine', 'Beil', 'Devon', 'Patton', 'Annabella', 'Bender', 'Keon', 'Wills', 'Alasdair', 'Paul', 'Felix', 'Weaver', 'Nida', 'Dejesus', 'Arya', 'Roth', 'Jesus', 'Haley', 'Lily-Anne', 'Proctor', 'Bridie', 'Byers', 'Hiba', 'Luna', 'Ivan', 'Manning', 'Sarah-Jayne', 'Dickson', 'Dainton', 'Sullivan', 'Lorena', 'Small', 'Eamonn', 'Hamilton', 'Jacque', 'Conway', 'Zach', 'Albert', 'Annabel', 'Mcgowan', 'Awais', 'Phan', 'Veronica', 'Sheridan', 'Aliesha', 'Peterson', 'Mohamed', 'Trejo', 'Abby', 'Watts', 'Meadow', 'Tang', 'Melisa', 'Truong', 'Natasha', 'Marsden', 'Jay-Jay', 'Mcclain', 'Orion', 'Richardson', 'Cobie', 'Hays', 'Joanna', 'Tomlinson', 'Sheila', 'Ibarra', 'Rosie', 'Bautista', 'Aneesah', 'Shelton', 'Emre', 'Wickens', 'Roxy', 'Peel', 'Bethanie', 'Reilly', 'Adrian', 'Dickens', 'Bryony', 'Barajas', 'Angelo', 'Chen', 'Yannis', 'Rankin', 'Ebonie', 'Lyons', 'Gracey', 'Bright', 'Sannah', 'Robins', 'Ophelia', 'Craft', 'Willem', 'Savage', 'Kim', 'Whittle', 'Dawood', 'Mccarty', 'Asmaa', 'Mays', 'Eben', 'Lord', 'Dani', 'May', 'Kristopher', 'Hebert', 'Tyler-James', 'Alvarado', 'Sherri', 'Greenaway', 'Max', 'Sellers', 'Omar', 'Stuart', 'Patrick', 'Houghton', 'Zayd', 'Kinney', 'Lottie', 'Butt', 'Elijah', 'Berger', 'Kymani', 'Gibbons', 'Edward', 'Benjamin', 'Darnell', 'Cano', 'Sahar', 'Compton', 'Mahi', 'Shepherd', 'Lexie', 'Griffiths', 'Firat', 'Sanders', 'Yaqub', 'Jaramillo', 'Hudson', 'Sharpe', 'Zachery', 'Donovan', 'Rhiannon', 'Mathis', 'Alfie-Lee', 'Collins', 'Milton', 'Morton', 'Luella', 'Lane', 'Shana', 'Dalton', 'Fintan', 'Morrow', 'Yuvraj', 'Chaney', 'Leilani', 'Buckley', 'Jarrad', 'Merritt', 'Freyja', 'Barlow', 'Tierney', 'Terry', 'Tania', 'Ratliff', 'Letitia', 'Chan', 'Kabir', 'Bullock', 'Maci', 'Rose', 'Aanya', 'Flynn', 'Callum', 'Farrell', 'Kara', 'Fountain', 'Henri', 'Begum', 'Maddison', 'Dunne', 'Deniz', 'Davila', 'Spencer', 'Terrell', 'Nellie', 'Rhodes', 'Sonya', 'Wilde', 'Adriana', 'Field', 'Kimora', 'Baird', 'Ronny', 'Porter', 'Zakariah', 'Bassett', 'Zahra', 'Ritter', 'Kodi', 'Mullen', 'Stephen', 'Dixon', 'Glen', 'Peck', 'Willie', 'Vargas', 'Bianka', 'Winter', 'Lea', 'Mcgregor', 'Robert', 'Bradford', 'Deacon', 'Mclean', 'Rowena', 'Portillo', 'Todd', 'Esparza', 'Joey', 'Curtis', 'Kirsty', 'Duncan', 'Balraj', 'Meadows', 'Beyonce', 'Wagner', 'Tamzin', 'Cottrell', 'Hana', 'Harrell', 'Aditya', 'Benton', 'Zunairah', 'Sadler', 'Cydney', 'Reyes', 'Olivia-Mae', 'Lewis', 'Geoffrey', 'Bellamy', 'Areebah', 'Morrison', 'Elsie-Mae', 'Kenny', 'Honor', 'Munro', 'Milo', 'Chan', 'Jeanne', 'Denton', 'Milosz', 'Crowther', 'Mari', 'Healy', 'Ewan', 'Hart', 'Amir', 'Sargent', 'Rayyan', 'West', 'Aleeza', 'Hudson', 'Ryder', 'Key', 'Zane', 'Schwartz', 'Carrie-Ann', 'Jaramillo', 'Fatema', 'Rocha', 'Angelica', 'Rivera', 'Kennedy', 'Wynn', 'Edison', 'Mustafa', 'Emilija', 'Hahn', 'Elliot', 'Blanchard', 'Lucian', 'Pace', 'Kayan', 'Black', 'Darla', 'Nixon', 'Asif', 'Finnegan', 'August', 'Ayers', 'Zahraa', 'Rodrigues', 'Yousuf', 'Sims', 'Erica', 'Dillard', 'Sofia', 'Malone', 'Karolina', 'Howarth', 'Denis', 'Martinez', 'Sunil', 'Hogan', 'Sherri', 'Rangel', 'Helin', 'Hodgson', 'Kingsley', 'Marin', 'Akeem', 'Coombes', 'Ophelia', 'Rees', 'Ezra', 'Schaefer', 'Rumaysa', 'Connolly', 'Kacey', 'Welch', 'Megan', 'Gaines', 'Zena', 'Logan', 'Keely', 'Goldsmith', 'Kornelia', 'Goodman', 'Gruffydd', 'Powers', 'Milena', 'Sloan', 'Menaal', 'Whittaker', 'Ayah', 'Rosales', 'Muhammed', 'Albert', 'Samiyah', 'Harmon', 'Humaira', 'Whitmore', 'Zakk', 'Rowley', 'Aiden', 'Churchill', 'Darcey', 'Frederick', 'Eshal', 'Trejo', 'Rayhaan', 'Norton', 'Danika', 'Maynard', 'Zakary', 'Kendall', 'Franklyn', 'Mclaughlin', 'Isla', 'Middleton', 'Dion', 'Abbott', 'Archie', 'Juarez', 'Aimee', 'Galvan', 'George', 'Da'
]

const randCharacter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const randSex = ['m', 'w']

function randomDate(start, end, startHour, endHour) {
    const date = new Date(+start + Math.random() * (end - start));
    const hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

for (let i = 0; i < COUNT; i++) {
    if (i%100 === 0) {
        print('iteration #', i)
    }

    db.drivers.save({
        name: randNames[Math.floor(Math.random() * randNames.length-1)],
        email: `${randCharacter[i%(randCharacter.length-1)]}${randNames[Math.floor(Math.random() * randNames.length -1)]}${Math.floor(Math.random()*1000)}@gmail.${randCharacter[Math.floor(Math.random() * randCharacter.length-1)]}`,
        sex: randSex[i%2],
        car_numbers: `${randCharacter[Math.floor(Math.random() * randCharacter.length -1)]}${randCharacter[Math.floor(Math.random() * randCharacter.length -1 )]}${Math.floor(Math.random() * 9999)}${randCharacter[Math.floor(Math.random() * randCharacter.length-1)]}${randCharacter[Math.floor(Math.random() * randCharacter.length-1)]}`,
        rating: Math.round(Math.random()*500)/100,
        createdAt: randomDate(INIT_DATE, CURRENT_DATE, 0, 24)
    })
}

print('Driver-seed-finished')