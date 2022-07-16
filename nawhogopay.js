const techBros = [{ name: 'geekyadams', vote: 0 }, { name: 'geekmaros', vote: 0 }, { name: 'sofwan', vote: 0 }, { name: 'yusadolat', vote: 0 },]

const naWhoGoPay = (users, numberOfLoop) => {

    for (let i = 0; i < numberOfLoop; i++) {

        const user = Math.floor(Math.random() * users.length)
    
        users[user].vote++
    
    }

    return users

}

console.log(naWhoGoPay(techBros, 6))