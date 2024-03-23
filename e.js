import fs from 'fs'
import inquirer from 'inquirer'

let createProd = (prodName) => {
    console.log('')
    console.log('adding product to google drive...')

    let newDir = 'G:/My\ Drive/product/' + prodName
    fs.mkdir(newDir, (err) => {
        if(err){
            let currentDate = new Date
            let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
            fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
            console.log('')
            console.log('failed to create product directory')
            console.log('')
            console.log('check product name and error log')
            console.log('')
        }else{
            console.log(`created "${prodName}" directory`)
        }
    })

    fs.mkdir(`G:/My\ Drive/product/${prodName}/documents`, (err) => {
        if(err){
            let currentDate = new Date
            let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
            fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
            console.log('')
            console.log('failed to create product document directory')
            console.log('')
            console.log('check error log')
            console.log('')
        }else{
            console.log(`created product documents directory`)
        }
    })

    fs.copyFile('G:/My\ Drive/templates/cost-analysis.xlsx', `G:/My\ Drive/product/${prodName}/cost-analysis.xlsx`, (err) => {
        if(err){
            let currentDate = new Date
            let errObj = {date: currentDate.toLocaleString('en-US'), error: err}
            fs.appendFileSync('./error-log.txt', JSON.stringify(errObj) + '\n\n')
            console.log('')
            console.log('failed to copy cost analysis template to product directory')
            console.log('')
            console.log('check error log')
            console.log('')
        }else{
            console.log(`copied cost analysis template to product directory`)
        }
    })
            // create product folder in g drive
            // create cost-analysis.xlsx from template
            // create documents folder
            // create user-instruction from template
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