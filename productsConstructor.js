const fs = require('fs')


class Products{
    constructor(name){
        this.name = name
    }
    async fileInJSON() {
        let data = await fs.promises.readFile(this.name, "utf-8");
        let dataJSON = JSON.parse(data);
        return dataJSON;
    }
    async fileSaving(item) {
        let dataJSON = JSON.stringify(item);
        await fs.promises.writeFile(this.name, dataJSON);
    }
    async getAll(){
        try{
            let data = await this.fileInJSON()
            return data
        }
        catch(error){
            console.log(error);
        }
    }
    async getById(id){
        try{
            let data = await this.fileInJSON()
            let containerArray
            data.map(el => {el.id === id &&(containerArray = el)})
            return containerArray
        }
        catch(error){
            console.log(error);
        }

    }
}

module.exports = new Products('./product.json')
