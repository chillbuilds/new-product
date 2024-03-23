import fs from 'fs'
import inquirer from 'inquirer'

let currentDate = new Date

let createProd = (prodName) => {

    console.log('')
    console.log('adding product to google drive...')

    prodName = prodName.split(' ').join('-').toLowerCase()
    let newDir = 'G:/My\ Drive/product/' + prodName
    // create product folder in google drive
    try{
        fs.mkdirSync(newDir)
        console.log(`created "${prodName}" directory`)
    }
    catch (err) {
        let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
        fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
        console.log('')
        console.log('failed to create product directory')
        console.log('')
        console.log('check product name and error log')
        console.log('')
    }
    // create documents subfolder
    try{
        fs.mkdirSync(`G:/My\ Drive/product/${prodName}/documents`)
        console.log('created product documents directory')
    }
    catch (err) {
        let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
        fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
        console.log('')
        console.log('failed to create product document directory')
        console.log('')
        console.log('check error log')
        console.log('')
    }
    // create cost-analysis.xlsx from template
    try{
        fs.copyFileSync('G:/My\ Drive/templates/cost-analysis.xlsx', `G:/My\ Drive/product/${prodName}/cost-analysis.xlsx`)
        console.log('copied cost analysis template to product directory')
    }
    catch (err) {
        let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
            fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
            console.log('')
            console.log('failed to copy cost analysis template to product directory')
            console.log('')
            console.log('check error log')
            console.log('')
    }
}

let prodNameConfirm = (name) => {
    inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `plz confirm "${name}" is the correct product name:`
    }).then(data => {
        if(data.confirm == true){
            createProd(name)
        }else{
            prodNameQuery()
        }
    })
}

let prodNameQuery = () => {
    inquirer.prompt({
        type: 'input',
        name: 'prodName',
        message: 'enter product name:'
    }).then(data => {
        prodNameConfirm(data.prodName)
    })
}

prodNameQuery()