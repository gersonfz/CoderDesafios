const fs = require('fs')

class Container{
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
    
    async save (item){
        try{
            let data = await this.fileInJSON()
            let lastIndex = data.length - 1
            let lastId = data[lastIndex].id
            item.id = lastId + 1
            let id = item.id
            data.push(item)
            this.fileSaving(data)
            return id
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
    async getAll(){
        try{
            let data = await this.fileInJSON()
            return data
        }
        catch(error){
            console.log(error);
        }

    }
    async deleteById(id){
        try{
            let data = await this.fileInJSON()
            let item = data.find((item) => item.id === id);
            let index = data.indexOf(item);
            data.splice(index, 1);
            this.fileSaving(data);
        }
        catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            let item = []
            this.fileSaving(item)
        }
        catch(error){
            console.log(error);
        }    
    }
}

let container = new Container("product.json")

let informacionNueva = {
    "title": "Lapiz",                                                                                                                          
    "price": 123.11,                                                                                                                                     
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    
}
// container.save(informacionNueva)    

// container.getById(4).then(res => console.log(res))
// container.getAll().then(res => console.log(res))

// container.deleteById(1)
// container.deleteAll()